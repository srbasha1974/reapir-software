# KPI catalogue for staff training videos

The non-obvious figures in the Thulir service console, in three modules: **Operational**, **Money** and
**Sales**. Each one is explained the way the code computes it. Plain counts, such as the number of jobs
or open work orders, are left out.

- **Source of truth:** the database in `/home/user/repair-service`. Every `file:line` below is relative
  to that repo. Where MET-001 or a spec disagrees with the code, the code wins and the difference is
  flagged with ⚠.
- **Worked examples:** all of them come from **one month at one shop** (below), so each figure builds on
  the one before. The local demo data is too thin to film money figures from: `mv_job_margin` has 0
  rows and only 3 jobs have closed. Seed or refresh it before recording (see *Before filming*).

---

## The worked month: September at Thulir

Engineer **Ramachandran** closes four boards in September. Labour costs **₹400/h** for everyone.

| Job | What | Pricing | Normal price N | Agreed Q | Parts billed P (sell) | Parts cost | Hours × ₹400 | Outcome |
|---|---|---|---|---|---|---|---|---|
| **A** | Servo drive, AYYAN INDUSTRIAL, line down | Quotation. No rate card, so the Liaison **typed** N (*Set by hand*). Reason: *Urgent turnaround* | ₹10,000 | ₹12,000 | ₹2,400 (2 IGBTs + gate driver) | ₹1,800 + a ₹150 fuse given free (no billed price) = ₹1,950 | 5 h repair + 1 h peer verification by Baleswar = 6 h = ₹2,400 | Ready for Invoice, passed verification first time |
| **B** | PLC power supply, contract customer | Rate card ₹6,000, no quotation | ₹6,000 | ₹6,000 | ₹500 | ₹350 | 4 h = ₹1,600 | Ready for Invoice, failed verification once |
| **C** | VFD control board, contract customer quoted below its rate | Quotation; rate ₹10,000 | ₹10,000 | ₹8,000 | ₹1,000 | ₹700 | 8 h = ₹3,200 | Ready for Invoice |
| **D** | Mammography PMC board | Written off, never priced | — | — | — | — | 6 h = ₹2,400 | Non-Repairable |

On **31 Oct**, board A comes back inside its 3-month warranty and becomes rework job **R**, priced ₹0.
R takes 2 h (₹800) and a ₹300 part given free, so it costs ₹1,100. Several examples below use it.

Standard times: A 6 h, B 4 h, C 10 h, D none. Ramachandran's September target is ₹20,000.

---

# Module 1: Operational KPIs

### 1.1 Yield

- **On screen:** MIS dashboard › *This period's figures* tile **"Yield"** (detail line: *"3 : 1 success to
  wastage"*). Also *Yield* › **"Pipeline yield"** › **"Success to wastage"**, which adds a segment table
  with the columns *Completed / Written off / Yield*.
- **Who sees it:** MIS roles, meaning Admin, Executive Management, Operations Manager, Sales Head,
  Service Head and Liaison (`app/(app)/mis/page.tsx:74-75`).
- **Plain meaning:** of the boards we finished deciding on this month, the share we actually repaired.
- **Formula:**
  - Yield = successes ÷ (successes + wastage), over jobs whose **close date** falls in the period
    (`lib/domain/reports/tiles.ts:111`; `supabase/migrations/20260905000900_yield_report_TD-006.sql:25-60`).
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
  (`tiles.ts:158`; `supabase/migrations/20260905001000_period_closure_figures_TD-006.sql:24`).
- **Worked example:**
  - September: 0 of 4, which reads **0.0%**.
  - October: R closes. If 9 other jobs also close, it reads 1 ÷ 10 = **10.0%**.
- **How to read it:**
  - Rising rework means repairs are not holding. Open the rework chain in Profitability › *Rework
    carried* to see which original job failed.
  - **Misreading to avoid:** confusing it with the *Rework* column on Performance (1.8). That column is a
    different figure.

### 1.4 Stuck tasks / Stuck jobs

