/**
 * Module 10 · Dispatch (Delivery challan) — Front Office (the Liaison holds the same grant).
 *
 * Grounded in UC-009 and the code:
 *  - front-office/challans/page.tsx + dispatch-list.tsx: one list of everything that may leave
 *    (Ready for Invoice, Non-Repairable, Customer Rejected, Awaiting Customer Confirmation), one
 *    customer per challan ("Raise a challan for …").
 *  - challan-form.tsx: the reason is derived from each job's state ("Leaves as"), a mixed selection
 *    is refused ("these are leaving for different reasons — issue them separately"), accessories
 *    recorded at inward are ticked "Going back" or confirmed "They stay with us", site testing is
 *    returnable with "Expected back" and keeps the shelf; numbers are issued on submit.
 *  - record-screen.tsx: immutable once issued, "Print", "This is a transportation document and a
 *    gate pass"; "Record the return" for a returnable challan still out.
 *  - accessory-form.tsx (?mode=accessory, "Send an accessory on its own"): one board still on a
 *    shelf, "What is leaving" pre-filled from its inward accessories, reason "Accessory only"; the
 *    board keeps its shelf and state; the record shows "accessory only — no job".
 *  - Grants: challan.issue = Front Office, Liaison.
 *
 *   npx tsx 10-challan.ts [en|ta]    → out/10-challan.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-10'
import * as S from './09-setup'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = (lang === 'ta' ? 1.05 : 1) * 0.88

// ---- Unrecorded set-up: five units of one delivery; four taken to the states that may leave, one left on its shelf. ----
const CUSTOMER = 'Kovai Textile Mills'
const [R1, R2, N1, T1, X1] = await S.registerDelivery({
  customer: CUSTOMER, search: 'Kovai', units: 5, brand: 'Danfoss', device: 'Drive control board',
  model: 'FC-51', complaint: 'Compressor drive faults', accessories: 'ribbon cable', prefix: 'DF',
})
await S.pickUp([R1, R2, N1, T1])
await S.agreePrice(CUSTOMER, [R1, R2, N1, T1], 5200)
await S.allot([R1, R2, N1, T1])
await S.engineer([R1, R2, T1], true)
await S.engineer([N1], false)
await S.verifyPass([R1, R2, T1])
await S.customerPass([R1, R2])
await S.closeNonRepairable(N1)
S.expectState([R1, R2], 'Ready for Invoice')
S.expectState([N1], 'Non-Repairable')
S.expectState([T1], 'Awaiting Customer Confirmation')
S.expectState([X1], 'Inward')
console.log('set up', { R1, R2, N1, T1, X1 })
const cid = S.customerId(CUSTOMER)

// ---- Recording ----
const s = await Stage.open('frontoffice@thulirtech.com', '/front-office/challans', join(OUT, 'raw'))
const p = s.page

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

const find = p.getByLabel('Find a board waiting to leave')
await s.type(find, 'Kovai', 40)
await find.press('Enter')
await p.waitForURL(/q=Kovai/)
await p.waitForLoadState('networkidle')
await s.point(p.locator('table.ready'))
await s.say(c.list, 3600 * pace)
await s.unring()

// A repaired board and a non-repairable one, ticked together
await s.say(c.tick, 600 * pace)
await s.click(p.getByLabel(`Tick ${R1}`, { exact: true }))
await s.click(p.getByLabel(`Tick ${N1}`, { exact: true }))
await s.wait(500)
await s.click(p.getByRole('button', { name: /^Raise a challan for/ }))
await p.waitForURL(/customer=/)
await p.waitForLoadState('networkidle')
await s.wait(600)
await s.point(p.locator('.acts').last())
await s.say(c.mixed, 3800 * pace, 'dont')
await s.unring()

await s.click(p.getByLabel(`${N1} is leaving`, { exact: true }))
await s.click(p.getByLabel(`${R2} is not leaving`, { exact: true }))
await s.wait(400)
await s.point(p.locator('table.ready tbody tr', { hasText: R1 }).locator('td').last())
await s.say(c.leavesAs, 3200 * pace)
await s.unring()

// Accessories recorded at the counter
await s.point(p.locator('table.acc'))
await s.say(c.accessories, 3600 * pace, 'do')
await s.click(p.getByLabel(`ribbon cable from ${R1} is going back`, { exact: true }))
await s.click(p.getByLabel(`ribbon cable from ${R2} is going back`, { exact: true }))
await s.unring()

await s.type(p.locator('#receivingParty'), 'Selvam, our driver', 25)
await s.type(p.locator('#goesBy'), 'Company van', 25)

await s.point(p.locator('dl.sum'))
await s.say(c.number, 3600 * pace)
await s.unring()

await s.click(p.getByRole('button', { name: /^Issue the challan for/ }))
await p.waitForURL(/\/front-office\/challans\/DC\//)
await p.waitForLoadState('networkidle')
await s.wait(600)
await s.point(p.locator('.card-head').last())
await s.say(c.issued, 2800 * pace, 'do')
const printLink = p.getByRole('link', { name: 'Print', exact: true })
await s.point(printLink)
await s.say(c.print, 3600 * pace, 'dont')
await s.unring()
await s.quiet()

// A returnable challan for customer testing
await s.goto(`/front-office/challans?customer=${cid}&job=${encodeURIComponent(T1)}`)
await s.point(p.locator('table.ready tbody tr', { hasText: T1 }))
await s.say(c.testing, 3600 * pace)
const back = p.locator('#expectedReturnDate')
const d = new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10)
await s.point(back)
await back.fill(d)
await s.say(c.expected, 2600 * pace, 'do')
await s.unring()
await s.quiet()
const t1Acc = p.getByLabel(`ribbon cable from ${T1} is going back`, { exact: true })
if (await t1Acc.isVisible().catch(() => false)) await s.click(t1Acc)
await s.click(p.locator('#receivingParty'))
await p.locator('#receivingParty').fill('Selvam, our driver')
await s.click(p.getByRole('button', { name: /^Issue the challan for/ }))
await p.waitForURL(/\/front-office\/challans\/DC\//)
await p.waitForLoadState('networkidle')
await s.wait(800)
await s.point(p.locator('.warn', { hasText: 'Still out.' }))
await s.say(c.stillOut, 3600 * pace)
await s.unring()
await s.quiet()

// An accessory on its own, the board staying on its shelf
await s.goto(`/front-office/challans?customer=${cid}`)
const accLink = p.getByRole('link', { name: 'Send an accessory on its own' }).first()
await s.point(accLink)
await s.say(c.accLink, 3200 * pace)
await s.click(accLink)
await p.waitForURL(/mode=accessory/)
await p.waitForLoadState('networkidle')
await s.wait(500)
const mine = p.getByLabel(`It belongs to ${X1}`, { exact: true })
await s.point(p.locator('table.ready tbody tr', { has: mine }))
await s.say(c.accBoard, 3200 * pace)
await s.click(mine)
await s.unring()
await s.point(p.locator('#accessory'))
await s.say(c.accWhat, 3200 * pace)
await s.unring()
await s.click(p.locator('#receivingParty'))
await p.locator('#receivingParty').fill('Selvam, our driver')
await s.point(p.locator('dl.sum'))
await s.say(c.accStays, 3000 * pace, 'do')
await s.unring()
await s.click(p.getByRole('button', { name: /^Issue the challan/ }).first())
await p.waitForURL(/\/front-office\/challans\/DC\//)
await p.waitForLoadState('networkidle')
await s.wait(800)
await s.point(p.getByText('accessory only — no job').first())
await s.say(c.accIssued, 2800 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log(await s.close(join(OUT, `10-challan.${lang}.webm`)))
