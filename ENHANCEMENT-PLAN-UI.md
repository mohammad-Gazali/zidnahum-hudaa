# Frontend Enhancement Plan II: UI/UX

**For a single agent, working sequentially.** This is the UI-focused counterpart to the code-health plan — separated out because it's a different kind of work (visual/interaction polish vs. structural correctness) and can be picked up independently. Grounded in an actual scan of the current templates/styles, not general best-practice advice.

## What's already solid

- Styling discipline is genuinely good: **zero hardcoded hex colors** anywhere in component-level SCSS across both features — everything routes through Material theme tokens/CSS variables. This means dark mode "just works" everywhere it's wired up, structurally, without per-component hacks.
- The `.dark` class-toggle mechanism in `styles.scss` is clean and centralized.

## 1. Dark mode is fully built but only reachable from one feature — wire it up in admin

The CSS supports dark mode everywhere (see above), and `LayoutService` (which owns the theme toggle state) already exists in `shared/services/`. But `features/admin/layout` never injects it — there is no dark/light toggle control anywhere in the admin navbar or sidenav. An admin user has no way to switch themes, even though every admin page would render correctly in dark mode if they could. This is close to a pure win: add a toggle button to `features/admin/layout/navbar` (or sidenav) that calls the same `LayoutService` the client layout already uses. No new theming work needed — just exposing what's already there.

## 2. There is no global loading indicator — loading feedback is ad hoc and inconsistent

The root `AppComponent` is a bare `<router-outlet />` with no shell chrome at all. The shared `LOADING` token exists and is read by ~26 individual components, but that means the other ~80 components/pages show **no loading feedback at all** during requests — of 105 templates, only 4 use `mat-progress`/`mat-spinner`. This produces an inconsistent experience: some pages show a spinner, most just appear to do nothing until data arrives.

**Recommended fix:** add one thin loading indicator at the `AppComponent` (or each feature's layout) level, bound to the shared `LOADING` signal — e.g. a `<mat-progress-bar mode="indeterminate">` pinned to the top of the viewport, shown/hidden reactively. This gives every page consistent loading feedback for free, without needing every individual component to remember to wire it up. Once this exists, audit the ~26 components currently doing their own local loading UI — some of that becomes redundant and can be simplified (but check case-by-case; a few, like button-level `[disabled]="loading()"` on a submit button, are legitimately still useful *in addition to* a global indicator, not instead of it).

## 3. No accessibility attributes anywhere — zero `aria-*` usage across 105 templates

Angular Material provides some ARIA support by default on its own components, but there's no evidence of any deliberate accessibility work beyond that default — zero explicit `aria-label`, `aria-describedby`, `aria-live`, etc. anywhere. Concrete starting points, roughly in priority order:
1. **Icon-only buttons** (very common in the admin CRUD kit's table row actions — edit/delete/view icon buttons) need `aria-label` — a screen reader currently announces nothing meaningful for these.
2. **Form validation errors** (`mat-error` elements) should be associated with their inputs via `aria-describedby` so screen readers announce the error when the field is focused, not just visually show it.
3. **Snackbar announcements** (`SnackbarService`) should use `aria-live="polite"` (Angular Material's `MatSnackBar` does this by default when used normally — verify the custom `SnackbarService` wrapper hasn't broken this default behavior).
4. **Keyboard navigation** through the admin data tables and dialogs — verify tab order is sensible and dialogs trap focus correctly (Angular Material's `MatDialog` does this by default; verify nothing about the custom `create`/`view` wrapper components interferes with it).
5. Run an automated pass (axe DevTools or Lighthouse accessibility audit) against a handful of representative pages (login, home, one admin CRUD list, one admin CRUD form) to get a concrete, prioritized punch-list rather than guessing further from a static read of the code.

## 4. No reusable empty-state or skeleton-loading pattern

There's no dedicated component for "this list has no results yet" or a content-shaped loading skeleton — worth checking what currently happens when e.g. an admin table genuinely has zero rows, or a client report genuinely has no data for the selected date range (likely either a blank table or nothing rendered, which reads as broken rather than "correctly empty" to a user). A small shared `EmptyStateComponent` (icon + message + optional action button, e.g. "No students yet — Add one") used consistently across both features would be a meaningful, low-effort UX improvement, especially for a first-run/new-masjid deployment where most lists genuinely start empty.

## 5. Admin's generic CRUD kit — UX consistency pass

`features/admin/components/{table,create,view,changes-field,student-search}` is the shared backbone behind nearly every admin page. Since it's one shared implementation, improvements here have unusually high leverage — a fix in one place improves ~80 pages at once. Worth auditing specifically for:
- **Delete confirmation consistency** — does it use the same `ConfirmationService`/dialog pattern as the client feature, or its own separate one? (Cross-reference with the code-health plan's §2 note on `confirmation.service.ts` — this is the natural place to actually make that unification real, not just a placement decision.)
- **Table UX fundamentals** — sorting, filtering, and pagination: confirm these exist and behave consistently across every table instance (some generic CRUD kits end up with per-page configuration drift where one entity's table supports sorting and another, built slightly differently, doesn't).
- **Bulk actions** — several backend endpoints already support ID-array-based bulk delete (`IdsActionSerializer`, visible in the generated `admin-*` delete actions) — confirm the table UI actually exposes multi-select + bulk delete consistently wherever the backend supports it, rather than only in whichever pages happened to get it built in first.

## 6. Responsive design — spot-check the admin CRUD kit on small viewports

Only 20 of ~105+ templates have explicit `@media` breakpoints, and most of those are likely concentrated in the two layout shells (client + admin) rather than individual CRUD pages. The admin panel was originally built as (and likely still primarily used as) a desktop tool, but now that it's one route inside the same mobile-accessible SPA as the public site, it's worth deciding *deliberately* whether admin needs to support mobile viewports at all — and if the answer is "yes, at least reasonably," spot-check the generic `table`/`create`/`view` components (again, high leverage — one fix covers ~80 pages) on a narrow viewport specifically for: horizontally-scrolling tables becoming unusable, dialogs overflowing the screen, and touch target sizes on the row-action icon buttons.

## 7. Design consistency micro-audit

Lower priority than the above, but worth a pass once the bigger items are done: spacing scale consistency (are margins/paddings using a consistent scale or ad hoc values across the two features, which were originally built by different conventions before the merge), icon usage consistency (same icon for the same action — e.g. "delete" — everywhere), and button-style consistency (when is `mat-flat-button` vs `mat-stroked-button` vs `mat-icon-button` used, and is that choice consistent across both features or a leftover of each app's separate original conventions).

## Suggested order of work

1. Dark mode toggle in admin (§1) — smallest, highest-ratio win, do it first.
2. Global loading indicator (§2) — architectural, benefits everything after it, do it early.
3. Confirmation dialog unification (§5, cross-referenced with the code plan) — do this before the broader accessibility/table audit so you're not auditing a pattern you're about to replace.
4. Accessibility pass (§3) — start with the automated audit (item 5 under §3) to get a concrete list rather than guessing further.
5. Empty states (§4), then table UX/bulk actions (§5 remainder), then responsive spot-check (§6).
6. Design consistency micro-audit (§7) last — purely polish, do it once the functional gaps above are closed.
