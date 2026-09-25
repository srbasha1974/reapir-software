/**
 * The recording stage: signs in as a seeded role against the LOCAL app, records the browser, and
 * draws the training layer on top of the real screen — caption bar, pointer, highlight ring and
 * title cards.
 *
 * The overlay is injected with addInitScript, so it survives the navigations a real form makes
 * (registering a delivery lands on another page).
 *
 * Needs: the repair-service app on http://127.0.0.1:3000 against local Supabase, and
 * repair-service's tests/e2e/session.ts, which mints a real session for a seeded user without
 * Google.
 */
import { chromium, type Browser, type BrowserContext, type Locator, type Page } from '@playwright/test'
import { mkdirSync, readFileSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { config } from 'dotenv'

const APP = process.env.REPAIR_SERVICE_DIR ?? '/home/user/repair-service'
config({ path: join(APP, '.env.local'), quiet: true })

const SITE = 'http://127.0.0.1:3000'
if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http://127.0.0.1')) {
  throw new Error('Refusing to record: repair-service/.env.local does not point at the local database.')
}

export const W = 1366
export const H = 768

const TAMIL = readFileSync(join(import.meta.dirname, 'fonts', 'noto-sans-tamil.woff2')).toString('base64')
const FACE = `@font-face{font-family:"Noto Sans Tamil";src:url(data:font/woff2;base64,${TAMIL}) format("woff2");font-weight:100 900;unicode-range:U+0B80-0BFF,U+200C-200D,U+25CC}`

const OVERLAY = `
(() => {
  if (window.__stage) return;
  const css = \`
    ${FACE}
    nextjs-portal{display:none!important}
    #stg-cap{position:fixed;left:50%;bottom:22px;transform:translateX(-50%) translateY(12px);opacity:0;
      background:#101816;color:#fff;font:600 26px/1.35 "Noto Sans Tamil",system-ui,Segoe UI,sans-serif;padding:14px 26px;
      border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.35);z-index:2147483645;max-width:1100px;
      text-align:center;transition:opacity .25s,transform .25s;pointer-events:none}
    #stg-cap.on{opacity:1;transform:translateX(-50%) translateY(0)}
    #stg-cap.top{bottom:auto;top:64px}
    #stg-cap.dont{background:#8f1d14}
    #stg-cap.do{background:#0b6b52}
    #stg-cap small{display:block;font-weight:400;font-size:18px;opacity:.85;margin-top:4px}
    #stg-ptr{position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483646;pointer-events:none;
      transition:transform .7s cubic-bezier(.3,.7,.2,1);transform:translate(683px,420px)}
    #stg-ptr svg{filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))}
    #stg-ptr.click::after{content:"";position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;
      border:3px solid #f5a524;animation:stgp .45s ease-out}
    @keyframes stgp{from{transform:scale(.3);opacity:1}to{transform:scale(1.4);opacity:0}}
    #stg-ring{position:fixed;z-index:2147483645;pointer-events:none;border:3px solid #f5a524;border-radius:8px;
      box-shadow:0 0 0 9999px rgba(10,20,18,.28);opacity:0;transition:all .35s}
    #stg-ring.on{opacity:1}
    #stg-card{position:fixed;inset:0;z-index:2147483647;background:#101816;color:#fff;display:none;
      flex-direction:column;justify-content:center;padding:0 120px;gap:18px;font-family:"Noto Sans Tamil",system-ui,Segoe UI,sans-serif}
    #stg-card.on{display:flex}
    #stg-card .k{font:600 18px ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#f5a524}
    #stg-card h1{font-size:64px;line-height:1.05;margin:0;font-weight:800}
    #stg-card p{font-size:26px;margin:0;color:#b9c7c2}
    #stg-card ol{margin:10px 0 0;padding-left:34px;font-size:30px;line-height:1.5}
    #stg-card li b{color:#7fe0bf}
  \`;
  const add = () => {
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    const cap = document.createElement('div'); cap.id = 'stg-cap'; document.body.appendChild(cap);
    const ring = document.createElement('div'); ring.id = 'stg-ring'; document.body.appendChild(ring);
    const card = document.createElement('div'); card.id = 'stg-card'; document.body.appendChild(card);
    const ptr = document.createElement('div'); ptr.id = 'stg-ptr';
    ptr.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#fff" stroke="#101816" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    document.body.appendChild(ptr);
    const last = sessionStorage.getItem('stg-ptr');
    if (last) { ptr.style.transition = 'none'; ptr.style.transform = last; requestAnimationFrame(() => ptr.style.transition = ''); }
    window.__stage = {
      cap(html, kind, top) { cap.className = ''; void cap.offsetWidth; if (!html) return; cap.innerHTML = html; cap.className = 'on ' + (kind || '') + (top ? ' top' : ''); },
      ptr(x, y) { const t = 'translate(' + x + 'px,' + y + 'px)'; ptr.style.transform = t; sessionStorage.setItem('stg-ptr', t); },
      click() { ptr.classList.remove('click'); void ptr.offsetWidth; ptr.classList.add('click'); },
      ring(r) { if (!r) { ring.className = ''; return; } Object.assign(ring.style, { left: r.x - 6 + 'px', top: r.y - 6 + 'px', width: r.w + 12 + 'px', height: r.h + 12 + 'px' }); ring.className = 'on'; },
      card(html) { card.innerHTML = html || ''; card.className = html ? 'on' : ''; },
    };
  };
  if (document.body) add(); else document.addEventListener('DOMContentLoaded', add);
})();
`

