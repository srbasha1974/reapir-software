/**
 * Unrecorded set-up for the KPI modules (15, 16; reused by 13, 14, 17): the catalogue's worked
 * month, boards A–D (+ comeback R), built through the app as the proper roles. SQL only reads.
 *
 *   npx tsx 15-setup.ts            → runs every step not yet done, saving progress to out/15-setup.json
 *   STEP=rework npx tsx 15-setup.ts → the comeback R (challan for A, then a Rework inward), run later
 *
 * What the app allows, against KPI-CATALOGUE.md's worked month:
 *  - A  Ayyan, quotation, normal ₹10,000 typed (Set by hand), ₹12,000, Urgent turnaround.
 *       Parts billed ₹2,400 (2 × IGBT ₹900 + gate driver ₹600; cost 2 × 700 + 400 = ₹1,800) and a
 *       ₹150 fuse as Other spares (no billed price). 5 h repair + 1 h peer verification.
 *  - B  Kovai, ₹6,000 agreed by phone, normal ₹6,000 typed (no rate card can be reached: no screen
 *       sets a board's internal reference). Siemens POWER_SUPPLY 6EP1334-3BA10, which has a 4 h
 *       standard time in the demo. Parts ₹500 / cost ₹350. 4 h. Fails verification once.
 *  - C  Rajapalayam, normal ₹10,000 typed, ₹8,000 agreed by phone → discount. Parts ₹1,000 / ₹700. 8 h.
 *  - D  Sri Devi Diagnostics, never priced, 6 h, closed Non-Repairable.
 *  - X  a second Ayyan servo drive left Under Assessment, for the live raise-form demo (never raised).
 *  - Hours go on the week of 14 Sep (the engineer's day ceiling is 10 h and other agents use other weeks).
 */
import { Stage } from './stage'
import { sql, jobPath, customerId, subStatus } from './09-setup'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Page } from '@playwright/test'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw-setup')
const STATE = join(OUT, '15-setup.json')
const SEED = join(import.meta.dirname, 'kpi-seed.json')

type St = Record<string, any>
const st: St = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {}
const save = () => writeFileSync(STATE, JSON.stringify(st, null, 2))
const stamp: string = (st.stamp ??= Date.now().toString().slice(-5))
save()

async function as<T>(email: string, path: string, fn: (s: Stage, p: Page) => Promise<T>): Promise<T> {
  const s = await Stage.open(email, path, RAW, { record: false })
  try {
    return await fn(s, s.page)
  } finally {
    await s.close()
  }
}
async function settle(p: Page, ms = 900) {
  await p.waitForLoadState('networkidle').catch(() => {})
  await p.waitForTimeout(ms)
}
async function step(name: string, fn: () => Promise<void>) {
  if (st.done?.includes(name)) return
  console.log('▶', name)
  await fn()
  ;(st.done ??= []).push(name)
  save()
}

