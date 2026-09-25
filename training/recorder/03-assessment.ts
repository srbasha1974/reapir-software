/**
 * Module 03 · Assessment — Liaison (Service Head has the same moves).
 *
 * Grounded in UC-007 0.0.2 (AF-002, AF-004), UC-010 0.0.2 step 1a, specs/010-assessment-before-quotation,
 * app/(app)/service-centre/reservoir/{allot-form,queue-acts,actions}.tsx and migration
 * 20260904000700_pre_repair_moves_TD-002.sql:
 *  - Inward → Under Assessment only by Pick up (move_work_order; the guard refuses anything else)
 *  - Under Assessment → Awaiting Customer Input needs a note; back only by Input received, with a note
 *  - allot_work_order refuses Inward and Awaiting Customer Input; the reservoir locks their tick
 *  - nothing is sent to the customer by any of these moves
 *  - the assessment, not the billing segment, decides: allot, or quote
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
const st = stamp()
const serial = `AS${st}`
const jobs = await registerDelivery({
  customer: 'Rajapalayam Spinners',
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
const acts = (j: string) => p.getByRole('group', { name: `What can be done with ${j}` })

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

await s.point(p.locator('section[data-code="RES"], [data-code="RES"]').first())
await s.say(c.reservoir, 1200 * pace)
await s.unring()
await s.type(p.getByLabel('Find a board by job number, serial or company'), serial, 70)
await p.keyboard.press('Enter')
await p.waitForLoadState('networkidle')
await s.wait(1500 * pace)

// Not yet assessed, tick locked
await s.point(row(j1).locator('.pill').first())
await s.say(c.inward, 3400 * pace)
await s.point(row(j1).locator('input[type=checkbox]'))
await s.wait(1200)
await s.unring()

// Pick up
await s.point(row(j1).getByRole('button', { name: 'Pick up' }))
await s.say(c.pickup, 2600 * pace, 'do')
await s.click(row(j1).getByRole('button', { name: 'Pick up' }))
await p.waitForLoadState('networkidle')
await s.wait(1500)
await s.point(row(j1).locator('.pill').first())
await s.wait(1200)
await s.unring()
await s.click(row(j2).getByRole('button', { name: 'Pick up' }))
await s.wait(1200)
await s.click(row(j3).getByRole('button', { name: 'Pick up' }))
await s.wait(1200)
await s.say(c.only, 2800 * pace, 'do')

// The queue
await s.point(p.locator('[data-code="ASM"]').first().locator('nav.tabs'))
await s.say(c.queue, 3200 * pace)
await s.unring()
await s.say(c.choose, 600 * pace)
await s.click(p.locator('table.queue a', { hasText: j2 }))
await p.waitForLoadState('networkidle')
await s.wait(1200)

// Wait for the customer
await s.point(acts(j2))
await s.say(c.ask, 3000 * pace)
await s.click(acts(j2).getByRole('button', { name: 'Wait for the customer' }))
await s.wait(500)
await s.point(acts(j2).locator('button[type=submit]'))
await s.say(c.note, 3000 * pace, 'do')
await s.type(acts(j2).getByLabel('What was asked of them'), 'Asked them to send the encoder cable', 40)
await s.wait(600)
await s.click(acts(j2).getByRole('button', { name: 'Wait for the customer' }))
await p.waitForLoadState('networkidle')
await s.wait(1800)
if (stateOf(j2) !== 'Awaiting Customer Input') throw new Error(`${j2} is at ${stateOf(j2)}`)

await s.point(row(j2).locator('td').nth(5))
await s.say(c.waiting, 3600 * pace, 'dont')
await s.point(row(j2).locator('input[type=checkbox]'))
await s.wait(1000)
await s.unring()
await s.say(c.nothingSent, 3000 * pace)

// Input received
await s.click(p.locator('nav.tabs a', { hasText: 'Waiting on the customer' }))
await p.waitForLoadState('networkidle')
await s.wait(900)
await s.click(p.locator('table.queue a', { hasText: j2 }))
await p.waitForLoadState('networkidle')
await s.wait(900)
await s.click(acts(j2).getByRole('button', { name: 'Input received' }))
await s.wait(400)
await s.type(acts(j2).getByLabel('What came back'), 'Cable received by courier', 40)
await s.say(c.back, 1800 * pace, 'do')
await s.click(acts(j2).getByRole('button', { name: 'Input received' }))
await p.waitForLoadState('networkidle')
await s.wait(1800 * pace)
if (stateOf(j2) !== 'Under Assessment') throw new Error(`${j2} is at ${stateOf(j2)}`)

// What the assessment decides
await s.say(c.decide, 1800 * pace)
await s.point(row(j1).locator('input[type=checkbox]'))
await s.say(c.allot, 3200 * pace)
await s.point(p.getByRole('link', { name: 'Quotations', exact: true }).first())
await s.say(c.quote, 3200 * pace)
await s.unring()
await s.say(c.segment, 3200 * pace, 'do')

// Customer withdrew (shown, not pressed)
await s.click(p.locator('nav.tabs a', { hasText: 'Under assessment' }))
await p.waitForLoadState('networkidle')
await s.click(p.locator('table.queue a', { hasText: j3 }))
await p.waitForLoadState('networkidle')
await s.wait(600)
await s.point(acts(j3).getByRole('button', { name: 'Customer withdrew' }))
await s.say(c.withdrew, 3600 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log(await s.close(join(OUT, `03-assessment.${lang}.webm`)))
