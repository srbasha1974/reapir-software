/**
 * Unrecorded preparation for module 07, through the app (Liaison and Engineer).
 *
 * The grid shows a row for every job with hours this week, so each take is prepared to show exactly
 * one paused row (its own T2) and an empty Thursday for T1/T3; and a finished earlier week to submit.
 *
 *   npx tsx 07-prep.ts en   → before the English take
 *   npx tsx 07-prep.ts ta   → after the English take, before the Tamil one
 */
import { Stage } from './stage'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const lang = process.argv[2] ?? 'en'
const jobs = (l: string) => JSON.parse(readFileSync(join(OUT, `06-setup.${l}.json`), 'utf8')).jobs as Record<string, string>
const en = jobs('en')
const ta = jobs('ta')
const FIRST_T2 = 'WO/26-27/00039' // the first set-up run's paused board, which also has hours this week
const sheet = (week: string, list: string[]) =>
  `/service-centre/timesheet?week=${week}` + list.map((j) => `&job=${encodeURIComponent(j)}`).join('')
const WEEK = '2026-09-21'

async function resume(list: string[]) {
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares', RAW, { record: false })
  const p = s.page
  for (const j of list) {
    await s.goto('/service-centre/spares')
    const board = p.getByRole('combobox', { name: 'Board' }).nth(1)
    await board.click()
    await board.pressSequentially(j, { delay: 20 })
    await p.waitForTimeout(800)
    const opt = p.getByRole('option', { name: new RegExp(j.replace(/\//g, '\\/')) }).first()
    if (!(await opt.isVisible().catch(() => false))) { console.log('not waiting:', j); continue }
    await opt.click()
    await p.locator('#resumeReason').fill('Sourced another way')
    await p.getByRole('button', { name: 'Back on the bench' }).click()
    await p.waitForTimeout(2000)
  }
  await s.close()
}

async function cells(week: string, set: Array<[string, string, string]>) {
  const s = await Stage.open('engineer@thulirtech.com', sheet(week, [...new Set(set.map((x) => x[0]))]), RAW, { record: false })
  const p = s.page
  for (const [job, day, v] of set) {
    const cell = p.getByLabel(`${job} ${day}`)
    await cell.fill(v)
    await cell.press('Enter')
    await p.waitForTimeout(1300)
    const bad = await p.locator('.refused').allTextContents()
    if (bad.length) console.log(job, day, bad)
  }
  await s.close()
}

async function pause(job: string, what: string) {
  const s = await Stage.open('engineer@thulirtech.com', `/service-centre/jobs/${job}`, RAW, { record: false })
  const p = s.page
  await p.getByRole('button', { name: 'Pending spare' }).click()
  await p.getByPlaceholder('The component it is waiting for…').fill(what)
  await p.getByRole('button', { name: 'Pause for spare' }).click()
  await p.waitForTimeout(2000)
  await s.close()
}

if (lang === 'en') {
  // Only en's T2 stays paused with hours this week.
  await resume([FIRST_T2, ta.T2])
  await cells(WEEK, [[FIRST_T2, 'Wed', ''], [ta.T2, 'Wed', '']])
  // The earlier week to submit holds only en's first-run T1 row.
  await cells('2026-09-07', [[ta.T1, 'Sat', '']])
} else {
  // Clear the English take's Thursday and paused row; set up the Tamil ones.
  await cells(WEEK, [[en.T1, 'Thu', ''], [en.T3, 'Thu', '']])
  await resume([en.T2])
  await cells(WEEK, [[en.T2, 'Wed', ''], [ta.T2, 'Wed', '2']])
  await pause(ta.T2, 'Current sensor LEM LA55')
  const hrs = ['7', '8', '6.5', '7', '7.5', '4']
  await cells('2026-08-31', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => [ta.T1, d, hrs[i]] as [string, string, string]))
}
console.log('prepared', lang)