/** One delivery, credited to `salesPerson`; returns its job numbers in unit order. */
async function deliver(o: {
  customer: string; search: string; salesPerson: string; units: number
  brand: string; device: string; model: string; complaint: string; prefix: string
  reworkOf?: string
}): Promise<string[]> {
  const serials = Array.from({ length: o.units }, (_, i) => `${o.prefix}${stamp}${i + 1}`)
  await as('frontoffice@thulirtech.com', '/front-office/inward', async (s, p) => {
    await p.getByLabel('Customer', { exact: true }).pressSequentially(o.search, { delay: 40 })
    await p.waitForTimeout(900)
    await p.getByRole('listbox').getByRole('option', { name: new RegExp(o.customer) }).first().click()
    await p.waitForTimeout(900)
    await p.getByLabel('Brought by', { exact: true }).click()
    await p.getByLabel('Brought by', { exact: true }).pressSequentially(' ', { delay: 40 })
    await p.waitForTimeout(1200)
    await p.getByRole('listbox').getByRole('option').first().click()
    const change = p.getByRole('button', { name: /Change Sales engineer/ })
    if (await change.isVisible().catch(() => false)) await change.click()
    const pick = p.getByLabel('Sales engineer', { exact: true })
    await pick.click()
    await pick.pressSequentially(o.salesPerson.split(' ').pop()!, { delay: 40 })
    await p.waitForTimeout(800)
    await p.getByRole('listbox').getByRole('option', { name: new RegExp(o.salesPerson) }).first().click()
    await p.locator('#deliveryNoteReference').fill(`DC-${o.prefix}${stamp}`)
    await p.locator('#brand-0').fill(o.brand)
    await p.locator('#deviceType-0').fill(o.device)
    await p.locator('#model-0').fill(o.model)
    await p.locator('#complaint-0').fill(o.complaint)
    for (let u = 2; u <= o.units; u++) await p.getByRole('button', { name: 'Add a unit' }).click()
    for (let u = 1; u <= o.units; u++) {
      await p.getByLabel(`Serial number, unit ${u} of ${o.model}`).fill(serials[u - 1])
      await p.getByLabel(`Shelf, unit ${u} of ${o.model}`).fill(`K${stamp.slice(-3)}${o.prefix}${o.reworkOf ? 'R' : ''}${u}`)
      if (o.reworkOf) {
        await p.getByLabel(`Job type, unit ${u} of ${o.model}`).selectOption('REWORK')
        await p.getByLabel(`Previous job number, unit ${u} of ${o.model}`).fill(o.reworkOf)
      }
    }
    await p.waitForTimeout(1500)
    await p.getByRole('button', { name: /Register \d+ units?/ }).click()
    await settle(p, 2000)
    // A warning (serial seen before, warranty) is confirmed by pressing again, as the counter would.
    const again = p.getByRole('button', { name: /Register|anyway/ }).first()
    if (o.reworkOf && (await p.locator('p.warn[role="alert"]').isVisible().catch(() => false))) {
      console.log('warning:', await p.locator('p.warn[role="alert"]').first().innerText())
      await again.click()
      await settle(p, 2000)
    }
    const warn = p.locator('p.warn', { hasText: 'Not registered.' })
    if (await warn.isVisible().catch(() => false)) throw new Error(`Inward refused: ${await warn.innerText()}`)
  })
  const jobs = sql(`select job_number from work_order where serial_number in (${serials.map((x) => `'${x}'`).join(',')}) ${o.reworkOf ? " and job_type = 'REWORK'" : ''} order by serial_number`)
    .split('\n').filter(Boolean)
  if (jobs.length !== o.units) throw new Error(`Expected ${o.units} jobs for ${o.customer}, found ${jobs.length}`)
  const who = sql(`select u.full_name from work_order w join inward_line l using (inward_line_id) join inward i on i.inward_number = l.inward_number join "system_user" u on u.user_id = i.brought_in_by_user_id where w.job_number = '${jobs[0]}'`)
  console.log(o.customer, jobs, 'credited to', who)
  return jobs
}

async function pickUp(jobs: string[]) {
  await as('liaison@thulirtech.com', '/service-centre/reservoir', async (s, p) => {
    for (const job of jobs) {
      await s.goto(`/service-centre/reservoir?q=${encodeURIComponent(job)}`)
      const row = p.locator('tr', { has: p.getByRole('link', { name: job, exact: true }) })
      await row.getByRole('button', { name: 'Pick up' }).click()
      await settle(p, 1200)
    }
  })
}

/** A price agreed on the phone, with its normal price typed (no rate card reaches a board). */
async function phonePrice(customer: string, job: string, normal: number, price: number, what: string) {
  const id = customerId(customer)
  await as('liaison@thulirtech.com', `/service-centre/quotations?customer=${id}`, async (s, p) => {
    const bay = p.locator('ul.pick[aria-label="Boards this price covers"]')
    await bay.locator('li', { hasText: job }).locator('input').check()
    await p.locator(`#agreedDescription-${id}`).fill(what)
    const n = p.locator(`#normalPrice-ph-${id}`)
    await n.waitFor({ state: 'attached', timeout: 10000 })
    await p.waitForTimeout(600)
    await n.fill(String(normal))
    await p.locator(`#agreedUnitPrice-${id}`).fill(String(price))
    await p.locator(`#agreedByName-${id}`).fill('R. Krishnan, Maintenance Manager')
    await p.getByRole('button', { name: /^Record ₹/ }).click()
    await settle(p, 1800)
  })
}

