/**
 * Unrecorded set-up for modules 06, 07 and 08 — through the app, as the proper roles.
 *
 *  1. Front Office registers one delivery of 8 identical units (fresh serials).
 *  2. Liaison picks each up (Under Assessment) and allots all 8 to Test Engineer.
 *  3. Engineer starts work on each (In Progress), then:
 *       06: C paused for a spare; A and B stay In Progress
 *       07: T2 gets 2 h this week, then is paused; T1 gets a full earlier week (7 Sep for en, 31 Aug for ta) to submit
 *       08: D and E marked Ready for verification
 *  4. Liaison adds two catalogue parts of our own and gives the first a count.
 *
 * Writes out/06-setup.<tag>.json (tag = en or ta; each take needs its own records) with the job numbers and part names the three recordings use.
 *
 *   npx tsx 06-setup.ts [en|ta]
 */
import { Stage } from './stage'
import { join } from 'node:path'
import { writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const stamp = process.env.STAMP ?? Date.now().toString().slice(-5)
const MODEL = 'ACS355'
const N = 8
const serial = (u: number) => `ACS${stamp}${u}`
const tag = process.argv[2] ?? 'en'
/** Each take submits its own earlier week in module 07, so the two takes' hours never share a day. */
const SUBMIT_WEEK = tag === 'ta' ? '2026-08-31' : '2026-09-07'

const sql = (q: string) =>
  execFileSync('docker', ['exec', 'supabase_db_Repair_Service', 'psql', '-U', 'postgres', '-At', '-c', q]).toString().trim()

const jobUrl = (j: string) => `/service-centre/jobs/${j}`

// 1 · Front Office registers the delivery (skipped when resuming with STAMP=…)
if (!process.env.STAMP) {
  const s = await Stage.open('frontoffice@thulirtech.com', '/front-office/inward', RAW, { record: false })
  const p = s.page
  await p.getByLabel('Customer', { exact: true }).pressSequentially('Kovai', { delay: 40 })
  await p.getByRole('option', { name: /Kovai Textile Mills/ }).click()
  await p.waitForTimeout(800)
  await p.getByLabel('Brought by', { exact: true }).click()
  await p.getByLabel('Brought by', { exact: true }).pressSequentially(' ', { delay: 40 })
  await p.waitForTimeout(1200)
  await p.getByRole('listbox').getByRole('option').first().click()
  const pickSales = p.getByLabel('Sales engineer', { exact: true })
  if (await pickSales.isVisible().catch(() => false)) {
    await pickSales.click()
    await p.waitForTimeout(800)
    await p.getByRole('listbox').getByRole('option').first().click()
  }
  await p.locator('#deliveryNoteReference').fill(`DC-${stamp}`)
  await p.locator('#brand-0').fill('ABB')
  await p.locator('#deviceType-0').fill('Drive control board')
  await p.locator('#model-0').fill(MODEL)
  await p.locator('#complaint-0').fill('Trips on overcurrent at start')
  for (let u = 2; u <= N; u++) await p.getByRole('button', { name: 'Add a unit' }).click()
  const n = Number(stamp) % 800 + 100
  for (let u = 1; u <= N; u++) {
    await p.getByLabel(`Serial number, unit ${u} of ${MODEL}`).fill(serial(u))
    await p.getByLabel(`Shelf, unit ${u} of ${MODEL}`).fill(`T${n}${'ABCDEFGH'[u - 1]}`)
  }
  await p.waitForTimeout(1500)
  await p.getByRole('button', { name: new RegExp(`Register ${N} units`) }).click()
  await p.waitForLoadState('networkidle')
  await p.waitForTimeout(2000)
  await s.close()
}

const rows = sql(`select serial_number, job_number from work_order where serial_number like 'ACS${stamp}%' order by serial_number`)
  .split('\n').map((l) => l.split('|'))
if (rows.length !== N) throw new Error(`Expected ${N} jobs, found ${rows.length}: ${JSON.stringify(rows)}`)
const job = (u: number) => rows[u - 1][1]
const J = { A: job(1), B: job(2), C: job(3), T1: job(4), T2: job(5), T3: job(6), D: job(7), E: job(8) }
console.log(J)

// 2 · Liaison picks up and allots to Test Engineer
{
  const s = await Stage.open('liaison@thulirtech.com', `/service-centre/reservoir?q=ACS${stamp}`, RAW, { record: false })
  const p = s.page
  for (let i = 0; i < N; i++) {
    const b = p.getByRole('button', { name: 'Pick up', exact: true }).first()
    if (!(await b.isVisible().catch(() => false))) break
    await b.click()
    await p.waitForTimeout(1500)
    await p.waitForLoadState('networkidle')
  }
  await p.waitForTimeout(2000)
  await s.goto(`/service-centre/reservoir?q=ACS${stamp}`)
  if (await p.getByLabel(`Choose ${job(N)}`).isDisabled()) {
    await p.waitForTimeout(3000)
    await s.goto(`/service-centre/reservoir?q=ACS${stamp}`)
  }
  for (let u = 1; u <= N; u++) await p.getByLabel(`Choose ${job(u)}`).check()
  await p.getByRole('radio', { name: /Test Engineer/ }).check()
  await p.getByRole('button', { name: /Allot/ }).click()
  await p.waitForTimeout(2500)
  await s.close()
}

// 3 · Engineer starts work, then sets each module's state
{
  const s = await Stage.open('engineer@thulirtech.com', jobUrl(J.A), RAW, { record: false })
  const p = s.page
  for (const j of Object.values(J)) {
    await s.goto(jobUrl(j))
    await p.getByRole('button', { name: 'Start work' }).first().click()
    await p.waitForTimeout(1800)
  }
  // 07: 2 h on T2 this Wednesday, before it is paused
  await s.goto(`/service-centre/timesheet?job=${encodeURIComponent(J.T2)}`)
  await p.getByLabel(`${J.T2} Wed`).fill('2')
  await p.getByLabel(`${J.T2} Wed`).press('Enter')
  await p.waitForTimeout(2000)
  // 07: a full earlier week on T1, ready to submit in the clip
  await s.goto(`/service-centre/timesheet?week=${SUBMIT_WEEK}&job=${encodeURIComponent(J.T1)}`)
  const hrs = ['7', '8', '6.5', '7', '7.5', '4']
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  for (let i = 0; i < days.length; i++) {
    await p.getByLabel(`${J.T1} ${days[i]}`).fill(hrs[i])
    await p.getByLabel(`${J.T1} ${days[i]}`).press('Enter')
    await p.waitForTimeout(1200)
  }
  // Pauses: C (06) and T2 (07)
  for (const [j, what] of [[J.C, 'Gate driver IC IR2110'], [J.T2, 'Current sensor LEM LA55']] as const) {
    await s.goto(jobUrl(j))
    await p.getByRole('button', { name: 'Pending spare' }).click()
    await p.getByPlaceholder('The component it is waiting for…').fill(what)
    await p.getByRole('button', { name: 'Pause for spare' }).click()
    await p.waitForTimeout(1800)
  }
  // 08: D and E ready for verification
  for (const j of [J.D, J.E]) {
    await s.goto(jobUrl(j))
    await p.getByRole('button', { name: 'Ready for verification' }).first().click()
    await p.waitForTimeout(1800)
  }
  await s.close()
}

// 4 · Liaison adds two parts of our own; the first gets a count
const P1 = `MOSFET IRFP460 · lot ${stamp}`
const P2 = `Gate driver IC IR2110 · lot ${stamp}`
{
  const s = await Stage.open('liaison@thulirtech.com', '/service-centre/spares?tab=stock', RAW, { record: false })
  const p = s.page
  for (const [name, buy, sell] of [[P1, '180', '260'], [P2, '95', '150']] as const) {
    await s.goto('/service-centre/spares?tab=stock')
    await p.locator('#partName').fill(name)
    await p.locator('#purchasePrice').fill(buy)
    await p.locator('#sellingPrice').fill(sell)
    await p.getByRole('button', { name: 'Add to the catalogue' }).click()
    await p.waitForLoadState('networkidle')
    await p.waitForTimeout(1500)
  }
  await s.goto('/service-centre/spares?tab=stock')
  await p.getByRole('combobox', { name: 'Part' }).pressSequentially(`IRFP460 · lot ${stamp}`, { delay: 30 })
  await p.getByRole('option', { name: new RegExp(`lot ${stamp}`) }).first().click()
  await p.locator('#quantityAfter').fill('20')
  await p.locator('#reason').selectOption('STOCK_COUNT')
  await p.locator('#notes').fill('Opening count')
  await p.getByRole('button', { name: 'Correct the count' }).click()
  await p.waitForTimeout(2000)
  await s.close()
}

const state = sql(`select w.job_number || ' ' || ss.sub_status_name || ' ' || coalesce(u.email,'') from work_order w join work_order_sub_status ss using (sub_status_id) left join "system_user" u on u.user_id = w.assigned_user_id where serial_number like 'ACS${stamp}%' order by 1`)
console.log(state)
console.log(sql(`select part_name || ' = ' || current_quantity from part where part_name like '%lot ${stamp}'`))
writeFileSync(join(OUT, `06-setup.${tag}.json`), JSON.stringify({ stamp, jobs: J, parts: { P1, P2 }, serialPrefix: `ACS${stamp}`, submitWeek: SUBMIT_WEEK }, null, 2))
