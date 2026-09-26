/**
 * Module 16 · Numbers · Money 2: the month in money — Operations Manager · Service Head.
 * KPI-CATALOGUE.md clip 2b: Base margin %, premium captured and its share, Total margin and why
 * Revenue − Cost differs (the write-off), cost of rework carried (comeback R rolled onto A), spares
 * not charged / uncosted hours, Actual / Target / Achievement, labour on open boards.
 *
 * Screens: MIS dashboard tiles (app/(app)/mis/page.tsx), Job profitability cards and cuts
 * (mis/profitability/page.tsx, ?cut=rework / ?cut=spares), Performance, and the Overview's
 * "Labour on open boards" (lib/domain/mis.ts). Signed in as the Operations Manager throughout.
 * Needs kpi-seed.json (npx tsx 15-setup.ts, then STEP=rework for R).
 *
 *   npx tsx 16-money-month.ts [en|ta]   → out/16-money-month.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-16'
import { sumCard, pointAll } from './15-cards'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1

const s = await Stage.open('opsmanager@thulirtech.com', '/mis', join(OUT, 'raw'))
const p = s.page
const card = (o: Parameters<typeof sumCard>[0], ms: number) => s.card(sumCard(o), ms * pace)
/** A cut tab; the page's own rows-to-fit redirect can swallow the first click, so press again. */
async function openCut(name: RegExp, key: string) {
  for (let i = 0; i < 3; i++) {
    await s.click(p.getByRole('link', { name }).first())
    if (await p.waitForURL(new RegExp(`cut=${key}`), { timeout: 5000 }).then(() => true, () => false)) break
  }
  await p.waitForLoadState('networkidle')
}
const fig = (label: string | RegExp) => p.locator('.fig', { has: p.locator('.lbl', { hasText: label }) }).first()

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3800 * pace)
await card(c.month, 9500)

// ── MIS dashboard: refresh, Base margin, Premium captured ──────────────────────────────────────
const refresh = p.getByRole('button', { name: 'Refresh now' }).first()
await s.point(refresh)
await s.say(c.refresh, 3200 * pace, 'do')
await s.click(refresh)
await p.waitForLoadState('networkidle')
await s.wait(1500)
await s.unring()
await s.quiet()
await card(c.baseCard, 9000)
await s.point(fig(/Base margin/))
await s.say(c.baseTile, 3600 * pace)
await s.unring()
await s.quiet()
await card(c.premCard, 8000)
await s.point(fig(/Premium captured/))
await s.say(c.premTile, 3600 * pace)
await s.unring()
await s.quiet()

// ── Job profitability: Total margin and the write-off; rework; spares; uncosted ────────────────
await card(c.totalCard, 10500)
await s.goto('/mis/profitability')
await s.wait(600)
await pointAll(s, [fig(/^Revenue$/), fig(/^Cost$/)])
await s.wait(400)
await pointAll(s, [fig(/^Revenue$/), fig(/^Total margin/)])
await s.say(c.totalShown, 3800 * pace)
await s.unring()
await s.quiet()
await card(c.reworkCard, 10000)
await s.point(fig(/^Cost$/))
await s.say(c.reworkCost, 3600 * pace)
await openCut(/^Rework carried/, 'rework')
await s.wait(800)
await s.point(p.locator('table').filter({ hasText: 'Charged back to' }).first())
await s.say(c.reworkTab, 3800 * pace)
await openCut(/^Spares not charged/, 'spares')
await s.wait(800)
await s.point(p.locator('tr', { hasText: 'Fuse, 10 A fast-blow' }).first())
await s.say(c.spares, 3600 * pace)
await s.point(fig(/^Uncosted hours/))
await s.say(c.uncosted, 3600 * pace, 'do')
await s.unring()
await s.quiet()

// ── Performance: Actual / Target / Achievement ─────────────────────────────────────────────────
await card(c.achCard, 11000)
await s.goto('/service-centre/performance')
await s.wait(600)
const row = p.locator('tbody tr').filter({ hasText: 'Test Engineer' }).first()
await pointAll(s, [row.locator('td').nth(6), row.locator('td').nth(8)])
await s.say(c.perf, 3800 * pace)
await s.unring()
await s.quiet()

// ── Overview: Labour on open boards ────────────────────────────────────────────────────────────
await card(c.openCard, 8000)
await s.goto('/')
await s.wait(600)
await s.point(p.locator('[data-code="LAB"]').first())
await s.say(c.open, 3800 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 7000 * pace)

console.log(await s.close(join(OUT, `16-money-month.${lang}.webm`)))
