# Findings from recording the training videos

While recording the 13 training modules against a local copy of `srbasha1974/repair-service` (commit
`b379f87`), the recording agents drove every screen as the role that uses it. These are the places where
the app broke, disagreed with its own use cases, or confused. Each one comes from a recording or from the
code; full context is in `modules/NN.json` → `notes`. The clips teach **what the app does today**.

## Bugs: a role can't do what it is granted

| # | Where | What happens | Module |
|---|---|---|---|
| 1 | Job card › **Cannot repair…** (Engineer) | The reason list is empty, so an engineer can never close a job as Non-Repairable. The Engineer role holds `work_order.close_non_repairable` but not `non_repairable_reason.read`. | 09 |
| 2 | Service rates | A rate that **starts in the future** can't be ended from the screen ("Same board, 0 customers", no *End this rate*). Its card counts "0 in force" while *Whose agreement* says 1. | 12 |
| 3 | Customer › Lifecycle (Sales Head) | The *Move it back* form is shown to anyone with `customer.convert`, but only the Operations Manager may use it; the database refuses the Sales Head. On a Potential account it even offers "Move to Trial". | 01 |
| 4 | `/front-office/invoicing` | The link is hidden from Front Office, but typing the URL shows the whole billing worklist with prices. Writes are presumably refused by RLS (not tested). Add a page guard. | 11 |
| 5 | Spares › *Send to the front office* | Shown to Front Office, who lack `purchase_request.manage`; RLS would update nothing while the screen reports success (read from code, not tested). | 06 |
| 6 | Invoice batch page | The *What the line says* box is about one character wide, so the text the customer will read can't be checked on screen (stored text is fine). | 11 |

## The use cases say one thing, the app does another

| # | Topic | Use case / spec | App today | Module |
|---|---|---|---|---|
| 7 | Partial quotation approval | Approve some units of a quotation | Approval/rejection is per whole version. Revising with fewer units leaves the dropped unit stuck at *Awaiting Quotation Approval* with no way forward on screen. | 04 |
| 8 | Multi-line quotations | Several items/lines per quotation (data model allows) | The raise form creates exactly one line. | 04 |
| 9 | On Hold | A hold is the Service Head's or Liaison's call | No screen or RPC sets On Hold for anyone. | 05 |
| 10 | SLA date | Set at allotment (UC-010) | Only the Inward *Needed by* date for business-critical deliveries. | 05 |
| 11 | Diagnosis | Recorded during assessment (UC-007 steps 1–3) | No field for findings; only move notes. | 03 |
| 12 | Purchase request ORDERED | DRAFT → SENT → **ORDERED** → RECEIVED | Nothing sets ORDERED; the Zoho PO reference can't be entered. "Send to the front office" sends no email. | 06 |
| 13 | Self-verification | Blocked (UC-013 E-001) | Allowed and recorded (decision 2026-09-02). Help text still says only peers are offered. | 08 |
| 14 | Accessory-only challan line | UC-009 AF-004 | No screen raises one; accessories join the boards' line. | 10 |
| 15 | Premium | Premium needs a reason | No screen sets a premium at all. | 09 |
| 16 | Primary contact | Mark primary while adding (UC-019 AF-001) | Set afterwards with *Make primary*. | 01 |
| 17 | "No time logging" flag on a sub-status | Configurable | The timesheet trigger names Pending Spare and On Hold directly; a new sub-status with the flag would still accept hours. | 00 |
| 18 | Release on partial delivery | A job resumes when its whole requirement is met | Works per request line: a board waiting on two lines resumes when either is covered. | 06 |
| 19 | Timesheet week | Monday–Sunday | Grid has no Sunday column; Sunday hours count but can't be seen or edited. | 07 |

## Smaller UX issues

- Reservoir shows **"Assessed — rate card"** on every job Under Assessment, even with no rate cards (03).
- *Pick up* has no confirmation and no undo (03).
- After *Customer withdrew* the row disappears with no confirmation (09); after *Remove* on a batch line, likewise (11).
- Verification success banner shows only the job number (08); the customer-testing form and *With the customer* bay are squeezed into the narrow Result column (08, 09).
- Redirects after *Send to the front office* / *Record a delivery* land on *Waiting on a part*, not *On order*; the post-delivery banner lists every waiting board in the shop (06).
- Invoicing worklist: customer name crushed into the tick column (11).
- Lifecycle tab header says "0 in all" while one move is listed; the convert refusal says open jobs are "listed above" but none are (01).
- The Non-Repairable act is labelled "It cannot be saved…" in red and reads like an error (00).
- Inward move time shows as 05:30 (date-only value rendered in IST) (09).
- The delivery-form Bin column fits only short codes while typing (02).
- The accessories warning on the challan form appears the moment a board is ticked (10).

## Test data the recordings left in the local database

Only the throwaway local database was touched. It now holds extra customers (Selvam Pumps / Kaveri
Automation / Madurai Plastics / Hosur Drives NNNN), deliveries, quotations, challans DC/26-09/000004+,
draft invoice batches IB/26-09/000001–000005, locked timesheet weeks for the test engineer, and a
₹50,000 September target for Test Both Roles. Nothing reached production.
