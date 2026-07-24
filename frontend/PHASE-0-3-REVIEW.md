# Review of Phases 0–3: what to fix before continuing

## What's genuinely solid (don't touch)
- Directory shape matches the spec: `common/`, `shared/{services,guards,pipes,tokens,types,constants}`, `features/{client,admin}`, `interceptors/` — correct.
- `shared/services/auth.service.ts` is a faithful, correct port of client's `AuthService`.
- `shared/guards/admin.guard.ts` is correct and wired into `app.routes.ts` properly (`/admin` lazy-loaded behind it).
- The Django `auth.User`/`auth.Group` generated service was correctly renamed to `UsersGroupsService` — the naming collision with login's `AuthService` was avoided as planned.
- One shared login screen exists at `common/login/`, with role-based redirect logic present (though buggy — see below).
- `shared/types/*.enum.ts` (Group, MessageType, StudentLevel, Masjed) and `CurrentUser` were created correctly as canonical definitions.

## Must-fix bugs (real, demonstrable, not style opinions)

### 1. Admin's user/permission display is completely dead
`features/admin/services/api/accounts/accounts.service.ts` — the old hand-written login service the plan said to **delete** — is still present, still exported from the `@admin` barrel, and still injected in `layout.component.ts`, `navbar.component.ts`, `sidenav.component.ts`, `group.component.ts`, `view.component.ts`. Its `details` signal is only ever `.set(null)` (on logout in `navbar.component.ts`) — **nothing populates it with real data anymore**, because login now goes through the new shared `AuthService`, not this old service. Concretely, once this ships:
- `navbar.component.ts`'s `isLoggedIn` (`accounts.details() !== null`) is **always false**.
- `view.component.ts`'s `isSuperUser` computed is **always false** — superuser-only UI/actions stay hidden even for real superusers.
- The whole admin shell has no idea who's logged in.

**Fix:** delete `features/admin/services/api/accounts/accounts.service.ts` and its `.types.ts` entirely. Every one of those 6 call sites should read from `inject(AuthService).currentUser()` (shared) instead. Note `CurrentUser` currently only has `isAdmin` (staff-or-superuser collapsed into one bool) — `view.component.ts` needs the **superuser-specific** check, so add `isSuperUser: boolean` to `shared/types/current-user.type.ts` and populate it in `AuthService.initialize()` from `res.is_superuser`.

### 2. Duplicate `LOADING` injection token → stuck loading spinners across the entire admin CRUD kit
Two separate tokens exist:
- `shared/tokens/loading.token.ts` → `new InjectionToken('app loading', ...)`
- `features/admin/tokens/loading.token.ts` → `new InjectionToken('admin loading', ...)`

These are two distinct token identities, not the same one re-exported. `interceptors/error.interceptor.ts` (registered globally, runs for every HTTP call) resets the **shared** token on error. But `features/admin/shared/{create,view,table}.component.ts` — i.e. the generic CRUD kit used by nearly every one of the ~80 admin pages — plus `navbar.component.ts` and several page components, inject the **admin-local** token instead. Net effect: when an admin form submission errors out, the snackbar shows correctly but **the submit button/spinner never turns off**, because the interceptor reset a different signal than the one the component is reading.

**Fix:** delete `features/admin/tokens/loading.token.ts`; every admin file currently importing `LOADING` from `@admin` should import it from `@shared` instead (11 files — grep `from '@admin'` + `LOADING` to find them all).

### 3. Login redirect race condition — admins likely get sent to `/` instead of `/admin`
In `common/login/login.component.ts`:
```ts
this.auth.login(...).subscribe({
  next: () => {
    const user = this.auth.currentUser();       // <-- read here
    if (user?.isAdmin) return this.router.navigateByUrl('/admin');
    return this.router.navigateByUrl('/');
  }
})
```
But `AuthService.login()` only *fires off* `this.initialize()` inside a `tap` — it doesn't wait for it. `initialize()` itself makes a separate, still-pending `accountsDetailsList()` HTTP call. So at the moment `login(...).subscribe({ next })` runs, `currentUser()` is still `undefined` (its initial value) — `user?.isAdmin` evaluates to `undefined`, and the redirect falls through to `/` even for admin accounts.

**Fix:** don't read `currentUser()` synchronously after `login()` resolves. Either have `AuthService.login()` return an observable that only emits after `currentUser` is actually populated (chain off the details call instead of fire-and-forget), or have the login component wait for the next defined emission of `currentUser` (e.g. `toObservable(this.auth.currentUser).pipe(filter(u => u !== undefined), take(1))`) before deciding where to navigate.

### 4. The actual point-5 ask (single source of truth for types) — not done for the cases the plan called out by name
- `features/admin/services/{level,masjed,memorize-message-type}.service.ts` are **byte-for-byte identical** to the old `frontend/admin` originals (confirmed with `diff`) — they were copied, not replaced. They're still actively imported (e.g. `features/admin/pages/groups/admin/reports/reports.component.ts` still injects `MemorizeMessageTypeService`), even though `shared/types/{message-type,student-level,masjed}.enum.ts` were correctly created in parallel and are used by `features/client`. Result: two representations of the same three concepts now exist side by side, not one.
- Worse, `reports.component.ts` (line 414) has its **own third, local, inline redefinition**: `type MessageType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;` — completely disconnected from `shared/types/message-type.enum.ts`. That's the exact failure mode point 5 was meant to eliminate, now happening a third time in one file.
- `EXTRA_HADEETH_LABEL` / `EXTRA_HADEETH_LIMIT` are **still duplicated**: once in `shared/constants/extra-hadeeth.const.ts` (correct, new), once in `features/admin/constants/index.ts` (the old file, untouched) — and `features/admin/pages/groups/students/student/student-view/student-view.component.ts` imports the **old local one** via the `@admin` barrel, not the shared one.

