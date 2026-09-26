/**
 * Module 17 · Numbers · Sales: what your accounts are worth (KPI catalogue clip 3).
 *
 * Signed in as the Sales Head. Sales analytics › By engineer (Charged, its drill with boards A, C, D
 * from kpi-seed.json, Filled, unpriced), Profitability › Premium by customer and segment, then Won,
 * team conversion and the funnel medians. Worked-example card first each time. Nothing is written.
 *
 *   npx tsx 17-sales.ts [en|ta]    → out/17-sales.<lang>.webm
 */
import { Stage } from './stage'
import { example } from './13-kpi-helpers'
import { CAPTIONS, type Lang } from './captions-17'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const CARD = 6500 * pace
const seed = JSON.parse(readFileSync(join(import.meta.dirname, 'kpi-seed.json'), 'utf8')) as Record<string, string>

const s = await Stage.open('saleshead@thulirtech.com', '/mis/sales?period=this-month', join(OUT, 'raw'))
const p = s.page
const conv = () => p.locator('section[data-code="S-03"]')
const arun = () => conv().locator('tbody tr', { hasText: 'Test Sales Engineer' }).first()

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3800 * pace)

await s.point(conv())
await s.say(c.open, 3600 * pace)
await s.unring()

// Charged, the drill, unpriced
await s.quiet()
await s.card(example(c.exCharged), CARD + 1000 * pace)
await s.point(arun().locator('td').nth(2))
await s.say(c.charged, 3400 * pace)
await s.say(c.drill, 1600 * pace)
await s.click(arun().locator('td').nth(2).locator('a'))
await p.waitForLoadState('networkidle')
await s.wait(900)
// The list is paged to fit the window; name a longer page so A, C and D are all on it.
{
  const u = new URL(p.url())
  u.searchParams.set('rows', '40')
  await s.goto(u.pathname + u.search)
  await s.wait(500)
}
for (const [job, cap] of [[seed.A, c.rowA], [seed.C, c.rowC], [seed.D, c.rowD]] as const) {
  const r = p.locator('tbody tr', { hasText: job }).first()
  if (await r.isVisible().catch(() => false)) {
    await s.point(r)
    await s.say(cap, 2600 * pace)
  }
}
await s.unring()
await s.goto('/mis/sales?period=this-month')
await s.point(conv().getByText(/unpriced/).first())
await s.say(c.unpriced, 3000 * pace)
await s.unring()

// Filled
await s.quiet()
await s.card(example(c.exFilled), CARD)
await s.point(arun().locator('td').nth(3))
await s.say(c.filled, 3200 * pace)
await s.unring()

// Premium and discount by customer / segment
await s.quiet()
await s.card(example(c.exPrem), CARD + 1000 * pace)
await s.goto('/mis/profitability?period=this-month&cut=premium&by=customer')
await s.point(p.locator('nav.cut'))
await s.say(c.premTab, 2200 * pace)
await s.point(p.locator('table.pd'))
await s.say(c.premRows, 4000 * pace)
const hand = p.locator('p.tabnote.hand')
if (await hand.isVisible().catch(() => false)) {
  await s.point(hand)
  await s.say(c.byHand, 4200 * pace)
}
await s.click(p.locator('nav.cut').getByRole('link', { name: 'Segment' }))
await p.waitForLoadState('networkidle')
await s.wait(700)
await s.point(p.locator('table.pd'))
await s.say(c.segment, 1800 * pace)
await s.say(c.premDont, 2800 * pace, 'dont')
await s.unring()

// Won
await s.quiet()
await s.card(example(c.exWon), CARD)
await s.goto('/mis/sales?period=this-month')
await s.point(arun().locator('td').nth(1))
await s.say(c.won, 3000 * pace)

// Team conversion
await s.quiet()
await s.card(example(c.exConv), CARD)
await s.point(conv().getByText(/team conversion/).first())
await s.say(c.conv, 2800 * pace)
await s.point(p.locator('section[data-code="S-02"] ul.bars'))
await s.say(c.bars, 2800 * pace)
await s.unring()

// Velocity
await s.quiet()
await s.card(example(c.exVel), CARD)
await s.point(p.locator('section[data-code="S-02"] .vel'))
await s.say(c.vel, 3200 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)

console.log(await s.close(join(OUT, `17-sales.${lang}.webm`)))
