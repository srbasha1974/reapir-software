/**
 * Helpers shared by modules 00, 01 and 12 — kept out of stage.ts, which is not ours to edit.
 *
 *  - `asUser` swaps the signed-in person inside a recording stage, so one clip can show two roles
 *    without cutting (mints a real session, exactly as Stage.open does).
 *  - `setup*` build the records a clip needs, through the app itself, in an unrecorded browser.
 */
import { Stage } from './stage'
import { join } from 'node:path'

const APP = process.env.REPAIR_SERVICE_DIR ?? '/home/user/repair-service'
const RAW = join(import.meta.dirname, 'out', 'raw')

/** Sign the recording stage in as somebody else, then open `path`. */
export async function asUser(s: Stage, email: string, path: string) {
  const { mintSessionCookies } = await import(join(APP, 'tests/e2e/session.ts'))
  const cookies = await mintSessionCookies(email)
  const context = s.page.context()
  await context.clearCookies()
  await context.addCookies(cookies.map((c: object) => ({ ...c, url: undefined, domain: '127.0.0.1' })))
  await s.goto(path)
  await s.page.waitForFunction(() => (window as unknown as { __stage?: unknown }).__stage)
}

/** Registers a customer as the Sales Engineer and returns its id. */
export async function setupCustomer(name: string, city = 'Coimbatore'): Promise<string> {
  const s = await Stage.open('salesengineer@thulirtech.com', '/crm/customers/new', RAW, { record: false })
  const p = s.page
  await p.locator('#companyName').fill(name)
  await p.locator('#city').fill(city)
  await p.getByRole('button', { name: 'Register' }).click()
  const open = p.getByRole('link', { name: 'Open the record' })
  await open.waitFor({ timeout: 20000 })
  const href = (await open.getAttribute('href')) ?? ''
  await s.close()
  const id = href.split('/').pop() ?? ''
  if (!id) throw new Error(`Could not register ${name}`)
  return id
}

/** Adds a contact to a customer, as the Sales Engineer. */
export async function setupContact(customerId: string, first: string, last: string, email: string) {
  const s = await Stage.open('salesengineer@thulirtech.com', `/crm/customers/${customerId}?tab=people`, RAW, { record: false })
  const p = s.page
  await p.locator('#firstName').fill(first)
  await p.locator('#lastName').fill(last)
  await p.locator('#email').fill(email)
  await p.getByRole('button', { name: 'Add contact' }).click()
  await p.getByText(`${first} added.`).waitFor({ timeout: 20000 })
  await s.close()
}

/** Books one board in for a customer at the counter, as Front Office. Returns nothing; the job exists. */
export async function setupInward(customerSearch: string, customerName: string, stamp: string) {
  const s = await Stage.open('frontoffice@thulirtech.com', '/front-office/inward', RAW, { record: false })
  const p = s.page
  await p.getByLabel('Customer', { exact: true }).pressSequentially(customerSearch, { delay: 40 })
  await p.getByRole('option', { name: new RegExp(customerName) }).first().click()
  await p.waitForTimeout(800)
  const pickSales = p.getByLabel('Sales engineer', { exact: true })
  if (await pickSales.isVisible().catch(() => false)) {
    const v = await pickSales.inputValue().catch(() => '')
    if (!v) {
      await pickSales.click()
      await p.getByRole('option').first().click()
    }
  }
  await p.locator('#brand-0').fill('Delta')
  await p.locator('#deviceType-0').fill('Power supply')
  await p.locator('#model-0').fill('DPS-300')
  await p.locator('#complaint-0').fill('No output')
  await p.getByLabel('Serial number, unit 1 of DPS-300').fill(`TRL${stamp}01`)
  await p.getByLabel('Shelf, unit 1 of DPS-300').fill(`T${stamp}`)
  await p.waitForTimeout(1200)
  await p.getByRole('button', { name: /Register 1 unit/ }).click()
  await p.waitForLoadState('networkidle')
  await p.waitForTimeout(2000)
  const warn = p.locator('p.warn', { hasText: 'Not registered.' })
  if (await warn.isVisible().catch(() => false)) {
    const text = await warn.innerText()
    await s.close()
    throw new Error(`Inward refused: ${text}`)
  }
  await s.close()
}
