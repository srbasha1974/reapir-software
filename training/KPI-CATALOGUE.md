# KPI catalogue for staff training videos

The non-obvious figures in the Thulir service console, in three modules: **Operational**, **Money** and
**Sales**. Each one is explained the way the code computes it **on `develop` at `b053262`** (features 031
and 032, 27 Sep 2026). Plain counts, such as the number of jobs or open work orders, are left out.

- **Source of truth:** the database and code in `repair-service`. Every `file:line` below is relative to
  that repo. Where MET-001, a spec or an in-app explanation disagrees with the code, the code wins and
  the difference is flagged with ⚠ (and listed at the end).
- **The in-app explanations** (`semantic_measure_explanation`, the "?" beside a figure, feature 030) say
  the same thing as this catalogue and use the same worked month. Where their example differs, it is
  listed under *Where the in-app explanations disagree*.
- **Worked examples:** all of them come from **one month at one shop** (below), so each figure builds on
  the one before. The local demo's numbers are different (hours cost ₹700/h there, and other training
  jobs share the month); clips say "your figures will differ" wherever the screen is shown.

### What changed on 27 Sep 2026 (and must no longer be taught as a trap)

| Finding | Before | Now |
|---|---|---|
| **K1** | A write-off's cost was in *Cost* but not in *Total margin*, so Revenue − Cost ≠ Total margin | A write-off counts nought revenue and its whole cost in both: **Revenue − Cost = Total margin**, and it is among the *Jobs at a loss* |
| **K2** | A comeback's cost was rolled onto the original **and** kept on the rework (counted twice), and it rewrote the original's month | Counted **once, on the rework, in the month the rework closes**, charged to the engineer whose repair came back. The original's own record still shows its whole-life cost |
| **K5** | Peer-verification hours sat in the repairer's hours; Profitability › By engineer did not add them back, Performance did | Verification hours are **the verifier's**: in their hours, credited to their Actual. Profitability › By engineer has a **Checking** column and now agrees with Performance |
| **K3** | Scorecard *Rework* = rework jobs you handled | = **your own closures that came back** |
| **K4** | *First pass* counted write-offs as passes | Over **boards that went through verification** only |
| **K6** | *What has stalled › Stuck* = calendar days in one state | **One stuck rule** everywhere: working days since the last hour, part or move, for boards on the bench |
| **K7** | *Won* = accounts **opened** in the period that ever converted | = conversions **made** in the period |
| **K8** | Screen: median per step; MCP: mean over the whole journey | **Median per step**, screen and MCP |
| **K11** | Win rate and negotiated prices were measures shown nowhere | MIS › Sales shows **Quotations won** and **Agreed by negotiation** |
| **K13** | No screen set a board's rate-card basis, so no board was ever priced by a rate | The Service Head (or Liaison) uses **Price from the rate card…** on the job card; the reservoir's *Assessed — rate card* tag appears only where a rate priced the board |
| **K17** | MCP scorecard measures read an empty table | They read the scorecard's own rows (`v_scorecard_job`) |

---

## The worked month: September at Thulir

Engineer **Ramachandran** closes four boards in September. His colleague **Baleswar** does the peer
verification. Labour costs **₹400/h** for everyone.

| Job | What | Pricing | Normal price N | Agreed Q | Parts billed P (sell) | Parts cost | Hours × ₹400 | Outcome |
|---|---|---|---|---|---|---|---|---|
| **A** | Servo drive, AYYAN INDUSTRIAL, line down | Quotation. No rate card, so the Liaison **typed** N (*Set by hand*). Reason: *Urgent turnaround* | ₹10,000 | ₹12,000 | ₹2,400 (2 IGBTs + gate driver) | ₹1,800 + a ₹150 fuse given free = ₹1,950 | Ramachandran 5 h repair + **Baleswar 1 h verification** = 6 h = ₹2,400 on the job | Ready for Invoice, passed verification first time |
| **B** | PLC power supply, a **contract** customer | **Rate card** ₹6,000. The Service Head chose the rate with *Price from the rate card…* on the job card; no quotation | ₹6,000 | ₹6,000 | ₹500 | ₹350 | 4 h = ₹1,600 | Ready for Invoice, **failed verification once** |
| **C** | VFD control board | Normal price typed ₹10,000 (*Set by hand*); ₹8,000 agreed on the phone (a negotiated price) | ₹10,000 | ₹8,000 | ₹1,000 | ₹700 | 8 h = ₹3,200 | Ready for Invoice, passed verification first time |
| **D** | Mammography PMC board | Written off, never priced, **never verified** | — | — | — | — | 6 h = ₹2,400 | Non-Repairable |

On **31 Oct**, board A comes back inside its 3-month warranty and becomes rework job **R**, priced ₹0.
**Baleswar fixes R**: 2 h (₹800) and a ₹300 part given free, so R costs ₹1,100. R closes on 31 Oct.
Several examples below use it.

Standard times: A 6 h, B 4 h, C 10 h, D none. Ramachandran's September target is ₹20,000.

**The month at a glance** (every figure below is derived in its section):

| | A | B | C | D | September |
|---|---|---|---|---|---|
| Charged (revenue) | 12,000 | 6,000 | 8,000 | — (0) | **26,000** |
| Labour charge | 7,600 | 5,500 | 9,000 | — | 22,100 |
| Job's labour cost | 2,400 | 1,600 | 3,200 | 2,400 | 9,600 |
| Parts cost | 1,950 | 350 | 700 | 0 | 3,000 |
| = Cost | 4,350 | 1,950 | 3,900 | 2,400 | **12,600** |
| Labour margin (job) | 5,200 | 3,900 | 5,800 | — | **14,900** (67.4%) |
| Parts margin | 450 | 150 | 300 | — | 900 (23.1%) |
| Premium / discount | +2,000 | 0 | −2,000 | — | |
| Total margin | 7,650 | 4,050 | 4,100 | −2,400 | **13,400** (51.5%) = 26,000 − 12,600 |
| Ramachandran's credit | 5,600 | 3,900 | 5,800 | — | **15,300** (A's checking hour added back) |

---

# Module 1: Operational KPIs

### 1.1 Yield

- **On screen:** MIS dashboard › *This period's figures* tile **"Yield"** (detail line: *"3 : 1 success to
  wastage"*). Also *Yield* › **"Pipeline yield"** › **"Success to wastage"**, which adds a segment table
  with the columns *Completed / Written off / Yield*.
- **Who sees it:** MIS roles, meaning Admin, Executive Management, Operations Manager, Sales Head,
  Service Head and Liaison.
- **Plain meaning:** of the boards we finished deciding on this month, the share we actually repaired.
- **Formula:**
  - Yield = successes ÷ (successes + wastage), over jobs whose **close date** falls in the period
    (`lib/domain/reports/tiles.ts:125-136`; `supabase/migrations/20260905000900_yield_report_TD-006.sql:25-60`;
    counts from `period_closure_figures`, `20260927000100_money_counted_once_MET-001.sql:310-329`).
  - Success means a sub-status flagged `counts_as_success`, which today is only *Ready for Invoice*.
  - Wastage means `counts_as_wastage`: *Non-Repairable* **and** *Customer Rejected*.
  - The flags are configuration, not status names.
  - A month with nothing decided shows **"Nothing to measure"**, not 0%.
