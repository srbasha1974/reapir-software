/**
 * Module 09 · Closing a job — Engineer, Service Head, Liaison.
 *
 * Grounded in UC-014, UC-013 step 9 and the code:
 *  - app/(app)/service-centre/jobs/[...job]/acts.tsx + decision-forms.tsx: "It cannot be saved…"
 *    (Service Head), a <select> of reasons and no text box; close_non_repairable() refuses a missing
 *    reason; non_repairable_is_final() makes it final. The engineer's "Cannot repair…" is not shown:
 *    its reason list comes up empty for the Engineer role (no non_repairable_reason.read), see notes.
 *  - verification/verify-forms.tsx CustomerTestForm: "It works — close it" → record_customer_test()
 *    → Closed / Ready for Invoice; "Still faulty — back to the bench" → In Progress.
 *  - reservoir/queue-acts.tsx: "Customer withdrew" (note "How you know") → Customer Rejected; a
 *    rejected quotation closes its jobs the same way (migration quotation_moves_the_job).
 *  - return_to_engineer(): Service Head or Liaison, from any OPEN sub-status; a closed job is refused.
 *
 * The set-up is unrecorded and goes through the app as the proper roles (09-setup.ts).
 *
 *   npx tsx 09-closing.ts [en|ta]    → out/09-closing.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-09'
import * as S from './09-setup'
import { join } from 'node:path'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
// Tamil captions are longer and read slower; the whole clip runs a little tight to stay near 110 s.
const pace = (lang === 'ta' ? 1.15 : 1) * 0.88

// ---- Unrecorded set-up: one fresh delivery of four units, moved to the states the clip needs. ----
const CUSTOMER = 'Ayyan Industrial Systems'
const [A, B, C, D] = await S.registerDelivery({
  customer: CUSTOMER, search: 'Ayyan', units: 4, brand: 'Mean Well', device: 'Power supply',
  model: 'RSP-750', complaint: 'Trips on load', accessories: 'mounting bracket', prefix: 'MW',
})
await S.pickUp([A, B, C, D])
await S.agreePrice(CUSTOMER, [A, B, D], 6500)
await S.allot([A, B, D])
await S.engineer([A], false)
await S.engineer([B, D], true)
await S.verifyPass([B, D])
S.expectState([A], 'In Progress')
S.expectState([B, D], 'Awaiting Customer Confirmation')
S.expectState([C], 'Under Assessment')
console.log('set up', { A, B, C, D })

// ---- Recording ----
const s = await Stage.open('servicehead@thulirtech.com', S.jobPath(A), join(OUT, 'raw'))
const p = s.page

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

// 1 · Non-Repairable, by the Service Head
await s.point(p.locator('.card-head'))
await s.say(c.three, 3400 * pace)
await s.unring()

const cannot = p.getByRole('button', { name: 'It cannot be saved…' })
await s.point(cannot)
await s.say(c.cannot, 3000 * pace)
await s.click(cannot)
await s.wait(500)

const reason = p.locator('select[name="reasonId"]')
await s.point(reason)
await s.say(c.reason, 3600 * pace, 'do')
await reason.selectOption({ label: 'Component unavailable' })
await s.wait(900)

const closeBtn = p.getByRole('button', { name: 'Close as non-repairable' })
await s.point(closeBtn)
await s.say(c.noWayBack, 3400 * pace, 'dont')
await s.click(closeBtn)
await p.waitForURL(/closed=1/)
await p.waitForLoadState('networkidle')
await s.point(p.getByText('Closed as non-repairable.'))
await s.say(c.closed, 3800 * pace)
await s.unring()
await s.quiet()

// 2 · An open job goes back to the bench; a closed one cannot
await s.goto(S.jobPath(D))
const back = p.getByRole('button', { name: 'Send it back to the engineer' })
await s.point(back)
await s.say(c.sendBack, 3400 * pace)
await s.click(back)
await s.type(p.getByLabel('Why it is going back'), 'Trips again under load', 45)
await s.say(c.sendWhy, 2200 * pace)
await s.click(p.getByRole('button', { name: 'Send back to the engineer' }))
await p.waitForURL(/returned=1/)
await p.waitForLoadState('networkidle')
await s.point(p.locator('dl.kv').first().locator('dd').first())
await s.say(c.backDone, 2800 * pace, 'do')
await s.unring()

await s.goto(S.jobPath(A))
await s.point(p.getByText('This job is closed; nothing moves it on from here.'))
await s.say(c.closedFinal, 3600 * pace, 'dont')
await s.unring()
await s.quiet()

// 3 · Customer testing passed, by the Liaison
await S.become(s, 'liaison@thulirtech.com', `/service-centre/verification?view=customer&card=${encodeURIComponent(B)}`)
await S.roleCard(s, c.now, 'Liaison', 1600 * pace)
await s.point(p.locator('a.item', { hasText: B }))
await s.say(c.custList, 3000 * pace)
await s.type(p.getByLabel('What they said'), 'Runs fine on their line', 45)
const works = p.getByRole('button', { name: 'It works — close it' })
await s.point(works)
await s.say(c.pass, 3600 * pace, 'do')
await s.click(works)
await p.waitForURL(/closed=/)
await p.waitForLoadState('networkidle')
await s.goto(S.jobPath(B))
await s.point(p.locator('dl.kv').first().locator('dd').first())
await s.say(c.passDone, 3800 * pace, 'do')
await s.unring()
await s.quiet()

// 4 · Customer withdrew, by the Liaison
await s.goto(`/service-centre/reservoir?queue=${encodeURIComponent('Under Assessment')}&job=${encodeURIComponent(C)}`)
const chosen = p.locator('.chosen')
await s.point(chosen)
await s.say(c.withdrewIntro, 3000 * pace)
await s.click(chosen.getByRole('button', { name: 'Customer withdrew' }))
await s.type(p.getByLabel('How you know'), 'Phoned: not worth repairing', 45)
await s.say(c.withdrew, 2400 * pace)
await s.click(chosen.getByRole('button', { name: 'Customer withdrew' }))
await p.waitForLoadState('networkidle')
await s.wait(1200)
await s.goto(S.jobPath(C))
await s.point(p.locator('dl.kv').first().locator('dd').first())
await s.say(c.rejectedDone, 3200 * pace)
await s.say(c.quoteRejected, 3800 * pace, 'dont')
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)

console.log(await s.close(join(OUT, `09-closing.${lang}.webm`)))
