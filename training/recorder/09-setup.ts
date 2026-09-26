/**
 * Unrecorded set-up shared by modules 09, 10 and 11: registers a fresh delivery as Front Office and
 * moves its jobs through the pipeline, as the proper roles, through the app itself. Nothing here is
 * written with SQL; SQL is only read, to find ids.
 *
 * Each module calls this before it records, so a retake always starts from its own fresh jobs and
 * no other agent can have moved them.
 */
import { Stage } from './stage'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import type { Locator, Page } from '@playwright/test'

const RAW = join(import.meta.dirname, 'out', 'raw-setup')

export const sql = (q: string) =>
  execFileSync('docker', ['exec', 'supabase_db_Repair_Service', 'psql', '-U', 'postgres', '-At', '-c', q], {
    encoding: 'utf8',
  }).trim()

export const jobPath = (job: string) => '/service-centre/jobs/' + job.split('/').map(encodeURIComponent).join('/')

export const customerId = (name: string) =>
  sql(`select customer_id from customer where company_name = '${name.replace(/'/g, "''")}' and deleted = false`)

export function subStatus(job: string) {
  return sql(
    `select ss.sub_status_name from work_order w join work_order_sub_status ss using (sub_status_id) where w.job_number = '${job}'`
  )
}

async function as<T>(email: string, path: string, fn: (s: Stage, p: Page) => Promise<T>): Promise<T> {
  const s = await Stage.open(email, path, RAW, { record: false })
  try {
    return await fn(s, s.page)
  } finally {
    await s.close()
  }
}

async function settle(p: Page, ms = 700) {
  await p.waitForLoadState('networkidle').catch(() => {})
  await p.waitForTimeout(ms)
}

/** Registers one delivery of `units` identical units for `customer`; returns their job numbers. */
export async function registerDelivery(opts: {
  customer: string
  search: string
  units: number
  brand: string
  device: string
  model: string
  complaint: string
  accessories?: string
  prefix: string
}): Promise<string[]> {
  const stamp = Date.now().toString().slice(-6)
  const serials = Array.from({ length: opts.units }, (_, i) => `${opts.prefix}${stamp}${i + 1}`)
  await as('frontoffice@thulirtech.com', '/front-office/inward', async (s, p) => {
    await p.getByLabel('Customer', { exact: true }).pressSequentially(opts.search, { delay: 40 })
    await p.waitForTimeout(900)
    await p.getByRole('option', { name: new RegExp(opts.customer) }).click()
    await p.waitForTimeout(900)
    await p.getByLabel('Brought by', { exact: true }).pressSequentially(' ', { delay: 40 })
    await p.waitForTimeout(900)
    await p.getByRole('option').first().click()
    const pickSales = p.getByLabel('Sales engineer', { exact: true })
    if (await pickSales.isVisible().catch(() => false)) {
      await pickSales.click()
      await p.waitForTimeout(600)
      await p.getByRole('option').first().click()
    }
    await p.locator('#deliveryNoteReference').fill(`DC-${stamp}`)
    await p.locator('#brand-0').fill(opts.brand)
    await p.locator('#deviceType-0').fill(opts.device)
    await p.locator('#model-0').fill(opts.model)
    await p.locator('#complaint-0').fill(opts.complaint)
    if (opts.accessories) await p.locator('#accessories-0').fill(opts.accessories)
    for (let u = 2; u <= opts.units; u++) await p.getByRole('button', { name: 'Add a unit' }).click()
    for (let u = 1; u <= opts.units; u++) {
      await p.getByLabel(`Serial number, unit ${u} of ${opts.model}`).fill(serials[u - 1])
      await p.getByLabel(`Shelf, unit ${u} of ${opts.model}`).fill(`${stamp.slice(-3)}${'ABCDEFGH'[u - 1]}`)
    }
    await p.waitForTimeout(1500)
    await p.getByRole('button', { name: /Register \d+ units?/ }).click()
    await settle(p, 1500)
  })
  const list = serials.map((x) => `'${x}'`).join(',')
  const jobs = sql(`select job_number from work_order where serial_number in (${list}) order by serial_number`)
    .split('\n')
    .filter(Boolean)
  if (jobs.length !== opts.units) throw new Error(`Expected ${opts.units} jobs, found ${jobs.length}`)
  return jobs
}

/** Liaison picks each Inward job up for assessment (Inward → Under Assessment). */
export async function pickUp(jobs: string[]) {
  await as('liaison@thulirtech.com', '/service-centre/reservoir', async (s, p) => {
    for (const job of jobs) {
      await s.goto(`/service-centre/reservoir?q=${encodeURIComponent(job)}`)
      const row = p.locator('tr', { has: p.getByRole('link', { name: job, exact: true }) })
      await row.getByRole('button', { name: 'Pick up' }).click()
      await settle(p, 1200)
    }
  })
}

