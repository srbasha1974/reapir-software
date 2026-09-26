/**
 * Module 01 · Customers, contacts and follow-ups — Sales Engineer, then the Sales Head briefly.
 *
 * Grounded in UC-001, UC-019, UC-002, UC-005, UC-004 and:
 *  - app/(app)/crm/customers/new/register-form.tsx: only the company name is required; code, lifecycle
 *    (Potential), owner and clock-in are the system's; `customer_immutable` refuses changing them
 *  - customers/[id]/panels.tsx AddContactPanel: a Primary checkbox ("Ticking it replaces …", finding 16);
 *    contact_single_primary clears the previous primary; Make primary does the same afterwards
 *  - interaction: `interaction_immutable` refuses UPDATE/DELETE; is_backdated = occurred before today;
 *    a future date is refused
 *  - contacts/[id]: Save corrections (typos, recorded per field) vs Record employment change (a move)
 *  - lifecycle: Potential → Trial by the first work order; convert_to_regular() is the Sales Head's
 *    and needs a job at Closed / Ready for Invoice; moving back is the Operations Manager's only (customer.lifecycle_override), with a reason
 *
 * Pre-step (unrecorded): a destination company for the job move, and a Trial account (a customer with
 * one board booked in by Front Office) for the Sales Head to try to convert.
 *
 *   npx tsx 01-crm.ts [en|ta]    → out/01-crm.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-01'
import { Cuts, asUser, setupContact, setupCustomer, setupInward } from './00-helpers'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1

const stamp = Date.now().toString().slice(-4)

// ── Pre-step, unrecorded ──────────────────────────────────────────────────────────────────────
const destName = `Kaveri Automation ${stamp}`
await setupCustomer(destName, 'Erode')
const trialName = `Madurai Plastics ${stamp}`
const trialId = await setupCustomer(trialName, 'Madurai')
await setupContact(trialId, 'Ravi', 'Kumar', `ravi.${stamp}@example.com`)
await setupInward(stamp, trialName, stamp)

// ── The clip ──────────────────────────────────────────────────────────────────────────────────
const s = await Stage.open('salesengineer@thulirtech.com', '/crm/customers/new', join(OUT, 'raw'))
const p = s.page
const cut = new Cuts(s)
await cut.install()
const company = `Selvam Pumps ${stamp}`
/** Click, then fill at once: for the fields the viewer need not watch being typed. */
const put = async (l: ReturnType<typeof p.locator>, v: string) => { await l.fill(v); await s.wait(300) }

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3000 * pace)

// UC-001 — register a prospect
await s.point(p.locator('#companyName'))
await s.say(c.name, 2400 * pace, 'do')
await s.type(p.locator('#companyName'), company, 30)
await put(p.locator('#city'), 'Coimbatore')
await s.unring()
await s.point(p.locator('section[data-code="REG"] dl'))
await s.say(c.system, 2200 * pace)
await s.unring()
await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: 'Register' }))
  await p.getByText(/registered as TTS-/).waitFor({ timeout: 30000 })
})
await s.point(p.getByText(/registered as TTS-/))
await s.say(c.registered, 2400 * pace, 'do')
await s.unring()
const openRec = p.getByRole('link', { name: 'Open the record' })
await s.click(openRec)
await cut.slow(() => p.waitForLoadState('networkidle'), 300)
await s.wait(900)

// UC-019 — contacts and the one primary
const tabs = p.locator('nav.bay-tabs')
await s.say(c.people, 500 * pace)
await s.click(tabs.getByRole('link', { name: /^People/ }))
await cut.slow(() => p.waitForLoadState('networkidle'), 300)
await s.wait(600)
await s.type(p.locator('#firstName'), 'Priya', 50)
await put(p.locator('#lastName'), 'Natarajan')
await put(p.locator('#jobTitle'), 'Maintenance Manager')
await put(p.locator('#email'), `priya.${stamp}@example.com`)
await s.click(p.locator('#isPrimary'))
await s.point(p.locator('#email'))
await s.say(c.reach, 2400 * pace, 'do')
await s.unring()
await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: 'Add contact' }))
  await p.getByText('Priya added.').waitFor({ timeout: 30000 })
  await p.waitForLoadState('networkidle')
})
await s.wait(600)
await put(p.locator('#firstName'), 'Arun')
await put(p.locator('#mobileNumber'), '+919843012345')
if (!(await p.locator('#isPrimary').isChecked())) await s.click(p.locator('#isPrimary'))
await cut.slow(() => p.getByText(/Ticking it replaces/).waitFor({ timeout: 30000 }), 300)
await s.point(p.locator('#isPrimary').locator('xpath=ancestor::div[contains(@class,"frow")][1]'))
await s.say(c.replaces, 3000 * pace, 'do')
await s.unring()
await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: 'Add contact' }))
  await p.getByText('Arun added.').waitFor({ timeout: 30000 })
  await p.waitForLoadState('networkidle')
})
await s.wait(400)
// The list can lag the action's result; reopen the tab so both people show.
await cut.slow(async () => {
  const u = new URL(p.url()); await s.goto(u.pathname + u.search)
  await p.locator('table.slots tbody tr', { hasText: 'Arun' }).waitFor({ timeout: 30000 })
}, 300)
await s.wait(500)
await s.point(p.locator('table.slots tbody'))
await s.say(c.primary, 2500 * pace)
await s.unring()

