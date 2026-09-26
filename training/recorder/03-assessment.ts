/**
 * Module 03 · Assessment — Liaison (Service Head has the same moves).
 *
 * Grounded in UC-007 0.0.2 (AF-002, AF-004), UC-010 0.0.2 step 1a, specs/010-assessment-before-quotation,
 * features 018 (quoting from the queue) and DDE-001 0.0.43 (finding 11: what the assessment found),
 * app/(app)/service-centre/reservoir/{page,allot-form,queue-acts,actions}.tsx and migrations
 * 20260904000700_pre_repair_moves_TD-002.sql, 20260926000500_sla_and_findings_DDE-001.sql:
 *  - Inward → Under Assessment only by Pick up (move_work_order; the guard refuses anything else)
 *  - Under Assessment → Awaiting Customer Input needs a note; back only by Input received, with a note
 *  - allot_work_order refuses Inward and Awaiting Customer Input; the reservoir locks their tick
 *  - findings: written by work_order.allot holders, until allotment (then fixed); shown on the job card
 *  - narrowed to one customer, boards Under Assessment get ticks and Raise quotation (→ quotations, ticked)
 *  - nothing is sent to the customer by any of these moves
 *
 * Set-up (unrecorded): frontoffice@ registers a fresh 3-unit delivery, so the jobs are ours.
 *
 *   npx tsx 03-assessment.ts [en|ta]    → out/03-assessment.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-03'
import { registerDelivery, stamp, stateOf } from './03-setup'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1

// ---- Set-up, unrecorded -------------------------------------------------------------------
const CUSTOMER = 'Rajapalayam Spinners'
const st = stamp()
const serial = `AS${st}`
const jobs = await registerDelivery({
  customer: CUSTOMER,
  brand: 'Siemens',
  deviceType: 'Drive board',
  model: '6SE70-CU',
  complaint: 'Trips on start-up, fault F011',
  units: 3,
  serial,
})
console.log('jobs', jobs)
const [j1, j2, j3] = jobs

// ---- Recording ----------------------------------------------------------------------------
const s = await Stage.open('liaison@thulirtech.com', '/service-centre/reservoir', join(OUT, 'raw'))
const p = s.page
const row = (j: string) => p.locator('table.allot tbody tr', { hasText: j })
const qrow = (j: string) => p.locator('table.queue tbody tr', { hasText: j })
const acts = (j: string) => p.getByRole('group', { name: `What can be done with ${j}` })
const asm = p.locator('[data-code="ASM"]').first()
const settle = async (ms = 900) => {
  await p.waitForLoadState('networkidle')
  await s.wait(ms)
}

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

await s.point(p.locator('[data-code="RES"]').first())
await s.say(c.reservoir, 1400 * pace)
await s.unring()
await s.type(p.getByLabel('Find a board by job number, serial or company'), serial, 60)
await p.keyboard.press('Enter')
await settle(1200 * pace)

// Not yet assessed, tick locked
await s.point(row(j1).locator('.pill').first())
await s.say(c.inward, 3000 * pace)
await s.point(row(j1).locator('input[type=checkbox]'))
await s.wait(700)
await s.unring()

// Pick up
await s.point(row(j1).getByRole('button', { name: 'Pick up' }))
await s.say(c.pickup, 2400 * pace, 'do')
await s.click(row(j1).getByRole('button', { name: 'Pick up' }))
await settle(1200)
await s.click(row(j2).getByRole('button', { name: 'Pick up' }))
await s.wait(1100)
await s.click(row(j3).getByRole('button', { name: 'Pick up' }))
await settle(1200)
await s.point(row(j1).locator('.pill').first())
await s.say(c.only, 2400 * pace, 'do')
await s.unring()

// The queue, narrowed to one customer
await s.point(asm.locator('nav.tabs'))
await s.say(c.queue, 2600 * pace)
const narrow = asm.getByRole('combobox', { name: 'Narrow the queue to one customer' })
await s.point(narrow)
await s.say(c.narrow, 2200 * pace)
await s.type(narrow, 'Rajapal', 60)
await s.wait(900)
await s.click(p.getByRole('option', { name: new RegExp(CUSTOMER) }).first())
await p.waitForURL(/customer=/, { timeout: 20000 })
await settle(1500)

// What the assessment found
await s.click(qrow(j1).locator('a.row-link'))
await settle(1000)
const found = acts(j1).getByLabel('What the assessment found')
await s.point(found)
await s.say(c.findings, 2800 * pace, 'do')
await s.type(found, 'Gate driver U12 open. DC bus caps dried out. Needs U12 + 4 caps.', 28)
await s.click(acts(j1).getByRole('button', { name: 'Save findings' }))
await settle(1200)
await s.point(acts(j1).locator('.findings'))
await s.say(c.findingsSeen, 3000 * pace)
await s.unring()

// Wait for the customer
await s.click(qrow(j3).locator('a.row-link'))
await settle(900)
await s.point(acts(j3).getByRole('button', { name: 'Wait for the customer' }))
await s.say(c.ask, 2600 * pace)
await s.click(acts(j3).getByRole('button', { name: 'Wait for the customer' }))
await s.wait(400)
await s.point(acts(j3).locator('button[type=submit]'))
await s.say(c.note, 2600 * pace, 'do')
await s.type(acts(j3).getByLabel('What was asked of them'), 'Asked them to send the encoder cable', 32)
await s.click(acts(j3).getByRole('button', { name: 'Wait for the customer' }))
await settle(1500)
if (stateOf(j3) !== 'Awaiting Customer Input') throw new Error(`${j3} is at ${stateOf(j3)}`)

await s.point(row(j3).locator('.pill').first())
await s.say(c.waiting, 3000 * pace, 'dont')
await s.unring()
await s.say(c.nothingSent, 2600 * pace)

// Input received (shown, not pressed)
await s.click(asm.locator('nav.tabs a', { hasText: 'Waiting on the customer' }))
await settle(800)
await s.click(qrow(j3).locator('a.row-link'))
await settle(800)
await s.point(acts(j3).getByRole('button', { name: 'Input received' }))
await s.say(c.back, 3000 * pace, 'do')
await s.unring()

// Decide: allot, or quote from here
await s.click(asm.locator('nav.tabs a', { hasText: 'Under assessment' }))
await settle(1000)
await s.say(c.decide, 1600 * pace)
await s.point(row(j2).locator('input[type=checkbox]'))
await s.say(c.allot, 2800 * pace)
await s.unring()
await s.click(qrow(j1).locator('input[type=checkbox]'))
await s.click(qrow(j2).locator('input[type=checkbox]'))
await s.wait(500)
const raise = asm.getByRole('link', { name: /Raise quotation/ })
await s.point(raise)
await s.say(c.quote, 3000 * pace, 'do')
await s.click(raise)
await p.waitForURL(/\/service-centre\/quotations\?/, { timeout: 30000 })
await settle(1500)
await s.point(p.locator('[data-code="NEW"]').first().locator('ul.pick'))
await s.say(c.carried, 3000 * pace)
await s.unring()
await s.say(c.segment, 2800 * pace, 'do')
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log(await s.close(join(OUT, `03-assessment.${lang}.webm`)))
