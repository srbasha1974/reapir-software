/**
 * Module 00 · How a board moves through the shop — everyone. Filmed as the Admin, who sees every screen.
 *
 * Grounded in:
 *  - work_order_status / work_order_sub_status (4 stages, 14 sub-statuses; Closed is terminal)
 *  - app/(app)/mis/pipeline: the stage strip, drawn from the status hierarchy
 *  - timesheet trigger: Pending Spare and On Hold refuse logged time ("paused"); closed jobs too
 *  - service-centre/jobs/[...job]: status, "This job so far" (work_order_status_history), and
 *    "Send it back to the engineer" (work_order.return: Service Head, Liaison; return_to_engineer()
 *    refuses a closed job: "Register a rework job against it rather than reopening this one")
 *  - service-centre/worklists: v_queue_aging — days since entering the current sub-status; Stuck past
 *    the configured threshold
 *
 * The job shown is read, never changed: an open job with the longest history, preferring one paused
 * at Pending Spare. Captions do not name its status.
 *
 *   npx tsx 00-pipeline.ts [en|ta]    → out/00-pipeline.<lang>.webm
 */
import { Stage } from './stage'
import { CAPTIONS, type Lang } from './captions-00'
import { join } from 'node:path'
import { execSync } from 'node:child_process'

const OUT = join(import.meta.dirname, 'out')
const lang = (process.argv[2] ?? 'en') as Lang
const c = CAPTIONS[lang]
if (!c) throw new Error('Language must be en or ta')
const pace = lang === 'ta' ? 1.25 : 1

// Read-only: which job to open.
const job = execSync(
  `docker exec supabase_db_Repair_Service psql -U postgres -At -c "
   select w.job_number from work_order w
     join work_order_status s on s.status_id = w.status_id
     join work_order_sub_status ss on ss.sub_status_id = w.sub_status_id
     left join work_order_status_history h on h.job_number = w.job_number and not h.deleted
    where not w.deleted and not s.is_terminal
    group by w.job_number, ss.sub_status_name
    order by (ss.sub_status_name = 'Pending Spare') desc, count(h.*) desc, w.job_number
    limit 1"`
).toString().trim()
if (!job) throw new Error('No open job to show')

const s = await Stage.open('admin.test@thulirtech.com', '/mis/pipeline', join(OUT, 'raw'))
const p = s.page

await s.card(`<div class="k">${c.kicker}</div><h1>${c.title}</h1><p>${c.sub}</p>`, 3500 * pace)

// The stage map, on the real screen
const stage = (n: number) => p.locator('.pipe.large .stage').nth(n)
await s.point(p.locator('.pipe.large'))
await s.say(c.map, 3200 * pace)
await s.point(stage(1))
await s.say(c.pre, 3600 * pace)
await s.point(stage(2))
await s.say(c.inRepair, 3400 * pace)
await s.point(stage(2).locator('ul.ss li').nth(2))
await s.say(c.paused, 3600 * pace, 'dont')
await s.point(stage(3))
await s.say(c.completed, 3400 * pace)
await s.point(stage(4))
await s.say(c.closed, 3600 * pace)
await s.unring()
await s.quiet()

// One job
await s.goto(`/service-centre/jobs/${job}`)
await s.wait(600)
await s.point(p.locator('dt', { hasText: /^Status$/ }).first().locator('xpath=following-sibling::dd[1]'))
await s.say(c.status, 3000 * pace, 'do')
await s.point(p.locator('span.to').first().locator('xpath=ancestor::table[1]'))
await s.say(c.log, 2600 * pace)
const back = p.getByRole('button', { name: 'Send it back to the engineer' })
await s.point(back)
await s.say(c.sendBack, 3200 * pace)
await s.say(c.noReopen, 3200 * pace, 'dont')
await s.unring()
await s.quiet()

// The queue
await s.goto('/service-centre/worklists')
await s.wait(500)
const queue = p.locator('section.bay', { hasText: 'The whole queue' })
await s.point(queue)
await s.say(c.queue, 1800 * pace)
await s.point(queue.locator('tbody tr').first())
await s.say(c.days, 3400 * pace, 'do')
await s.point(p.locator('section.bay', { hasText: 'Stuck' }).first())
await s.say(c.stuck, 3200 * pace)
await s.unring()
await s.quiet()

await s.card(`<div class="k">${c.remember}</div><ol>${c.rules.map((r) => `<li>${r}</li>`).join('')}</ol>`, 6500 * pace)

console.log(await s.close(join(OUT, `00-pipeline.${lang}.webm`)))
