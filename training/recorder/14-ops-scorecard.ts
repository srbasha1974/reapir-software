/**
 * Module 14 · Numbers · Operations 2: reading a scorecard (KPI catalogue clip 1b).
 *
 * Service › Performance, first as the Engineer (own row only), then as the Service Head (everyone,
 * with the Small sample row). A worked-example card per column, then the column on screen.
 * The demo scorecard also holds other training jobs, so captions never quote its numbers.
 *
 *   npx tsx 14-ops-scorecard.ts [en|ta]    → out/14-ops-scorecard.<lang>.webm
 */
import { Stage } from './stage'
import { asUser, example } from './13-kpi-helpers'
import { CAPTIONS, type Lang } from './captions-14'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1
const CARD = 6500 * pace
const PATH = '/service-centre/performance'

const s = await Stage.open('engineer@thulirtech.com', PATH, join(OUT, 'raw'))
const p = s.page
const row = () => p.locator('table.cards tbody tr', { hasText: 'Test Engineer' }).first()
const cell = (i: number) => row().locator('td').nth(i)

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3800 * pace)

await s.point(row())
await s.say(c.own, 3600 * pace)
await s.point(cell(1))
await s.say(c.closed, 3000 * pace)
await s.unring()

// Efficiency
await s.quiet()
await s.card(example(c.exEff), CARD + 1000 * pace)
await s.point(cell(2))
await s.say(c.eff, 3000 * pace)
await s.point(p.locator('section[data-code="STD"]'))
await s.say(c.std, 3200 * pace)
await s.unring()

// First pass
await s.quiet()
await s.card(example(c.exFirst), CARD)
await s.point(cell(3))
await s.say(c.first, 3000 * pace)

// Rework
await s.quiet()
await s.card(example(c.exRework), CARD)
await s.point(cell(4))
await s.say(c.rework, 2800 * pace)
await s.say(c.reworkDont, 3600 * pace, 'dont')

// Non-repairable
await s.quiet()
await s.card(example(c.exNr), CARD - 1000 * pace)
await s.point(cell(5))
await s.say(c.nr, 3000 * pace)
await s.unring()

// Small sample, as the Service Head
await s.quiet()
await s.card(example(c.exSmall), CARD)
await asUser(s, 'servicehead@thulirtech.com', PATH)
await s.point(p.locator('table.cards'))
await s.say(c.lead, 2400 * pace)
const small = p.locator('table.cards tbody tr', { hasText: 'Small sample' }).first()
if (await small.isVisible().catch(() => false)) {
  await s.point(small)
  await s.say(c.small, 3800 * pace)
}
await s.unring()
await s.say(c.together, 3000 * pace, 'do')
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)

console.log(await s.close(join(OUT, `14-ops-scorecard.${lang}.webm`)))
