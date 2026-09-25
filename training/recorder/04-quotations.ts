/**
 * Module 04 · Quotations — Liaison (Service Head and Operations Manager hold the same grant).
 *
 * Grounded in UC-007 0.0.3, app/(app)/service-centre/quotations/{page,actions}.tsx,
 * [...quotation]/{page,quote-forms}.tsx and migrations 20260901001700 (uq_quotation_line_job_live:
 * one live quotation per job), 20260904001000 (a line names a job Under Assessment or, as a
 * revision, Awaiting Quotation Approval; SENT moves Under Assessment jobs to Awaiting Quotation
 * Approval; REJECTED closes them as Customer Rejected; APPROVED moves nothing, allotment reads it).
 *
 * Set-up (unrecorded): frontoffice@ registers a fresh 3-unit delivery; liaison@ picks all 3 up.
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
const pace = lang === 'ta' ? 1.25 : 1

// ---- Set-up, unrecorded -------------------------------------------------------------------
const CUSTOMER = process.env.QT_CUSTOMER ?? 'Nilgiri Cold Storage'
const st = stamp()
const jobs = await registerDelivery({
  customer: CUSTOMER,
  brand: 'Danfoss',
  deviceType: 'Compressor drive',
  model: 'CDS-303',
  complaint: 'Display dead, no start command',
  units: 3,
  serial: `QT${st}`,
})
await pickUp(jobs)
console.log('jobs', jobs)
const cid = customerId(CUSTOMER)

// ---- Recording ----------------------------------------------------------------------------
const s = await Stage.open('liaison@thulirtech.com', `/service-centre/quotations?customer=${cid}`, join(OUT, 'raw'))
const p = s.page
const bay = (code: string) => p.locator(`[data-code="${code}"]`).first()

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

await s.point(p.locator('.who-for'))
await s.say(c.screen, 2200 * pace)
await s.point(bay('NEW').locator('ul.pick'))
await s.say(c.waiting, 3400 * pace, 'do')

// Tick the three units
await s.say(c.tick, 700 * pace)
for (const j of jobs) await s.click(bay('NEW').locator(`input[value="${j}"]`))
await s.wait(1600 * pace)
await s.point(bay('NEW').locator('.pick-note'))
await s.say(c.releases, 3200 * pace)
await s.unring()

// The line
await s.say(c.fill, 600 * pace)
await s.type(p.locator(`#description-${cid}`), 'Compressor drive repair', 40)
await s.type(p.locator(`#estimatedLabourHours-${cid}`), '4', 60)
await s.type(p.locator(`#estimatedPartsNote-${cid}`), 'Display module, DC bus capacitors', 35)
await s.type(p.locator(`#unitPrice-${cid}`), '6500', 90)
await s.point(bay('NEW').locator('.hint'))
await s.say(c.total, 2800 * pace)
await s.unring()

await s.click(bay('NEW').getByRole('button', { name: /Raise the quotation/ }))
await p.waitForURL(/\/service-centre\/quotations\/QT\//, { timeout: 30000 })
await p.waitForLoadState('networkidle')
await s.wait(1000)
const qtUrl = p.url()

await s.point(p.locator('table.qlines').first())
await s.say(c.raised, 3200 * pace)
await s.point(p.locator('dl.kv.reg'))
await s.say(c.formal, 3400 * pace)
await s.unring()

// Record as sent
await s.point(bay('ANS').getByRole('button', { name: 'Record as sent' }))
await s.say(c.sent, 2800 * pace, 'do')
await s.click(bay('ANS').getByRole('button', { name: 'Record as sent' }))
await p.waitForLoadState('networkidle')
await s.wait(1500)
for (const j of jobs) if (stateOf(j) !== 'Awaiting Quotation Approval') throw new Error(`${j} is at ${stateOf(j)}`)
await s.say(c.moved, 3400 * pace)

// Revise: version 2
await s.point(bay('REV'))
await s.say(c.revise, 3000 * pace, 'dont')
await s.unring()
for (const j of jobs) await s.click(bay('REV').locator(`input[value="${j}"]`))
await s.type(bay('REV').locator(`#description-${cid}`), 'Compressor drive repair', 30)
await s.type(bay('REV').locator(`#estimatedLabourHours-${cid}`), '4', 60)
await s.type(bay('REV').locator(`#unitPrice-${cid}`), '5800', 90)
await s.click(bay('REV').getByRole('button', { name: /Raise version 2/ }))
await p.waitForLoadState('networkidle')
await s.wait(1800)
if (p.url() !== qtUrl) await s.goto(new URL(qtUrl).pathname)

await s.point(p.locator('table.versions'))
await s.say(c.v2, 3200 * pace, 'do')
await s.unring()
await s.click(bay('ANS').getByRole('button', { name: 'Record as sent' }))
await p.waitForLoadState('networkidle')
await s.wait(1400)

// The answer
await s.point(bay('ANS').getByRole('button', { name: 'Record rejection' }))
await s.say(c.reject, 3600 * pace, 'dont')
await s.unring()
await s.type(bay('ANS').locator('#decidedByName'), 'S. Latha, Plant Engineer', 40)
await s.say(c.who, 2600 * pace, 'do')
await s.click(bay('ANS').getByRole('button', { name: 'Record approval' }))
await p.waitForLoadState('networkidle')
await s.wait(1600)
await s.point(p.locator('table.versions'))
await s.say(c.approved, 3400 * pace, 'do')
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log(await s.close(join(OUT, `04-quotations.${lang}.webm`)))