- **On screen:**
  - MIS dashboard tile **"Stuck jobs"** (*"past the configured threshold, in business days"*).
  - *Stuck tasks* › **"Idle longest first"** (columns *Job number, Customer, Engineer, State, Idle,
    Priority*) with its **"What counts as stuck"** panel.
  - MIS roles.
- **Plain meaning:** a board in Alloted or In Progress that **nobody has touched**. Touching it means
  logging hours, booking a part or changing its status.
- **Formula:**
  - idle = business days (Mon–Fri) from the last activity to today.
  - Stuck when idle **>** threshold. The threshold is `stuck_task_threshold_days`, currently 5
    (`supabase/migrations/20260905000300_stuck_task_activity_once_SC-004.sql:30-70`).
  - Pending Spare, On Hold and the testing gates are out of scope.
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

### 1.5 "What has stalled" › Stuck (a different stuck list)

- **On screen:** *What has stalled* › **"Stuck"** (*"N jobs past 5 days"*, columns *Job, Customer,
  Sitting at, Since, Days*).
- **Who sees it:** anyone holding `work_order.read`, including Engineers, who see only their own boards.
- **Plain meaning:** boards that have **sat in the same state** for 5 days or more.
- **Formula:**
  - Calendar days since the board entered its current sub-status, listed when ≥ threshold
    (`lib/domain/status-history.ts:162-190` over `v_queue_aging`,
    `supabase/migrations/20260902001400_service_centre_queue_aging_TD-002.sql:15-37`).
  - Every open state counts except Pending Spare, **including On Hold and the testing gates**.
  - Logging hours does **not** reset it.
- **Worked example:** a board entered In Progress on Thu 10 Sep and gets hours logged every day. On
  Tue 15 Sep it has been in that state for 5 calendar days, so it **is listed here**. It is **not** on
  MIS *Stuck tasks* (1.4).
- **How to read it:**
  - Use this list to ask "why is this still In Progress?" Use 1.4 to ask "is anyone touching it?"
  - **Misreading to avoid:** expecting the two stuck counts to match. They measure different things. ⚠
    Two screens use the word "stuck" for two definitions.

### 1.6 Queue aging (and the testing gates call-out)

- **On screen:**
  - *Queue aging* › **"Queue aging bottleneck"** › **"Open work orders by state and age"**, with columns
    **0–2 d · 3–5 d · 6–10 d · 11 d +** and *Total*.
  - The **"The testing gates"** panel beside it.
  - MIS roles.
- **Plain meaning:** where the open boards are waiting, and for how long **in their current state**.
  The total age of the job does not matter here.
- **Formula:**
  - days_in_state = today − the date of the last status change (calendar days). The board is placed in
    brackets from `queue_aging_brackets = 3,6,11` (`queue_aging_matrix()`,
    `supabase/migrations/20260905000800_queue_aging_matrix_TD-006.sql:22`).
  - The gates are *Ready for Verification* and *Awaiting Customer Confirmation*. Their call-out is the
    third bracket's lower bound, **6 days** (`app/(app)/mis/aging/page.tsx:163-190`).
- **Worked example:**
  - Board B entered Ready for Verification on 12 Sep. On 20 Sep it is 8 days in state, so it lands in
    the **6–10 d** column and counts as "over 6 days" in the gates panel.
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
  - Unbilled = all hours except BILLED and **OPEN** (`lib/domain/reports/hours.ts:68`).
- **Worked example:**
  - September timesheets:
    - A 6 h, B 4 h and C 8 h are BILLED.
    - D 6 h is NON_REPAIRABLE.
    - Open job E has 10 h (OPEN).
    - Job F has 3 h and is currently stuck (IDLE).
  - Logged = 37 h. Unbilled = 6 + 3 = **9 h**, and 9 ÷ 37 = **24.3%**. The tile also shows *10 h still
    open*.
- **How to read it:**
  - A high share means diagnosis time is going on boards we lose. Check the *where it went* rows.
  - **Misreading to avoid:** treating last month's figure as final. Dispositions follow **today's**
    status, so September's number moves when E closes or F gets touched. ⚠ The docstring at `hours.ts:34`
    says "booked against work that closed", but IDLE hours belong to open jobs.

