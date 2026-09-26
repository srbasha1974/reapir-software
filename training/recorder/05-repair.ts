/**
 * Module 05 · Allotting and repairing — Service Head (or Liaison) allots; Engineer starts and pauses;
 * Liaison puts a paused board back on the bench.
 *
 * Grounded in UC-010 0.0.2, UC-011, US-068, app/(app)/service-centre/reservoir/allot-form.tsx ("SLA by"),
 * jobs/panel.tsx, jobs/[...job]/{page,acts,decision-forms}.tsx, spares/spare-forms.tsx (ResumeForm) and
 * migrations 20260904000700 (allot_work_order refuses Inward / Awaiting Customer Input), 0159
 * (20260926000500: requested_by_date at the counter, SLA set at allotment by work_order.allot), 0160
 * (hold_work_order / release_hold: Service Head + Liaison, from In Progress, reason required), 0157
 * (no time where blocks_labour: Pending Spare, On Hold), 0162 (pause for spare: the board's engineer,
 * Service Head, Liaison), procurement (resume_after_spare: reason required).
 *
 * Three recordings (one per role), concatenated at encoding time:
 *   out/05-repair.<lang>.1.webm (servicehead@: allot + SLA), .2.webm (engineer@: start, pause),
 *   .3.webm (liaison@: back on the bench, put on hold, release hold)
 *
 * Set-up (unrecorded): frontoffice@ registers a fresh business-critical 2-unit delivery with the
 * customer's Needed-by date; liaison@ picks both up and puts unit 2 at Awaiting Customer Input.
 *
 *   npx tsx 05-repair.ts [en|ta]
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-05'
import { pickUp, registerDelivery, stamp, stateOf, waitForCustomer } from './03-setup'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.2 : 1

// ---- Set-up, unrecorded -------------------------------------------------------------------
const st = stamp()
const serial = `RP${st}`
const [j1, j2] = await registerDelivery({
  customer: 'Rajapalayam Spinners',
  brand: 'ABB',
  deviceType: 'Servo drive',
  model: 'MS132',
  complaint: 'Overcurrent fault under load',
  units: 2,
  serial,
  neededBy: '2026-10-09',
})
await pickUp([j1, j2])
await waitForCustomer(j2, 'Asked which motor it drives')
console.log('jobs', j1, j2)

// ---- Part 1: Service Head allots and sets the SLA -------------------------------------------
const SLA = '2026-10-07'
{
  const s = await Stage.open('servicehead@thulirtech.com', `/service-centre/reservoir?q=${serial}`, RAW)
  const p = s.page
  const row = (j: string) => p.locator('table.allot tbody tr', { hasText: j })
  await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3000 * pace)
  await s.point(row(j2).locator('input[type=checkbox]'))
  await s.say(c.part1, 2600 * pace)
  await s.click(row(j1).locator('input[type=checkbox]'))
  await s.say(c.tick, 1800 * pace, 'do')
  const sla = p.getByLabel(`SLA target date for ${j1}`)
  await s.point(sla.locator('xpath=ancestor::div[contains(@class,"row")][1]'))
  await s.say(c.slaBy, 3400 * pace, 'do')
  await sla.fill(SLA)
  await s.say(c.slaSet, 2400 * pace)
  const eng = p.locator('label.radio', { hasText: 'Test Engineer' })
  await s.point(p.locator('.give .row').first())
  await s.say(c.giveTo, 2000 * pace)
  await s.click(eng)
  await s.wait(500)
  await s.click(p.getByRole('button', { name: /^Allot/ }))
  await p.locator('.warn.good, .warn[role=alert]').first().waitFor({ timeout: 20000 })
  await s.wait(1000)
  if (stateOf(j1) !== 'Alloted') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.point(p.locator('.warn.good').first())
  await s.say(c.allot, 1800 * pace, 'do')
  await s.unring()
  await s.quiet()
  await s.close(join(OUT, `05-repair.${lang}.1.webm`))
}

// ---- Part 2: Engineer starts and pauses -------------------------------------------------------
{
  const s = await Stage.open('engineer@thulirtech.com', '/service-centre/jobs', RAW)
  const p = s.page
  await s.say(c.part2, 1400 * pace)
  await s.click(p.locator('.bench a.item', { hasText: j1 }))
  await p.waitForLoadState('networkidle')
  await s.wait(800)
  await s.point(p.getByText('Needed by', { exact: true }).locator('xpath=..'))
  await s.say(c.card, 2600 * pace)
  await s.unring()
  const start = p.getByRole('button', { name: 'Start work' })
  await s.point(start)
  await s.say(c.start, 2000 * pace, 'do')
  await s.click(start)
  await p.waitForLoadState('networkidle')
  await s.wait(1300)
  if (stateOf(j1) !== 'In Progress') throw new Error(`${j1} is at ${stateOf(j1)}`)

  const spare = p.getByRole('button', { name: 'Pending spare…' })
  await s.point(spare)
  await s.say(c.spare, 2400 * pace, 'do')
  await s.click(spare)
  await s.type(p.getByLabel('The component it is waiting for'), 'IGBT module 1200 V', 30)
  await s.click(p.getByRole('button', { name: 'Pause for spare' }))
  await p.waitForLoadState('networkidle')
  await s.wait(1300)
  if (stateOf(j1) !== 'Pending Spare') throw new Error(`${j1} is at ${stateOf(j1)}`)

  await s.click(p.getByRole('button', { name: 'Half an hour more' }))
  await s.wait(1500)
  const refused = p.locator('.warn[role=alert]').first()
  if (await refused.isVisible().catch(() => false)) await s.point(refused)
  await s.say(c.noTime, 2600 * pace, 'dont')
  await s.unring()
  await s.say(c.noResume, 2800 * pace, 'dont')
  await s.quiet()
  await s.close(join(OUT, `05-repair.${lang}.2.webm`))
}

// ---- Part 3: Liaison puts it back on the bench, holds it, releases it --------------------------
{
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares', RAW)
  const p = s.page
  const back = p.locator('[data-code="BACK"]').first()
  await s.point(back)
  await s.say(c.back, 3000 * pace, 'do')
  await s.type(back.getByRole('combobox'), j1, 45)
  await s.wait(700)
  await s.click(p.getByRole('option', { name: new RegExp(j1) }).first())
  await s.type(back.locator('#resumeReason'), 'Found one in the cabinet', 30)
  await s.click(back.getByRole('button', { name: 'Back on the bench' }))
  await p.waitForURL(/back=/, { timeout: 30000 })
  await p.waitForLoadState('networkidle')
  await s.wait(1200)
  if (stateOf(j1) !== 'In Progress') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.unring()

  // The job card: SLA, then Put on hold / Release hold
  await s.goto(`/service-centre/jobs/${j1.split('/').map(encodeURIComponent).join('/')}`)
  await s.wait(800)
  await s.point(p.getByText(/Business-critical · SLA/).first())
  await s.say(c.slaCard, 2600 * pace)
  const hold = p.getByRole('button', { name: 'Put on hold' })
  await s.point(hold)
  await s.say(c.hold, 2600 * pace, 'do')
  await s.click(hold)
  await s.type(p.getByLabel('What is it waiting for'), 'Customer to confirm shutdown date', 25)
  await s.click(p.locator('.act-form button[type=submit]'))
  await p.waitForLoadState('networkidle')
  await s.wait(1500)
  if (stateOf(j1) !== 'On Hold') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.point(p.locator('.act-bay .warn').first())
  await s.say(c.held, 2800 * pace, 'dont')
  const release = p.getByRole('button', { name: 'Release hold' })
  await s.click(release)
  await s.type(p.getByLabel('What cleared it'), 'Customer confirmed Monday', 25)
  await s.click(p.locator('.act-form button[type=submit]'))
  await p.waitForLoadState('networkidle')
  await s.wait(1500)
  if (stateOf(j1) !== 'In Progress') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.say(c.released, 2400 * pace, 'do')
  await s.unring()
  await s.quiet()
  await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)
  await s.close(join(OUT, `05-repair.${lang}.3.webm`))
}
console.log('done')
