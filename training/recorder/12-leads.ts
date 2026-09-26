/**
 * Module 12 · For leads: queues, rates and dashboards — one clip, four roles (the session is swapped
 * in place with asUser, so there is no cut).
 *
 * Grounded in:
 *  - app/(app)/mis (Executive / Ops Manager; MIS access): pipeline, Needs attention today; /mis/stuck
 *    "What counts as stuck" — Alloted/In Progress, no timesheet/part/status activity for the
 *    configured business days; Pending Spare/On Hold measured on Queue aging instead
 *  - service-centre/performance (target.manage: Service Head): target = labour margin on closed jobs,
 *    revisable, last changer recorded
 *  - crm/rates (service_rate.manage: Operations Manager): exclusion constraint service_rate_no_overlap;
 *    endRate() ends rather than edits; a job keeps the rate in force at registration
 *  - admin/statuses (status.manage): Retire/Restore is a flag, never a delete; Rename changes the name
 *    only; the "No time logging" flag (blocks_labour) is what the timesheet trigger reads (migration 0157)
 *  - admin/users (user.manage_roles: Admin, Ops Manager): grant a role; people come from the directory
 *  - customers/[id] Change owner (reassign_customer_owner: Admin, Executive, Sales Head; reason required)
 *
 * Only the pre-step customer is changed (a rate, an owner move), plus one engineer target. Retire is
 * pointed at, never opened; Grant is opened and pointed at, never confirmed.
 *
 *   npx tsx 12-leads.ts [en|ta]    → out/12-leads.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-12'
import { asUser, setupCustomer } from './00-helpers'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1

const stamp = Date.now().toString().slice(-4)
// Pre-step, unrecorded: a customer of our own for the rate card and the owner move.
const customerId = await setupCustomer(`Hosur Drives ${stamp}`, 'Hosur')

const s = await Stage.open('exec@thulirtech.com', '/mis', join(OUT, 'raw'))
const p = s.page
const bay = (code: string) => p.locator(`section[data-code="${code}"]`)

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3000 * pace)

// 1 · Executive: the MIS dashboard and stuck tasks
await s.point(bay('T-01'))
await s.say(c.exec, 3300 * pace)
await s.point(bay('ATT'))
await s.say(c.attention, 2400 * pace, 'do')
await s.unring()
await s.click(p.getByRole('link', { name: 'Stuck tasks', exact: true }).first())
await p.waitForLoadState('networkidle')
await s.wait(500)
await s.point(bay('RULE'))
await s.say(c.stuck, 3400 * pace)
await s.point(bay('RULE').getByText('Left out', { exact: true }).locator('xpath=..'))
await s.say(c.notAge, 3000 * pace, 'do')
await s.unring()
await s.quiet()

// 2 · Service Head: targets
await asUser(s, 'servicehead@thulirtech.com', '/service-centre/performance')
await s.point(bay('PERF'))
await s.say(c.perf, 2200 * pace)
await s.unring()
await s.click(p.locator('#engineer'))
await p.locator('#engineer').selectOption({ label: (await p.locator('#engineer option', { hasText: 'Test Both Roles' }).first().innerText()).trim() })
await s.wait(400)
await p.locator('#targetAmount').fill('')
await s.type(p.locator('#targetAmount'), '50000', 80)
await s.type(p.locator('#note'), 'First full month on the bench', 30)
await s.point(p.locator('#targetAmount'))
await s.say(c.target, 3200 * pace, 'do')
await s.unring()
await s.click(p.getByRole('button', { name: /Set the target|Revise the target/ }))
await p.waitForLoadState('networkidle')
await s.wait(1200)
await s.quiet()

// 3 · Operations Manager: rates, sub-statuses, roles
await asUser(s, 'opsmanager@thulirtech.com', `/crm/rates?customer=${customerId}`)
await s.point(bay('CARD'))
await s.say(c.rates, 2200 * pace)
await s.unring()
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addRate = async (price: string, from: string) => {
  await s.type(p.locator('#internalReference'), 'DPS-600', 50)
  await p.locator('#partDescription').fill('Delta power supply')
  await s.click(p.getByRole('radio', { name: 'Minor' }))
  await s.type(p.locator('#rate'), price, 70)
  await p.locator('#validFrom').fill(from)
  await s.wait(300)
  await s.click(p.getByRole('button', { name: /Add the rate/ }))
  await p.waitForLoadState('networkidle')
  await s.wait(1200)
}
await s.say(c.rateAdd, 600 * pace)
await addRate('4500', iso(new Date()))
await s.point(bay('CARD').locator('tbody tr').first())
await s.say(c.rateAdded, 2400 * pace, 'do')
await s.unring()
await addRate('5000', iso(new Date(Date.now() + 30 * 86400000)))
await s.point(p.getByText(/There is already a rate/))
await s.say(c.overlap, 3400 * pace, 'dont')
await s.unring()
await s.quiet()
await s.click(bay('CARD').getByRole('link', { name: 'DPS-600' }).first())
await p.waitForLoadState('networkidle')
await s.wait(500)
// The board opens by a soft navigation that can leave the overlay stale; reload the same address.
{ const u = new URL(p.url()); await s.goto(u.pathname + u.search) }
await p.waitForFunction(() => (window as unknown as { __stage?: unknown }).__stage)
await s.point(p.getByRole('button', { name: /End this rate/ }).first())
await s.say(c.endRate, 3200 * pace)
await s.unring()
await s.quiet()

await s.goto('/admin/statuses')
await s.wait(500)
// No sub-status is opened for retiring: every one on this demo is in use (On Hold holds real boards).
await s.point(p.locator('table.hier').first())
await s.say(c.retire, 3400 * pace, 'dont')
await s.point(p.locator('table.hier tr', { hasText: 'On Hold' }).first())
await s.say(c.flags, 3000 * pace)
await s.unring()
await s.quiet()

await s.goto('/admin/users')
await s.click(p.getByRole('link', { name: 'Test No Role' }))
await p.waitForLoadState('networkidle')
await s.wait(600)
await s.point(p.getByLabel('Role to grant'))
await s.say(c.roles, 3200 * pace)
await s.unring()
await s.quiet()

// 4 · Sales Head: change owner
await asUser(s, 'saleshead@thulirtech.com', `/crm/customers/${customerId}?tab=lifecycle&act=owner`)
const form = p.getByRole('form', { name: 'Change owner' })
await s.point(form)
await s.say(c.owner, 2200 * pace)
await s.click(form.getByPlaceholder('Choose a sales person'))
await s.click(p.getByRole('option', { name: /Test Sales Head/ }).first())
await s.type(p.locator('#owner-reason'), 'Key account, handled by the Sales Head', 30)
await s.say(c.ownerWhy, 1600 * pace)
await s.unring()
await s.quiet()
await s.click(form.getByRole('button', { name: /Move the account/ }))
const history = p.locator('table.slots', { hasText: 'By, and why' })
await history.waitFor({ timeout: 20000 })
await s.wait(800)
await s.point(history)
await s.say(c.ownerDone, 3000 * pace, 'do')
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 5500 * pace)

console.log(await s.close(join(OUT, `12-leads.${lang}.webm`)))