async function allot(jobs: string[]) {
  await as('servicehead@thulirtech.com', '/service-centre/reservoir', async (s, p) => {
    for (const job of jobs) {
      await s.goto(`/service-centre/reservoir?q=${encodeURIComponent(job)}`)
      await p.getByLabel(`Choose ${job}`, { exact: true }).check()
      await p.locator('label.radio', { hasText: 'Test Engineer' }).click()
      await p.getByRole('button', { name: /^Allot/ }).click()
      await settle(p, 1500)
    }
  })
}

async function giveToVerifier(jobs: string[]) {
  await as('servicehead@thulirtech.com', '/service-centre/verification?view=queue', async (s, p) => {
    for (const job of jobs) await p.getByLabel(`Choose ${job}`, { exact: true }).check()
    const texts = await p.locator('#verifierUserId option').allTextContents()
    const t = texts.find((x) => x.startsWith('Test Both Roles'))
    if (!t) throw new Error('No verifier option for Test Both Roles')
    await p.locator('#verifierUserId').selectOption({ label: t })
    await p.getByRole('button', { name: /^Give \d+ boards? to them/ }).click()
    await settle(p, 1500)
  })
}

async function hours(email: string, rows: Array<[string, string, number]>) {
  await as(email, '/service-centre/timesheet', async (s, p) => {
    for (const [job, day, h] of rows) {
      await s.goto(`/service-centre/timesheet?week=2026-09-14&job=${encodeURIComponent(job)}`)
      const cell = p.getByLabel(`${job} ${day}`)
      await cell.fill(String(h))
      await cell.press('Enter')
      await settle(p, 1500)
    }
  })
}

// ── 1 · Deliveries ──────────────────────────────────────────────────────────────────────────────
await step('deliveries', async () => {
  const [A, X] = await deliver({ customer: 'Ayyan Industrial Systems', search: 'Ayyan', salesPerson: 'Test Sales Engineer', units: 2,
    brand: 'Yaskawa', device: 'Servo drive', model: 'SGDV-120A01A', complaint: 'Line down: drive trips on power-up', prefix: 'SA' })
  const [B] = await deliver({ customer: 'Kovai Textile Mills', search: 'Kovai', salesPerson: 'Test Sales Head', units: 1,
    brand: 'Siemens', device: 'POWER_SUPPLY', model: '6EP1334-3BA10', complaint: 'PLC power supply, no 24 V output', prefix: 'SB' })
  const [C] = await deliver({ customer: 'Rajapalayam Spinners', search: 'Rajapalayam', salesPerson: 'Test Sales Engineer', units: 1,
    brand: 'Danfoss', device: 'VFD control board', model: 'FC-302', complaint: 'Display dead, no comms', prefix: 'SC' })
  const [D] = await deliver({ customer: 'Sri Devi Diagnostics', search: 'Sri Devi', salesPerson: 'Test Sales Engineer', units: 1,
    brand: 'Siemens', device: 'Mammography PMC board', model: 'Mammomat PMC', complaint: 'Generator fault on exposure', prefix: 'SD' })
  st.jobs = { A, B, C, D, X }
})
const J = st.jobs as Record<string, string>

await step('pickup', () => pickUp([J.A, J.X, J.B, J.C, J.D]))