- **Worked example:** A, B and C are Ready for Invoice (3). D is Non-Repairable (1). 3 ÷ (3 + 1) =
  **75.0%**, and the tile reads *"3 : 1 success to wastage"*.
- **How to read it:**
  - Higher is better. A falling trend on one device type or one engineer (use *Segment by*) points to a
    capability gap or a board we should stop accepting.
  - **Misreading to avoid:** "25% of our work was wasted by engineers." Customer Rejected counts as
    wastage even when the customer simply said no to the price. Board type drives this more than skill
    does (MET-001 T-05).

### 1.2 Wastage cost this period (hours)

- **On screen:** *Yield* › *Success to wastage* › **"Wastage cost this period"**, for MIS roles.
- **Plain meaning:** the engineering hours sunk into boards that ended as write-offs or rejections.
- **Formula:** the sum of **every hour ever logged** on the wastage jobs closed in the period, including
  hours logged in earlier months (`20260905000900_yield_report_TD-006.sql:44-50`).
- **Worked example:** D closed in September with 6 h logged, so the figure is **6 h**. If 2 of those hours
  had been logged in August, it would still read 6 h.
- **How to read it:**
  - Five write-offs of 1 h each are cheap diagnosis. One write-off of 30 h is a job somebody should
    have stopped earlier.
  - **Misreading to avoid:** matching it against the month's timesheets. It is not a September-hours
    figure.

### 1.3 Rework rate

- **On screen:** MIS dashboard tile **"Rework rate"** (detail *"0 of 4 closures"*), and *Yield* ›
  **"Rework jobs"**. MIS roles.
- **Plain meaning:** of everything that closed, the share that was a second attempt at an earlier job.
- **Formula:** closed jobs with a `previous_job_number` ÷ all closures in the period
  (`tiles.ts:121`; `period_closure_figures`, `20260927000100_money_counted_once_MET-001.sql:322`).
- **Worked example:**
  - September: 0 of 4, which reads **0.0%**.
  - October: R closes. If 9 other jobs also close, it reads 1 ÷ 10 = **10.0%**.
- **How to read it:**
  - Rising rework means repairs are not holding. Open Profitability › *Rework carried* to see which
    original job failed.
  - **Misreading to avoid:** confusing it with the *Rework* column on Performance (1.8). That column is
    one engineer's own closures that came back, counted in the month the original closed; this tile
    counts the second attempts that closed this month, whoever made them.

### 1.4 Stuck tasks / Stuck jobs

- **On screen:**
  - MIS dashboard tile **"Stuck jobs"** (*"past the configured threshold, in business days"*).
  - *Stuck tasks* › **"Idle longest first"** (columns *Job number, Customer, Engineer, State, Idle,
    Priority*) with its **"What counts as stuck"** panel.
  - Service › *What has stalled* › **Stuck** (1.5), the same rule.
- **Plain meaning:** a board on the bench (Alloted or In Progress) that **nobody has touched**. Touching
  it means logging hours, booking a part or changing its status.
- **Formula** (`v_stuck_task`; `20260905000300_stuck_task_activity_once_SC-004.sql:30-70`, scope
  `20260922000300_stuck_scope_follows_the_spec_US-036.sql`):
  - idle = business days (Mon–Fri) from the last activity to today.
  - Stuck when idle **>** threshold. The threshold is `stuck_task_threshold_days`, currently 5.
  - In scope: the sub-statuses flagged `in_stuck_task_scope` — today **Alloted** and **In Progress**.
    Pending Spare, On Hold and the testing gates are out of scope.
  - ⚠ There is no holiday calendar, so a public holiday adds a day (MET-001 T-03).
- **Worked example:**
  - An In Progress board was last touched on **Thu 10 Sep**.
  - On Thu 17 Sep, idle = 5 business days. 5 is not > 5, so it is **not stuck**.
  - On Fri 18 Sep, idle = 6, so it is **stuck**.
  - If the engineer logs 0.5 h on the 18th, the clock resets to 0.
- **How to read it:**
  - Every stuck job is an allocation or blocking problem the Service Head should raise in stand-up.
  - **Misreading to avoid:** "a long job is a stuck job." A board worked on every day is never stuck
    here, however old it is.

### 1.5 "What has stalled" › Stuck (the same rule, on the Service screen)

- **On screen:** Service › *What has stalled* › **"Stuck"** (*"N jobs idle past 5 working days"*,
  columns *Job, Customer, Sitting at, Last activity, Idle*).
- **Who sees it:** anyone holding `work_order.read`, including Engineers, who see only their own boards.
- **Plain meaning:** the same boards as MIS › *Stuck tasks* (1.4): on the bench, untouched for more than
  the threshold in working days. Since 27 Sep 2026 there is **one stuck rule** (decision Round 10.31, K6).
- **Formula:** reads `v_stuck_task`'s `is_stuck`, `days_idle` and `last_activity_on`
  (`lib/domain/status-history.ts:103-141`; `app/(app)/service-centre/worklists/page.tsx:70-115`).
- **The whole queue, beside it, is a different list:** *The whole queue* (code Q) shows every open board
  with **calendar days in its current state** and marks those *at or past* the threshold. It is a queue
  view, not a stuck count, and logging hours does not reset it.
- **Worked example:** a board entered In Progress on Thu 10 Sep and gets hours logged every day. It is on
  **neither** stuck list, and on Tue 15 Sep *The whole queue* shows it at 5 days in In Progress.
- **How to read it:**
  - Stuck (either screen) asks "is anyone touching it?". *The whole queue* and Queue aging (1.6) ask
    "why is it still here?".
  - The two stuck counts now match; if they do not, the MIS copy needs a refresh.

### 1.6 Queue aging (and the testing gates call-out)

- **On screen:**
  - *Queue aging* › **"Open work orders by state and age"**, with columns **0–2 d · 3–5 d · 6–10 d ·
    11 d +** and *Total*. The testing-gate states carry a small *testing gate* tag and are ordinary rows
    (K16 fixed a stray style).
  - The **"The testing gates"** panel beside it.
  - MIS roles.
- **Plain meaning:** where the open boards are waiting, and for how long **in their current state**.
  The total age of the job does not matter here.
- **Formula:**
  - days_in_state = today − the date of the last status change (calendar days). The board is placed in
    brackets from `queue_aging_brackets = 3,6,11` (`queue_aging_matrix()`,
    `supabase/migrations/20260905000800_queue_aging_matrix_TD-006.sql:22`).
  - The gates are *Ready for Verification* and *Awaiting Customer Confirmation*. Their call-out counts
    boards **more than** the third bracket's lower bound, **6 days** (`lib/domain/reports/attention.ts:32-50`,
    `.gt('days_in_state', days)`; `app/(app)/mis/aging/page.tsx:148-175`). A board at exactly 6 days is in
    the 6–10 d column and is not called out.
- **Worked example:**
  - Board B entered Ready for Verification on 12 Sep. On 20 Sep it is 8 days in state, so it lands in
    the **6–10 d** column and is called out ("longer than 6 days") in the gates panel.
  - If B was registered on 1 Aug, it is still an 8-day problem, not a 50-day one.
