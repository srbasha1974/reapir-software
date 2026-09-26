/**
 * Re-draws a module's title card with a corrected duration line, for 00-encode.py to lay over the
 * recorded card (the shared server's speed decides a take's length after the card is already filmed).
 *
 *   npx tsx 00-title.ts 12 en "Executive, … About 2½ minutes."   → out/12-title.en.png
 */
import { Stage } from './stage'
import { join } from 'node:path'

const [num, lang, sub] = process.argv.slice(2)
const { CAPTIONS } = await import(`./captions-${num}.ts`)
const c = CAPTIONS[lang]
const s = await Stage.open('admin.test@thulirtech.com', '/profile', join(import.meta.dirname, 'out', 'raw'), { record: false })
await s.page.evaluate((h) => (window as any).__stage.card(h), `<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${sub}</p>`)
await s.page.waitForTimeout(800)
await s.page.screenshot({ path: join(import.meta.dirname, 'out', `${num}-title.${lang}.png`) })
await s.close()
console.log(`out/${num}-title.${lang}.png`)