// UC-002 — log what happened; backdated entries are marked
await s.click(tabs.getByRole('link', { name: /^Timeline/ }))
await cut.slow(() => p.waitForLoadState('networkidle'), 300)
await s.wait(600)
await s.say(c.log, 500 * pace)
const who = p.getByPlaceholder('Type a name, then choose')
await s.type(who, 'Pri', 90)
await s.click(p.getByRole('option', { name: /Priya/ }).first())
await s.type(p.locator('#notes'), 'Wants a quote for 4 drives.', 35)
await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: 'Log it' }))
  await p.getByText(/Logged\./).first().waitFor({ timeout: 30000 })
})
await s.wait(500)

const y = new Date(Date.now() - 86400000)
const yday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}T16:30`
// The form keeps the chosen contact after a log; choose again only if it was cleared.
if (await who.isVisible().catch(() => false)) {
  await s.type(who, 'Pri', 90)
  await s.click(p.getByRole('option', { name: /Priya/ }).first())
}
await p.locator('#interactionType').selectOption('SITE_VISIT')
await s.point(p.locator('#occurredAt'))
await p.locator('#occurredAt').fill(yday)
await s.say(c.late, 2600 * pace, 'do')
await put(p.locator('#notes'), 'Saw the failed drives on line 2.')
await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: 'Log it' }))
  await p.locator('ul.tl li', { hasText: 'Backdated' }).first().waitFor({ timeout: 30000 })
})
await s.wait(500)
await s.point(p.locator('ul.tl li', { hasText: 'Backdated' }).first())
await s.say(c.immutable, 2500 * pace, 'dont')
await s.unring()

// UC-005 — correcting a typo vs. a job move
await s.click(p.locator('ul.tl li', { hasText: 'Backdated' }).first().getByRole('link', { name: /Priya/ }))
await cut.slow(() => p.waitForLoadState('networkidle'), 300)
await s.wait(900)
await s.point(p.locator('#jobTitle'))
await s.say(c.typo, 2500 * pace)
await s.unring()

await s.point(p.locator('section[data-code="MOVE"]'))
await s.say(c.moved, 2600 * pace, 'dont')
const where = p.getByPlaceholder('Search customers')
await s.type(where, `Kaveri Automation ${stamp}`.slice(0, 12), 70)
await s.click(p.getByRole('option', { name: new RegExp(destName) }).first())
const today = new Date()
await p.locator('#transitionDate').fill(
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
)
await put(p.locator('#transitionNotes'), 'Joined Kaveri as plant head')
await cut.slow(async () => {
  await s.click(p.getByRole('button', { name: /Record the move/ }))
  await p.locator('section[data-code="EMP"]').waitFor({ timeout: 30000 })
  await p.waitForLoadState('networkidle')
})
await s.wait(600)
await s.unring()
await s.point(p.locator('section[data-code="EMP"]'))
await s.say(c.movedDone, 2500 * pace, 'do')
await s.unring()

await s.quiet()

// The Sales Head, briefly
await cut.slow(() => asUser(s, 'saleshead@thulirtech.com', `/crm/customers/${trialId}?tab=lifecycle`), 300)
await s.wait(400)
await s.point(p.locator('table.slots tbody tr').first())
await s.say(c.trialOwner, 2500 * pace)
await s.unring()
const convert = p.getByRole('button', { name: 'Convert to Regular' })
await s.point(convert)
await cut.slow(async () => {
  await s.click(convert)
  await p.getByText(/cannot be converted yet/).waitFor({ timeout: 30000 })
})
await s.point(p.getByText(/cannot be converted yet/))
await s.say(c.refused, 2900 * pace, 'dont')
await s.unring()
await s.say(c.oneWay, 2800 * pace)
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 5500 * pace)

console.log('cut', cut.save().toFixed(1), 's')
console.log(await s.close(join(OUT, `01-crm.${lang}.webm`)))
