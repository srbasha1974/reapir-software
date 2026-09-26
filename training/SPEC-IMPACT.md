# Specification impact of feature 030-training

Research only. Nothing in `/home/user/repair-service` was edited. Read on branch `030-training` (cut from
`develop`, HEAD `fb2ca53`, the merge of 029), against the running local database (166 of 166
migrations).

**Feature:** an in-app Training area. It has role-based learning paths built from the 18 modules in
`training/modules/NN.json`, each with a video, a Do / Don't card, worked examples (modules 13 to 17) and a
quiz, in English and Tamil. It also adds a "?" on each screen's bin label that opens that screen's clip
or card, completion and quiz-score tracking in two new tables with RLS (leads see their team's progress),
videos in a private Supabase Storage bucket, and a band nudge ("Your training: 3 of 7"; the Engineer path
is modules 00, 05, 06, 07, 08, 09 and 14, which makes 7).

---

## Part A: artifacts to add or amend

### A.0 Next free numbers, as of 2026-09-26

| Series | Last used | Next | Where it is checked |
|---|---|---|---|
| Decision log Round | **10.27** (feature 029) | **Round 10.28** (10.29 for a second, separate decision) | `specification/open-questions.md` §A table |
| Use case | UC-021 | **UC-022** | `specification/use-cases/` |
| User story / AC | US-068 (`AC-068-001…014`, feature 016) | **US-069** (`AC-069-001`…). Add US-070 and US-071 if the feature is split into three stories | `specification/user-stories/` |
| Technical design | TD-011 (`0.0.4`) | **TD-012** | `specification/technical-designs/` |
| ADR | ADR-001 (`0.0.4`) | **ADR-002** | `specification/architecture/` |
| DDE-001 | **`0.0.44`** (MCP Spent Code). CLAUDE.md wrongly says `0.0.42` | **`0.0.45`** | changelog at the top of DDE-001 |
| PERMISSION-MATRIX | `0.0.15` | **`0.0.16`** | its changelog |
| MET-001 / DSH-001 / TD-011 | `0.0.10` / `0.0.4` / `0.0.4` | `0.0.11` / `0.0.5` / `0.0.5` | only if they are touched |
| Migration | `20260926001200_mcp_semantic_context_TD-011.sql` (header ordinal **0166**) | **`20260926001300_<slug>_<ARTIFACT>.sql`**, ordinal **0167** (on a later day: `20260927000100_…`) | `supabase/migrations/` |
| Task id | T1111 (feature 019) | **T1112** | `specs/*/tasks.md` (numbering is global) |
| Permission key | `purchase_request.order` (latest) | e.g. `training.read_team` | `permission.permission_key` |
| Storage bucket | `organisation` (public, 2 MB), `quotation-evidence` (private, 5 MB) | e.g. `training-video` (private) | `storage.buckets` |

### A.1 How previous features did it (the conventions to copy)

- **Workflow** (CLAUDE.md, constitution *Development Workflow*): `/speckit-specify` → `/speckit-clarify`
  (mandatory where the artifacts are silent, Article VII) → `/speckit-plan` → `/speckit-tasks` →
  `/speckit-analyze` → `/speckit-implement`. The `screen` skill is invoked before any file under `app/`.
  Artifact skills exist in `.claude/skills/` (`use-case`, `user-story`, `data-definition`,
  `technical-design`, `entity-relationship-diagram`, `user-journey`, `test-scenario`).
- **Feature folder** (016 and 017 are the full shape; 018 to 029 have only `spec.md`, plus
  `plan.md` and `tasks.md` in 019): `spec.md`, `checklists/requirements.md`, `research.md` (R1…Rn),
  `data-model.md`, `contracts/<name>.md`, `plan.md`, `quickstart.md`, `tasks.md`.
- **Clarifications** are recorded twice:
  1. In `spec.md` under `## Clarifications` → `### Session 2026-09-2x`, as `- Q: … → A: …`. A later
     correction strikes the old answer (`~~…~~`) and adds **Corrected while planning, date:** (016).
  2. As one row in the decision-log table (`open-questions.md` §A), `| Round 10.28 | **Title** | Decided
     by the user <date>, starting from *"<user's words>"*. **Answered, with the alternatives in front of
     the user:** (1) … (rejected: …) (2) … <artifacts moved, with versions>; migration 0167 |`. Every
     amendment and migration header then cites "decision log Round 10.28". Rows are appended without
     bumping the file's `v0.0.10` header, which is how 10.12 to 10.27 were added.
- **Spec shape** (016): header fields `Feature Branch`, `Created`, `Status`, `Input` (the user's quote);
  `## Why this feature exists`; `## What was decided before this specification, and is not reopened here`;
  `## User Scenarios & Testing` with `### User Story N — … (Priority: Pn)`, *Why this priority*,
  *Independent Test*, and numbered **Given/When/Then** scenarios, each ending in its AC id, e.g.
  `*(AC-069-001)*`. Then `### Edge Cases`, `## Requirements` with `FR-001…`, and success criteria.
  **AC ids belong to a user story written for the feature**: 016 renumbered from `AC-016-*`, which
  belonged to US-016, to `AC-068-*` under a new US-068. Feature 029 used FR-named tests instead
  (feature 008's convention), but only because it had no stories.
- **Plan** (016): `Technical Context`, then a **Constitution Check** table (Articles I to VIII, each
  Planned, Held or Observed) evaluated three times: before design, "Re-checked after design", and
  "Re-checked against what was built". Then `Project Structure`, `Order of work` and
  `Complexity Tracking`.
- **Tasks** (017): "Numbering continues from T…", conventions `[P]` and `[USn]`, and every task cites its
  artifact. **Phase 1 is the amendments**: the Round row, DDE-001, MET-001, TD, US, CLAUDE.md and
  artifact-map. The user reviews Phase 1 before any migration, and no screen is built before its amended
  mockup is approved.
- **Data-model amendments** (Article II): DDE-001 is amended and reviewed **before** the migration. You add
  a changelog row at the top: `` | `0.0.45` | 2026-09-2x | **Headline sentence** — decision log Round
  10.28, feature 030. New entity **X**: … Migration 0167 | ``. Note that the file currently lists `0.0.43`
  above `0.0.44`, so put 0.0.45 on top. You also add a row to *Entity Summary* and a
  `### Entity Name` table (`Field | Description | Data Type | Mandatory | Notes`, without the standard
  audit columns), plus *Relationships* rows (`From | Cardinality | To | Description`).
- **Grants**: the permission is recorded in PERMISSION-MATRIX (a changelog row, a matrix row, rules)
  **before** the migration ("a permission that exists in the database and not in the matrix is a rule
  nobody agreed to", migration `20260907000400_mcp_audit_read_TD-010.sql`). The migration pattern is
  `INSERT INTO permission (permission_key, area, description, is_write)`, followed by `INSERT INTO
  role_permission (role_id, permission_id, record_scope, granted_by_user_id) SELECT … 'ALL', (SELECT
  user_id FROM "system_user" WHERE is_protected AND deleted = false LIMIT 1) … AND NOT EXISTS (…)`, and a
  `DO $$` block that proves the row landed. Admin and Executive Management get nothing, because they reach
  every permission through `is_unrestricted()`. `permission.area` is CHECK-constrained to
  `SALES, FRONT_OFFICE, REPAIR, INVENTORY, MIS, ADMINISTRATION`, so a `TRAINING` area would be a schema
  change. Use `ADMINISTRATION` or `MIS`. `record_scope` is `ALL | OWN_ASSIGNED | OWN_CUSTOMERS`. There is
  **no "team" scope**.
- **RLS precedent for "own row, or a lead sees all"**: `target_read ON engineer_monthly_target USING
  (is_unrestricted() OR has_permission('performance.read') OR service_engineer_id = current_user_id())`
  (`20260902000800_service_centre_performance_TD-009.sql:331`). Identity must go through
  `current_user_id()` and `has_permission()`, and `auth.*` must never be called (Article IV,
  `check:auth-calls`).
- **Storage precedent**: `20260901000460_crm_evidence_bucket_TD-003.sql` (ordinal 0010). It does
  `INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) … ON CONFLICT DO
  NOTHING`, then adds `storage.objects` policies per verb gated by `has_permission()`. Reads go through a
  signed URL. It has **deliberately no DELETE policy**, and a comment says so. The global
  `file_size_limit` is 50 MiB (`supabase/config.toml:117`). The largest clip is 8.6 MB
  (`10-challan-ta.mp4`) and all media total 188 MB. The service key may not reach client code
  (`check:service-key`).
- **New tables are annotated in the same migration**: `INSERT INTO semantic_entity (table_name,
  business_name, synonyms, description, grain, invariants)` plus a `semantic_relationship` row per foreign
  key (as in `…mcp_spent_code_DDE-001.sql:55` and `…sales_attribution_DDE-001.sql:745`). This keeps
  `check:semantic-drift` clean, which is a constitution gate. Every SQL object opens with a
  *what / required by / without it* comment (`check:comments`).
- **Tests and gate**:
  - pgTAP lives in `supabase/tests/usNNN_<topic>.sql` (e.g. `us068_on_hold.sql`), and
    `policies_allow_deny.sql` must still pass.
  - Vitest acceptance tests are `tests/acceptance/usNNN-<topic>.test.ts`, and Playwright tests are
    `tests/e2e/<topic>.spec.ts`.
  - Tests are named for the AC id (`AC-069-001`), with allow **and** deny tests for every rule, run at the
    database.
  - `tests/report/coverage.ts` reads every `specs/*/spec.md` automatically, so an AC in 030's spec with no
    test fails `npm test`.
  - The gate is `npm test` from a clean seed. It regenerates and commits `test-report.html` and
    `test-report.json` from one run (commit style: "Test report for 030: N/M from a clean seed"). The gate
    also needs `check:schema-drift`, `check:semantic-drift`, `check:mcp-semantic`, `check:comments`,
    `check:auth-calls` and `check:service-key` clean, deployment to hosted, and the plan's Constitution
    Check re-run against what was built.

### A.2 Artifact-by-artifact

| # | Path | Add or amend | What, and the format |
|---|---|---|---|
| 1 | `specification/open-questions.md` | amend | **Round 10.28** row in §A (format above). It must record the user's answers to the Article VII questions in A.3, with the rejected alternatives. |
| 2 | `specs/030-training/spec.md` | add | 016 shape. Suggested stories: (1) take my role's path: watch, card, quiz, completion; (2) the "?" on a screen opens its clip or card; (3) a lead sees team progress; (4) the band nudge; (5) English and Tamil. ACs as `*(AC-069-NNN)*` (or split across US-069, US-070 and US-071). |
| 3 | `specs/030-training/{checklists/requirements.md, research.md, data-model.md, contracts/training.md, contracts/storage.md, plan.md, quickstart.md, tasks.md}` | add | Shapes as in A.1. `quickstart.md` gets a pgTAP table `Scenario \| Actor \| Expect \| Criterion`, then the e2e steps, then `npm test`, then a production check. `tasks.md` starts at **T1112**. |
| 4 | `specification/user-stories/US-069-…md` (and US-070/071) | add | US-068 format: changelog `0.0.1`; `**As a** … <br> **I want** … <br> **So that** … <br>`; `## Acceptance Criterias` (sic); `### AC-069-001 - Title` with Given/When/Then lines ending in `<br>`, including negative cases (engineer reads another person's progress → refused; unsigned URL → refused). |
| 5 | `specification/use-cases/UC-022-complete-role-training.md` | add | UC-018 format: changelog; Overview table (ID, Name, Primary Actor, Secondary Actors, Description, Trigger, Preconditions, Postconditions); Normal Flow `Step \| Actor \| Action`; alternatives, exceptions, business rules. |
| 6 | `specification/data-definitions/DDE-001-operational-data-model.md` | amend → **`0.0.45`** | Two new entities, e.g. **Training Completion** (user, module key, language, completed_at) and **Training Quiz Attempt** (user, module key, language, score, out_of, answers, attempted_at). Add them to Entity Summary, Entity Definitions and Relationships (`System User one-to-many …`). The module key is a text id into content kept in the repo, **not an FK**; add that to the "looks wrong, is right" list. More entities, such as a module or role-path table or a per-user language preference column on System User, are only needed if A.3 decides so. Extending `permission.area` would also be a DDE change. |
| 7 | `specification/entity-relationship-diagrams/ERD-001-customer-relationship-domain.md` | amend | This ERD holds SYSTEM_USER: add `SYSTEM_USER \|\|--o{ TRAINING_COMPLETION` and `…QUIZ_ATTEMPT`. ERDs have no changelog. Note that Customer Owner Change, MCP Call Log and MCP Spent Code were never added here either (pre-existing lag; report, don't fix). |
| 8 | `specification/architecture/PERMISSION-MATRIX.md` | amend → **`0.0.16`** | Changelog row citing Round 10.28, and a new section or rows such as *Own training progress* (every role F, own) and *Team training progress* (leads R). Also a line under *Rules the matrix cannot express* saying what "team" means. |
| 9 | `specification/technical-designs/TD-012-training-and-contextual-help.md` | add | TD template (TD-011): Changelog `0.0.1`, Source Requirement, Scope, API or server-action design, Database Design (DDL, RLS, bucket and object policies, signed-URL lifetime), the screen-to-module map for "?", the band-nudge read (via `me()` or a separate call; `me()` is the TD-010 "two round trips" contract), a sequence per entry point, and Traceability. |
| 10 | `specification/architecture/ADR-001-platform-and-stack.md` → `0.0.5`, **or** `ADR-002-training-video-hosting.md` | amend or add | ADR-001's portability table row 3 lists only "object storage for the organisation logo", although `quotation-evidence` is already a second coupling. A private video bucket is a third, with egress cost. If the hosting choice itself is a decision (Supabase Storage, the current artifact asset store, or a video host), write **ADR-002** with the alternatives. |
| 11 | `supabase/migrations/20260926001300_training_progress_DDE-001.sql` (0167) | add | Two tables with RLS in the same migration. Own rows go through `current_user_id()`; a lead reads through `has_permission('training.read_team')`. Writes are the user's own only, and the tables are append-only if attempts are history. Annotate both in `semantic_entity` and `semantic_relationship`. Header: `-- 0167 — …` / `Implements: DDE-001 0.0.45 …` / `Decided by the user …, decision log Round 10.28`. |
| 12 | `…001400_training_video_bucket_TD-012.sql` (0168) | add | `training-video`, `public=false`, a limit of about 20 MB, `allowed_mime_types` of `video/mp4`, `image/jpeg` (posters) and `text/vtt` if captions are split out. SELECT for `current_user_id() IS NOT NULL`. INSERT and UPDATE only for Admin or an Operations-Manager permission, or none with uploads by an operator tool. No DELETE. |
| 13 | `…001500_training_team_read_PERMISSION-MATRIX.sql` (0169) | add | `permission` and `role_permission` rows per A.1, with a `DO $$` proof. |
| 14 | `specification/redesign/` (`training.html`, a module page, a team-progress page, `chrome.js` band, `rack.css` "?") | add or amend | Stakeholder-approved mockups come before any screen (Round 10.23 and 10.25 precedent: "against amended mockups"). The "?" touches **every** bin label, so Article VIII requires naming each changed screen before it changes. |
| 15 | `DESIGN.md`, `.specify/memory/design-system.md`, `.specify/memory/interaction-design.md` | amend | The "?" affordance on a bin label (44 px label, code chip; DESIGN.md:168), the nudge in the sign-in band, and bilingual text (the app is `lang="en"` only today). |
| 16 | `specification/dashboards/DSH-001-…md` → `0.0.5`; `MET-001` → `0.0.11` | only if asked | Only if team progress becomes an MIS figure (e.g. `H-06 Training completion`, plus a `met_catalogue_status` row and a `semantic_measure` row). Otherwise leave it alone (Article VIII). |
| 17 | `specification/technical-designs/TD-011-…md` → `0.0.5` | amend | New tables annotated. State whether any MCP tool reads training data; if one does, add it to `lib/mcp/tools/reads.ts` (`check:mcp-semantic`). Also backfill: **feature 029 changed TD-011 (`mcp_briefing`, reads.ts) without adding a changelog row**. See Part B if explanations are added. |
| 18 | `specification/user-journeys/UJR-003-new-staff-first-week.md`, `specification/mindmaps/MND-001-…md` | optional | A Training branch on the capability map, and a journey. Neither has a changelog. |
| 19 | `README.md` | amend | Artifact index: UC-022, US-069…, TD-012, ADR-002. Counts are already stale ("User stories (64)", "Nine designs"). Roles table unchanged, since no new role is added. |
| 20 | `CLAUDE.md` §Current state, `.specify/memory/artifact-map.md` | amend | Since feature 011, CLAUDE.md bullets replace ROADMAP rows (ROADMAP stops at 010, 008, 007). Update counts (UC-001…022, US-001…069+, TD-001…012), DDE `0.0.45`, and the defects-that-aren't list. |
| 21 | `specification/technical-specification/`, `specification/stakeholder-review/` | rebuild | Only if TD-012 or ADR-002 joins the combined docx (`build-docx.sh`). |
| 22 | Tests | add | `supabase/tests/us069_training_progress.sql` (own-row allow and deny, lead read allow, non-lead deny, append-only), `us069_training_bucket.sql` (signed-in read allowed, anon denied, upload denied), `tests/e2e/training.spec.ts`, `tests/e2e/screen-help.spec.ts`, and `tests/acceptance/us069-*.test.ts`, each named `AC-069-NNN`. |
| 23 | Content | add | The module JSON, posters and captions move into the app repo (e.g. `content/training/NN.json`). Role strings such as `"Service Head · Liaison · Engineer"` and `"Executive / Admin"` must map to `role.role_name`; "leads" is not a role name. |

### A.3 Silences to put to the user (Article VII), before the spec is final

1. **Who is a "lead", and what is their "team"?** The model has `role.lead_of_area` (Sales Head,
   Service Head, Operations Manager) and no team membership. Is it "a lead sees everyone" (as
   `performance.read` works) or "everyone holding a role in my area"? Roles have no area column.
2. Do Admin and Executive Management see everyone? `is_unrestricted()` would say yes.
3. Does a lead see **quiz scores and answers**, or only completion? Best score or every attempt?
4. What counts as **complete**: watched to the end, quiz passed (at what mark), or self-marked? Can a
   module be re-taken, and does a content change reset completion?
5. **Multi-role users**: is the path the union of their roles' modules? That affects the "3 of 7"
   denominator.
6. **Language**: where is the choice kept? Per browser (no DDE change) or on `system_user` (a DDE
   change)? Is Tamil for training only, or the whole UI?
7. **Video upload**: who uploads, and through what? Keeping the service key server-side and the storage
   write policy both depend on the answer.
8. May the MCP layer read training progress?

---

## Part B: MCP semantic model vs the KPI explanations

### B.1 What the semantic model holds today

- **`semantic_measure`** (42 rows) has `metric_key`, `met_reference`, `business_name`, `question`,
  `expression`, `source_relation`, `period_column`, `valid_segments` and `caution`. There is **no
  meaning or description column and no example column.**
  - `question` is MET-001's one-line question. It is the nearest thing to a plain meaning, but it is a
    question and not an explanation.
- **`semantic_entity`** has `description`, `grain` and `invariants`. The `work_order` invariants state the
  price-split rule.
- **Column comments** (`col_description`, surfaced by `describe_model`): only 12 of 58 `work_order`
  columns have one. `normal_price`, `quoted_price`, `discount_amount` and `labour_set_by_hand` do. None of
  these do: `base_price`, `premium_amount`, `price_charged`, `parts_revenue`, `labour_cost`, `total_cost`,
  `margin_labour`, `margin_parts`, `margin_total`, `rework_cost_rolled_up`. TD-011's "COMMENT ON pass"
  shows `margin_labour` and `premium_amount` as examples, but they were never applied.
- **Surfaces**:
  - `describe_model()` returns key, met, name, question, expression, from, segments and caution.
  - `measure` (`evaluate_measure`) returns expression, caution and value (contract `MeasureResult` in
    `specs/008-mcp-tool-surface/contracts/mcp-tools.ts:161`).
  - `mcp_briefing()` (0166) puts every measure's question and caution into `initialize`.
- **Registration gap:** MET-001 marks **M-16 Labour on open boards, M-17 Discount given and M-18 Premium
  and discount on typed normal prices** as *Have*. None of them is in `met_catalogue_status` or
  `semantic_measure`, so `check_semantic_drift()` cannot see that they are missing and returns 0 rows.

### B.2 Per KPI in KPI-CATALOGUE.md

**Y** = carried, **P** = partial or only implied, **N** = absent, **✗** = carried but contradicts the
screen.

| KPI | Semantic measure (MET) | (a) meaning | (b) formula | (c) cautions | (d) example |
|---|---|---|---|---|---|
| 1.1 Yield | `yield.rate` (T-04) | P (question) | Y | Y ("nothing to measure" is not 0) | N |
| 1.2 Wastage cost (hours) | none. Logic lives only in the yield report function | N | N | N | N |
| 1.3 Rework rate | `rework.rate_overall` (Q-01) | P | Y | Y | N |
| 1.4 Stuck tasks | `stuck.count` (T-03) | P | Y | Y (holidays, scope) | N |
| 1.5 "What has stalled" › Stuck | none | N | N | P (only in `stuck.count`'s scope note; "the two counts differ" is not stated) | N |
| 1.6 Queue aging | `queue.aging` (T-02) | P | Y | Y | N |
| 1.7 Unbilled hours | `hours.unbilled` (M-11) | P | Y | P (OPEN excluded is stated; "last month's figure moves" is not) | N |
| 1.8 Scorecard (efficiency, first pass, rework, NR) | `efficiency.standard`, `first_pass.rate`, `rework.rate_engineer`, `wastage.rate_engineer` (E-01…04) | P | P (an average over the snapshot; the real formula is in the scorecard function) | P (verification hours counted, and unverified boards counting as first pass, are not stated) | N |
| 2.1 Normal price / Set by hand | none (a column) | Y (column comment) | P (`work_order` invariant) | P | N |
| 2.2 Labour charge (base price) | none (a column, no comment) | N | Y (invariant) | P | N |
| 2.3 Opportunity premium | `premium.captured` (M-05) | P | Y (sum), with the derivation in the invariant | Y | N |
| 2.4 Discount | none: **M-17 unregistered** | Y (column comment) | P (invariant) | P | N |
| 2.5 Charged | none (`price_charged`, no comment) | N | P (a generated column and an invariant) | P (S-12's "never invoiced") | N |
| 2.6 Labour / engineer margin, base margin % | `margin.engineer` (M-03), `margin.base_rate` | P | Y | Y | N |
| 2.7 Parts margin | `margin.parts` (M-14) | P | Y | Y | N |
| 2.8 Total cost / total margin | `margin.job` (M-01); `cost.labour` + `cost.parts` (M-08/09); no total-cost measure | P | P | P (unpriced write-offs skipped from the margin are not stated) | N |
| 2.9 Cost of rework carried | `rework.cost_carried` (M-10), `warranty.cost_carried` (Q-03) | P | Y | Y | N |
| 2.10 Premium share | `premium.share` (M-06) | P | Y | Y | N |
| 2.11 Spares not charged / uncosted hours | `parts.unbilled` (M-15), `hours.uncosted` (H-05) | P | Y | Y | N |
| 2.12 Actual / target / achievement | `target.achievement` (E-07), `target.missing` (E-09) | P | P (actual only, not %) | Y | N |
| 2.13 Labour on open boards | none: **M-16 unregistered** (`open_labour_cost()` exists) | N | N | N | N |
| 3.1 Charged by sales engineer | `sales.impact_by_engineer` (S-12) | P | Y | P (the UTC vs IST date split is not stated; `valid_segments` is `{}` although it is grouped by `brought_in_by_user_id`) | N |
| 3.2 Filled | only inside S-12's caution | P | N | P | N |
| 3.3 Premium / discount by customer or segment | `premium.captured` (segments `customer_id`, `billing_segment`); **M-17 and M-18 unregistered** | P | P | P | N |
| 3.4 Won (per engineer) | `conversion.by_engineer` (S-03) | P | **✗** (the expression is a ratio; its caution and MET-001 say a count) | Y | N |
| 3.5 Team conversion | `conversion.rate` (S-01) | P | Y | Y | N |
| 3.6 Funnel velocity | `funnel.velocity` (S-02) | P | **✗** (a mean over the whole journey; the screen shows medians per step) | P | N |

**Summary:** of 27 KPIs, 21 have a measure. (b) and (c) are largely covered. (a) is only ever
question-shaped or a column comment. **(d) is carried nowhere.** Six KPIs (1.2, 1.5, 2.2, 2.5, 2.13,
3.2) have no measure. Two (3.4, 3.6) have a formula the screen contradicts.

### B.3 Recommendation

1. **Yes, add plain-language meaning and a worked example**, for the same reason `caution` exists: the
   names mislead (Article V's "one definition, one place"). The training card, the "?" help and the MCP
   answer should then read the same text, not three copies.
2. **Where: a new child table**, not new columns on `semantic_measure`. For example
   **`semantic_measure_explanation`**: `semantic_measure_id` FK, `language` (`en` / `ta`),
   `plain_meaning`, `how_to_read`, `worked_example` (jsonb, in the same `{title, lines[[label, value,
   note]]}` shape as `modules/15.json` `examples`). Unique on (measure, language). Readable when
   `current_user_id() IS NOT NULL`, like the other `semantic_*` tables.
   - **Why not columns:** Tamil needs one row per language, and adding columns would widen a table every
     drift clause and the briefing already read.
   - **`caution` stays where it is** and remains the only "must not" text. Misreadings belong there, not
     duplicated in `how_to_read`.
3. **Keep the example honest by testing it.** Seed the KPI catalogue's "September at Thulir" month (jobs
   A to F) as a deterministic pgTAP fixture. Assert that `evaluate_measure()` returns each figure the
   example states (Yield, 9 h unbilled, ₹5,200 open labour, and so on). An example that is a test cannot
   drift from the expression.
4. **For the KPIs that are columns rather than measures** (2.1, 2.2, 2.5): finish TD-011's `COMMENT ON`
   pass on `base_price`, `premium_amount`, `price_charged`, `parts_revenue`, `labour_cost`,
   `total_cost` and the three margins. Comments are **not** a data-model change, and `describe_model`
   already surfaces them.
5. **How MCP would surface it:**
   - `describe_model` measures gain `meaning` and `example` (with an optional `language` argument,
     defaulting to `en`).
   - `measure`'s `MeasureResult` gains `meaning`, which is a contract change in
     `specs/008-mcp-tool-surface/contracts/mcp-tools.ts` and TD-011 §5.
   - **Leave `mcp_briefing()` alone**. It already carries 42 cautions, and adding examples would bloat
     every `initialize`.
   - **No new tool.** The nine-tool surface is TD-011's. Declare the new relation in
     `lib/mcp/tools/reads.ts` with an invariant (`check:mcp-semantic`).
   - Add a `check_semantic_drift()` WARN for a *Have* measure with no English explanation.
6. **This is a data-model change**:
   - DDE-001 needs a new entity *Semantic Measure Explanation* (`0.0.45`, or `0.0.46` if the training
     tables take `0.0.45`).
   - TD-011 needs `0.0.5` (§3 DDL, §5 tool outputs).
   - It needs its own decision-log round (10.29), and a migration that annotates the new table.
7. **Prerequisites to report, not fix inside 030** (Article VIII):
   - Register M-16, M-17 and M-18 (catalogue rows and measures).
   - Settle `conversion.by_engineer` (a ratio against a count) and `funnel.velocity` (a mean against
     per-step medians). Each needs a user decision.
   - Add a TD-011 changelog row for 029.
   - Fix the stale `work_order` invariant, which still says warranty "runs from the invoice date"
     (DDE-001 `0.0.37` moved it to the challan).
