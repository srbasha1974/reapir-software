# Findings from recording the training videos

The recording agents drove every screen as the role that uses it, against a local copy of
`srbasha1974/repair-service`. The first round (commit `b379f87`) produced 19 findings. By `main` at
`5265318` (2026-09-26) **17 of them are fixed**. The KPI modules then added a second list: figures that
don't reconcile or don't mean what their label or MET-001 says. Details for each module are in
`modules/NN.json` → `notes`. The clips teach **what the app does today**.

## Open: the money and KPI figures (found while preparing modules 13–17)

Please confirm or fix these before managers rely on the dashboards. Details and file:line references are in
`KPI-CATALOGUE.md`.

| # | Figure | Issue |
|---|---|---|
| K1 | Profitability: Revenue, Cost, Total margin | Cost includes write-offs, but Total margin, Negative margin and Jobs at a loss skip unpriced jobs, so Revenue − Cost ≠ Total margin on the same screen. In the worked month that is ₹13,400 vs ₹15,800. The "₹charged · ₹cost" line under Labour margin doesn't reconcile either. |
| K2 | Rework cost | It is rolled up onto the original job, and the ₹0 warranty rework job also carries its own cost, so company totals may count it **twice**. A comeback also rewrites an earlier month's figures (intended?). |
| K3 | Scorecard › Rework | Counts rework jobs the engineer *handled*, not their own work coming back (MET-001 E-03 describes the latter). |
| K4 | Scorecard › First pass | Never-verified write-offs count as first-pass passes. |
| K5 | Verification hours | Efficiency charges the checker's hours to the repairer and Actual adds that cost back, but Profitability › By engineer doesn't, so the two differ (₹14,900 vs ₹15,300). |
| K6 | Two "stuck" lists | MIS *Stuck tasks* counts business days since any activity and flags above 5. *What has stalled* counts calendar days in the current state, flags at 5, and includes On Hold and the testing gates. The same board can be on one list and not the other. The clips teach both, but one name for two rules confuses. |
| K7 | Sales › Won | Counts accounts *opened* in the period that later converted, not conversions *made* in the period (MET-001 S-03). |
| K8 | Funnel velocity | The screen shows medians per step; the seeded measure is a mean over the whole journey. |
| K9 | Day boundaries | Sales dates closures by the Kolkata day, Profitability by the UTC day; a job closed just after midnight IST can fall in different months on the two screens. |
| K10 | Unbilled hours | Shifts as jobs change status; the comment in `hours.ts` says they are all from closed jobs, which is wrong. |
| K11 | No screen | Quotation win rate (S-08) and prices agreed by negotiation (S-11) exist as measures but are shown nowhere. |
| K13 | Rate card | No screen sets a board's internal reference or service level, so a newly booked board can never pick up a rate-card price: every price is "Set by hand" and the "Rate card" tag never appears. |
| K14 | Job card › Premium | The Premium row shows no reason, although the job stores it (e.g. "Urgent turnaround") and the quotation record displays it. |
| K15 | Spares not charged | Shows Qty "0" for an Other spares line. |
| K16 | Queue aging | At 1366×768 the testing-gate rows break: the count drops below the state name and Awaiting Customer Confirmation is missing (the table shows 3 where the gates panel says 9). |
| K12 | "Parts premium" | Not a field anywhere. Taught as: parts beyond the normal price reduce the opportunity premium; markup on parts is the separate *Parts margin*. |

## Open: from round 1

| # | Where | Issue |
|---|---|---|
| 18 | Spares release | Works per request line: a board waiting on two lines goes back to In Progress when either is covered, not only when both are. |
| 19 | Timesheet | The week runs Monday–Sunday, but the grid has no Sunday column; Sunday hours count but can't be seen or edited. |
| 2b | Service rates | A future-dated rate can now be ended, but the card still counts it "0 in force". |
| 3b | Customer › Lifecycle | Header "0 in all" while one move is listed; the convert refusal says open jobs are "listed above" but none are. |
| 12b | Purchase request | "Send to the front office" still sends no email. |

Smaller UX items still open:
- Reservoir shows the "Assessed — rate card" pill on every job Under Assessment.
- *Pick up* has no undo.
- Rows vanish without confirmation after *Customer withdrew* and after *Remove*.
- The verification banner shows only the job number.
- After sending a PR or recording a delivery, the page lands on *Waiting on a part*.
- The invoicing worklist's customer column is crushed.
- The Non-Repairable act reads "It cannot be saved…" in red, like an error.
- The inward time shows as 05:30.
- The Bin column is narrow while typing.
- The challan's accessories warning appears the moment a board is ticked.

## Fixed since round 1 (commit on `main`)

| # | Finding | Fix |
|---|---|---|
| 1 | Engineer couldn't close Non-Repairable (empty reason list) | Engineer reads reasons; Liaison can close too (d720ce0) |
| 2 | Future-dated rate couldn't be ended | *End this rate* available (d720ce0) |
| 3 | *Move it back* shown to the Sales Head | Operations Manager only (d720ce0) |
| 4 | Invoicing open to Front Office by URL | Refusal shown (d720ce0) |
| 5 | *Send to the front office* shown to Front Office with false success | Liaison only; reports failure honestly (d720ce0, 5cf702c) |
| 6 | Batch line box one character wide | Fixed (d720ce0) |
| 7 | Unit dropped from a quotation revision stuck | Returns to Under Assessment (e272746) |
| 8 | One line per quotation | Several lines by kind, per-line split (6017ed8) |
| 9 | No one could set On Hold | Put on hold / Release hold for Service Head and Liaison (53d9b89) |
| 10 | No SLA at allotment | Customer's date at the counter, SLA at allotment, overdue tracking (e43e55f) |
| 11 | No field for the diagnosis | "What the assessment found" (e43e55f) |
| 12 | No ORDERED step or Zoho PO field | Front Office marks Ordered with the PO number (8931541) |
| 13 | Self-verification help text | Corrected (d720ce0) |
| 14 | No accessory-only challan line | "Send an accessory on its own" (6cd1b68) |
| 15 | No screen set a premium | Premium with a reason on the raise and phone forms (ca744fb, e1854f6, d8252b8) |
| 16 | Primary contact only afterwards | Primary checkbox on *Add a person* (045f088) |
| 17 | Labour block hard-coded to names | Follows the sub-status flag (a684560) |

## Test data

Only the throwaway local database is touched by the recordings; nothing reaches production.