- **How to read it:**
  - Build-ups in the gates are finished repairs that earn nothing until they clear. Chase verifiers and
    customer confirmations first.
  - **Misreading to avoid:** blaming the floor for age in *Under Assessment* / *Awaiting Customer
    Input*. That queue belongs to the Liaison (MET-001 T-02).

### 1.7 Unbilled hours

- **On screen:**
  - MIS dashboard tile **"Unbilled hours"** (*"24.3% of 37 h logged · 10 h still open"*).
  - *Unbilled hours* › **"Unbilled hours tracer"**.
  - MIS roles.
- **Plain meaning:** hours we logged this month that will never reach a price.
- **Formula:**
  - Every timesheet entry with a **work date** in the period gets exactly one disposition
    (`supabase/migrations/20260919000400_hours_disposition_TD-006.sql:43-85`):
    - **BILLED:** the job succeeded or is on an invoice batch.
    - **NON_REPAIRABLE**, **QUOTATION_REJECTED**, **CUSTOMER_REJECTED**.
    - **IDLE:** the job is flagged stuck (1.4).
    - **OPEN:** everything else.
  - Unbilled = all hours except BILLED and **OPEN** (`lib/domain/reports/hours.ts:47-48`).
- **Worked example:**
  - September timesheets:
    - A 6 h (5 h repair + Baleswar's 1 h checking), B 4 h and C 8 h are BILLED.
    - D 6 h is NON_REPAIRABLE.
    - Open job E has 10 h (OPEN).
    - Job F has 3 h and is currently stuck (IDLE).
  - Logged = 37 h. Unbilled = 6 + 3 = **9 h**, and 9 ÷ 37 = **24.3%**. The tile also shows *10 h still
    open*.
- **How to read it:**
  - A high share means diagnosis time is going on boards we lose. Check the *where it went* rows.
  - **Misreading to avoid:** treating last month's figure as final. Dispositions follow **today's**
    status, so September's number moves when E closes or F gets touched.

### 1.8 Engineer scorecard: Efficiency, First pass, Rework, Non-repairable

- **On screen:** Service › *Performance* › month table, columns **"Closed"**, **"Efficiency"**, **"First
  pass"**, **"Rework"**, **"Non-repairable"** (`app/(app)/service-centre/performance/page.tsx:108-170`).
- **Who sees it:** an Engineer sees their own row. Liaison, Operations Manager, Sales Head, Service Head,
  Admin and Executive Management see everyone.
- **Plain meaning:**
  - **Efficiency:** how your repair hours compare with the standard time for the same board.
  - **First pass:** of your boards that went through peer verification, how many passed first time.
  - **Rework:** of the jobs you closed, how many **came back** as rework — your own work coming back.
  - **Non-repairable:** the share you closed as cannot-repair.
- **Formula:** one row per closed job in `v_scorecard_job`
  (`20260927000200_training_findings_decided_MET-001.sql:29-56`), read by `engineer_scorecard()` (`:76-137`)
  and by the MCP measures `efficiency.standard`, `first_pass.rate`, `rework.rate_engineer`,
  `wastage.rate_engineer` (`:146-168`), over jobs **assigned to the engineer** and closed that month:
  - Efficiency = Σ standard hours ÷ Σ **repair** hours × 100, **on comparable jobs only** (those with a
    standard time) (`:107-110`). A colleague's verification hours are not in it (K5). The screen adds
    *"of N"* when some jobs had no standard; with none it reads *"not comparable"*.
  - First pass = boards that passed first time ÷ boards that **went through verification** (entered In
    Verification) (`:44`, `:112-115`). A board never verified — a write-off — is in neither side (K4).
  - Rework = closed jobs that a later rework job names as its previous job ÷ jobs closed (`:45-46`,
    `:116-118`). It is the original engineer's figure, in the month the **original** closed (K3).
  - Non-repairable = jobs at *Non-Repairable* ÷ jobs closed (`:119-120`). Customer Rejected is not counted.
  - Below `minimum_jobs_for_comparison` (5) jobs, the row gets a **"Small sample"** tag and is not ranked.
- **Worked example:** Ramachandran closed 4 jobs, so he gets *Small sample* (4 < 5).
  - Efficiency: standards 6 + 4 + 10 = 20 h, against **repair** hours 5 + 4 + 8 = 17 h. 20 ÷ 17 =
    **117.6%**, shown as *"of 3"* because D has no standard. Baleswar's hour on A is his, not in here.
  - First pass: A, B and C went through verification; A and C passed first time, B failed once. D was
    never verified and is left out. 2 ÷ 3 = **66.7%**.
  - Rework: before 31 Oct, 0 ÷ 4 = **0%**. Once A comes back as R, September's figure reads 1 ÷ 4 =
    **25%**, charged to Ramachandran, not to Baleswar who fixed R.
  - Non-repairable: 1 ÷ 4 = **25%**.
- **How to read it:**
  - Above 100% means faster than standard. Always read speed next to first pass and rework.
  - A recent month understates Rework: its boards have not had time to come back.
  - **Misreading to avoid:** "Rework counts the comebacks I fixed." Fixing someone else's comeback is not
    your rework; it counts against the engineer whose repair it was.

---

# Module 2: Money (monetary) KPIs

> **The one rule to teach first** (feature 017, for every board priced from 25 Sep 2026 on).
> Prices are **all-in**: they include parts. With N the normal price, Q the price agreed with the
> customer, and P the parts billed:
>
> - **Customer pays** = the larger of Q and P.
> - **Labour charge** = N − P, never below 0.
> - **Premium** = what the customer pays − the larger of N and P, when positive.
> - **Discount** = the larger of N and P − what the customer pays, when positive.
>
> The trigger is at `supabase/migrations/20260925000500_opportunity_premium_DDE-001.sql:297-318`.
> Boards priced **before** feature 017 have no normal price and follow the old rule: price = base +
> parts + premium.

> **The second rule** (feature 031, 27 Sep 2026). **Every rupee is counted once**, in the month it was
> spent, against the engineer it belongs to. A job's own record keeps its **whole-life** figures
> (comebacks included); a **period** adds each job's **own** figures (`mv_job_margin.own_cost`,
> `own_margin_total`, `own_margin_labour`, `engineer_margin_labour`, `charged_user_id`;
> `20260927000100_money_counted_once_MET-001.sql:60-70`).

### 2.1 Normal price ("Set by hand" or "Rate card")

- **On screen:**
  - The quotation raise form shows **"Normal price"** with a *Rate card* or **Set by hand** tag
    (`app/(app)/service-centre/quotations/[...quotation]/quote-forms.tsx`).
  - The job card money panel **"What it cost, and what it made"** shows **"Normal price"** with *"set by
    hand — no rate card"* or *"from the rate card"* (`app/(app)/service-centre/jobs/[...job]/page.tsx:144-147`).
  - On a board Under Assessment whose customer has rates, the job card offers **"Price from the rate
    card…"** to the Service Head and the Liaison (`acts.tsx:230-242`, `decision-forms.tsx:174-221`):
    choose *"The rate it is"* and press **Price from the rate card**. The reservoir then tags the board
    **"Assessed — rate card"** (`reservoir/allot-form.tsx:67`), which it does only where a rate priced it.
- **Who sees it:**
  - The form: Liaison, Service Head, Operations Manager, Admin and Executive Management.
  - The job card panel: MIS roles only. **Engineers do not see this panel.**