### 1.8 Engineer scorecard: Efficiency, First pass, Rework, Non-repairable

- **On screen:** *Performance* › month table, columns **"Efficiency"**, **"First pass"**, **"Rework"**,
  **"Non-repairable"** (`app/(app)/service-centre/performance/page.tsx:130-170`).
- **Who sees it:** an Engineer sees their own row. Liaison, Operations Manager, Sales Head, Service Head,
  Admin and Executive Management see everyone.
- **Plain meaning:**
  - **Efficiency:** how your hours compare with the standard time for the same board.
  - **First pass:** how often your repair passed peer verification first time.
  - **Rework:** the share of your closed jobs that were rework jobs.
  - **Non-repairable:** the share you closed as cannot-repair.
- **Formula** (`supabase/migrations/20260902001600_service_centre_scorecard_excludes_leavers_UC-020.sql:71-140`),
  over jobs **assigned to the engineer** and closed that month:
  - Efficiency = Σ standard hours ÷ Σ hours logged × 100, **on comparable jobs only** (those with a
    standard time) (`:120-122`). The screen adds *"of N"* when some jobs had no standard.
  - First pass = jobs with `verification_cycle_count = 0` ÷ jobs closed (`:125`).
  - Rework = jobs whose own `job_type = 'REWORK'` ÷ jobs closed (`:128`).
  - Non-repairable = jobs at *Non-Repairable* ÷ jobs closed (`:131`). Customer Rejected is not counted.
  - Below `minimum_jobs_for_comparison` (5) jobs, the row gets a **"Small sample"** tag and is not ranked.
- **Worked example:** Ramachandran closed 4 jobs, so he gets *Small sample* (4 < 5).
  - Efficiency: standards 6 + 4 + 10 = 20 h, against hours 6 + 4 + 8 = 18 h. 20 ÷ 18 = **111.1%**, shown
    as *"of 3"* because D has no standard.
    - ⚠ A's 6 h includes Baleswar's 1 h of verification. Without it, A alone would read 120%.
  - First pass: A, C and D have 0 failed cycles; B has 1. 3 ÷ 4 = **75%**.
    - ⚠ D was never verified but counts as a first pass.
  - Rework: 0 ÷ 4 = **0%**.
  - Non-repairable: 1 ÷ 4 = **25%**.
- **How to read it:**
  - Above 100% means faster than standard. Always read speed next to first pass and rework.
  - **Misreading to avoid:** "Rework 20% means 20% of my repairs came back." The column counts rework
    jobs you *handled*, which may have been someone else's failures. The failure itself is charged to the
    original job (2.9). ⚠ MET-001 E-03 asks "how often does work come back?", and the code does not
    answer that question.

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

### 2.1 Normal price (and "Set by hand")

- **On screen:**
  - The quotation raise form shows **"Normal price"** with a *Rate card* or **Set by hand** tag
    (`app/(app)/service-centre/quotations/[...quotation]/quote-forms.tsx:137-170`).
  - The job card money panel **"What it cost, and what it made"** shows **"Normal price"** with *"set by
    hand — no rate card"* or *"from the rate card"* (`app/(app)/service-centre/jobs/[...job]/page.tsx:137-141`).
- **Who sees it:**
  - The form: Liaison, Service Head, Operations Manager, Admin and Executive Management.
  - The job card panel: MIS roles only. **Engineers do not see this panel.**
- **Plain meaning:** what this board would normally cost the customer, parts included.
- **Formula:**
  - The customer's rate card for that board and service level, if one exists. Otherwise the person
    quoting types it and the board is marked `labour_set_by_hand`.
  - The split is fixed at approval; changing it needs a revised quotation (`…opportunity_premium…sql:245-273`).
  - Boards with different normal prices cannot share a quotation line.
- **Worked example:** AYYAN has no rate card, so the Liaison types **₹10,000** for A and it is tagged *Set
  by hand*. C's customer has a ₹10,000 rate, so its field is read-only with the *Rate card* tag.
