# Findings from recording the training videos

The recording agents drove every screen as the role that uses it, against a local copy of
`srbasha1974/repair-service`. The first round (commit `b379f87`) produced 19 findings. By `main` at
`5265318` (2026-09-26) **17 of them are fixed**. The KPI modules then added a second list: figures that
don't reconcile or don't mean what their label or MET-001 says. Details for each module are in
`modules/NN.json` → `notes`. The clips teach **what the app does today**.

## Open: the money and KPI figures (found while preparing modules 13–17)

Decided by the user on 2026-09-27 (repair-service decision log Rounds 10.28 and 10.31): the rest are fixed,
below. K9 and K10 are not to be acted on; K12 is a teaching note. Details are in `KPI-CATALOGUE.md`.

| # | Figure | Issue |
|---|---|---|
| K9 | Day boundaries | Sales dates closures by the Kolkata day, Profitability by the UTC day; a job closed just after midnight IST can fall in different months on the two screens. |
| K10 | Unbilled hours | Shifts as jobs change status; the comment in `hours.ts` says they are all from closed jobs, which is wrong. |
| K12 | "Parts premium" | Not a field anywhere. Taught as: parts beyond the normal price reduce the opportunity premium; markup on parts is the separate *Parts margin*. |

## Open: from round 1

| # | Where | Issue |
|---|---|---|
| 2b | Service rates | A future-dated rate can now be ended, but the card still counts it "0 in force". |
| 12b | Purchase request | Sending by email is built (repair-service 028) but needs the mail settings on the hosted environment before it sends. |

Smaller UX items still open:
- *Pick up* has no undo.
- After recording a delivery, the page lands on *Waiting on a part* (sending a PR now lands on *Orders*).
- The invoicing worklist's customer column is crushed.
- A closed Non-Repairable job card still labels its reason "Why it could not be saved" (the acts now read "Cannot repair…").
- The inward time shows as 05:30.
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

## Fixed on 2026-09-27 (repair-service `develop` b053262, features 031 and 032)

| # | Finding | Fix |
|---|---|---|
| K1 | Profitability: Revenue, Cost, Total margin | Write-offs count in Total margin; Revenue − Cost = Total margin (repair-service 031, Round 10.28) |
| K2 | Rework cost | Counted once, in the rework's month, charged to the engineer whose repair came back (031) |
| K3 | Scorecard › Rework | Rework = the engineer's own closures that came back (032, Round 10.31) |
| K4 | Scorecard › First pass | First pass over boards that went through verification only (032) |
| K5 | Verification hours | Verification hours are the verifier's; Checking column on By engineer (031) |
| K6 | Two "stuck" lists | One rule: working days since the last activity, boards on the bench (032) |
| K7 | Sales › Won | Won = conversions made in the period (032) |
| K8 | Funnel velocity | Median per step on the screen and in the MCP measure (032) |
| K11 | No screen | Quotations won and Agreed by negotiation on MIS › Sales (032) |
| K13 | Rate card | Price from the rate card… on the job card, Service Head or Liaison (032) |
| K14 | Job card › Premium | The Service Head reads premium reasons (032) |
| K15 | Spares not charged | A dash, not 0 (032) |
| K16 | Queue aging | Gate rows drawn as rows (032) |
| K21 | Purchase request address | "Purchase requests go to" on the configuration screen (032) |
| 18 | Spares release per line | A board resumes only when all its parts are in; the receipt names what it released (032) |
| 19 | No Sunday column | The timesheet runs Monday to Sunday (032) |
| 3b | Lifecycle header and refusal | Move count shown; the refusal points to the Jobs tab (032) |
| UX | Rate-card pill, verification banner, *Remove* / *Customer withdrew* confirmations, Bin column, "Cannot repair…" wording | Fixed (032) |

These are on `develop`, not yet deployed to production.

## Test data

Only the throwaway local database is touched by the recordings; nothing reaches production.
