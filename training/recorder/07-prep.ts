/**
 * Unrecorded preparation for module 07's Tamil take, through the app (Liaison and Engineer).
 *
 * The grid shows a row for every job with hours this week, so before the Tamil take the English
 * take's rows are cleared: its Thursday cells on T1/T3, and its paused T2 (put back on the bench by the
 * Liaison, then its Wednesday emptied). The English take needs no preparation beyond 06-setup.ts en.
 *
 *   npx tsx 07-prep.ts ta   → after the English take, before the Tamil one (after 06-setup.ts ta)
 *   npx tsx 07-prep.ts again <en|ta> <yyyy-mm-dd>
 *        → before a re-take of the same language: clears that take's Thursday cells and fills T1's
 *          hours on another earlier week (a Monday) to submit, since the last one is now locked.
 */
import { Stage } from './stage'
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const lang = process.argv[2] ?? 'ta'
const en = JSON.parse(readFileSync(join(OUT, '06-setup.en.json'), 'utf8')).jobs as Record<string, string>
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

if (lang === 'again') {
  const tag = process.argv[3] ?? 'en'
  const week = process.argv[4]
  if (!week) throw new Error('Give the earlier week to fill, e.g. 2026-08-24')
  const file = join(OUT, `06-setup.${tag}.json`)
  const setup = JSON.parse(readFileSync(file, 'utf8'))
  const { T1, T3 } = setup.jobs as Record<string, string>
  await cells(WEEK, [[T1, 'Thu', ''], [T3, 'Thu', '']])
  const hrs = ['7', '8', '6.5', '7', '7.5', '4']
  await cells(week, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => [T1, d, hrs[i]] as [string, string, string]))
  setup.submitWeek = week
  writeFileSync(file, JSON.stringify(setup, null, 2))
} else if (lang === 'ta') {
  await cells(WEEK, [[en.T1, 'Thu', ''], [en.T3, 'Thu', '']])
  await resume([en.T2])
  await cells(WEEK, [[en.T2, 'Wed', '']])
}
console.log('prepared', lang)