- **How to read it:**
  - This is the anchor for everything the engineer is credited with. Type it honestly: what you would
    charge a regular customer for this repair on a normal day.
  - **Misreading to avoid:** "normal price = labour." It **includes parts**.

### 2.2 Labour charge (base price)

- **On screen:**
  - The job card shows **"Labour charge"** (*"normal price less parts billed"*). Boards priced before
    feature 017 show **"Base price"** instead.
  - The quote form shows **"Engineer's labour charge — ₹N less parts"**.
  - The quotation record shows **"Labour charge ₹N less parts"**.
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
  - The job card and the quotation record both show **"Premium"**.
  - The MIS tile is **"Premium captured"**.
  - Profitability shows **"Opportunity premium"**, the section **"Opportunity premium captured"** (by
    reason), and the **"Premium"** tab (cut by *Reason / Customer / Segment*).
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
  - Profitability shows *"₹X discount given"* and the Premium tab's **"Discount"** column. Discounts are
    grouped under the reason **"Below normal"**.
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
  column (`…opportunity_premium…sql:70-71`). On all-in boards this equals the larger of Q and P.
- **Worked example:**
  - A: 7,600 + 2,400 + 2,000 − 0 = **₹12,000**. B: 5,500 + 500 = **₹6,000**. C: 9,000 + 1,000 − 2,000 =
    **₹8,000**.
  - D is unpriced (*"not priced yet"*).
  - September Revenue = **₹26,000**.
- **How to read it:**
  - **Misreading to avoid:** "₹12,000 + ₹2,400 parts." Parts are already inside the price.

### 2.6 Labour margin / Engineer margin, and Base margin %

- **On screen:**
  - Job card: **"Labour margin"**.
  - MIS tile **"Base margin"**: *"67.4%"*, with detail *"₹14,900 on ₹22,100 · premium is reported beside
    this, never inside it"*.
  - Profitability card **"Base margin"** (*"67.4% of base price · how well we delivered"*).
  - Profitability › *Parts against labour* › **"Labour margin"**, and the *By engineer* column **"Labour
    margin"**.
- **Plain meaning:** what the labour charge left after paying for the hours, including the cost of any
  rework that came back.
- **Formula:**
  - `margin_labour = base_price − labour_cost − rework_cost_rolled_up`
    (`supabase/migrations/20260901000700_crm_work_order_DDE-001.sql:112-113`).
  - `labour_cost` = Σ hours × `cost_rate_applied`, with the rate frozen on the day logged
    (`20260902000400_service_centre_timesheet_UC-011.sql:48, 261`).
  - Base margin % = Σ margin_labour ÷ Σ base_price (`tiles.ts:112`; `lib/domain/reports/profitability.ts:327`).
- **Worked example:**
  - A: 7,600 − 2,400 − 0 = **₹5,200**. B: 5,500 − 1,600 = **₹3,900**. C: 9,000 − 3,200 = **₹5,800**.
    D: null, because it is unpriced.
  - September: 14,900 ÷ 22,100 = **67.4%**.
- **How to read it:**
  - This is the fair measure of delivery. Premium and parts markup are excluded by construction.
  - **Misreading to avoid:** the write-off's cost is **not** in this figure (null margins drop out of the
    sum). ⚠ The *Parts against labour* card prints *"₹22,100 charged · ₹9,600 cost · ₹0 rework"*, and
    22,100 − 9,600 = ₹12,500, not ₹14,900. The ₹2,400 difference is D's labour.

### 2.7 Parts margin

- **On screen:** job card **"Parts margin"**; Profitability › *Parts against labour* › **"Parts margin"**
  (*"23.1%"*, *"₹3,900 charged · ₹3,000 cost"*).
- **Plain meaning:** what we made selling parts: the selling price minus the purchase price. This is
  procurement's result, not the engineer's.
- **Formula:**
  - `margin_parts = parts_revenue − parts_cost` (`…crm_work_order_DDE-001.sql:114-115`).
  - `parts_cost` = Σ `booked_cost`, the purchase price × qty frozen at consumption.
  - `parts_revenue` = Σ billed price × qty (`…timesheet_UC-011.sql:300-301, 375-378`).
  - Rate = margin_parts ÷ parts_revenue (`profitability.ts:331`).
