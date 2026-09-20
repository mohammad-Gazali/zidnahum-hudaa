# Eventual Plan: Adopting the Stitch "Serene Halaqa" Design

Grounded in three things checked directly, not assumed: the actual `master` branch (confirmed current — `combine-frontend` is already merged in, the Orval API work and folder structure from earlier reviews are all present; none of `ENHANCEMENT-PLAN-UI.md`'s items — admin dark-mode toggle, global loading indicator, accessibility — are done yet), the 10 real screens + 1 design-system doc in the uploaded Stitch kit, and a side-by-side read of each generated screen against what the corresponding real screen and real data model actually do today.

## The one thing this plan is built around

**The Stitch kit is two different things bundled together, and they need to be treated completely differently:**

1. A genuinely excellent **design system** (colors, type, spacing, shape, elevation) that can be adopted almost entirely as a pure visual upgrade — no backend changes, no data model changes, low risk, high value, benefits every screen at once.
2. A set of **reimagined product concepts** shown inside the mockups — tajweed quality percentages, voice notes, automatic WhatsApp parent notifications, a full RBAC/2FA/audit-log permission system, halaqa-based org hierarchy with supervisor star-ratings, and an Ijazah certification workflow with QR verification — **none of which exist in the current backend**, and several of which (the permission/RBAC one especially) would replace core parts of the current auth model, not extend it.

Treating both as one "redesign" and implementing screens as literally pictured would mean either inventing fake data to fill in fields the backend can't provide, or quietly shipping UI for features that don't work — which is exactly the "messing the repo up" to avoid. So this plan is deliberately split into what ships now, what's a real decision to make before building, and what's explicitly parked.

## Stage 0 — Design tokens (do this first, it's the safe, high-leverage part)

This is low-risk specifically *because* of something already verified in an earlier review: every component in the app already styles itself through Material theme tokens/CSS variables, with **zero hardcoded hex colors** anywhere in either feature's component SCSS. That means a token-level theme change propagates correctly everywhere automatically — this is the ideal codebase shape for exactly this kind of change.

1. **Reconcile one internal inconsistency in the Stitch output before using it as a source of truth:** `DESIGN.md`'s YAML front-matter lists `primary: '#00685e'`, but its own prose section says `Primary (#009587)`. Use `#009587` — it's the app's existing, already-established brand color, and matches the prose description; the YAML value is most likely generation drift, not an intended brand change. Don't hand-copy the YAML hex values as-is without this check.
2. Regenerate the Angular Material M3 theme (the same way the current `theme.scss` was originally produced — Material Theme Builder or equivalent) from three seeds instead of the current single teal seed: **primary** `#009587` (unchanged), a new **secondary** amber/gold (`#D97706` per the design doc), and a new **tertiary** blue (`#0058be`/`#2170e4` per the design doc). This is a genuine, deliberate palette expansion — the current theme is effectively single-hue-derived — and it's exactly what makes the "Excellent / Very Good / Needs Revision" status-chip color coding in the mockups (green / gold / red) possible to do properly instead of ad hoc.
3. Bring in the **shape scale** (inputs `12px`, cards `16–24px`, chips/badges fully pill-shaped `9999px`) and **elevation system** (tinted ambient shadows instead of flat Material default shadows) from the design doc into `theme.scss`/`styles.scss` as global overrides — these apply once, centrally, and every card/button/input across both features picks them up.
4. Apply the **typography line-height rule** the design doc calls out specifically for Arabic: body text line-height of 1.6–1.75 minimum (to avoid clipping diacritics/tashkeel), and a larger line-height (2.2+) for any place the app displays Qur'anic ayah text specifically. Check the current `theme.scss` typography config against this and adjust if it's tighter.
5. **Verify in both light and dark mode** — the design doc includes explicit dark-mode values; confirm they carry through the app's existing `.dark` class-toggle mechanism correctly, in both features.
6. **Verification:** since nothing here changes component templates or logic, `tsc --noEmit` should be unaffected; the real verification is visual — spot-check the login screen, one client page, and one admin CRUD table in both light and dark mode after the token change, before touching anything else.

## Stage 1 — Direct screen adoption (existing screens, existing data, safe to restyle now)

Two of the ten screens map closely enough to what exists today, with the same data, that they can be restyled close to the Stitch mockup directly:

- **Login** (`common/login`) — the Stitch version is nearly a 1:1 layout match to the current screen (logo, username field, password field, submit button, a link back home). Adopt the card treatment, spacing, and button style directly. Two small additions shown in the mockup need a decision, not silent inclusion: a "remember me on this device" checkbox (the app already effectively does this via persisted `localStorage` tokens, so this checkbox may be redundant UI rather than a new feature — decide whether to include it as a no-op visual affordance or leave it out) and a "forgot password?" link (there is no password-reset flow in the current backend — **leave this link out** rather than including a link to a flow that doesn't exist).
- **Home / Student Search** (`features/client/pages/home`) — the Stitch mobile version is a direct restyle of the existing search-bar-plus-result-cards pattern, using the exact same fields the current template already renders (name, ID, masjed, category, group, birthdate, parts received). Adopt the card visual treatment, the avatar/initial circle, and the progress-bar treatment for `parts_received` directly — no new fields needed.

## Stage 2 — Layout/navigation restructuring (frontend-only, but a real decision — get sign-off first)

These require no backend work at all, but they do change *how people navigate*, which is a real product decision, not just a style tweak — don't implement silently as part of a "visual refresh":

1. **Bottom tab bar for the mobile client area.** All five mobile mockups (`_1`, `_8`, `_10`, `_11`, `_12`) consistently show the same four-item bottom bar: Home/Search, Activity Log, Reports, Files & News — a genuine navigation-pattern change from the current hamburger-drawer sidenav. This maps cleanly onto four routes that already exist today, so it's implementable without any backend change — but it changes muscle memory for existing staff, so confirm this is wanted before building it, rather than treating "the mockups all show it" as an automatic yes.
2. **Tabbed student profile.** The current profile page shows memorization records, notes, attendance, and points as stacked sections; the Stitch version organizes the same underlying data into tabs. This is a pure frontend reorganization of existing data — safe to build once someone confirms the tab grouping makes sense (the mockup groups "recitation & tests" together and "points & incentives" together, which is a reasonable regrouping of what already exists).
3. **Admin dashboard stat cards using data that's actually available.** The Stitch admin dashboards (`_4`, `_5`, `_9`) show many stat cards; some map to data the app already has (active students count, total logged-today count, the existing `admin-statistics` endpoint's numbers), others don't (2FA adoption rate, live session count). Build the dashboard cards **only from what `admin-statistics`/existing endpoints actually return** — treat any card that doesn't currently have a data source as a Stage 3 item, not something to fake with placeholder numbers.

## Stage 3 — Explicitly parked: real product features shown in the mockups, not implemented yet

These are catalogued here specifically so they don't get lost, and specifically so nobody accidentally half-implements the UI for them without the backend behind it. Each would need its own scoping/design pass before any frontend work starts:

| Concept (screen it appears in) | What it would actually require |
|---|---|
| Tajweed/quality percentage rating on memorization records (`_1`, `_8`, `_12`) | New field(s) on `MemorizeMessage` (or a new related model), migration, serializer changes, and a decision on what the percentage bands (ممتاز/جيد جداً/جيد/يحتاج إعادة) actually measure and who sets them |
| Voice-note attachment on memorization records (`_1`) | File/audio storage, a new model field, upload handling — a genuinely new capability, not a schema tweak |
| Automatic WhatsApp/SMS parent notification (`_1`, `_9`, `_11`) | A guardian contact field on `Student` (may not exist today — verify), a WhatsApp Business API or SMS gateway integration, and a notification-sending service — significant new backend surface |
| "Auto bonus points" rule toggle (`_1`) | A rules engine or at minimum a scoring-policy setting — currently points are presumably entered directly, not computed |
| Full RBAC with named roles, 2FA, audit trail, FIDO2/passkeys (`_3`, `_4`) | This would **replace**, not extend, the current `is_staff`/`is_superuser`/`auth.Group` model — a major auth/security redesign, not a UI feature. Treat this as its own initiative with its own security review, entirely separate from a visual refresh. |
| Halaqa/circle organizational hierarchy with supervisor visits and star ratings (`_5`, `_9`) | New data model (Halaqa entity distinct from the current masjed/category/group fields, supervisor-visit records, rating records) |
| Ijazah certification workflow with QR verification and committee assignment (`_6`) | New data model and almost certainly a new public-facing verification page (something a third party scans a QR code to check) — a distinct feature area, not a styling change to the existing awqaf-test screens |
| Leaderboards / top-students ranking widgets (`_8`, `_9`, `_11`) | Smaller than the others — could likely be built from existing points data via a new aggregation endpoint rather than a schema change, so this is the most realistic *next* candidate to promote out of Stage 3 if there's appetite for one new feature |

## Suggested order of work

1. Stage 0 (design tokens) — do this fully first; it's the foundation everything else in Stage 1 sits on top of, and it alone is a visible, safe, immediate improvement.
2. Fold in the still-pending items from `ENHANCEMENT-PLAN-UI.md` at the same time, since they're complementary, not competing, work: the admin dark-mode toggle and the global loading indicator both become more valuable once Stage 0's theming is in place, and the accessibility pass (still at zero `aria-*` usage) should happen alongside any component restyling in Stage 1, not after — it's much cheaper to add ARIA attributes while a component's markup is already being touched than as a separate later pass.
3. Stage 1 (login, home search) — smallest possible real slice, verifies the token work end-to-end on real screens before touching anything more complex.
4. Take Stage 2's three items to whoever owns product decisions for a yes/no/modify each, *then* build only the ones confirmed.
5. Stage 3 stays a backlog, not a task list, until any one row gets its own scoping conversation. If one gets picked up, the leaderboard/ranking item is the cheapest realistic entry point.

## What "don't mess the repo up" means concretely here

- No screen gets rebuilt from the mockup pixel-for-pixel if that means adding fields, buttons, or badges tied to data the backend doesn't have — every new visual element in Stage 1 must trace to an existing field already rendered somewhere today.
- The generic admin CRUD kit (`features/admin/components/{table,create,view}`) is reused across ~80 pages — any restyling there happens once, centrally, and gets verified against more than one entity's page before being considered done, the same way any change to it in past reviews needed checking it didn't silently drop the bulk-actions menu, filter chips, or the changes-visibility toggle.
- Stage 2's navigation changes go through an explicit decision, not an assumption, precisely because "the AI-generated mockup shows it" is not the same thing as "this is what the actual users of this app, who are volunteers and staff at a mosque, want their daily workflow to change to."