**Fix:** delete `features/admin/services/{level,masjed,memorize-message-type}.service.ts` and `features/admin/constants/index.ts`'s `EXTRA_HADEETH_*` exports. Rewrite every consumer (`reports.component.ts`, `memorize-message.component.ts`, `memorize-message-view.component.ts`, `student-view.component.ts`, and any other hit from `grep -rln "MemorizeMessageTypeService\|LevelService\|MasjedService\|EXTRA_HADEETH" features/admin`) to use the `shared/types` enums + `shared/pipes` (`MessageTypePipe`, `LevelPipe`, `MasjedPipe`) + `shared/constants`. Delete the inline `type MessageType = ...` in `reports.component.ts` and import the enum instead.

### 5. API reconciliation (point 2) wasn't done — it was doubled instead
`shared/services/api/services/` now contains, for the same backend domains, **two separate files each**: `awqaf.service.ts` + `awqaf-client.service.ts`, `comings.service.ts` + `comings-client.service.ts`, `globals.service.ts` + `globals-client.service.ts`, `points.service.ts` + `points-client.service.ts`, `students.service.ts` + `students-client.service.ts`. This is exactly the duplication the "no regeneration, reconcile by hand" instruction was meant to prevent — it just moved the problem rather than solving it.

Checked concretely: `awqaf-client.service.ts` has exactly **one method** (`awqafTestNoQListResponse`), which already exists, identically, in `awqaf.service.ts` (the admin-originated file, 17 methods, a strict superset). `features/client/pages/student/student-awqaf-test/student-awqaf-test.component.ts` is the only consumer of the redundant `-client` file and could simply use `awqaf.service.ts` instead — there was no need to keep two classes.

(`reports.service.ts` vs `reports-client.service.ts` is a **legitimate exception** — on inspection these are genuinely different, hand-written-vs-generated services hitting different backend paths (`/api/v1/admin/reports/...` vs `/api/v1/reports/...`), so keeping both is correct there; just consider renaming for clarity, e.g. `reports-admin.service.ts` instead of implying it's "the non-client one".)

**Fix:** for `awqaf`, `comings`, `globals`, `points`, `students` — diff each pair's method list, confirm (or fix) that the non-`-client` file is a strict superset, repoint every consumer of the `*-client.service.ts` file to the superset file, then delete the five `*-client.service.ts` files and their now-unused model duplicates.

## Structural nits (cleanup, not urgent)
- `features/admin/types/` was never created — the admin CRUD-kit's own types (`TableAction`, `FieldConfig`, `TableComponentConfig`, `Filter`, `DialogData`) are still sitting inline under `features/admin/shared/table/`. Not a bug, but deviates from the agreed structure — move them when convenient.
- `features/admin/pipes/translate.pipe.ts` duplicates `shared/pipes/translate.pipe.ts` — harmless (both delegate to the same `shared/services/translate.service.ts`, confirmed by reading both), but it's dead weight; 41 admin files use the local one via `@admin`, only 14 use `@shared`'s. Pick one and delete the other.
- There's an `@admin` path alias but no `@client` one — fine if intentional (client currently has less need for it), but worth a conscious decision rather than an accident, for consistency.

## What to tell the agent (copy-paste starting point)

> Before continuing to Phase 4/5: three real bugs need fixing first — (1) `features/admin/services/api/accounts/accounts.service.ts`'s `details` signal is never populated anymore since login moved to the shared `AuthService`, breaking all identity/permission checks in the admin shell; delete that file and repoint its 6 consumers to `inject(AuthService).currentUser()` (add `isSuperUser` to `CurrentUser` for the superuser-only check in `view.component.ts`). (2) There are two different `LOADING` injection tokens (`shared/tokens` vs `features/admin/tokens`) — the global error interceptor only resets the shared one, so admin's create/view/table components (and others) using the admin-local one get stuck in a loading state after any HTTP error; delete the admin-local token and repoint its 11 importers to `@shared`. (3) The login redirect reads `currentUser()` synchronously right after `login()`, but `currentUser` is only populated by a separate async call that hasn't resolved yet — admins are likely being redirected to `/` instead of `/admin`; wait for the first defined `currentUser` emission before redirecting.
>
> Separately, please finish the type/API consolidation instead of leaving both old and new versions in place: delete `features/admin/services/{level,masjed,memorize-message-type}.service.ts` and the duplicate `EXTRA_HADEETH_*` in `features/admin/constants/index.ts`, migrating their consumers onto `shared/types` + `shared/pipes` + `shared/constants` (also remove the stray inline `type MessageType = 1|2|...|8` in `reports.component.ts`). And for the `awqaf`/`comings`/`globals`/`points`/`students` API services, don't keep both the admin-originated file and a `*-client.service.ts` side by side — diff them, confirm the admin one is a superset, repoint client's consumers to it, and delete the `-client` duplicates. (`reports-client.service.ts` is the one legitimate exception — it hits a genuinely different endpoint, just consider a clearer name than "-client".)
