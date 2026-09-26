/**
 * Module 02 · Receiving a delivery (Inward) — Front Office.
 *
 * Grounded in UC-006 and app/(app)/front-office/inward/inward-form.tsx:
 *  - one delivery = one inward; identical items are ONE item with a row per unit (quantity is never typed)
 *  - every unit needs its serial; one board per bin ("free" badge)
 *  - "Brought by" is the customer's contact; "Sales engineer" is who is credited, and is required
 *  - condition on receipt is per unit; empty means nobody checked
 *  - job and receipt numbers are only expected until you register
 *
 *   npx tsx 02-inward.ts [en|ta]    → out/02-inward.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-02'
import { join } from 'node:path'
import { Cuts } from './00-helpers'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
// Tamil captions are longer and read slower: hold them a little longer.
const pace = lang === 'ta' ? 1.25 : 1

const s = await Stage.open('frontoffice@thulirtech.com', '/front-office/inward', join(OUT, 'raw'))
const p = s.page
const stamp = Date.now().toString().slice(-4)
// Short shelf codes in the app's own style (its placeholder is "68B"), fresh each run so every one is free.
const shelf = (u: number) => `${(Number(stamp) % 89) + 10}${'ABC'[u - 1]}`

const cut = new Cuts()
cut.mark()
await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

await s.point(p.locator('section[data-code="IN"]'))
await s.say(c.arrive, 3000 * pace)

// Customer
await s.say(c.customer, 600 * pace)
await s.type(p.getByLabel('Customer', { exact: true }), 'Kovai', 90)
const kovai = p.getByRole('option', { name: /Kovai Textile Mills/ })
await cut.slow(() => kovai.waitFor({ timeout: 20000 }), 900)
await s.click(kovai)
await s.wait(1600)

await s.point(p.getByRole('button', { name: 'They are not on the list' }))
await s.say(c.newCustomer, 3200 * pace)

// Brought by (the customer's contact)
const broughtBy = p.getByLabel('Brought by', { exact: true })
await s.type(broughtBy, ' ', 60)
// Wait for the customer's contacts (a slow server can take a while); the priority list has options too.
const contact = p.getByRole('option', { name: /Suresh Kumar/ }).first()
await cut.slow(() => contact.waitFor({ timeout: 20000 }), 900)
await s.wait(300)
await s.click(contact)
await s.say(c.broughtBy, 2600 * pace)

// Sales engineer (credited)
await s.point(p.locator('.lookupcell').nth(2))
const pickSales = p.getByLabel('Sales engineer', { exact: true })
if (await pickSales.isVisible().catch(() => false)) {
  await s.click(pickSales)
  await s.wait(600)
  await s.click(p.getByRole('option').first())
}
await s.say(c.salesEngineer, 3200 * pace, 'do')

await s.type(p.locator('#deliveryNoteReference'), `DC-${stamp}`)
await s.say(c.ref, 2400 * pace)
await s.unring()

// The item
await s.say(c.describe, 600 * pace)
await s.type(p.locator('#brand-0'), 'Delta')
await s.type(p.locator('#deviceType-0'), 'Power supply')
await s.type(p.locator('#model-0'), 'DPS-600')
await s.type(p.locator('#complaint-0'), 'No output, fan does not spin')
await s.type(p.locator('#accessories-0'), 'power cable')
await s.say(c.cameWith, 2600 * pace)

// Units
const addUnit = p.getByRole('button', { name: 'Add a unit' })
await s.point(addUnit)
await s.say(c.units, 3200 * pace, 'do')
await s.click(addUnit)
await s.click(addUnit)
await s.unring()

const serial = (u: number) => p.getByLabel(`Serial number, unit ${u} of DPS-600`)
const bin = (u: number) => p.getByLabel(`Shelf, unit ${u} of DPS-600`)
const cond = (u: number) => p.getByLabel(`Condition on receipt, unit ${u} of DPS-600`)

await s.say(c.serial, 600 * pace, 'do')
for (let u = 1; u <= 3; u++) await s.type(serial(u), `DPS${stamp}0${u}`, 45)
await s.wait(800)

await s.say(c.bin, 600 * pace)
for (let u = 1; u <= 3; u++) await s.type(bin(u), shelf(u), 70)
await s.wait(900)
await s.point(p.locator('.bincell .pill').first())
await s.wait(1400)
await s.unring()

await s.type(cond(2), 'no power cord, casing dented', 45)
await s.say(c.damage, 3400 * pace, 'do')

// Receipt
await s.point(p.getByText(/ to WO\//))
await s.say(c.numbers, 3400 * pace)
await s.unring()

await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: /Register 3 units/ }))
  await p.waitForURL((u) => !u.pathname.endsWith('/inward'), { timeout: 30000 })
  await p.waitForLoadState('networkidle')
})
await s.wait(1000)
await s.say(c.done, 4200 * pace, 'do')
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log('cut', cut.save(join(OUT, `02-inward.${lang}.cuts.json`)).toFixed(1), 's')
console.log(await s.close(join(OUT, `02-inward.${lang}.webm`)))