- **Plain meaning:** what this board would normally cost the customer, parts included.
- **Formula:**
  - A contract customer's rate for that board and service level: the rate-card trigger prices an
    unpriced board Under Assessment when its internal reference and service level are set, for an
    **Exclusive contract** customer, from a rate that applies automatically
    (`work_order_apply_service_rate()`). Only the allotment right may set that basis, and **once a rate
    has priced the board its basis is fixed** (`20260927000200_training_findings_decided_MET-001.sql:408-443`).
  - Otherwise the person quoting types it and the board is marked `labour_set_by_hand`.
  - The split is fixed at approval; changing it needs a revised quotation (`…opportunity_premium…sql:245-273`).
  - Boards with different normal prices cannot share a quotation line.
- **Worked example:** AYYAN has no rate card, so the Liaison types **₹10,000** for A and it is tagged *Set
  by hand*. B's contract customer has a ₹6,000 rate: the Service Head picks it with *Price from the rate
  card…*, and B's normal price reads **₹6,000 from the rate card**. C's ₹10,000 was typed.
- **How to read it:**
  - This is the anchor for everything the engineer is credited with. Type it honestly: what you would
    charge a regular customer for this repair on a normal day.
  - **Misreading to avoid:** "normal price = labour." It **includes parts**.
  - ⚠ The act is also offered for an **ad-hoc** customer who has rates on file, and says *"Priced from the
    rate card"* although the trigger prices contract customers only; check that the normal price reads
    *from the rate card* afterwards (seen while seeding the demo, reported).

### 2.2 Labour charge (base price)

- **On screen:**
  - The job card shows **"Labour charge"** (*"normal price less parts billed"*). Boards priced before
    feature 017 show **"Base price"** instead.
  - The quote form shows **"Engineer's labour charge — ₹N less parts"**.
  - Profitability › *By engineer* has the column **"Base price"**.
- **Plain meaning:** the part of the price that pays for the engineer's work.
- **Formula:** `base_price = greatest(normal_price − parts_revenue, 0)`, recomputed every time a part is
  booked (`…opportunity_premium…sql:313`).
- **Worked example:**
  - A: ₹10,000 − ₹2,400 = **₹7,600**. B: ₹6,000 − ₹500 = **₹5,500**. C: ₹10,000 − ₹1,000 = **₹9,000**.
  - If A had needed ₹11,000 of parts, its labour charge would be **₹0**.
- **How to read it:**
  - **Misreading to avoid:** "a premium job pays me more." It does not. The labour charge is the same
    whether the customer was quoted ₹10,000 or ₹25,000.
  - The **billed** (selling) price of parts comes out of the labour charge, so a parts-heavy repair
    lowers it.

### 2.3 Opportunity premium

- **On screen:**
  - The quote form shows **"Premium"** with a required **"Why a premium"** reason.
  - The job card and the quotation record both show **"Premium"**; the job card names the reason, and
    since 27 Sep the Service Head sees it too (K14).
  - The MIS tile is **"Premium captured"**.
  - Profitability shows **"Opportunity premium"**, the section **"Opportunity premium captured"** (by
    reason), and the **"Premium"** tab (cut by *Customer / Segment*).
- **Plain meaning:** what the customer paid **above** normal, for urgency, out-of-hours work, a site visit
  or a scarce part. It is a commercial result, not an engineering one.
- **Formula:**
  - `premium_amount = greatest(pays − greatest(N, P), 0)`, where pays = greatest(Q, P)
    (`…opportunity_premium…sql:310-314`).
  - A reason from the list is required (`:93`). Premium never enters `margin_labour`.
- **Worked example:**
  - A: pays = the larger of ₹12,000 and ₹2,400 = ₹12,000. Covered = the larger of ₹10,000 and ₹2,400 =
    ₹10,000. Premium = **₹2,000** (*Urgent turnaround*).
  - **Parts eat the premium only once they exceed N.** With ₹11,000 of parts, covered = ₹11,000, so the
    premium falls to ₹1,000 and the customer still pays ₹12,000.
- **How to read it:**
  - Nice to have, never to rely on.
  - **Misreading to avoid:** "*parts premium*" is not a figure in this system. Parts beyond the normal
    price reduce the premium, as above. Markup on parts is the separate **Parts margin** (2.7).

### 2.4 Discount

- **On screen:**
  - The quote form and job card show **"Discount"** (*"below the normal price"*).
  - Profitability shows *"₹X discount given"* and the Premium tab's **"Discount"** column.
- **Plain meaning:** what the customer paid **below** normal. It is recorded separately so the engineer is
  not blamed for it.
- **Formula:** `discount_amount = greatest(greatest(N, P) − pays, 0)` (`…opportunity_premium…sql:315`). It
  never nets against the premium, and a board has one or the other.
- **Worked example:**
  - C: pays ₹8,000 (the larger of ₹8,000 and ₹1,000). Covered = ₹10,000. Discount = **₹2,000**. The
    labour charge stays **₹9,000**.
  - With ₹9,000 of parts, the customer pays ₹9,000 and the discount shrinks to ₹1,000.
- **How to read it:**
  - **Misreading to avoid:** "the discount came out of my labour charge." It did not.

### 2.5 Charged (price charged / Revenue)

- **On screen:**
  - The job card shows **"Charged"**. Profitability shows **"Revenue"** (the sum).
  - Customer and segment tables have a **"Price"** column.
  - Sales › **"Charged"** (3.1).
- **Plain meaning:** what this system intends the customer to pay for the board. It is not what Zoho
  invoiced or what was collected.
- **Formula:** `price_charged = base_price + parts_revenue + premium_amount − discount_amount`, a generated
  column (`…opportunity_premium…sql:70-71`). On all-in boards this equals the larger of Q and P. A period's
  Revenue sums `revenue = coalesce(price_charged, 0)`, so an unpriced job adds ₹0
  (`20260927000100_money_counted_once_MET-001.sql:65`, `:146`).
- **Worked example:**
  - A: 7,600 + 2,400 + 2,000 − 0 = **₹12,000**. B: 5,500 + 500 = **₹6,000**. C: 9,000 + 1,000 − 2,000 =
    **₹8,000**.
  - D is unpriced (*"not priced yet"*) and adds ₹0.
  - September Revenue = **₹26,000**.
- **How to read it:**
  - **Misreading to avoid:** "₹12,000 + ₹2,400 parts." Parts are already inside the price.

### 2.6 Labour margin and Base margin %

