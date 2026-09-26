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
#stg-card .kc{display:flex;flex-direction:column;gap:12px}
#stg-card .kc h2{font-size:40px;line-height:1.15;margin:0;font-weight:600}
#stg-card .kc table{border-collapse:collapse;font-size:25px;margin-top:4px;width:100%}
#stg-card .kc td{padding:6px 18px 6px 0;border-bottom:1px solid #EEF0F3;color:#1B2027;vertical-align:top}
#stg-card .kc td.v{text-align:right;font-family:var(--stg-mono);font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums}
#stg-card .kc td.n{color:#5D6878;font-size:20px}
#stg-card .kc tr.kxt td{border-top:2px solid #1B2027;border-bottom:0;padding-top:10px;font-weight:600}
#stg-card .kc tr.kxt td.n{color:#1B2027}
#stg-card .kc td.m{color:#4B5563;font-size:23px}
#stg-card .kc .read{font-size:22px;color:#4B5563;margin:4px 0 0;border-left:3px solid #C7D6F3;padding-left:12px}
#stg-card .kc .read b{color:#1B2027;font-weight:600}
#stg-card .kc .wrong{font-size:21px;color:#B42318;background:#FDECEA;border:1px solid #F3C5BF;border-radius:6px;padding:8px 12px;margin:0}
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
