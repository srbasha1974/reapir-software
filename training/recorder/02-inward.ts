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
 *   npx tsx 02-inward.ts            → out/02-inward.webm
 */
import { Stage } from './stage'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')

const s = await Stage.open('frontoffice@thulirtech.com', '/front-office/inward', join(OUT, 'raw'))
const p = s.page
const stamp = Date.now().toString().slice(-4)
// Short shelf codes in the app's own style (its placeholder is "68B"), fresh each run so every one is free.
const shelf = (u: number) => `${(Number(stamp) % 89) + 10}${'ABC'[u - 1]}`

await s.card(
  `<div class="k">Thulir training · Module 02 · Front Office</div>
   <h1>Receiving a delivery</h1>
   <p>Booking boards in at the counter. About 90 seconds.</p>`,
  3500
)

await s.point(p.locator('section[data-code="IN"]'))
await s.say('A delivery arrives at the counter.<small>One delivery = one Inward.</small>', 3000)

// Customer
await s.say('Search and pick the customer.<small>The customer code comes from the system. Never type one.</small>', 600)
await s.type(p.getByLabel('Customer', { exact: true }), 'Kovai', 90)
await s.wait(900)
await s.click(p.getByRole('option', { name: /Kovai Textile Mills/ }))
await s.wait(1600)

await s.point(p.getByRole('button', { name: 'They are not on the list' }))
await s.say('New customer? Use “They are not on the list”.<small>They are created as Potential. Sales completes the record later.</small>', 3200)

// Brought by (the customer's contact)
const broughtBy = p.getByLabel('Brought by', { exact: true })
await s.type(broughtBy, ' ', 60)
await s.wait(900)
await s.click(p.getByRole('option').first())
await s.say('Brought by = the customer’s person who sent it.', 2600)

// Sales engineer (credited)
await s.point(p.locator('.lookupcell').nth(2))
const pickSales = p.getByLabel('Sales engineer', { exact: true })
if (await pickSales.isVisible().catch(() => false)) {
  await s.click(pickSales)
  await s.wait(600)
  await s.click(p.getByRole('option').first())
}
await s.say('Sales engineer = who gets the credit.<small>Always filled. It is hard to change later.</small>', 3200, 'do')

await s.type(p.locator('#deliveryNoteReference'), `DC-${stamp}`)
await s.say('Their ref. = their courier docket or delivery note.', 2400)
await s.unring()

// The item
await s.say('Now describe the item, once.', 600)
await s.type(p.locator('#brand-0'), 'Delta')
await s.type(p.locator('#deviceType-0'), 'Power supply')
await s.type(p.locator('#model-0'), 'DPS-600')
await s.type(p.locator('#complaint-0'), 'No output, fan does not spin')
await s.type(p.locator('#accessories-0'), 'power cable')
await s.say('Came with: write every accessory you receive.<small>The same list goes back on the challan.</small>', 2600)

// Units
const addUnit = p.getByRole('button', { name: 'Add a unit' })
await s.point(addUnit)
await s.say('3 identical units? One item. Add a row per unit.<small>Don’t add the same item 3 times.</small>', 3200, 'do')
await s.click(addUnit)
await s.click(addUnit)
await s.unring()

const serial = (u: number) => p.getByLabel(`Serial number, unit ${u} of DPS-600`)
const bin = (u: number) => p.getByLabel(`Shelf, unit ${u} of DPS-600`)
const cond = (u: number) => p.getByLabel(`Condition on receipt, unit ${u} of DPS-600`)

await s.say('Every unit needs its own serial number.', 600, 'do')
for (let u = 1; u <= 3; u++) await s.type(serial(u), `DPS${stamp}0${u}`, 45)
await s.wait(800)

await s.say('One board per bin. Look for the green “free” badge.', 600)
for (let u = 1; u <= 3; u++) await s.type(bin(u), shelf(u), 70)
await s.wait(900)
await s.point(p.locator('.bincell .pill').first())
await s.wait(1400)
await s.unring()

await s.type(cond(2), 'no power cord, casing dented', 45)
await s.say('Note damage per unit, before it goes in.<small>Blank means “nobody checked”, not “fine”.</small>', 3400, 'do')

// Receipt
await s.point(p.getByText(/ to WO\//))
await s.say('Three units = three job numbers.<small>Numbers are only “expected” until you register.</small>', 3400)
await s.unring()

await s.click(p.getByRole('button', { name: /Register 3 units/ }))
await p.waitForLoadState('networkidle')
await s.wait(1500)
await s.say('Registered. Each unit is now its own job.<small>Status: Pre-Repair › Inward. Next stop: assessment.</small>', 4200, 'do')
await s.quiet()

await s.card(
  `<div class="k">Remember</div>
   <ol>
     <li>Same item, many units → <b>one item, a row per unit</b></li>
     <li><b>Serial on every unit.</b> One board per bin</li>
     <li><b>Sales engineer</b> always filled</li>
     <li>Write <b>accessories</b> and <b>damage</b> at the counter</li>
   </ol>`,
  6000
)

console.log(await s.close(join(OUT, '02-inward.webm')))