- **Worked example:** A: 2,400 − 1,950 = **₹450**. The free fuse costs ₹150 and earns nothing. B earns ₹150
  and C ₹300. September total: 900 ÷ 3,900 = **23.1%**.
- **How to read it:**
  - **Misreading to avoid:** "cheap parts help my labour margin." On an all-in board a higher **selling**
    price raises parts margin and lowers the labour charge by the same amount.

### 2.8 Total cost and Total margin (Profit)

- **On screen:**
  - The job card shows **"Total cost"** and **"Total margin"**.
  - Profitability has the cards **"Cost"** (*"labour · parts · rework"*) and **"Total margin"** (*"x% of
    revenue · how well we traded"*), and the cut **"Jobs at a loss"** / **"Negative margin"**.
- **Plain meaning:** the whole commercial result of the job: labour, parts, premium and discount together.
  This is what the owner means by "profit" on a job.
- **Formula:**
  - `total_cost = labour_cost + parts_cost + rework_cost_rolled_up` (`…DDE-001.sql:108-109`).
  - `margin_total = margin_labour + margin_parts + premium − discount`, which equals
    `price_charged − total_cost` (`…opportunity_premium…sql:72-74`).
  - Rate = Σ margin_total ÷ Σ price_charged (`profitability.ts:329`).
- **Worked example:**
  - A: cost 2,400 + 1,950 = ₹4,350. Margin 5,200 + 450 + 2,000 = **₹7,650**, which checks against 12,000 −
    4,350.
  - B: ₹4,050. C: 5,800 + 300 − 2,000 = **₹4,100**.
  - September Total margin = ₹15,800. 15,800 ÷ 26,000 = **60.8%**.
- **How to read it:**
  - **Misreading to avoid:** Revenue − Cost on the same screen gives 26,000 − 12,600 = ₹13,400, not
    ₹15,800. ⚠ *Cost* includes the write-off D, but *Total margin* and *Negative margin* skip unpriced
    jobs (`20260918000100_profitability_without_the_ledger_TD-006.sql:50-85`). D does **not** appear under
    *Jobs at a loss*.

### 2.9 Cost of rework carried

- **On screen:**
  - The job card shows **"Rework rolled up"**.
  - Profitability has the tab **"Rework carried"** (*"Charged back to / Rework job / Customer / Cost
    carried"*) and *Cost › rework*.
- **Plain meaning:** what a comeback cost, charged back to the job that failed.
- **Formula:**
  - `rework_cost_rolled_up` on the original = Σ `total_cost` of its rework jobs
    (`20260902001300_service_centre_rework_rolls_up_TD-004.sql:35`).
  - A warranty rework is priced ₹0 (`20260919000500_warranty_rework_is_recognised_MET-001.sql:82-83`).
- **Worked example:**
  - R costs ₹1,100, which lands on A.
  - A's labour margin: 7,600 − 2,400 − 1,100 = **₹4,100**. Total margin becomes ₹6,550.
  - **September** base margin is rewritten to 13,800 ÷ 22,100 = **62.4%**, even though R closed in
    October.
- **How to read it:**
  - **Misreading to avoid:** "last month's figures are final." A comeback rewrites the month the
    original closed in.
  - ⚠ R itself also carries its own cost: margin_labour −₹800, total −₹1,100, and it appears in October's
    *Jobs at a loss*. Company totals across both months therefore count the ₹1,100 twice. Confirm this
    with the owner before teaching it.

### 2.10 Premium as a share of revenue

- **On screen:** the MIS tile *Premium captured* detail (*"7.7% of revenue · commercial, not delivery"*);
  Profitability *Opportunity premium* card.
- **Plain meaning:** how much of what we charged came from urgency pricing rather than the work.
- **Formula:** Σ premium_amount ÷ Σ price_charged (`tiles.ts:194`; `profitability.ts:330`). MET-001 M-06.
- **Worked example:** 2,000 ÷ 26,000 = **7.7%**.
- **How to read it:** a rising share is a **warning**, not an achievement. The work itself is earning less
  (MET-001 M-06). Read it next to Base margin.

### 2.11 Spares not charged for / Uncosted hours

- **On screen:**
  - Profitability tab **"Spares not charged"** (*"Cost absorbed"*).
  - Profitability card **"Uncosted hours"** (*"no rate in force"*), with a warning bar when it is non-zero.
- **Plain meaning:**
  - **Spares not charged:** parts we fitted free (warranty or goodwill). The cost is real.
  - **Uncosted hours:** hours logged when no labour rate existed. They are costed ₹0, so every margin is
    **overstated**.
- **Formula:**
  - Spares: Σ `booked_cost` where `billed_price` is null (MET-001 M-15).
  - Uncosted: Σ hours where `cost_rate_applied = 0` (H-05).
- **Worked example:**
  - The ₹150 fuse on A appears under Spares not charged (₹150). On R, the ₹300 part appears in October.
  - If A's 5 h had been logged before a rate was set, labour would read ₹400 instead of ₹2,400, and A's
    labour margin would read ₹7,200 instead of ₹5,200.
- **How to read it:**
  - Any uncosted hours means *fix the rate first, then read the margins*.

### 2.12 Actual / Target / Achievement (the engineer's month)

- **On screen:** *Performance* columns **"Actual"**, **"Target"**, **"Achievement"** (tag *"76.5% ·
  below"* or *"· met"*). The foot note reads *"Actual is the labour margin on jobs closed this month"*.
- **Who sees it:** an Engineer sees their own row. Leads see everyone.
- **Plain meaning:** the labour margin you produced this month, against the target your lead set.
- **Formula:**
  - Actual = Σ (`margin_labour` + **verification labour cost on that job**) over your closed jobs
    (`20260902002000_service_centre_verification_measure_TD-009.sql:78`). Someone else checking your board
    does not cost you.
  - Achievement = Actual × 100 ÷ Target, to one decimal.
  - No target shows **"none set"** and "—", never 0%.
- **Worked example:**
  - A: 5,200 + 400 (Baleswar's verification hour added back) = 5,600. B: 3,900. C: 5,800. D: unpriced, so
    it adds nothing.
  - Actual = **₹15,300**. 15,300 ÷ 20,000 = **76.5% · below**.
  - After R's rework rolls up onto A, September's Actual falls to ₹14,200 (**71.0%**).
- **How to read it:**
  - **Misreading to avoid:** matching it to Profitability › *By engineer* › *Labour margin*. That column
    shows ₹14,900 because it does not add verification back.
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
    between 00:00 and 05:30 IST on the 1st can land in different months on the two screens.

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
  - The person named is the **quotation's creator**.
- **Worked example:**
  - AYYAN: 1 job, **+₹2,000**, Set by hand ₹2,000 (A was typed).
  - C's contract customer: 1 job, **−₹2,000** discount, Set by hand "—" (rate card).
- **How to read it:**
  - A customer who is always discounted is a pricing conversation. A premium that rests on typed prices
    only proves something once rate cards exist.
  - **Misreading to avoid:** netting the columns into "₹0 overall". They are reported apart on purpose.

### 3.4 Won (conversions per engineer)

- **On screen:** *Sales* › *By engineer* › **"Won"** (*"to the owner when it converted"*).
- **Plain meaning:** accounts you turned into Regular customers.
- **Formula:** a count of customers who reached Regular, credited to whoever **owned the account when it
  converted** (`v_customer_conversion_credit`). ⚠ The cohort is customers **opened** (clock-in date) in
  the period (`20260925000300_sales_attribution_DDE-001.sql:584`), not conversions that happened in the
  period, as MET-001 S-03 says.
- **Worked example:**
  - Priya opened a hospital account in March, and it converted in June while she owned it. In August it
    was handed to Arun.
  - For March, *Won* credits **Priya: 1**. For June it shows **nothing**. Arun never gets it.
- **How to read it:**
  - **Misreading to avoid:** a recent month looks weak because its accounts have not had time to convert.
    Compare months that are at least a quarter old.

### 3.5 Team conversion (Potential → Regular)

- **On screen:** *Sales* › *By engineer* meta: **"team conversion NN%"**, with the *Funnel and velocity*
  bars *Potential / Trial / Regular*.
- **Plain meaning:** of the accounts opened in the period, the share that have become Regular so far.
- **Formula:** reached_regular ÷ opened, for the cohort opened in the period (`lib/domain/reports/sales.ts:300`;
  `sales_funnel`, `20260905001100_sales_analytics_TD-006.sql:83-116`).
  - It is shown for the **team only**. Per engineer the two bases differ once accounts move.
  - A period with nothing opened shows "—", not 0%.
- **Worked example:** 40 accounts opened in Q1; 21 reached Trial and 6 reached Regular. 6 ÷ 40 = **15.0%**.
  The bars read 40 / 21 / 6.
- **How to read it:**
  - **Misreading to avoid:** the same quarter's figure rises for months afterwards as the cohort matures.
    It is not a live monthly rate.

### 3.6 Funnel velocity (medians)

- **On screen:** *Sales* › *Funnel and velocity* › **"Potential → Trial, median"** and **"Trial → Regular,
  median"**. When nobody has taken the step, it shows *"none yet"*.
- **Plain meaning:** how long a typical account takes to reach the next stage.
- **Formula:** `percentile_disc(0.5)` of days between stages, only over accounts that took the step
  (`20260905001100_sales_analytics_TD-006.sql:83-116`). ⚠ The seeded measure `funnel.velocity` says
  `avg(first_regular_on − clock_in_date)`, which is a mean over the whole journey. The screen shows medians
  per step.
- **Worked example:** five trials took 10, 20, 34, 40 and 90 days, so the median is **34 days**. The mean
  would be 38.8, pulled up by the 90-day account.
- **How to read it:**
  - Long Trial → Regular times mean trial customers are left to drift. Watch *Trial jobs consumed*
    against the ceiling of 10.

---

# Suggested clip outlines

### Module 1: Operational (two clips)

**Clip 1a. "Where is the floor losing time?"** (MIS dashboard → Yield → Queue aging → Stuck tasks → What
has stalled)

1. **Yield**: MIS tile, then the Yield page ratio bar.
2. **Wastage cost this period**: Yield page.
3. **Rework rate**: MIS tile, then Yield › *Rework jobs*.
4. **Queue aging + testing gates**: the Queue aging page.
5. **Stuck tasks**: the MIS tile, then the Stuck tasks list and its *What counts as stuck* panel.
6. **What has stalled › Stuck**: show the same board on both screens to explain the difference.
7. **Unbilled hours**: the MIS tile, then the tracer.

**Clip 1b. "Reading your scorecard"** (Performance, signed in as an Engineer, then as the Service Head)

1. Efficiency.
2. First pass.
3. Rework (the scorecard column).
4. Non-repairable.
5. *Small sample* and "not comparable".

**Quiz, Module 1**

1. A board has been In Progress for 8 calendar days and the engineer logs hours on it every day. Where
   does it appear?
   - (A) Both stuck lists (B) Only *What has stalled › Stuck* (C) Only MIS *Stuck tasks* (D) Neither
   - **Answer: B (index 1).** *What has stalled* measures time in state. *Stuck tasks* resets on any
     activity.
2. In September, 18 boards went to Ready for Invoice, 4 were Non-Repairable and 2 were Customer Rejected.
   What does Yield show?
   - (A) 75.0% (B) 81.8% (C) 90.0% (D) 85.7%
   - **Answer: A (index 0).** 18 ÷ (18 + 4 + 2) = 75.0%. Customer Rejected counts as wastage.
3. Your scorecard says Rework 25%. What does that mean?
   - (A) A quarter of your repairs came back (B) A quarter of the jobs you closed were rework jobs, whoever
     did the original (C) You failed verification on a quarter of jobs (D) A quarter of your hours were
     unbilled
   - **Answer: B (index 1).** The column counts `job_type = REWORK` among your own closures.
4. September unbilled hours read 9 h on 1 October and 19 h on 15 October. What is the most likely cause?
   - (A) Someone edited old timesheets (B) An open job with September hours was written off
     (OPEN → NON_REPAIRABLE) (C) The threshold changed (D) A rate card was added
   - **Answer: B (index 1).** Disposition follows each job's **current** status.

### Module 2: Money (two clips)

**Clip 2a. "One job's price, split"** (quote raise form → approved quotation record → job card money
panel, all on board A)

1. Normal price / Set by hand.
2. Labour charge.
3. Opportunity premium, including the parts-over-N case.
4. Discount (board C).
5. Charged.
6. Labour margin → Parts margin → Total margin.

**Clip 2b. "The month in money"** (MIS tiles → Profitability → Performance)

1. Base margin %.
2. Premium captured and its share of revenue.
3. Total margin, and why Revenue − Cost differs (the write-off).
4. Cost of rework carried: show the September figure moving after R.
5. Spares not charged / Uncosted hours.
6. Actual / Target / Achievement.
7. Labour on open boards (overview).

**Quiz, Module 2**

1. Normal ₹10,000, quoted ₹12,000, parts billed ₹2,400. What is the engineer's labour charge?
   - (A) ₹12,000 (B) ₹10,000 (C) ₹7,600 (D) ₹9,600
   - **Answer: C (index 2).** N − P = 10,000 − 2,400. The premium never reaches the engineer.
2. Same board, but the parts billed rise to ₹11,000. What does the customer pay, and what is the premium?
   - (A) ₹23,000 / ₹2,000 (B) ₹12,000 / ₹1,000 (C) ₹12,000 / ₹2,000 (D) ₹11,000 / ₹0
   - **Answer: B (index 1).** Pays = the larger of 12,000 and 11,000. Premium = 12,000 − the larger of
     10,000 and 11,000.
3. A rate-₹10,000 board is sold at ₹8,000. What happens to the engineer's labour margin?
   - (A) Falls by ₹2,000 (B) Unchanged; the ₹2,000 is recorded as a Discount (C) Becomes negative
     (D) Only the parts margin falls
   - **Answer: B (index 1).** The discount is its own line and sits outside margin_labour.
4. Your September Achievement drops in November with no new September closures. Why?
   - (A) A target was edited (B) A board you closed in September came back as rework and its cost rolled
     onto the original job (C) Premiums were removed (D) The rate card changed
   - **Answer: B (index 1).** `rework_cost_rolled_up` reduces the original job's labour margin.

### Module 3: Sales (one clip)

**Clip 3. "What your accounts are worth"** (Sales analytics → drill → Profitability Premium tab)

1. Charged.
2. Filled.
3. Unpriced count.
4. Premium / discount by customer and segment, with *Set by hand*.
5. Won.
6. Team conversion.
7. Funnel velocity medians.

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
3. You converted an account in June, and in August the Sales Head moves it to a colleague. Who is credited
   *Won*?
   - (A) The colleague (B) You (C) Both (D) Nobody
   - **Answer: B (index 1).** Credit goes to the owner at the moment of conversion.
4. Q1 team conversion reads 10% in April and 15% in July. What changed?
   - (A) The formula (B) More of the Q1 cohort reached Regular since April (C) New accounts were added to
     Q1 (D) Filled deliveries were removed
   - **Answer: B (index 1).** The cohort is fixed by opening date and matures over time.

---

## Before filming

- **Refresh the MIS data.** MIS screens read `mv_job_margin`, which is refreshed by the *Refresh* act
  (Admin or Operations Manager) or nightly. It is currently empty locally. The job card reads live, so the
  two disagree until a refresh.
- **Seed the example boards.** Demo data has only 2 all-in boards: ₹6,000, no premium, no discount, no
  parts. Seed A–D before recording the money clips.
- **Show the win rate verbally only.** Quotation win rate (S-08) and *Prices agreed by negotiation*
  (S-11) are measures, but no screen displays them. The quotations page only mentions them.
