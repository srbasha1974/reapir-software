/**
 * Module 05 · Allotting and repairing — Service Head (or Liaison) allots; Engineer starts and pauses;
 * Liaison puts a paused board back on the bench.
 *
 * Grounded in UC-010 0.0.2, UC-011, app/(app)/service-centre/reservoir/allot-form.tsx,
 * jobs/panel.tsx, jobs/[...job]/{page,acts}.tsx, spares/spare-forms.tsx (ResumeForm) and migrations
 * 20260904000700 (allot_work_order refuses Inward / Awaiting Customer Input), 20260923000200
 * (start_repair: Alloted → In Progress), 20260902001700 (no time on Pending Spare / On Hold),
 * procurement (pause_for_spare, resume_after_spare: reason required).
 *
 * Three recordings (one per role), concatenated at encoding time:
 *   out/05-repair.<lang>.1.webm (servicehead@), .2.webm (engineer@), .3.webm (liaison@)
 *
 * Set-up (unrecorded): frontoffice@ registers a fresh business-critical 2-unit delivery with a
 * Needed-by date; liaison@ picks both up and puts unit 2 at Awaiting Customer Input.
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
const pace = lang === 'ta' ? 1.25 : 1

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

// ---- Part 1: Service Head allots -------------------------------------------------------------
{
  const s = await Stage.open('servicehead@thulirtech.com', `/service-centre/reservoir?q=${serial}`, RAW)
  const p = s.page
  const row = (j: string) => p.locator('table.allot tbody tr', { hasText: j })
  await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)
  await s.point(p.locator('[data-code="RES"]').first().locator('table.allot'))
  await s.say(c.part1, 2400 * pace)
  await s.point(row(j2).locator('input[type=checkbox]'))
  await s.say(c.locked, 3400 * pace, 'dont')
  await s.click(row(j1).locator('input[type=checkbox]'))
  await s.say(c.tick, 2800 * pace, 'do')
  const eng = p.locator('label.radio', { hasText: 'Test Engineer' })
  await s.point(p.locator('.give'))
  await s.say(c.giveTo, 2600 * pace)
  await s.click(eng)
  await s.wait(600)
  await s.click(p.getByRole('button', { name: /^Allot/ }))
  await p.locator('.warn.good, .warn[role=alert]').first().waitFor({ timeout: 20000 })
  await s.wait(1200)
  if (stateOf(j1) !== 'Alloted') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.point(p.locator('.warn.good').first())
  await s.say(c.allot, 2800 * pace, 'do')
  await s.unring()
  await s.quiet()
  await s.close(join(OUT, `05-repair.${lang}.1.webm`))
}

// ---- Part 2: Engineer starts and pauses -------------------------------------------------------
{
  const s = await Stage.open('engineer@thulirtech.com', '/service-centre/jobs', RAW)
  const p = s.page
  await s.say(c.part2, 2200 * pace)
  await s.click(p.locator('.bench a.item', { hasText: j1 }))
  await p.waitForLoadState('networkidle')
  await s.wait(900)
  await s.point(p.getByText('Needed by', { exact: true }).locator('xpath=..'))
  await s.say(c.card, 3400 * pace)
  await s.unring()
  const start = p.getByRole('button', { name: 'Start work' })
  await s.point(start)
  await s.say(c.start, 2600 * pace, 'do')
  await s.click(start)
  await p.waitForLoadState('networkidle')
  await s.wait(1500)
  if (stateOf(j1) !== 'In Progress') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.point(p.locator('.stepper'))
  await s.say(c.started, 2400 * pace)
  await s.unring()

  const spare = p.getByRole('button', { name: 'Pending spare…' })
  await s.point(spare)
  await s.say(c.spare, 2800 * pace, 'do')
  await s.click(spare)
  await s.type(p.getByLabel('The component it is waiting for'), 'IGBT module, 1200 V 100 A', 40)
  await s.click(p.getByRole('button', { name: 'Pause for spare' }))
  await p.waitForLoadState('networkidle')
  await s.wait(1500)
  if (stateOf(j1) !== 'Pending Spare') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.say(c.paused, 2600 * pace)

  await s.click(p.getByRole('button', { name: 'Half an hour more' }))
  await s.wait(2500)
  const refused = p.locator('.warn[role=alert]').first()
  if (await refused.isVisible().catch(() => false)) await s.point(refused)
  await s.say(c.noTime, 3200 * pace, 'dont')
  await s.unring()
  await s.say(c.hold, 2800 * pace)
  await s.quiet()
  await s.close(join(OUT, `05-repair.${lang}.2.webm`))
}

// ---- Part 3: Liaison puts it back on the bench ------------------------------------------------
{
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares', RAW)
  const p = s.page
  await s.say(c.part3, 2000 * pace)
  await s.point(p.locator('[data-code="BACK"]').first())
  await s.say(c.receipt, 3200 * pace)
  const back = p.locator('[data-code="BACK"]').first()
  await s.say(c.back, 600 * pace, 'do')
  await s.type(back.getByRole('combobox'), j1, 50)
  await s.wait(700)
  await s.click(p.getByRole('option', { name: new RegExp(j1) }).first())
  await s.type(back.locator('#resumeReason'), 'Found one in the spares cabinet', 40)
  await s.wait(1000 * pace)
  await s.click(back.getByRole('button', { name: 'Back on the bench' }))
  await p.waitForURL(/back=/, { timeout: 30000 })
  await p.waitForLoadState('networkidle')
  await s.wait(1500)
  if (stateOf(j1) !== 'In Progress') throw new Error(`${j1} is at ${stateOf(j1)}`)
  await s.unring()
  await s.say(c.resumed, 2600 * pace, 'do')
  await s.say(c.rework, 3800 * pace, 'dont')
  await s.quiet()
  await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)
  await s.close(join(OUT, `05-repair.${lang}.3.webm`))
}
console.log('done')