- **On screen:**
  - Job card: **"Labour margin"** (the job's whole-life figure, comebacks included).
  - MIS tile **"Base margin"**: *"67.4%"*, with detail *"₹14,900 on ₹22,100 · premium is reported beside
    this, never inside it"*.
  - Profitability card **"Base margin"** (*"₹14,900 · 67.4% of base price · how well we delivered"*).
  - Profitability › *Parts against labour* › **"Labour margin"** (*"₹22,100 charged · ₹7,200 labour"*).
- **Plain meaning:** what the labour charge left after paying for the hours on the job.
- **Formula:**
  - On one job: `margin_labour = base_price − labour_cost − rework_cost_rolled_up`
    (`supabase/migrations/20260901000700_crm_work_order_DDE-001.sql:112-113`), its whole-life figure.
  - `labour_cost` = Σ hours × `cost_rate_applied`, with the rate frozen on the day logged — **every** hour
    on the job, the verifier's included (`20260902000400_service_centre_timesheet_UC-011.sql:48`).
  - For a period: Σ `own_margin_labour` = Σ (base_price − labour_cost), each job once, a rework on the
    rework (`20260927000100_money_counted_once_MET-001.sql:67`, `:154`, `:323`). Base margin % = that ÷
    Σ base_price (`tiles.ts:137-149`; `lib/domain/reports/profitability.ts:301`).
- **Worked example:**
  - A: 7,600 − 2,400 = **₹5,200**. B: 5,500 − 1,600 = **₹3,900**. C: 9,000 − 3,200 = **₹5,800**. D: none,
    because it is unpriced.
  - September: 14,900 ÷ 22,100 = **67.4%**. The *Parts against labour* card reconciles: 22,100 − 7,200 of
    labour on the priced jobs = 14,900.
- **How to read it:**
  - This is the fair measure of delivery. Premium and parts markup are excluded by construction.
  - **Misreading to avoid:** expecting the write-off to lower it. An unpriced job has neither a labour
    charge nor a labour margin, so it drops out of both sides; its cost is in **Total margin** (2.8).

### 2.7 Parts margin

- **On screen:** job card **"Parts margin"**; Profitability › *Parts against labour* › **"Parts margin"**
  (*"23.1%"*, *"₹3,900 charged · ₹3,000 cost"*).
- **Plain meaning:** what we made selling parts: the selling price minus the purchase price. This is
  procurement's result, not the engineer's.
- **Formula:**
  - `margin_parts = parts_revenue − parts_cost` (`…crm_work_order_DDE-001.sql:114-115`).
  - `parts_cost` = Σ `booked_cost`, the purchase price × qty frozen at consumption.
  - `parts_revenue` = Σ billed price × qty (`…timesheet_UC-011.sql:300-301, 375-378`).
  - Rate = margin_parts ÷ parts_revenue (`profitability.ts:305`).
- **Worked example:** A: 2,400 − 1,950 = **₹450**. The free fuse costs ₹150 and earns nothing. B earns ₹150
  and C ₹300. September total: 900 ÷ 3,900 = **23.1%**.
- **How to read it:**
  - **Misreading to avoid:** "cheap parts help my labour margin." On an all-in board a higher **selling**
    price raises parts margin and lowers the labour charge by the same amount.

### 2.8 Cost and Total margin (Profit)

- **On screen:**
  - The job card shows **"Total cost"** and **"Total margin"** (whole-life).
  - Profitability has the cards **"Revenue"**, **"Cost"** (*"labour · parts, of which rework"*), **"Total
    margin"** (*"x% of revenue · how well we traded"*) and **"Negative margin"** (*"N jobs · ₹X lost"*),
    which opens the cut **"Jobs at a loss"**.
- **Plain meaning:** the whole commercial result: labour, parts, premium and discount together. This is
  what the owner means by "profit".
- **Formula:**
  - On one job: `total_cost = labour_cost + parts_cost + rework_cost_rolled_up` and `margin_total =
    price_charged − total_cost` (`…DDE-001.sql:108-109`; `…opportunity_premium…sql:72-74`).
  - For a period (`profitability_summary`, `20260927000100_money_counted_once_MET-001.sql:136-165`):
    Cost = Σ `own_cost` (labour + parts, **no** rolled-up rework); Total margin = Σ `own_margin_total` =
    Σ (revenue − own_cost). A **write-off counts ₹0 revenue and its whole cost** (K1), so **Revenue − Cost
    = Total margin** on the screen.
  - Jobs at a loss: every job with `own_margin_total < 0` closed in the period, worst first; a rework is
    marked *"· rework of …"* (`app/(app)/mis/profitability/page.tsx:514-540`).
  - Rate = Total margin ÷ Revenue (`profitability.ts:303`).
- **Worked example:**
  - A: cost 2,400 + 1,950 = ₹4,350; total margin 12,000 − 4,350 = **₹7,650** (= 5,200 + 450 + 2,000).
  - B: ₹4,050. C: 5,800 + 300 − 2,000 = **₹4,100**. D: 0 − 2,400 = **−₹2,400**.
  - September: Revenue 26,000 − Cost 12,600 (labour 9,600 · parts 3,000) = Total margin **₹13,400**, 51.5%
    of revenue. *Negative margin*: **1 job, ₹2,400 lost** (D).
- **How to read it:**
  - **Misreading to avoid:** "a write-off is free." It has no price, but its hours cost, and they are in
    Cost and in Total margin alike.
  - Base margin (67.4%) says how well we delivered; Total margin (51.5%) says how well we traded,
    write-offs included.

### 2.9 Cost of rework carried

- **On screen:**
  - The job card shows **"Rework rolled up"** on the original job.
  - Profitability has the tab **"Rework carried"** (*"Charged back to / Rework job / Customer / Cost
    carried"*), listing the reworks **closed in the period**; the *Cost* card says *"of which rework"*;
    *By engineer* has **"Rework carried"**.
- **Plain meaning:** what a comeback cost, shown on the job that failed, and counted once in a period.
- **Formula:**
  - On the original's own record: `rework_cost_rolled_up` = Σ `total_cost` of its rework jobs
    (`20260902001300_service_centre_rework_rolls_up_TD-004.sql:35`) — its whole-life cost.
  - In a period's totals: the rework's own cost, **once, in the month the rework closes**
    (`profitability_summary`, `…money_counted_once…sql:153`), charged to the engineer whose repair came
    back (`charged_user_id`, `:61-63`; By engineer `:241-300`).
  - A warranty rework is priced ₹0 (`20260919000500_warranty_rework_is_recognised_MET-001.sql:82-83`).
- **Worked example:**
  - R costs ₹1,100 (2 h × ₹400 + a ₹300 part given free).
  - **A's own record** shows Rework rolled up ₹1,100: its labour margin reads 7,600 − 2,400 − 1,100 =
    **₹4,100** and its total margin ₹6,550.
  - **September does not move:** Base margin stays 67.4%, Total margin ₹13,400.
  - **October** counts it once, on R: Cost ₹1,100 *of which rework ₹1,100*; R is in October's *Jobs at a
    loss* at −₹1,100, *"rework of A"*; Rework carried: *charged back to A*, ₹1,100; By engineer:
    Ramachandran's row carries the rework (labour margin −₹800 from R), not Baleswar's.
- **How to read it:**
  - **Misreading to avoid:** adding A's "Rework rolled up" to a period's Cost. It is a per-job figure;
    the period already has it, on R.
  - A closed month's figures do not move when a comeback arrives later.

### 2.10 Premium as a share of revenue

- **On screen:** the MIS tile *Premium captured* detail (*"7.7% of revenue · commercial, not delivery"*);
  Profitability *Opportunity premium* card.
- **Plain meaning:** how much of what we charged came from urgency pricing rather than the work.
- **Formula:** Σ premium_amount ÷ Σ price_charged (`tiles.ts:150-161`; `profitability.ts:304`). MET-001 M-06.
- **Worked example:** 2,000 ÷ 26,000 = **7.7%**.
- **How to read it:** a rising share is a **warning**, not an achievement. The work itself is earning less
  (MET-001 M-06). Read it next to Base margin.

### 2.11 Spares not charged / Uncosted hours

- **On screen:**
  - Profitability tab **"Spares not charged"** (*"Cost absorbed"*).
  - Profitability card **"Uncosted hours"** (*"no rate in force"*), with a warning bar when it is non-zero.
- **Plain meaning:**
  - **Spares not charged:** parts we fitted free (warranty or goodwill). The cost is real.
  - **Uncosted hours:** hours logged when no labour rate existed. They are costed ₹0, so every margin is
    **overstated**.
- **Formula:**
  - Spares: Σ `booked_cost` where `billed_price` is null, on jobs **closed** in the period
    (`profitability_unbilled_spares`, `v_unbilled_spare_report`; MET-001 M-15).
  - Uncosted: Σ hours where `cost_rate_applied = 0`, on jobs closed in the period (H-05).
- **Worked example:**
  - The ₹150 fuse on A appears under Spares not charged in September. R's ₹300 part appears in October,
    when R closes.
  - If A's 5 h had been logged before a rate was set, A's labour cost would read ₹400 (the checking hour
    only) instead of ₹2,400, and A's labour margin ₹7,200 instead of ₹5,200.
- **How to read it:** any uncosted hours means *fix the rate first, then read the margins*.

### 2.12 Actual / Target / Achievement (the engineer's month), and By engineer

- **On screen:** *Performance* columns **"Actual"**, **"Target"**, **"Achievement"** (tag *"76.5% · below"*
  or *"· met"*); the foot note reads *"Actual is the labour margin on jobs closed this month"*.
  Profitability › *By engineer*: **Jobs, Hours, Base price, Labour cost, Rework carried, Labour margin, %,
  Checking**.
- **Who sees it:** an Engineer sees their own Performance row. Leads see everyone. By engineer is MIS only.
- **Plain meaning:** the labour margin you produced this month, against the target your lead set. Your
  own repairs, the comebacks of your repairs, and the checking you did for others.
- **Formula** (`v_engineer_achievement`, `20260927000100_money_counted_once_MET-001.sql:431-481`):
  - Actual = Σ over jobs closed in the month and charged to you — your boards, and reworks of your boards
    — of (base_price − labour_cost + **another engineer's verification cost on it**), **plus** the cost of
    the verification **you** did on boards closed that month (K2, K5). An unpriced board earns nothing.
  - Achievement = Actual × 100 ÷ Target, to one decimal. No target shows **"none set"** and "—", never 0%.
  - By engineer's Labour margin = Σ `engineer_margin_labour` of the jobs charged to you (`:70`, `:280`);
    *Checking* = hours you spent verifying others' boards closed in the period (cost on hover), shown
    beside it, not in it (`:265-271`; `page.tsx:458`, `:475`).
- **Worked example:**
  - A: 5,200 + 400 (Baleswar's hour added back) = 5,600. B: 3,900. C: 5,800. D: unpriced, adds nothing.
  - Ramachandran's Actual = **₹15,300**. 15,300 ÷ 20,000 = **76.5% · below**.
  - Baleswar's September Actual includes **₹400** for checking A.
  - By engineer, September: Ramachandran — 4 jobs, 23 h, base price 22,100, labour cost 6,800, labour
    margin **₹15,300** (69.2%), Checking —. Baleswar — Checking **1 h** (₹400). 15,300 − 400 = 14,900, the
    Base margin.
  - When R closes on 31 Oct, its −₹800 counts in Ramachandran's **October** Actual. September stays 76.5%.
- **How to read it:**
  - Performance and By engineer now agree on an engineer's labour margin.
  - The premium on A earned Ramachandran nothing, by design.

### 2.13 Labour on open boards

- **On screen:** the overview (`/`) section **"Labour on open boards"** (`lib/domain/mis.ts:190`).
- **Plain meaning:** what our own time has already cost on boards still in the building. It is neither
  revenue nor waste yet.
- **Formula:** Σ `labour_cost` over every open work order (`open_labour_cost()`,
  `20260922000200_open_labour_cost_MET-001.sql:13`). It is a **stock**, not a period figure. The five rows
  listed under it are only the largest examples.
- **Worked example:** E (10 h) + F (3 h) × ₹400 = **₹5,200** today.
- **How to read it:** a large figure on a few boards means expensive work in progress. Push those boards
  to a price decision.

---

# Module 3: Sales KPIs

### 3.1 Charged (commercial impact by sales engineer)

- **On screen:** *Sales* › **"By engineer"** › column **"Charged"**. The drill lists the jobs behind it.
  The foot note reads *"Charged: by this system on closed jobs — not invoiced or paid."*
- **Who sees it:** MIS roles.
- **Plain meaning:** the value of the repair work closed this month from deliveries **you brought in**.
- **Formula:**
  - Σ `price_charged` over closed jobs, grouped by the delivery's `brought_in_by_user_id`
    (`20260925000300_sales_attribution_DDE-001.sql:654-676`).
  - Dated by the **Asia/Kolkata** day the job closed (`:614`).
  - It **includes the premium and nets the discount** (AC-062-028).
- **Worked example:** sales engineer **Arun** brought in the deliveries for A, C and D.
  - A (₹12,000) + C (₹8,000) = **₹20,000**.
  - D has no price, so it is counted, not summed: the meta line shows *"1 unpriced"*.
  - B came from Priya's delivery (₹6,000).
- **How to read it:**
  - It measures the business your relationships produce.
  - **Misreading to avoid:** "Charged = money collected." Nothing is read back from Zoho.
  - ⚠ Profitability dates closures by the UTC day (`mv_job_margin`: `closed_on::date`). A job closed
    between 00:00 and 05:30 IST on the 1st can land in different months on the two screens (K9, not
    acted on).

### 3.2 Filled

- **On screen:** *Sales* › *By engineer* › **"Filled"** (*"from before attribution"*).
- **Plain meaning:** the part of *Charged* that comes from old deliveries where nobody recorded who
  brought them in. The system assumed the customer's owner.
- **Formula:** Σ price_charged where `attribution_source = 'FILLED'` (`…sales_attribution…sql:654-676`).
- **Worked example:** C's delivery pre-dates attribution and was filled with Arun as the owner. Charged
  **₹20,000**, of which Filled is **₹8,000**. So ₹12,000 is credit recorded at the counter.
- **How to read it:** the lower the filled share, the more trustworthy the figure. It should fade to zero
  over time.

### 3.3 Premium and discount by customer / segment (the commercial view)

- **On screen:** Profitability › **"Premium"** tab › *By* **Customer** or **Segment**, with columns
  *Jobs, Premium, Discount, Set by hand*. The note under it reads *"₹X … rests on a normal price somebody
  typed … — {person} N jobs"*.
- **Who sees it:** MIS roles. The Sales Head reads these figures but does **not** set prices; quotation
  raisers do.
- **Plain meaning:** which customers pay us for urgency, which get prices below normal, and how much of
  either rests on a hand-typed normal price.
- **Formula:** `profitability_pricing(p_by)` and `profitability_pricing_by_hand`
  (`20260925000600_premium_report_MET-001.sql:17-95`).
  - *Set by hand* = premium + discount on boards marked `labour_set_by_hand`.
  - The person named is the one who recorded the price.
- **Worked example:**
  - AYYAN: 1 job, **+₹2,000**, Set by hand ₹2,000 (A was typed).
  - C's customer: 1 job, **−₹2,000** discount, Set by hand ₹2,000 (C was typed too).
  - B's contract customer: priced by the rate card, no premium and no discount.
- **How to read it:**
  - A customer who is always discounted is a pricing conversation. A premium that rests on typed prices
    proves little until rate cards cover the board.
  - **Misreading to avoid:** netting the columns into "₹0 overall". They are reported apart on purpose.

### 3.4 Won (conversions per engineer)

- **On screen:** *Sales* › *By engineer* › **"Won"**; foot note *"Won: converted to Regular in {period},
  to the owner when it converted"*.
- **Plain meaning:** accounts that became Regular **in the period**, each credited to whoever owned it at
  that moment. A count, not a rate.
- **Formula:** `sales_conversion_by_engineer()` counts `v_customer_conversion_credit` rows with
  `first_regular_on` in the period, grouped by `converted_by_user_id`
  (`20260927000200_training_findings_decided_MET-001.sql:175-187`); the MCP measure
  `conversion.by_engineer` is the same (`:194-199`). MET-001 S-03 (K7).
- **Worked example:** *March account 1* was opened in March and became Regular in **June**, while Arun
  owned it. June's Won: **Arun 1**. March's Won: nothing. If the account is handed to Priya in August,
  June still credits Arun.
- **How to read it:**
  - A month's Won is fixed once the month ends.
  - **Misreading to avoid:** reading it as a rate of the accounts an engineer opened. The accounts may
    have been opened long before; the cohort rate is *team conversion* (3.5).

### 3.5 Team conversion (Potential → Regular)

- **On screen:** *Sales* › *By engineer* meta: **"team conversion NN%"**, with the *Funnel and velocity*
  bars *Potential / Trial / Regular*.
- **Plain meaning:** of the accounts opened in the period, the share that have become Regular so far.
- **Formula:** reached_regular ÷ opened, for the cohort **opened** in the period (`lib/domain/reports/sales.ts:210`,
  `:259-260`; `sales_funnel`, `20260927000200_training_findings_decided_MET-001.sql:227-242`).
  - It is shown for the **team only**. Per engineer the two bases differ once accounts move.
  - A period with nothing opened shows "—", not 0%.
- **Worked example:** 40 accounts opened in Q1; 21 reached Trial and 6 reached Regular. 6 ÷ 40 = **15.0%**.
  The bars read 40 / 21 / 6.
- **How to read it:**
  - **Misreading to avoid:** the same quarter's figure rises for months afterwards as the cohort matures.
    It is not a live monthly rate. (Won, 3.4, is the monthly count.)

### 3.6 Funnel velocity (medians per step)

- **On screen:** *Sales* › *Funnel and velocity* › **"Potential → Trial, median"** and **"Trial → Regular,
  median"**. When nobody has taken the step, it shows *"none yet"*.
- **Plain meaning:** how long a typical account takes to reach the next stage.
- **Formula:** `percentile_disc(0.5)` of the whole days each account took for that step, over accounts
  opened in the period **that took the step** (`v_funnel_step`, `sales_funnel`,
  `20260927000200_training_findings_decided_MET-001.sql:202-242`). The MCP measure `funnel.velocity` reads
  the same rows, segmented by step (`:249-254`) (K8).
- **Worked example:** five accounts opened in January took 3, 5, 10, 12 and 30 days to reach Trial:
  median **10 d**. From Trial to Regular they took 7, 15, 24, 28 and 60: median **24 d** (the mean, 26.8,
  would be pulled up by the 60-day account).
- **How to read it:**
  - Long Trial → Regular times mean trial customers are left to drift. Watch *Trial jobs consumed*
    against the ceiling of 10.
  - An account still waiting is left out, never counted as nought.

### 3.7 Quotations won and Agreed by negotiation

- **On screen:** *Sales* › *Funnel and velocity* › **"Quotations won"** (a %, or *"none decided"*) and
  **"Agreed by negotiation"** (a count, linking to Quotations) (`app/(app)/mis/sales/page.tsx:142-160`, K11).
- **Plain meaning:**
  - **Quotations won** (S-08): of the written quotations decided in the period, the share approved.
  - **Agreed by negotiation** (S-11): prices agreed on the phone in the period, without a written
    quotation.
- **Formula:** the measures `quotation.win_rate` (one document one outcome; quotations still awaiting an
  answer are in neither side; `mv_quotation_ageing`) and `quotation.negotiated` (a count;
  `v_negotiated_agreements`), both read through `evaluate_measure` (`lib/domain/reports/sales.ts:143-188`).
- **Worked example:** A's written quotation was approved: 1 decided, 1 won = **100%**. C's ₹8,000 was
  agreed on the phone: **Agreed by negotiation 1**. B was priced by the rate card: in neither.
- **How to read it:** a negotiated price is agreed by definition, so it would make the win rate a
  meaningless 100%; it is counted beside it, not inside it.

---

# Suggested clip outlines

### Module 1: Operational (two clips)

**Clip 1a. "Where is the floor losing time?"** (MIS dashboard → Yield → Queue aging → Stuck tasks → What
has stalled → Unbilled hours)

1. **Yield**: MIS tile, then the Yield page ratio bar.
2. **Wastage cost this period**: Yield page.
3. **Rework rate**: MIS tile, then Yield › *Rework jobs*.
4. **Queue aging + testing gates**: the Queue aging page.
5. **Stuck tasks**: the MIS tile, then the Stuck tasks list and its *What counts as stuck* panel.
6. **What has stalled › Stuck**: the same rule on the Service screen; *The whole queue* beside it is the
   days-in-state view.
7. **Unbilled hours**: the MIS tile, then the tracer.

**Clip 1b. "Reading your scorecard"** (Performance, signed in as an Engineer, then as the Service Head)

1. Efficiency (repair hours only).
2. First pass (verified boards only).
3. Rework (your own work that came back).
4. Non-repairable.
5. *Small sample* and "not comparable".

**Quiz, Module 1**

1. A board has been In Progress for 8 calendar days and the engineer logs hours on it every day. Where
   does it appear?
   - (A) On both stuck lists (B) Only on *What has stalled › Stuck* (C) On neither stuck list, but *The
     whole queue* shows its 8 days in state (D) Only on MIS *Stuck tasks*
   - **Answer: C (index 2).** Both stuck lists use one rule: no activity for more than 5 working days.
2. In September, 18 boards went to Ready for Invoice, 4 were Non-Repairable and 2 were Customer Rejected.
   What does Yield show?
   - (A) 75.0% (B) 81.8% (C) 90.0% (D) 85.7%
   - **Answer: A (index 0).** 18 ÷ (18 + 4 + 2) = 75.0%. Customer Rejected counts as wastage.
3. Your scorecard says Rework 25%. What does that mean?
   - (A) A quarter of the jobs you closed were rework jobs, whoever did the original (B) A quarter of the
     jobs you closed that month later came back as rework (C) You failed verification on a quarter of
     jobs (D) A quarter of your hours were unbilled
   - **Answer: B (index 1).** Rework is your own work coming back, counted against you.
4. September unbilled hours read 9 h on 1 October and 19 h on 15 October. What is the most likely cause?
   - (A) Someone edited old timesheets (B) An open job with September hours was written off
     (OPEN → NON_REPAIRABLE) (C) The threshold changed (D) A rate card was added
   - **Answer: B (index 1).** Disposition follows each job's **current** status.

### Module 2: Money (two clips)

**Clip 2a. "One job's price, split"** (quote raise form → approved quotation record → job card money
panel on board A → a contract board priced from the rate card)

1. Normal price / Set by hand, and Price from the rate card.
2. Labour charge.
3. Opportunity premium, including the parts-over-N case.
4. Discount (board C).
5. Charged.
6. Labour margin → Parts margin → Total margin.

**Clip 2b. "The month in money"** (MIS tiles → Profitability → Performance → Overview)

1. Base margin %.
2. Premium captured and its share of revenue.
3. Total margin: Revenue − Cost, the write-off included; Jobs at a loss.
4. A comeback counted once: on the rework, in its month, charged to the original engineer.
5. Spares not charged / Uncosted hours.
6. By engineer (with Checking) and Actual / Target / Achievement.
7. Labour on open boards (overview).

**Quiz, Module 2**

1. Normal ₹10,000, quoted ₹12,000, parts billed ₹2,400. What is the engineer's labour charge?
   - (A) ₹12,000 (B) ₹10,000 (C) ₹7,600 (D) ₹9,600
   - **Answer: C (index 2).** N − P = 10,000 − 2,400. The premium never reaches the engineer.
2. Same board, but the parts billed rise to ₹11,000. What does the customer pay, and what is the premium?
   - (A) ₹23,000 / ₹2,000 (B) ₹12,000 / ₹1,000 (C) ₹12,000 / ₹2,000 (D) ₹11,000 / ₹0
   - **Answer: B (index 1).** Pays = the larger of 12,000 and 11,000. Premium = 12,000 − the larger of
     10,000 and 11,000.
3. September: Revenue ₹26,000, Cost ₹12,600, and a written-off board with ₹2,400 of hours. What is Total
   margin?
   - (A) ₹15,800 (B) ₹13,400 (C) ₹11,000 (D) ₹26,000
   - **Answer: B (index 1).** Revenue − Cost = Total margin; the write-off's hours are in both.
4. A board you closed in September comes back in October and a colleague fixes it for ₹1,100. What
   happens to the figures?
   - (A) Your September Actual falls by ₹1,100 (B) It counts once, in October, against you; September
     does not move (C) It counts against the colleague who fixed it (D) It is counted in both months
   - **Answer: B (index 1).** A comeback is counted once, on the rework, in its month, charged to the
     engineer whose repair came back.

### Module 3: Sales (one clip)

**Clip 3. "What your accounts are worth"** (Sales analytics → drill → Profitability Premium tab → Sales)

1. Charged.
2. Filled.
3. Unpriced count.
4. Premium / discount by customer and segment, with *Set by hand*.
5. Won.
6. Team conversion.
7. Funnel velocity medians.
8. Quotations won / Agreed by negotiation.

**Quiz, Module 3**

1. A job you brought in was quoted ₹25,000 (normal ₹10,000) and closed yesterday. How much of it lands in
   your *Charged*?
   - (A) ₹10,000 (B) ₹15,000 (C) ₹25,000 (D) Nothing until Zoho invoices it
   - **Answer: C (index 2).** Charged is the full price charged, premium included, as this system
     intended it.
2. A delivery arrives on Friday. Three boards are closed on Monday: two repaired and one non-repairable
   with no price. What does the sales row show?
   - (A) All three summed (B) Two summed, plus "1 unpriced" (C) Only the repaired ones, with no mention
     of the third (D) Nothing until invoiced
   - **Answer: B (index 1).** Unpriced closed jobs are counted, not summed.
3. An account opened in March becomes Regular in June while you own it; in August it moves to a
   colleague. Where does *Won* show it?
   - (A) March, on your row (B) June, on your row (C) August, on the colleague's row (D) Nowhere
   - **Answer: B (index 1).** Won counts conversions made in the period, credited to the owner at that
     moment.
4. Q1 team conversion reads 10% in April and 15% in July. What changed?
   - (A) The formula (B) More of the Q1 cohort reached Regular since April (C) New accounts were added to
     Q1 (D) Filled deliveries were removed
   - **Answer: B (index 1).** The cohort is fixed by opening date and matures over time.

---

## Still worth flagging (true of the code today)

- ⚠ **No holiday calendar** in the stuck rule: a public holiday counts as a working day (MET-001 T-03).
- ⚠ **UTC vs IST dating** (K9, not acted on): Profitability dates a closure by `closed_on::date`, Sales by
  the Asia/Kolkata day.
- ⚠ **Price from the rate card…** is offered, and reports success, on an ad-hoc customer's board that has
  rates on file; nothing is priced (2.1).
- **Figures that move after the month ends, by design:** Unbilled hours (follow today's status) and
  Scorecard *Rework* (rises when a board of that month comes back). Money totals do **not** move.
- **Spares not charged** follows the job's **close** month, not the day the part was consumed.
- **Wastage cost this period** counts every hour ever logged on a write-off closed in the period.
- **Profitability › By engineer › Hours** on a row charged a rework includes the rework's hours, even when
  a colleague logged them (the row is the engineer the money is charged to).

## Where the in-app explanations disagree (reported, not changed here)

Read with `select metric_key, lang, meaning, how_to_read, misreading, example from
semantic_measure_explanation` on `develop` `b053262`:

1. **`first_pass.rate` example** says *"C and D never went through verification"* → 1 ÷ 2 = 50%. In the
   app every repaired board passes through Ready for Verification (`finish_repair()` goes nowhere else),
   so C is verified in the worked month: 2 ÷ 3 = **66.7%**. The definition itself agrees with the code.
2. **`target.achievement` example** ends *"after R: ₹14,500 = 72.5%"*, which contradicts its own
   misreading line and the code: R's −₹800 counts in the month R closes (October), and September's Actual
   stays ₹15,300.
3. **`stuck.count` misreading** still says *"What has stalled › Stuck is a different list (calendar days
   in the same state), so the two counts will not match"* — no longer true since K6.
4. **`rework.rate_overall` misreading** still says the Performance Rework column *"counts the rework jobs
   one engineer handled"* — no longer true since K3.
5. **`queue.aging`** says the gates are *"called out at 6 days or more"*; the code counts **more than** 6
   (`attention.ts`: `.gt('days_in_state', days)`), and the Queue aging page says so.
6. **`parts.unbilled`** says the cost counts *"in the period they were consumed"* and R's part *"in the
   month R consumed it"*; the code dates it by the job's close month.

## Before filming

- **Refresh the MIS data.** MIS screens read `mv_job_margin` (and `mv_quotation_ageing`,
  `mv_rework_chain`), refreshed by the *Refresh now* act (Admin or Operations Manager) or nightly. The job
  card reads live, so the two disagree until a refresh.
- **Seed the example boards** with `training/recorder/15-setup.ts` (then `STEP=rework` for R, after module
  15 is recorded). Job numbers go to `training/recorder/kpi-seed.json`. In the demo, hours cost ₹700/h
  (Test Engineer) and ₹450/h (Test Both Roles), and R closes in September, so the screens' figures differ
  from this catalogue's.
