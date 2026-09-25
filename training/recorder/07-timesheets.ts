/**
 * Module 07 · Timesheets — Engineer.
 *
 * Grounded in UC-011 and the code:
 *  - app/(app)/service-centre/timesheet/: a weekly grid (Mon–Sat columns; the week in the database is
 *    week_start_date + 6, Monday to Sunday), a cell saves on leaving it via set_timesheet_cell().
 *  - "+ Add a work order" offers only the engineer's own non-paused boards (api/jobs/search).
 *  - timesheet_entry_is_permitted(): only your own allotted job (or one you hold for verification);
 *    refused on Pending Spare, On Hold and closed jobs. The grid shows a paused row read-only.
 *  - timesheet_day_within_ceiling(): system_configuration.max_daily_hours (10), refusal text
 *    "That would be 11 hours on …, and a day may not exceed 10. 6 are already logged."
 *  - timesheet_entry_price_at_rate_in_force(): the cost rate is set by the system, never typed.
 *  - timesheet_week_is_locked(): a submitted week cannot be changed.
 *
 * Prepared by 06-setup.ts and 07-prep.ts. The week submitted in the clip is an earlier one of our
 * own, so the shared engineer's current week stays open for the other recordings.
 *
 *   npx tsx 07-timesheets.ts [en|ta]    → out/07-timesheets.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-07'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const { T1, T2, T3 } = JSON.parse(readFileSync(join(OUT, `06-setup.${lang}.json`), 'utf8')).jobs as Record<string, string>
const submitWeek = lang === 'en' ? '2026-08-24' : '2026-08-31'

const s = await Stage.open('engineer@thulirtech.com', '/service-centre/timesheet', join(OUT, 'raw'))
const p = s.page

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

await s.point(p.locator('table.week-grid thead'))
await s.say(c.open, 3000 * pace)
await s.unring()

async function addJob(job: string) {
  // After a board is added the lookup keeps showing it, with a Change button to pick another.
  const change = p.getByRole('button', { name: 'Change Add a work order' })
  if (await change.isVisible().catch(() => false)) await s.click(change)
  const add = p.getByRole('combobox', { name: 'Add a work order' })
  await s.type(add, job.slice(-5), 70)
  await s.wait(900)
  await s.click(p.getByRole('option', { name: new RegExp(job.replace(/\//g, '\\/')) }).first())
  await p.waitForURL((u) => u.search.includes(job.slice(-5)))
  await p.waitForLoadState('networkidle')
  await s.wait(900)
}

await s.point(p.getByRole('combobox', { name: 'Add a work order' }))
await s.say(c.add, 2400 * pace, 'do')
await s.unring()
await addJob(T1)

const t1 = p.getByLabel(`${T1} Thu`)
await s.type(t1, '6', 120)
await t1.press('Enter')
await s.wait(900)
await s.goto(new URL(p.url()).pathname + new URL(p.url()).search)
await s.say(c.type, 2600 * pace, 'do')
await s.point(p.locator('tr.sum'))
await s.say(c.total, 2200 * pace)
await s.unring()

await addJob(T3)
const t3 = p.getByLabel(`${T3} Thu`)
await s.type(t3, '5', 120)
await t3.press('Enter')
await s.wait(1200)
await s.point(p.locator('.refused').first())
await s.say(c.over, 4200 * pace, 'dont')
await s.unring()
await s.click(t3)
await t3.fill('')
await t3.pressSequentially('4', { delay: 120 })
await t3.press('Enter')
await s.wait(900)
await s.goto(new URL(p.url()).pathname + new URL(p.url()).search)
await s.point(p.locator('tr.sum'))
await s.say(c.fix, 2000 * pace)
await s.unring()

await s.point(p.locator('tr.paused', { hasText: T2 }))
await s.say(c.paused, 4000 * pace, 'dont')
await s.unring()

await s.point(p.locator('table.week-grid tbody'), false)
await s.say(c.rate, 3000 * pace)
await s.quiet()

// An earlier week of our own, finished and ready to send.
await s.goto(`/service-centre/timesheet?week=${submitWeek}`)
await s.wait(600)
const submit = p.getByRole('button', { name: 'Submit week' }).first()
await s.point(submit)
await s.say(c.submit, 2400 * pace, 'do')
await s.click(submit)
await p.waitForLoadState('networkidle')
await s.wait(1200)
await s.goto(`/service-centre/timesheet?week=${submitWeek}`)
await s.point(p.getByText('Submitted', { exact: true }).first())
await s.say(c.locked, 3800 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6000 * pace)

console.log(await s.close(join(OUT, `07-timesheets.${lang}.webm`)))