/** Liaison records a price agreed on the phone for these jobs (priced, approved, released). */
export async function agreePrice(customer: string, jobs: string[], price: number) {
  const id = customerId(customer)
  await as('liaison@thulirtech.com', `/service-centre/quotations?customer=${id}`, async (s, p) => {
    const bay = p.locator('ul.pick[aria-label="Boards this price covers"]')
    for (const job of jobs) await bay.locator('li', { hasText: job }).locator('input').check()
    await p.locator(`#agreedDescription-${id}`).fill('Power supply repair')
    // Normal price (features 017/023): typed when no rate card covers the boards. Typing the same
    // price means no premium and no discount. With a rate card it is read-only; if the agreed price
    // is above it, a premium reason is required, so the first reason is chosen.
    const normal = p.locator(`#normalPrice-ph-${id}`)
    await normal.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {})
    await p.waitForTimeout(600)
    if ((await normal.evaluate((e) => e.tagName).catch(() => '')) === 'INPUT') await normal.fill(String(price))
    await p.locator(`#agreedUnitPrice-${id}`).fill(String(price))
    const why = p.getByRole('combobox', { name: 'Why a premium' })
    if (await why.isVisible().catch(() => false)) await why.selectOption({ index: 1 })
    await p.locator(`#agreedByName-${id}`).fill('R. Krishnan, Maintenance Manager')
    await p.getByRole('button', { name: /^Record ₹/ }).click()
    await settle(p, 1500)
  })
}

/** Service Head allots the jobs to the seeded engineer. */
export async function allot(jobs: string[]) {
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

async function click(p: Page, target: Locator) {
  await target.click()
  await settle(p, 1200)
}

/** Engineer starts the work (Alloted → In Progress) and, if asked, finishes it (→ Ready for Verification). */
export async function engineer(jobs: string[], finish: boolean) {
  await as('engineer@thulirtech.com', jobPath(jobs[0]), async (s, p) => {
    for (const job of jobs) {
      await s.goto(jobPath(job))
      await click(p, p.getByRole('button', { name: 'Start work' }))
      if (finish) {
        await s.goto(jobPath(job))
        await click(p, p.getByRole('button', { name: 'Ready for verification' }))
      }
    }
  })
}

/** Service Head gives the boards to the second engineer; that engineer passes them. */
export async function verifyPass(jobs: string[]) {
  await as('servicehead@thulirtech.com', '/service-centre/verification?view=queue', async (s, p) => {
    for (const job of jobs) await p.getByLabel(`Choose ${job}`, { exact: true }).check()
    await p.locator('#verifierUserId').selectOption({ label: await verifierLabel(p) })
    await p.getByRole('button', { name: /^Give \d+ boards? to them/ }).click()
    await settle(p, 1500)
  })
  await as('bothroles@thulirtech.com', '/service-centre/verification?view=mine', async (s, p) => {
    for (const job of jobs) {
      await s.goto(`/service-centre/verification?view=mine&card=${encodeURIComponent(job)}`)
      await click(p, p.getByRole('button', { name: 'Pass', exact: true }))
    }
  })
}

async function verifierLabel(p: Page) {
  const texts = await p.locator('#verifierUserId option').allTextContents()
  const t = texts.find((x) => x.startsWith('Test Both Roles'))
  if (!t) throw new Error('No verifier option for Test Both Roles')
  return t
}

/** Liaison records the customer's test as passed (→ Ready for Invoice). */
export async function customerPass(jobs: string[]) {
  await as('liaison@thulirtech.com', '/service-centre/verification?view=customer', async (s, p) => {
    for (const job of jobs) {
      await s.goto(`/service-centre/verification?view=customer&card=${encodeURIComponent(job)}`)
      await p.locator(`#note-${job.replace(/\//g, '\\/')}`).fill('Works on their machine')
      await click(p, p.getByRole('button', { name: 'It works — close it' }))
    }
  })
}

/** Service Head closes an open job as non-repairable ("It cannot be saved…"). */
export async function closeNonRepairable(job: string, reason = 'Component unavailable') {
  await as('servicehead@thulirtech.com', jobPath(job), async (s, p) => {
    await p.getByRole('button', { name: 'It cannot be saved…' }).click()
    await p.locator(`select[name="reasonId"]`).selectOption({ label: reason })
    await click(p, p.getByRole('button', { name: 'Close as non-repairable' }))
  })
}

/** Checks every job reached the state the clip needs; throws otherwise. */
export function expectState(jobs: string[], state: string) {
  for (const j of jobs) {
    const now = subStatus(j)
    if (now !== state) throw new Error(`${j} is at ${now}, expected ${state}`)
  }
}

/**
 * Signs the recorded browser in as somebody else, in place, so one clip can follow a job across
 * roles without cutting between videos. The session is minted the same way `Stage.open` mints it.
 */
export async function become(s: Stage, email: string, path: string) {
  const app = process.env.REPAIR_SERVICE_DIR ?? '/home/user/repair-service'
  const { mintSessionCookies } = await import(join(app, 'tests/e2e/session.ts'))
  const cookies = await mintSessionCookies(email)
  const ctx = s.page.context()
  await ctx.clearCookies()
  await ctx.addCookies(cookies.map((c: object) => ({ ...c, url: undefined, domain: '127.0.0.1' })))
  await s.goto(path)
  await s.page.waitForFunction(() => (window as unknown as { __stage?: unknown }).__stage)
}

/** A short card naming who is signed in now. */
export async function roleCard(s: Stage, kicker: string, role: string, hold: number) {
  await s.card(`<div class="k">${kicker}</div><h1>${role}</h1>`, hold)
}
