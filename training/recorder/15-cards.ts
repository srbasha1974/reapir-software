/**
 * Helpers for the money modules 15 and 16 (kept out of stage.ts, which is not ours to edit):
 *  - `sumCard` draws a worked-example card: a small table of line items, the arithmetic and the
 *    result, one line on how to read it and, optionally, the misreading to avoid.
 *  - `pointAll` rings several elements at once (a label and its figure).
 */
import type { Locator } from '@playwright/test'
import type { Stage } from './stage'

export type Row = [label: string, amount: string, how?: string]

const CSS = `<style>
#stg-card .kc{display:flex;flex-direction:column;gap:14px}
#stg-card .kc h2{font-size:44px;line-height:1.1;margin:0;font-weight:800}
#stg-card .kc table{border-collapse:collapse;font-size:27px;margin-top:6px}
#stg-card .kc tr{background:transparent!important}
#stg-card .kc td{background:transparent!important;padding:5px 26px 5px 0;vertical-align:baseline}
#stg-card .kc td.v{text-align:right;font-family:ui-monospace,Menlo,monospace;font-weight:700;white-space:nowrap}
#stg-card .kc td.n{color:#9fb3ac;font-size:22px}
#stg-card .kc tr.kxt td{border-top:2px solid #f5a524;padding-top:9px;font-weight:800;color:#7fe0bf}
#stg-card .kc tr.kxt td.n{color:#7fe0bf;font-weight:600}
#stg-card .kc tr.kxg td{padding-top:16px}
#stg-card .kc td.m{color:#dfe9e5;font-size:25px}
#stg-card .kc .read{font-size:24px;color:#dfe9e5;margin:4px 0 0;max-width:1080px}
#stg-card .kc .read b{color:#7fe0bf}
#stg-card .kc .wrong{font-size:23px;color:#ffb4aa;margin:0;max-width:1080px}
</style>`

/** A worked example. A label starting with "= " is a total row; one starting with "+ " opens a gap. */
export function sumCard(o: { k: string; h: string; rows: Row[]; read?: string; wrong?: string }) {
  const rows = o.rows
    .map(([l, v, how]) => {
      const total = l.startsWith('= ')
      const gap = l.startsWith('+ ')
      const label = l.replace(/^[=+] /, '')
      const cls = total ? 'kxt' : gap ? 'kxg' : ''
      if (v === '') return `<tr class="${cls}"><td>${label}</td><td class="m" colspan="2">${how ?? ''}</td></tr>`
      return `<tr class="${cls}"><td>${label}</td><td class="v">${v}</td><td class="n">${how ?? ''}</td></tr>`
    })
    .join('')
  return `${CSS}<div class="kc"><div class="k">${o.k}</div><h2>${o.h}</h2><table>${rows}</table>${
    o.read ? `<p class="read">${o.read}</p>` : ''
  }${o.wrong ? `<p class="wrong">${o.wrong}</p>` : ''}</div>`
}

/** Glide to and ring the union of several elements. */
export async function pointAll(s: Stage, targets: Locator[]) {
  await targets[0].scrollIntoViewIfNeeded()
  const boxes = (await Promise.all(targets.map((t) => t.boundingBox()))).filter(Boolean) as Array<{ x: number; y: number; width: number; height: number }>
  if (!boxes.length) throw new Error('Nothing to point at')
  const x = Math.min(...boxes.map((b) => b.x))
  const y = Math.min(...boxes.map((b) => b.y))
  const w = Math.max(...boxes.map((b) => b.x + b.width)) - x
  const h = Math.max(...boxes.map((b) => b.y + b.height)) - y
  ;(s as unknown as { focusY: number }).focusY = y + h / 2
  await s.page.evaluate(
    ([px, py, box]) => {
      const st = (window as any).__stage
      st.ptr(px, py)
      st.ring(box)
    },
    [x + Math.min(w / 2, 60), y + h / 2, { x, y, w, h }] as const
  )
  await s.wait(750)
}
