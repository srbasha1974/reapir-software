/**
 * Unrecorded set-up shared by modules 03–05: make our own jobs through the app itself, so no other
 * agent's work can move them under us. Read-only SQL only to find the job numbers.
 */
import { Stage } from './stage'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const RAW = join(import.meta.dirname, 'out', 'raw')

/** Read-only SQL against the local database. */
export function sql(q: string): string[] {
  const out = execSync(`docker exec supabase_db_Repair_Service psql -U postgres -At -c ${JSON.stringify(q)}`, {
    encoding: 'utf8',
  })
  return out.split('\n').map((s) => s.trim()).filter(Boolean)
}

export function customerId(name: string): string {
  return sql(`select customer_id from customer where company_name = '${name.replace(/'/g, "''")}' and deleted = false`)[0]
}

/** Registers one delivery of `units` identical units as frontoffice@, returns the job numbers in unit order. */
export async function registerDelivery(o: {
  customer: string
  brand: string
  deviceType: string
  model: string
  complaint: string
  units: number
  serial: string // prefix; unit u gets `${serial}0${u}`
  neededBy?: string // yyyy-mm-dd: registers the delivery as Business-critical with this SLA date
}): Promise<string[]> {
  const s = await Stage.open('frontoffice@thulirtech.com', '/front-office/inward', RAW, { record: false })
  const p = s.page
  await p.getByLabel('Customer', { exact: true }).pressSequentially(o.customer.split(' ')[0], { delay: 30 })
  await p.getByRole('option', { name: new RegExp(o.customer) }).first().click()
  await p.waitForTimeout(800)
  const pickSales = p.getByLabel('Sales engineer', { exact: true })
  if (await pickSales.isVisible().catch(() => false)) {
    const v = await pickSales.inputValue().catch(() => '')
    if (!v) {
      await pickSales.click()
      await p.waitForTimeout(500)
      await p.getByRole('option').first().click()
    }
  }
  if (o.neededBy) {
    await p.locator('#priority').selectOption('BUSINESS_CRITICAL')
    await p.locator('#slaTargetDate').fill(o.neededBy)
  }
  await p.locator('#brand-0').fill(o.brand)
  await p.locator('#deviceType-0').fill(o.deviceType)
  await p.locator('#model-0').fill(o.model)
  await p.locator('#complaint-0').fill(o.complaint)
  for (let u = 2; u <= o.units; u++) await p.getByRole('button', { name: 'Add a unit' }).click()
  for (let u = 1; u <= o.units; u++) {
    await p.getByLabel(`Serial number, unit ${u} of ${o.model}`).fill(`${o.serial}0${u}`)
  }
  await p.getByRole('button', { name: /^Register \d+ unit/ }).click()
  await p.waitForURL(/\/front-office\/inward\/IN\//, { timeout: 30000 })
  await s.close()
  const jobs: string[] = []
  for (let u = 1; u <= o.units; u++) {
    const j = sql(`select job_number from work_order where serial_number = '${o.serial}0${u}' and deleted = false order by created_at desc limit 1`)[0]
    if (!j) throw new Error(`No job for serial ${o.serial}0${u}`)
    jobs.push(j)
  }
  return jobs
}

export function stateOf(job: string): string {
  return sql(
    `select ss.sub_status_name from work_order w join work_order_sub_status ss using (sub_status_id) where w.job_number = '${job}'`
  )[0]
}

/** Picks jobs up (Inward → Under Assessment) as `who`, through the reservoir. */
export async function pickUp(jobs: string[], who = 'liaison@thulirtech.com') {
  const s = await Stage.open(who, '/service-centre/reservoir', RAW, { record: false })
  for (const j of jobs) {
    await s.goto(`/service-centre/reservoir?q=${encodeURIComponent(j)}`)
    const row = s.page.locator('table.allot tr', { hasText: j })
    await row.getByRole('button', { name: 'Pick up' }).click()
    await s.page.waitForTimeout(1500)
  }
  await s.close()
  for (const j of jobs) if (stateOf(j) !== 'Under Assessment') throw new Error(`${j} is at ${stateOf(j)}`)
}

/** Under Assessment → Awaiting Customer Input, with a note, through the queue panel. */
export async function waitForCustomer(job: string, note: string, who = 'liaison@thulirtech.com') {
  const s = await Stage.open(
    who,
    `/service-centre/reservoir?queue=${encodeURIComponent('Under Assessment')}&job=${encodeURIComponent(job)}`,
    RAW,
    { record: false }
  )
  const g = s.page.getByRole('group', { name: `What can be done with ${job}` })
  await g.getByRole('button', { name: 'Wait for the customer' }).click()
  await g.getByLabel('What was asked of them').fill(note)
  await g.getByRole('button', { name: 'Wait for the customer' }).click()
  await s.page.waitForTimeout(2000)
  await s.close()
  if (stateOf(job) !== 'Awaiting Customer Input') throw new Error(`${job} is at ${stateOf(job)}`)
}

export function stamp(): string {
  return Date.now().toString().slice(-5)
}
