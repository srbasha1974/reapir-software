/**
 * Module 18 · Weekly planning and the meetings (repair-service feature 036, decision log Round 10.33).
 *
 * Signed in as the Service Head, who both changes the week (`planning.manage`) and allots. Walks the
 * four tabs of Service › Weekly planning in meeting order, adds a board to the week and withdraws
 * one, records the review's one change, then shows the bench-limit warning on the reservoir and
 * backs out of it without allotting. It needs a week on the local database (reading the plan opens
 * one; the demo week was committed through the app beforehand) and demo + volume data.
 *
 *   npx tsx 18-planning.ts [en|ta]    → out/18-planning.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-18'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const T = (ms: number) => ms * pace

const s = await Stage.open('servicehead@thulirtech.com', '/service-centre/planning', join(OUT, 'raw'))
const p = s.page
const settle = async () => {
  await p.waitForLoadState('networkidle')
  await s.wait(700)
}
const region = (name: string) => p.getByRole('region', { name, exact: true })
const tab = (name: string) => p.locator('nav.viewbar a', { hasText: name })

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, T(4200))
await s.card(
  `<div class="k">${c.rhythmKicker}</div><h2>${c.rhythmTitle}</h2><ol>${c.rhythm.map((r) => `<li>${r}</li>`).join('')}</ol><p>${c.rhythmWho}</p>`,
  T(8500)
)

// ── The daily stand-up ────────────────────────────────────────────────────────────────────────────
await s.point(tab('Stand-up'))
await s.say(c.standup, T(3000))
await s.point(p.locator('nav.viewbar .asof'))
await s.say(c.asOf, T(2600))
await s.click(p.getByRole('button', { name: 'Update' }))
await settle()
await s.point(p.locator('[data-tile="not-logged"]'))
await s.say(c.notLogged, T(3200))
const loaded = p.locator('table.floor tbody tr').filter({ hasText: /At limit|Over limit/ }).first()
await s.point(loaded.locator('td').nth(2))
await s.say(c.atLimit, T(3200))
const blockedRow = p.locator('table.floor tbody tr').filter({ hasText: 'Pending Spare' }).first()
await s.point(blockedRow.locator('td').nth(4))
await s.say(c.blocked, T(3800))
const dueRow = p.locator('table.floor tbody tr').filter({ has: p.locator('td:nth-child(6) .job') }).first()
await s.point(dueRow.locator('td').nth(5))
await s.say(c.due, T(3000))
const stuckRow = p.locator('table.floor tbody tr').filter({ has: p.locator('td:nth-child(7) .job') }).first()
await s.point(stuckRow.locator('td').nth(6))
await s.say(c.stuck, T(4200))
const quietRow = p.locator('table.floor tbody tr.quiet').first()
await s.point((await quietRow.count()) ? quietRow : p.locator('.team .rules'))
await s.say(c.quiet, T(3000))
await s.unring()
await s.say(c.noMoney, T(2800), 'dont')

// One engineer at a time (the user 2026-09-28): the filter in the Engineer column's head.
const pick = async (label: string) => {
  const control = p.getByLabel('Show one engineer')
  await s.click(control)
  const pop = p.locator('.choice-pop')
  if (await pop.isVisible().catch(() => false)) {
    await pop.getByRole('combobox').pressSequentially(label, { delay: 60 })
    await s.wait(400)
    await p.keyboard.press('Enter')
  } else {
    await control.selectOption({ label })
  }
  await settle()
}
await pick('Test Engineer')
await s.point(p.locator('table.floor thead th').first())
await s.say(c.filterOne, T(3400))
await pick('Every engineer')
await s.say(c.filterBack, T(2000))
await s.unring()
await s.quiet()

// ── Monday: the weekly plan ───────────────────────────────────────────────────────────────────────
await s.click(tab('Weekly plan'))
await settle()
await s.say(c.plan, T(1600))
await s.point(region('Carry-over'))
await s.say(c.carry, T(3400))
await s.point(region('Demand'))
await s.say(c.demand, T(3800))
await s.point(region('Capacity'))
await s.say(c.capacity, T(3200))
await s.point(p.locator('table.cl thead'))
await s.say(c.list, T(3600))
const notPriced = p.locator('table.cl .tag', { hasText: 'Not priced' }).first()
if (await notPriced.count()) {
  await s.point(notPriced)
  await s.say(c.notPriced, T(2800))
}
await s.point(p.locator('.footacts .act', { hasText: 'Commit the week' }))
await s.say(c.commit, T(3600), 'do')
await s.unring()

// One engineer's week (FR-035): the list's filter, the Stage column, the count in boards.
const firstName = ((await p.getByLabel('Show one engineer').locator('option').nth(1).textContent()) ?? '').trim()
await pick(firstName)
await s.point(p.locator('.footacts .sum'))
await s.say(c.planOne, T(3800))
await s.click(p.locator('.focus a', { hasText: 'Every engineer' }))
await settle()
await s.unring()

// Add a board mid-week
await s.click(p.getByRole('link', { name: 'Add to the week' }))
await settle()
await s.say(c.addOpen, T(2200))
await s.click(p.locator('.pick input[type="checkbox"]').first())
await s.click(p.getByRole('button', { name: 'Add the ticked boards' }))
await settle()
const added = p.locator('table.cl tr.said', { hasText: 'Added' }).last()
await s.point(added)
await s.say(c.addDone, T(2800))

// Withdraw one
await s.click(p.getByRole('link', { name: 'Withdraw…' }).first())
await settle()
await s.say(c.withdrawOpen, T(2600))
await s.click(p.locator('.actform .radios label', { hasText: 'Customer not reachable' }))
await s.point(p.locator('.actform .settled'))
await s.say(c.withdrawKeeps, T(4400))
await s.click(p.getByRole('button', { name: 'Withdraw from the week' }))
await settle()
await s.point(p.locator('table.cl tr.said.wd').first())
await s.say(c.withdrawDone, T(3200), 'do')
await s.unring()
await s.quiet()

// ── All week: the burn-up ─────────────────────────────────────────────────────────────────────────
await s.click(tab('Burn-up'))
await settle()
await s.point(p.locator('svg.chart'))
await s.say(c.burnup, T(2200))
await s.point(p.locator('p.stmt').first())
await s.say(c.done, T(3600), 'do')
await s.click(p.getByRole('navigation', { name: 'Unit' }).getByRole('link', { name: 'Boards' }))
await settle()
await s.say(c.boards, T(2800))
await s.point(region('Changes to the week'))
await s.say(c.log, T(2400))
await s.unring()
await s.quiet()

// ── Saturday: the weekly review ───────────────────────────────────────────────────────────────────
await s.click(tab('Weekly review'))
await settle()
await s.point(region('The week'))
await s.say(c.review, T(3200))
await s.point(region('Blocked or stuck'))
await s.say(c.causes, T(3800))
await s.point(region('Flow'))
await s.say(c.flow, T(3200))
await s.point(region('Where work piles up'))
await s.say(c.pile, T(2000))
await s.click(p.getByRole('link', { name: 'Record the change' }))
await settle()
await s.say(c.change, T(1800))
await s.type(p.locator('#rv-change'), c.changeText, 28)
await s.click(p.getByRole('button', { name: 'Record the change' }))
await settle()
await s.point(region('One change'))
await s.say(c.changeDone, T(3000), 'do')
await s.unring()
await s.quiet()

// ── The bench limit, when allotting ───────────────────────────────────────────────────────────────
await s.goto('/service-centre/reservoir')
await s.wait(600)
await s.say(c.allot, T(1800))
await s.click(p.locator('table.allot input.check:not([disabled])').first())
const find = p.locator('.give input[type="search"]')
if (await find.count()) await s.type(find, 'Arun', 60)
await s.click(p.locator('.give label.radio').filter({ hasText: /Arun/ }).first())
await p.locator('.bench-warn').waitFor()
await s.point(p.locator('.bench-warn'))
await s.say(c.warn, T(3600))
await s.point(p.getByRole('button', { name: /Allot anyway/ }))
await s.say(c.warnDo, T(3000), 'do')
await s.click(p.getByRole('button', { name: 'Choose someone else' }))
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, T(7500))

console.log(await s.close(join(OUT, `18-planning.${lang}.webm`)))