// ── 2 · Prices ──────────────────────────────────────────────────────────────────────────────────
await step('quoteA', async () => {
  const cid = customerId('Ayyan Industrial Systems')
  await as('liaison@thulirtech.com', `/service-centre/quotations?customer=${cid}`, async (s, p) => {
    const bay = p.locator('[data-code="NEW"]').first()
    await bay.locator(`input[value="${J.A}"]`).check()
    await p.locator(`#estimatedLabourHours-${cid}`).fill('5')
    await p.locator(`#estimatedPartsNote-${cid}`).fill('2 IGBTs, gate driver')
    await p.locator(`#line-0-description-${cid}`).fill('Servo drive repair, urgent')
    await p.locator(`#normalPrice-raise-${cid}-0`).fill('10000')
    await p.locator(`#line-0-unitPrice-${cid}`).fill('12000')
    await p.getByRole('group', { name: 'Line 1', exact: true }).getByLabel('Why a premium').selectOption({ label: 'Urgent turnaround' })
    await bay.getByRole('button', { name: /Raise the quotation/ }).click()
    await p.waitForURL(/\/service-centre\/quotations\/QT\//, { timeout: 30000 })
    await settle(p, 1200)
    st.quotationA = decodeURIComponent(new URL(p.url()).pathname.replace('/service-centre/quotations/', ''))
    const ans = p.locator('[data-code="ANS"]').first()
    await ans.getByRole('button', { name: 'Record as sent' }).click()
    await settle(p, 1800)
    await s.goto(`/service-centre/quotations/${st.quotationA}`)
    await ans.locator('#decidedByName').fill('R. Krishnan, Maintenance Manager')
    await ans.getByRole('button', { name: 'Record approval' }).click()
    await settle(p, 2000)
  })
  console.log('A quotation', st.quotationA, sql(`select quotation_status from quotation q join quotation_line l using (quotation_id) join quotation_line_job j using (quotation_line_id) where j.job_number='${J.A}' and j.is_live`))
})
await step('phoneB', () => phonePrice('Kovai Textile Mills', J.B, 6000, 6000, 'PLC power supply repair'))
await step('phoneC', () => phonePrice('Rajapalayam Spinners', J.C, 10000, 8000, 'VFD control board repair'))

// ── 3 · Parts in the catalogue, with stock ─────────────────────────────────────────────────────
const PARTS = {
  igbt: [`IGBT module FF100R12 · lot ${stamp}`, '700', '900'],
  gate: [`Gate driver board · lot ${stamp}`, '400', '600'],
  psu: [`PSU capacitor kit · lot ${stamp}`, '350', '500'],
  vfd: [`VFD relay and display kit · lot ${stamp}`, '700', '1000'],
} as const
await step('parts', async () => {
  await as('liaison@thulirtech.com', '/service-centre/spares?tab=stock', async (s, p) => {
    for (const [name, buy, sell] of Object.values(PARTS)) {
      await s.goto('/service-centre/spares?tab=stock')
      await p.locator('#partName').fill(name)
      await p.locator('#purchasePrice').fill(buy)
      await p.locator('#sellingPrice').fill(sell)
      await p.getByRole('button', { name: 'Add to the catalogue' }).click()
      await settle(p, 1500)
    }
    for (const [name] of Object.values(PARTS)) {
      await s.goto('/service-centre/spares?tab=stock')
      await p.getByRole('combobox', { name: 'Part' }).pressSequentially(name.split(' · ')[0].slice(0, 12), { delay: 30 })
      await p.waitForTimeout(900)
      await p.getByRole('option', { name: new RegExp(name.split(' · ')[0].slice(0, 12) + '.*lot ' + stamp) }).first().click()
      await p.locator('#quantityAfter').fill('10')
      await p.locator('#reason').selectOption('STOCK_COUNT')
      await p.locator('#notes').fill('Opening count')
      await p.getByRole('button', { name: 'Correct the count' }).click()
      await settle(p, 1500)
    }
  })
  console.log(sql(`select part_name || ' = ' || current_quantity from part where part_name like '%lot ${stamp}'`))
})

// ── 4 · Allot, start, book parts, log hours ───────────────────────────────────────────────────
await step('allot', () => allot([J.A, J.B, J.C, J.D]))
await step('start', async () => {
  await as('engineer@thulirtech.com', jobPath(J.A), async (s, p) => {
    for (const job of [J.A, J.B, J.C, J.D]) {
      await s.goto(jobPath(job))
      await p.getByRole('button', { name: 'Start work' }).first().click()
      await settle(p, 1500)
    }
  })
})
await step('book', async () => {
  const book = async (s: Stage, p: Page, job: string, part: readonly string[], qty: number) => {
    await s.goto(jobPath(job))
    await p.getByRole('button', { name: /From catalogue/ }).click()
    const key = part[0].split(' · ')[0].slice(0, 12)
    await p.getByRole('combobox', { name: 'Part' }).pressSequentially(key, { delay: 40 })
    await p.waitForTimeout(900)
    await p.getByRole('option', { name: new RegExp(key + '.*lot ' + stamp) }).first().click()
    await p.getByLabel('Quantity').fill(String(qty))
    await p.getByRole('button', { name: 'Book it' }).click()
    await settle(p, 1800)
  }
  await as('engineer@thulirtech.com', jobPath(J.A), async (s, p) => {
    await book(s, p, J.A, PARTS.igbt, 2)
    await book(s, p, J.A, PARTS.gate, 1)
    await s.goto(jobPath(J.A))
    await p.getByRole('button', { name: /Other spares/ }).click()
    await p.getByLabel('What they were').fill('Fuse, 10 A fast-blow (given free)')
    await p.getByLabel('Cost (₹)').fill('150')
    await p.getByRole('button', { name: 'Book it' }).click()
    await settle(p, 1800)
    await book(s, p, J.B, PARTS.psu, 1)
    await book(s, p, J.C, PARTS.vfd, 1)
  })
  console.log(sql(`select job_number, parts_revenue, parts_cost, base_price, premium_amount, discount_amount, price_charged from work_order where job_number in ('${J.A}','${J.B}','${J.C}')`))
})
await step('hours', () =>
  hours('engineer@thulirtech.com', [
    [J.C, 'Mon', 4], [J.B, 'Tue', 4], [J.D, 'Wed', 3], [J.C, 'Thu', 4], [J.D, 'Fri', 3], [J.A, 'Sat', 5],
  ])
)

// ── 5 · Verification (B fails once), customer testing, the write-off ──────────────────────────
await step('ready1', async () => {
  await as('engineer@thulirtech.com', jobPath(J.A), async (s, p) => {
    for (const job of [J.A, J.B, J.C]) {
      await s.goto(jobPath(job))
      await p.getByRole('button', { name: 'Ready for verification' }).first().click()
      await settle(p, 1500)
    }
  })
})
await step('give1', () => giveToVerifier([J.A, J.B, J.C]))
await step('verifyHours', () => hours('bothroles@thulirtech.com', [[J.A, 'Sat', 1]]))
await step('verify1', async () => {
  await as('bothroles@thulirtech.com', '/service-centre/verification?view=mine', async (s, p) => {
    for (const job of [J.A, J.C]) {
      await s.goto(`/service-centre/verification?view=mine&card=${encodeURIComponent(job)}`)
      await p.getByRole('button', { name: 'Pass', exact: true }).click()
      await settle(p, 1500)
    }
    await s.goto(`/service-centre/verification?view=mine&card=${encodeURIComponent(J.B)}`)
    await p.getByLabel('Observed symptom').fill('24 V rail sags to 21 V under load')
    await p.getByRole('button', { name: 'Fail — back to the bench' }).click()
    await settle(p, 1800)
  })
  console.log('B after fail:', subStatus(J.B))
})
await step('ready2', async () => {
  await as('engineer@thulirtech.com', jobPath(J.B), async (s, p) => {
    await s.goto(jobPath(J.B))
    const start = p.getByRole('button', { name: 'Start work' })
    if (await start.isVisible().catch(() => false)) { await start.click(); await settle(p, 1500); await s.goto(jobPath(J.B)) }
    await p.getByRole('button', { name: 'Ready for verification' }).first().click()
    await settle(p, 1500)
  })
})
await step('give2', () => giveToVerifier([J.B]))
await step('verify2', async () => {
  await as('bothroles@thulirtech.com', '/service-centre/verification?view=mine', async (s, p) => {
    await s.goto(`/service-centre/verification?view=mine&card=${encodeURIComponent(J.B)}`)
    await p.getByRole('button', { name: 'Pass', exact: true }).click()
    await settle(p, 1500)
  })
})
await step('customer', async () => {
  await as('liaison@thulirtech.com', '/service-centre/verification?view=customer', async (s, p) => {
    for (const job of [J.A, J.B, J.C]) {
      await s.goto(`/service-centre/verification?view=customer&card=${encodeURIComponent(job)}`)
      await p.locator(`#note-${job.replace(/\//g, '\\/')}`).fill('Works on their machine')
      await p.getByRole('button', { name: 'It works — close it' }).click()
      await settle(p, 1500)
    }
  })
})
await step('writeoffD', async () => {
  await as('servicehead@thulirtech.com', jobPath(J.D), async (s, p) => {
    await p.getByRole('button', { name: 'It cannot be saved…' }).click()
    await p.locator('select[name="reasonId"]').selectOption({ label: 'Component unavailable' })
    await p.getByRole('button', { name: 'Close as non-repairable' }).click()
    await settle(p, 1500)
  })
})

// ── 5b · The comeback R (only with STEP=rework, after module 15 is recorded) ────────────────
if (process.env.STEP === 'rework') {
  await step('challanA', async () => {
    await as('frontoffice@thulirtech.com', '/front-office/challans', async (s, p) => {
      await s.goto(`/front-office/challans?q=${encodeURIComponent(J.A)}`)
      await p.getByLabel(`Tick ${J.A}`, { exact: true }).click()
      await p.getByRole('button', { name: /^Raise a challan for/ }).click()
      await p.waitForURL(/customer=/)
      await settle(p, 1200)
      for (const other of await p.getByLabel(/ is leaving$/).all()) {
        const lbl = (await other.getAttribute('aria-label')) ?? ''
        if (!lbl.startsWith(J.A)) console.log('also offered:', lbl)
      }
      await p.locator('#receivingParty').fill('Selvam, our driver')
      await p.locator('#goesBy').fill('Company van').catch(() => {})
      await p.getByRole('button', { name: /^Issue the challan for/ }).click()
      await p.waitForURL(/\/front-office\/challans\/DC\//, { timeout: 30000 })
      await settle(p, 1200)
    })
    console.log('A after challan:', subStatus(J.A), sql(`select warranty_expires_on from work_order where job_number='${J.A}'`))
  })
  await step('inwardR', async () => {
    const [R] = await deliver({ customer: 'Ayyan Industrial Systems', search: 'Ayyan', salesPerson: 'Test Sales Engineer', units: 1,
      brand: 'Yaskawa', device: 'Servo drive', model: 'SGDV-120A01A', complaint: 'Came back: trips again after 3 weeks', prefix: 'SA', reworkOf: J.A })
    st.R = R
    console.log('R', R, sql(`select price_source, base_price, job_type, previous_job_number from work_order where job_number='${R}'`))
  })
  await step('pickupR', () => pickUp([st.R]))
  await step('allotR', () => allot([st.R]))
  await step('workR', async () => {
    await as('engineer@thulirtech.com', jobPath(st.R), async (s, p) => {
      await p.getByRole('button', { name: 'Start work' }).first().click()
      await settle(p, 1500)
      await s.goto(jobPath(st.R))
      await p.getByRole('button', { name: /Other spares/ }).click()
      await p.getByLabel('What they were').fill('Encoder cable, replaced under warranty')
      await p.getByLabel('Cost (₹)').fill('300')
      await p.getByRole('button', { name: 'Book it' }).click()
      await settle(p, 1800)
      await s.goto(`/service-centre/timesheet?week=2026-09-21&job=${encodeURIComponent(st.R)}`)
      const cell = p.getByLabel(`${st.R} Fri`)
      await cell.fill('2')
      await cell.press('Enter')
      await settle(p, 1500)
    })
  })
  st.done = (st.done ?? []).filter((d: string) => d !== 'refresh')
}

// ── 6 · Refresh the MIS ────────────────────────────────────────────────────────────────────────
await step('refresh', async () => {
  await as('opsmanager@thulirtech.com', '/mis', async (s, p) => {
    await p.getByRole('button', { name: 'Refresh now' }).first().click()
    await settle(p, 4000)
  })
})

const show = () =>
  sql(`select w.job_number, ss.sub_status_name, w.normal_price, w.quoted_price, w.base_price, w.parts_revenue, w.parts_cost, w.premium_amount, w.discount_amount, w.price_charged, w.labour_cost, w.margin_labour, w.margin_parts, w.margin_total, w.total_cost, w.rework_cost_rolled_up, w.verification_cycle_count, w.closed_on from work_order w join work_order_sub_status ss using (sub_status_id) where w.job_number in (${Object.values(J).map((j) => `'${j}'`).join(',')}${st.R ? `,'${st.R}'` : ''}) order by w.job_number`)
console.log(show())

writeFileSync(
  SEED,
  JSON.stringify(
    {
      A: J.A, B: J.B, C: J.C, D: J.D, R: st.R ?? null, X: J.X,
      quotationA: st.quotationA,
      notes: [
        'Built through the app on 2026-09-26 by the module 15/16 set-up (training/recorder/15-setup.ts); SQL only read.',
        'A: Ayyan Industrial Systems, Yaskawa servo drive. Quotation ' + st.quotationA + ': normal price ₹10,000 typed (Set by hand), ₹12,000 approved, premium ₹2,000 Urgent turnaround. Parts billed ₹2,400 (2 × IGBT ₹900 + gate driver ₹600; cost ₹1,800) + ₹150 fuse booked as Other spares (no billed price). 5 h repair (Sat 19 Sep) + 1 h peer verification by Test Both Roles. Passed verification first time. Ready for Invoice.',
        'B: Kovai Textile Mills, Siemens POWER_SUPPLY 6EP1334-3BA10 (demo has a 4 h standard time for it, so B is the only comparable job for Efficiency). ₹6,000 agreed by phone with normal ₹6,000 typed: NO rate card — no screen sets a board\'s internal reference, so rate-card pricing cannot be reached through the app. Parts ₹500 / cost ₹350. 4 h. Failed verification once (verification_cycle_count 1), then passed. Ready for Invoice. Delivery credited to Test Sales Head (the catalogue\'s Priya).',
        'C: Rajapalayam Spinners, Danfoss VFD control board. Phone price ₹8,000 against a typed normal ₹10,000 → discount ₹2,000 (Set by hand, not Rate card). Parts ₹1,000 / ₹700. 8 h. Ready for Invoice.',
        'D: Sri Devi Diagnostics, mammography PMC board. Never priced. 6 h. Non-Repairable (Component unavailable).',
        'A, C, D deliveries credited to Test Sales Engineer (the catalogue\'s Arun); B to Test Sales Head. No delivery is "Filled" (C cannot be made to pre-date attribution).',
        'X: a second Ayyan servo drive left Under Assessment, used by module 15 for the live raise-form demo (never raised). Please do not quote it.',
        'Engineer is Test Engineer (the catalogue\'s Ramachandran), costed at ₹700/h (Senior Engineer since 2025-11-30); Test Both Roles (the catalogue\'s Baleswar) at ₹450/h standard. So labour cost and every margin on screen differ from the catalogue\'s ₹400/h figures; prices, premium, discount, labour charge, charged and parts margin match.',
        'Hours are on the week of 14 Sep: C Mon 4 + Thu 4, B Tue 4, D Wed 3 + Fri 3, A Sat 5, verification A Sat 1 (Test Both Roles). All closed 26 Sep 2026 (September).',
        'Test Engineer\'s seeded September target is ₹60,000 (not ₹20,000); it was left as seeded. Test Engineer also has other agents\' closed jobs in September, so scorecard and Achievement will not show only A–D.',
        st.R ? 'R: warranty rework of A (Rework inward naming A, after A was dispatched on a challan), priced ₹0 (WARRANTY_REWORK). A was first dispatched on a challan (warranty to 2026-12-26). R has 2 h (Fri 25 Sep, ₹1,400 at ₹700/h) + a ₹300 encoder cable as Other spares = ₹1,700, rolled up onto A (A labour margin ₹3,650 → ₹1,950 on screen). R is left In Progress (so September rework rate / scorecard Rework are unaffected; R shows under Labour on open boards). It is a September comeback here, not 31 Oct as in the catalogue.' : 'R: not created yet (planned after module 15 is recorded: challan for A, then a Rework inward naming A).',
        'The MIS view was refreshed after set-up. Refresh again (MIS › Refresh now, as opsmanager@) if you change anything.',
      ],
    },
    null,
    2
  )
)
console.log('wrote', SEED)
