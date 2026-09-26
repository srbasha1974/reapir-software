/**
 * Helpers shared by the KPI clips 13, 14 and 17 (kept out of stage.ts, which is not ours to edit).
 *
 *  - `asUser` swaps the signed-in person inside a recording stage, so one clip can show two roles.
 *  - `example` draws a worked-example card: line items, the arithmetic, the result, how to read it.
 *    A row label starting with "= " is drawn as a total row.
 */
import { Stage } from './stage'
import { join } from 'node:path'

const APP = process.env.REPAIR_SERVICE_DIR ?? '/home/user/repair-service'

/** Sign the recording stage in as somebody else, then open `path`. */
export async function asUser(s: Stage, email: string, path: string) {
  const { mintSessionCookies } = await import(join(APP, 'tests/e2e/session.ts'))
  const cookies = await mintSessionCookies(email)
  const context = s.page.context()
  await context.clearCookies()
  await context.addCookies(cookies.map((c: object) => ({ ...c, url: undefined, domain: '127.0.0.1' })))
  await s.goto(path)
  await s.page.waitForFunction(() => (window as unknown as { __stage?: unknown }).__stage)
}

export type Row = readonly [string, string, string?]
export interface Example {
  readonly kicker: string
  readonly title: string
  readonly rows: readonly Row[]
  readonly read: string
}

const CSS = `<style>
#stg-card .ex{border-collapse:collapse;font-size:26px;line-height:1.3;width:100%}
#stg-card .ex tr,#stg-card .ex td{background:transparent!important;color:#1B2027;border:0}
#stg-card .ex td{padding:7px 0;border-bottom:1px solid #EEF0F3}
#stg-card .ex td.v{font:600 27px var(--stg-mono);text-align:right;padding-right:28px;white-space:nowrap;font-variant-numeric:tabular-nums}
#stg-card .ex td.n{font-size:20px;color:#5D6878}
#stg-card .ex tr.t td{border-top:2px solid #1B2027;border-bottom:0;padding-top:12px;font-weight:600}
#stg-card .ex tr.t td.v{font-size:32px}
#stg-card p.rd{font-size:22px;color:#4B5563;margin-top:6px;border-left:3px solid #C7D6F3;padding-left:12px}
</style>`

export function example(e: Example): string {
  const rows = e.rows
    .map(([label, value, note]) => {
      const total = label.startsWith('= ')
      return `<tr${total ? ' class="t"' : ''}><td>${total ? label.slice(2) : label}</td><td class="v">${value}</td><td class="n">${note ?? ''}</td></tr>`
    })
    .join('')
  return `${CSS}<div class="k">${e.kicker}</div><h2>${e.title}</h2><table class="ex">${rows}</table><p class="rd">${e.read}</p>`
}
