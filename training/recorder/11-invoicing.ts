/**
 * Module 11 · Invoice batches and Zoho — Liaison, Operations Manager.
 *
 * Grounded in DDE-001 (Invoice Batch, Invoice Batch Line, Zoho Push Attempt), feature 007 and the code:
 *  - front-office/invoicing/invoice-worklist.tsx: finished, priced jobs grouped by customer; ticking
 *    two customers disables the act ("one customer per batch — 2 are ticked"); nothing is swept.
 *  - [...batch]/page.tsx + batch-acts.tsx: IB/YY-MM/XXXXXX, Draft / Sent / Refused, one line per job
 *    ("Service Charges for …"), amount from the job, "Remove" while not sent, Send disabled with the
 *    reason when no Zoho organisation / SAC / GSTIN; a sent batch is frozen by a trigger.
 *  - invoice_batch.manage = Liaison, Operations Manager (nav hides Invoicing; refusal.tsx refuses others by URL).
 *  - batch-acts.tsx EditLine: "What this line says to the customer", a two-row textarea + Save.
 *  - Zoho is NOT configured locally, so the clip shows the blocked Send and says what Send does.
 *
 *   npx tsx 11-invoicing.ts [en|ta]    → out/11-invoicing.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-11'
import * as S from './09-setup'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = (lang === 'ta' ? 1.1 : 1) * 0.9

// ---- Unrecorded set-up: three priced units for one customer, two repaired and one written off. ----
const CUSTOMER = 'Ayyan Industrial Systems'
const [K1, K2, K3] = await S.registerDelivery({
  customer: CUSTOMER, search: 'Ayyan', units: 3, brand: 'Omron', device: 'Servo drive',
  model: 'R88D-KN', complaint: 'Overcurrent alarm', prefix: 'OM',
})
await S.pickUp([K1, K2, K3])
await S.agreePrice(CUSTOMER, [K1, K2, K3], 7800)
await S.allot([K1, K2, K3])
await S.engineer([K1, K2], true)
await S.engineer([K3], false)
await S.verifyPass([K1, K2])
await S.customerPass([K1, K2])
await S.closeNonRepairable(K3)
S.expectState([K1, K2], 'Ready for Invoice')
S.expectState([K3], 'Non-Repairable')
const serial = S.sql(`select serial_number from work_order where job_number = '${K1}'`)
const stem = serial.slice(0, -1)
// Any other customer's job waiting to be billed, only ever ticked and unticked (nothing is written).
const other = S.sql(
  `select job_number from v_awaiting_invoice where company_name <> '${CUSTOMER}' order by job_number limit 1`
)
console.log('set up', { K1, K2, K3, stem, other })

// ---- Recording ----
const s = await Stage.open('liaison@thulirtech.com', '/front-office/invoicing?rows=60', join(OUT, 'raw'))
const p = s.page

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

await s.point(p.locator('table.bill'))
await s.say(c.worklist, 3600 * pace)
await s.point(p.locator('.warn', { hasText: 'Nothing can be pushed to Zoho Books yet.' }))
await s.say(c.zohoOff, 3600 * pace)
await s.unring()

// Two customers ticked: refused
await s.click(p.getByLabel(`Tick ${K1}`, { exact: true }))
if (other) await s.click(p.getByLabel(`Tick ${other}`, { exact: true }))
await s.point(p.locator('.foot .acts'))
await s.say(c.oneCustomer, 3600 * pace, 'dont')
await s.unring()

// Narrow to this delivery and pick
const find = p.getByLabel('Find a job by job number, serial or company')
await s.type(find, stem, 60)
await find.press('Enter')
await p.waitForURL(/q=/)
await p.waitForLoadState('networkidle')
await s.wait(500)
await s.say(c.pick, 600 * pace)
for (const j of [K1, K2, K3]) await s.click(p.getByLabel(`Tick ${j}`, { exact: true }))
await s.say(c.pick, 1800 * pace)
await s.point(p.locator('table.bill tr', { hasText: K3 }).locator('.tag, [class*="tag"]').first())
await s.say(c.nonRep, 2800 * pace)
const prep = p.getByRole('button', { name: /^Prepare a batch for/ })
await s.point(prep)
await s.say(c.prepare, 2600 * pace, 'do')
await s.click(prep)
await p.waitForURL(/\/front-office\/invoicing\/IB\//)
await p.waitForLoadState('networkidle')
await s.wait(600)

// The batch
await s.point(p.locator('.card-head').first())
await s.say(c.number, 3400 * pace)
await s.point(p.locator('table.lines'))
await s.say(c.lines, 3600 * pace)
const k1box = p.locator('table.lines tr', { hasText: K1 }).locator('textarea')
await s.point(k1box)
await s.say(c.lineText, 3600 * pace, 'do')
const k3row = p.locator('table.lines tr', { hasText: K3 })
const remove = k3row.getByRole('button', { name: 'Remove' })
await s.point(remove)
await s.say(c.remove, 3400 * pace, 'do')
await s.click(remove)
await k3row.waitFor({ state: 'detached' })
await p.waitForLoadState('networkidle')
await s.wait(1500)
await s.unring()
await s.say(c.removed, 2800 * pace)

// Zoho
await s.point(p.locator('.warn', { hasText: 'The push has nothing to send to.' }))
await s.say(c.blocked, 3800 * pace)
await s.point(p.locator('span.act[aria-disabled="true"]', { hasText: 'Send to Zoho Books' }))
await s.say(c.onSend, 4000 * pace)
await s.say(c.frozen, 3600 * pace, 'dont')
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log(await s.close(join(OUT, `11-invoicing.${lang}.webm`)))
