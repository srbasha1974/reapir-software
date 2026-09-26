/**
 * Module 04 · Quotations — Liaison (Service Head and Operations Manager hold the same grant).
 *
 * Grounded in UC-007 0.0.3, features 017 (price split), 018 (customers waiting on a price), 019 (a
 * board dropped from a revision returns to Under Assessment) and 023 / finding 8 (lines by kind),
 * app/(app)/service-centre/quotations/{page,actions}.tsx, [...quotation]/{page,quote-forms}.tsx,
 * lib/quotation-kind.ts and migrations 0153–0156, 0161:
 *  - ticked boards fall into lines by brand + model + service level; "Own line" moves one apart
 *  - each line: What is quoted, Normal price (rate card, read-only, or typed = "Set by hand"),
 *    Price per unit; above normal = Premium with a reason from the list; below = Discount;
 *    Engineer's labour charge = normal price less parts (shown, never typed)
 *  - the customer sees each line's price and the total; the split rows are internal
 *  - SENT moves Under Assessment boards to Awaiting Quotation Approval; a revision that leaves a board
 *    off returns it to Under Assessment when sent (migration 0156)
 *
 * Set-up (unrecorded): frontoffice@ registers two deliveries for one customer — 2 × Danfoss CDS-303 and
 * 1 × Danfoss FC-302 — so the quotation has two kinds; liaison@ picks all 3 up.
 *
 *   npx tsx 04-quotations.ts [en|ta]    → out/04-quotations.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-04'
import { customerId, pickUp, registerDelivery, stamp, stateOf } from './03-setup'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.2 : 1

// ---- Set-up, unrecorded -------------------------------------------------------------------
const CUSTOMER = process.env.QT_CUSTOMER ?? 'Nilgiri Cold Storage'
const st = stamp()
const a = await registerDelivery({
  customer: CUSTOMER,
  brand: 'Danfoss',
  deviceType: 'Compressor drive',
  model: 'CDS-303',
  complaint: 'Display dead, no start command',
  units: 2,
  serial: `QT${st}`,
})
const b = await registerDelivery({
  customer: CUSTOMER,
  brand: 'Danfoss',
  deviceType: 'Fan drive',
  model: 'FC-302',
  complaint: 'Overvoltage trip',
  units: 1,
  serial: `QF${st}`,
})
const jobs = [...a, ...b]
await pickUp(jobs)
console.log('jobs', jobs)
const [j1, j2, j3] = jobs
const cid = customerId(CUSTOMER)

// ---- Recording ----------------------------------------------------------------------------
const s = await Stage.open('liaison@thulirtech.com', '/service-centre/quotations', join(OUT, 'raw'))
const p = s.page
const bay = (code: string) => p.locator(`[data-code="${code}"]`).first()
const line = (n: number) => p.getByRole('group', { name: `Line ${n}`, exact: true })

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3000 * pace)

// Who is waiting on a price
await s.point(bay('NEW').locator('table.waiting-price'))
await s.say(c.list, 2800 * pace, 'do')
await s.click(bay('NEW').getByRole('link', { name: CUSTOMER }))
await p.waitForURL(/customer=/, { timeout: 20000 })
await p.waitForLoadState('networkidle')
await s.wait(800)

// Tick: lines by kind
await s.say(c.tick, 300 * pace)
for (const j of jobs) await s.click(bay('NEW').locator(`input[value="${j}"]`))
await s.wait(700)
await s.point(line(1).locator('.lh'))
await s.say(c.lines, 2600 * pace)
await s.point(line(1).getByRole('button', { name: 'Own line' }).first())
await s.say(c.own, 2200 * pace)
await s.unring()

await s.type(p.locator(`#estimatedLabourHours-${cid}`), '4', 60)
await s.type(p.locator(`#estimatedPartsNote-${cid}`), 'Display, DC bus caps', 25)

// Line 1: premium
await s.type(p.locator(`#line-0-description-${cid}`), 'Compressor drive repair', 30)
await s.point(p.locator(`#normalPrice-raise-${cid}-0`))
await s.say(c.normal, 3200 * pace, 'do')
await s.type(p.locator(`#normalPrice-raise-${cid}-0`), '6000', 80)
await s.type(p.locator(`#line-0-unitPrice-${cid}`), '6800', 80)
await s.point(line(1).locator('.pricesplit'))
await s.say(c.premium, 3200 * pace, 'do')
// "Why a premium" is the app's Choice: more than five reasons opens a search list, else the browser's own.
const why = line(1).getByLabel('Why a premium', { exact: true })
await s.click(why)
await s.wait(400)
const pop = p.locator('.choice-pop [role=option]', { hasText: 'Urgent turnaround' })
if (await pop.isVisible().catch(() => false)) await s.click(pop)
else { await p.keyboard.press('Escape'); await why.selectOption({ label: 'Urgent turnaround' }) }
await s.wait(700)
await s.point(line(1).locator('.pricesplit .row').last())
await s.say(c.labour, 3200 * pace)
await s.unring()

// Line 2: discount
await s.type(p.locator(`#line-1-description-${cid}`), 'Fan drive repair', 30)
await s.type(p.locator(`#normalPrice-raise-${cid}-1`), '9000', 80)
await s.type(p.locator(`#line-1-unitPrice-${cid}`), '8500', 80)
await s.point(line(2).locator('.pricesplit'))
await s.say(c.discount, 3000 * pace)
await s.unring()

const raise = bay('NEW').getByRole('button', { name: /Raise the quotation/ })
await s.click(raise)
await p.waitForURL(/\/service-centre\/quotations\/QT\//, { timeout: 30000 })
await p.waitForLoadState('networkidle')
await s.wait(1000)
const qtUrl = p.url()

await s.point(p.locator('table.qlines').first())
await s.say(c.internal, 3400 * pace)
await s.unring()

// Record as sent
await s.point(bay('ANS').getByRole('button', { name: 'Record as sent' }))
await s.say(c.sent, 2600 * pace, 'do')
await s.click(bay('ANS').getByRole('button', { name: 'Record as sent' }))
await p.waitForLoadState('networkidle')
await s.wait(1400)
for (const j of jobs) if (stateOf(j) !== 'Awaiting Quotation Approval') throw new Error(`${j} is at ${stateOf(j)}`)

// Revise: version 2 leaves the fan drive off
await s.point(bay('REV'))
await s.say(c.revise, 3000 * pace)
await s.unring()
for (const j of [j1, j2]) await s.click(bay('REV').locator(`input[value="${j}"]`))
await s.type(bay('REV').locator(`#estimatedLabourHours-${cid}`), '4', 40)
await s.type(bay('REV').locator(`#line-0-description-${cid}`), 'Compressor drive repair', 18)
await s.type(bay('REV').locator(`#normalPrice-raise-${cid}-0`), '6000', 70)
await s.type(bay('REV').locator(`#line-0-unitPrice-${cid}`), '6000', 70)
await s.click(bay('REV').getByRole('button', { name: /Raise version 2/ }))
await p.waitForLoadState('networkidle')
await s.wait(1600)
if (p.url() !== qtUrl) await s.goto(new URL(qtUrl).pathname)
await s.click(bay('ANS').getByRole('button', { name: 'Record as sent' }))
await p.waitForLoadState('networkidle')
await s.wait(1400)
if (stateOf(j3) !== 'Under Assessment') throw new Error(`${j3} is at ${stateOf(j3)}`)
await s.point(p.locator('table.versions'))
await s.say(c.dropped, 3400 * pace, 'do')
await s.unring()

// The answer
await s.type(bay('ANS').locator('#decidedByName'), 'S. Latha, Plant Engineer', 30)
await s.say(c.who, 2200 * pace, 'do')
await s.click(bay('ANS').getByRole('button', { name: 'Record approval' }))
await p.waitForLoadState('networkidle')
await s.wait(1400)
await s.point(p.locator('table.versions'))
await s.say(c.approved, 2800 * pace, 'do')
await s.unring()
await s.quiet()

// The closing card stays up until the browser closes: under load the recorder can miss a card that is taken down again.
await p.evaluate((h) => (window as any).__stage.card(h), `<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`)
await s.wait(6500 * pace)

console.log(await s.close(join(OUT, `04-quotations.${lang}.webm`)))
