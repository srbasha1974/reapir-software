/**
 * Module 03 set-up, unrecorded: a contract customer with a rate card, made through the app itself
 * (Round 4, K13). Nothing in the demo data is a contract customer or has a rate.
 *
 *  1. salesengineer@ registers the customer (CRM › Customers › Register)
 *  2. saleshead@ changes its billing segment to exclusive contract (customer page)
 *  3. opsmanager@ adds a rate that applies automatically (CRM › Rates)
 *
 * Cached in out/03-contract.json, so both takes use the same customer; each take registers its own board.
 */
import { Stage } from './stage'
import { sql } from './03-setup'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const RAW = join(OUT, 'raw')
const CACHE = join(OUT, '03-contract.json')

export const CONTRACT = {
  customer: 'Hosur Precision Castings',
  ref: 'HPC-DB-01',
  part: 'Drive control board',
  rate: 9500,
}

export async function contractCustomer(): Promise<{ customerId: string }> {
  if (existsSync(CACHE)) return JSON.parse(readFileSync(CACHE, 'utf8'))
  let id = sql(`select customer_id from customer where company_name = '${CONTRACT.customer}' and deleted = false`)[0]
  if (!id) {
    const s = await Stage.open('salesengineer@thulirtech.com', '/crm/customers/new', RAW, { record: false })
    await s.page.locator('#companyName').fill(CONTRACT.customer)
    await s.page.locator('#city').fill('Hosur')
    await s.page.getByRole('button', { name: /^Register$/ }).click()
    for (let i = 0; i < 40 && !id; i++) {
      await s.page.waitForTimeout(500)
      id = sql(`select customer_id from customer where company_name = '${CONTRACT.customer}' and deleted = false`)[0]
    }
    await s.close()
    if (!id) throw new Error('Customer not registered')
  }
  const seg = () => sql(`select billing_segment from customer where customer_id = '${id}'`)[0]
  if (seg() !== 'EXCLUSIVE_CONTRACT') {
    const s = await Stage.open('saleshead@thulirtech.com', `/crm/customers/${id}?tab=details`, RAW, { record: false })
    await s.page.getByRole('button', { name: 'Change to exclusive contract' }).click()
    for (let i = 0; i < 40 && seg() !== 'EXCLUSIVE_CONTRACT'; i++) await s.page.waitForTimeout(500)
    await s.page.screenshot({ path: join(OUT, '03-contract-seg.png') })
    await s.close()
    if (seg() !== 'EXCLUSIVE_CONTRACT') throw new Error('Segment not changed')
  }
  const rates = () => sql(`select count(*) from service_rate where customer_id = '${id}' and deleted = false`)[0]
  if (rates() === '0') {
    const s = await Stage.open('opsmanager@thulirtech.com', `/crm/rates?customer=${id}`, RAW, { record: false })
    const p = s.page
    await p.locator('#internalReference').fill(CONTRACT.ref)
    await p.locator('#partDescription').fill(CONTRACT.part)
    await p.getByRole('radio', { name: 'Major' }).check({ force: true })
    await p.locator('#rate').fill(String(CONTRACT.rate))
    await p.locator('#validFrom').fill('2026-09-01')
    await p.getByRole('button', { name: /Add the rate/ }).click()
    for (let i = 0; i < 40 && rates() === '0'; i++) await p.waitForTimeout(500)
    await p.screenshot({ path: join(OUT, '03-contract-rate.png') })
    await s.close()
    if (rates() === '0') throw new Error('Rate not added')
  }
  const v = { customerId: id }
  writeFileSync(CACHE, JSON.stringify(v))
  return v
}

if (import.meta.url === `file://${process.argv[1]}`) console.log(await contractCustomer())