export class Stage {
  private constructor(
    private browser: Browser,
    private context: BrowserContext,
    readonly page: Page,
    private videoDir: string
  ) {}

  /** Where the pointer last went, so captions can keep out of its way. */
  private focusY = H / 2

  /**
   * Signs in as a seeded person (e.g. 'liaison@thulirtech.com') and opens `path`.
   * `record: false` gives an unrecorded browser, for setting up the records a clip needs
   * (moving a job to the right stage first) through the app itself rather than by hand-written SQL.
   */
  static async open(email: string, path: string, videoDir: string, opts: { record?: boolean } = {}): Promise<Stage> {
    const record = opts.record ?? true
    const { mintSessionCookies } = await import(join(APP, 'tests/e2e/session.ts'))
    const cookies = await mintSessionCookies(email)
    mkdirSync(videoDir, { recursive: true })
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      viewport: { width: W, height: H },
      deviceScaleFactor: 1,
      ...(record ? { recordVideo: { dir: videoDir, size: { width: W, height: H } } } : {}),
    })
    await context.addCookies(cookies.map((c: object) => ({ ...c, url: undefined, domain: '127.0.0.1' })))
    await context.addInitScript(OVERLAY)
    const page = await context.newPage()
    await page.goto(`${SITE}${path}`)
    await page.waitForLoadState('networkidle')
    await page.waitForFunction(() => (window as unknown as { __stage?: unknown }).__stage)
    return new Stage(browser, context, page, videoDir)
  }

  /** Navigate within the same signed-in session. */
  async goto(path: string) {
    await this.page.goto(`${SITE}${path}`)
    await this.page.waitForLoadState('networkidle')
  }

  wait(ms: number) {
    return this.page.waitForTimeout(ms)
  }

  /** A caption, held for `hold` ms. kind: 'do' (green), 'dont' (red) or plain. */
  async say(html: string, hold = 2600, kind?: 'do' | 'dont') {
    // Keep the caption away from the action: if the pointer is low on screen, caption goes on top.
    const top = this.focusY > H * 0.55
    await this.page.evaluate(([h, k, t]) => (window as any).__stage.cap(h, k, t), [html, kind ?? '', top] as const)
    await this.wait(hold)
  }

  async quiet() {
    await this.page.evaluate(() => (window as any).__stage.cap(''))
  }

  async card(html: string, hold: number) {
    await this.page.evaluate((h) => (window as any).__stage.card(h), html)
    await this.wait(hold)
    await this.page.evaluate(() => (window as any).__stage.card(''))
  }

  /** Glide the pointer to an element and ring it. */
  async point(target: Locator, ring = true) {
    await target.scrollIntoViewIfNeeded()
    const b = await target.boundingBox()
    if (!b) throw new Error('Nothing to point at')
    this.focusY = b.y + b.height / 2
    await this.page.evaluate(
      ([x, y, r, box]) => {
        const s = (window as any).__stage
        s.ptr(x, y)
        s.ring(r ? box : null)
      },
      [b.x + Math.min(b.width / 2, 60), b.y + b.height / 2, ring, { x: b.x, y: b.y, w: b.width, h: b.height }] as const
    )
    await this.wait(750)
  }

  async unring() {
    await this.page.evaluate(() => (window as any).__stage.ring(null))
  }

  async click(target: Locator) {
    await this.point(target, false)
    await this.page.evaluate(() => (window as any).__stage.click())
    await target.click()
    await this.wait(350)
  }

  async type(target: Locator, text: string, delay = 55) {
    await this.click(target)
    await target.pressSequentially(text, { delay })
    await this.wait(250)
  }

  /** Closes the browser; for a recorded stage, moves the video to `out` (webm). */
  async close(out?: string) {
    const video = this.page.video()
    await this.context.close()
    await this.browser.close()
    if (!video || !out) return null
    renameSync(await video.path(), out)
    return out
  }
}
