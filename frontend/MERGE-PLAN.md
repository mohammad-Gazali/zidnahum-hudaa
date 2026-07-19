# Frontend Merge Execution Plan: `admin` + `client` → `frontend/new-frontend`

Every phase below ends in a verification step the agent runs itself (`tsc --noEmit`, `ng build`, `grep`) — not a "manually smoke test this" instruction. Where human/browser verification is genuinely unavoidable, that's called out explicitly and separately.

This supersedes both `frontend/MERGE-PLAN.md` and the previous version of this document. It reflects five corrections from review:

1. Written as agent-executable instructions, not a human-facing proposal.
2. No `ng-swagger-gen` regeneration — the two existing generated API clients are reconciled by hand, service by service.
3. New top-level shape inside `src/app/`: `features/client/`, `features/admin/`, `shared/`, `common/`, `interceptors/`.
4. Strict co-location/promotion discipline: code starts inside the feature that needs it; it only moves to `shared/` the moment a second feature needs it too.
5. A real types layer: one canonical definition per domain concept, replacing the duplicated/ad-hoc versions found in the audit (concrete examples in §3).

---

## 1. Target directory structure

```
frontend/new-frontend/src/app/
├── app.routes.ts
├── app.config.ts
├── app.component.ts
├── interceptors/                 # top-level: wired directly into app.config.ts, nothing else touches them
│   ├── auth.interceptor.ts
│   ├── error.interceptor.ts
│   └── index.ts
├── common/                       # not feature-specific, not "shared logic" either — just the basics
│   ├── login/                    # ONE login screen for both roles (see §5)
│   └── not-found/                # 404 / wildcard route
├── shared/                       # only things ≥2 features depend on — see promotion rule, §2
│   ├── services/
│   │   ├── api/                  # the single reconciled generated API client (see §4)
│   │   ├── auth.service.ts
│   │   ├── snackbar.service.ts
│   │   ├── confirmation.service.ts
│   │   └── translate.service.ts
│   ├── guards/
│   │   └── admin.guard.ts        # gates the whole admin feature from app.routes.ts
│   ├── pipes/
│   │   └── translate.pipe.ts
│   ├── components/                # empty at merge time — populate only on real 2nd-feature need
│   ├── tokens/
│   │   └── loading.token.ts
│   ├── types/                     # single source of truth per domain concept — see §3
│   │   ├── group.enum.ts
│   │   ├── message-type.enum.ts
│   │   ├── memo-item.enum.ts
│   │   ├── student-level.enum.ts
│   │   ├── current-user.type.ts
│   │   └── index.ts
│   ├── constants/
│   │   └── extra-hadeeth.const.ts
│   └── index.ts                   # `@shared` barrel — re-exports every subfolder above
└── features/
    ├── client/                    # former frontend/client, routed at ''
    │   ├── client.routes.ts
    │   ├── layout/
    │   ├── guards/                 # authGuard, nonAuthGuard, groupGuard — client-only today, stay local
    │   ├── services/                # feature-local services not (yet) needed by admin
    │   ├── pipes/                   # level.pipe, masjed.pipe, message-type.pipe, memo.pipe — local until admin needs them
    │   ├── types/                   # feature-local types not (yet) needed by admin
    │   └── pages/
    │       ├── home/ student/ files/ news/
    │       ├── add-memo/ add-coming/ add-points/ add-hadeeth/ add-student/
    │       └── log-memo/ log-coming/ log-points/ reports/
    └── admin/                      # former frontend/admin, routed at 'admin', gated by adminGuard
        ├── admin.routes.ts
        ├── layout/
        ├── shared/                  # admin-internal reuse only: table/view/create/changes-field/student-search kit
        ├── services/                 # level.service, masjed.service, memorize-message-type.service → deleted, see §3
        ├── types/                    # TableAction, FieldConfig, TableComponentConfig, Filter, DialogData, etc.
        └── pages/
            └── groups/
                ├── students/ points/ comings/ awqaf/ globals/ money/
                ├── auth/ (user/ group/ — Django auth.User / auth.Group CRUD, unrelated to login)
                └── admin/ (settings/ reports/ statistics/)
```

### Promotion rule (apply this literally, every time — this is the modularity discipline requested)

> Code is written **inside the feature that needs it first.** It moves to `shared/<kind>/` **only at the moment a second feature needs the same thing** — never speculatively. When promoting: move the file, update its one import site, then update the new second call site. Do not promote "just in case."

Worked examples from the actual codebase, decided against this rule:

| Item | Used by | Verdict |
|---|---|---|
| `AuthService`, `SnackbarService`, generated API client, `Group`/`MessageType`/etc. enums, `CurrentUser` type | both `client` and `admin` pages | → `shared/` |
| `authGuard`, `nonAuthGuard`, `groupGuard` | only ever used inside `features/client` routes today | → stays in `features/client/guards/` |
| `adminGuard` | used once, but from `app.routes.ts` itself — it's the boundary between the app shell and the admin feature, not internal to either feature | → `shared/guards/` (an app-shell concern needs a home neither feature owns; treat it like `interceptors/` — infrastructure, not feature logic) |
| `level.pipe`, `masjed.pipe`, `message-type.pipe`, `memo.pipe` (client), `LevelService`/`MasjedService`/`MemorizeMessageTypeService` (admin) | today: one per app, never both — **but** they represent the *same domain concepts* under different names (see §3) | → once unified into `shared/types/*.enum.ts`, the **pipes** that render them stay feature-local (`features/client/pipes/level.pipe.ts`) *unless* admin's pages also end up needing the same rendering, in which case promote the pipe too at that point — don't promote pre-emptively just because the underlying type is shared |
| `table`/`view`/`create`/`changes-field`/`student-search` CRUD kit | only `features/admin` — the public site has no generic CRUD table | → `features/admin/shared/` (feature-internal reuse, not app-wide `shared/`) |
| `TableAction`, `FieldConfig`, `TableComponentConfig`, `Filter`, `DialogData` types | only `features/admin` | → `features/admin/types/` |

---

## 2. Core principles

1. **One canonical type per domain concept, one place.** See §3 — this is the most important structural fix in this merge.
2. **No codegen re-run.** The two existing generated API clients are reconciled by hand per §4. This is deliberate: it avoids depending on a live backend during the merge and keeps the diff reviewable.
3. **Feature folders are self-contained until proven otherwise.** See promotion rule above.
4. **`common/` is not a second `shared/`.** It only holds things that don't belong to a feature *and* aren't cross-cutting logic — concretely, in this codebase: the login screen and a not-found page. If something in `common/` starts needing feature-aware behavior beyond a post-login redirect, that's a signal it doesn't belong in `common/`.
5. **Every phase ends in a command the agent runs, not a suggestion to "test manually."** Browser-based verification is called out separately and minimized.

---

## 3. Types consolidation — the concrete problem and the fix

The audit found the same domain concepts implemented **differently in each app**, which is exactly the "no single source of truth" problem to fix. Two clear examples, kept verbatim below so the fix is traceable:

**Message/memorization type** — `client` has a real enum + pipe:
```ts
// client/src/app/shared/constants/message-type.enum.ts
export enum MessageType {
  Memo = 1, Test, AlNawawia, AlSaalihin, AllahNames, Parts, Viewing, ExtraHadeeth,
}
```
`admin` has the *same eight values*, same order, as an untyped magic-number array returned from a fake "service":
```ts
// admin/src/app/services/memorize-message-type.service.ts
getTypes() {
  return of([{ id: 1, name: 'تسميع' }, { id: 2, name: 'سبر' }, /* ...6 more... */]);
}
```
If a ninth message type is ever added, today someone has to remember to update both places by hand, with no compiler help. **Fix:** delete `MemorizeMessageTypeService` entirely; admin's option-list UI (wherever it renders a dropdown of message types) is rewritten to build its options from the single `MessageType` enum in `shared/types/message-type.enum.ts`, with labels coming from the existing `MessageTypePipe` (kept in `features/client/pipes/` initially, promoted to `shared/pipes/` at the moment `features/admin` needs it — which it will, immediately, in this exact migration step, so promote it then).

**Level** — same shape of problem: `client/src/app/shared/constants/student-level.enum.ts` (`StudentLevel` enum, 1–3) vs. `admin/src/app/services/level.service.ts` (`{id, name}` array, no type). **Fix:** delete `LevelService`, use `StudentLevel` enum + `LevelPipe`, same promotion-on-use logic as above.

**Masjed** — `admin/src/app/services/masjed.service.ts` hardcodes 4 masjid names behind a `switch(1|2|3|4)`; no client equivalent exists to compare against, but the same fix applies for consistency: extract a `Masjed` enum into `shared/types/masjed.enum.ts` and keep the existing rendering logic as a pipe.

**A genuinely duplicated constant, not just a duplicated pattern:** `EXTRA_HADEETH_LABEL` and `EXTRA_HADEETH_LIMIT` are defined **twice**, byte-for-byte the same value, in `client/src/app/shared/constants/extra-hadeeth.ts` and `admin/src/app/constants/index.ts`. **Fix:** one copy in `shared/constants/extra-hadeeth.const.ts`.

**`CurrentUser`** — currently an inline interface at the bottom of `client`'s `auth.service.ts`. Since it becomes the shape every feature reads user identity through, extract it to `shared/types/current-user.type.ts` on its own so `auth.service.ts` isn't the only place that can see the shape.

**What does *not* move to `shared/types/`:** `admin`'s CRUD-kit types (`TableAction`, `FieldConfig`, `TableComponentConfig`, `Filter`, `DialogData`, `ExtraData`) are specific to the admin table/view/create components and only `features/admin` will ever reference them — per the promotion rule, they move to `features/admin/types/`, not `shared/types/`.

**Execution step for the agent:**
1. Enumerate every enum/constant/interface that currently exists as `admin`'s ad-hoc version of something `client` already models properly (this section lists all four found in the audit — `MessageType`/memorize-types, `StudentLevel`/levels, `Masjed`, `EXTRA_HADEETH_*`; re-check for any missed at merge time with `grep -rn "of(\[" admin/src/app/services` since that's the exact pattern these fake "services" all share).
2. For each: create the single canonical file under `shared/types/`, delete the admin-only duplicate, update every admin call site to consume the canonical enum/pipe instead.
3. Verify with `grep -rn "MemorizeMessageTypeService\|LevelService\|MasjedService" src/` returning zero results once done.

---

## 4. API service reconciliation — no regeneration, done by hand

### 4.1 What the audit found (why this needs care, not a blind copy)

The two generated clients are **not interchangeable copies of the same thing** — they were generated at different times, with different scopes, and in `admin`'s case, one of them isn't even generated code:

| Service (as it exists today) | Location | What it actually is |
|---|---|---|
| `AccountsService` | `client/.../shared/services/api/services/accounts.service.ts` | **Generated** by ng-swagger-gen. Methods: `accountsDetailsList()`, `accountsTokenCreate()`, `accountsTokenRefreshCreate()`. This is what `client`'s `AuthService` is built on. |
| `AccountsService` | `admin/.../services/api/accounts/accounts.service.ts` | **Hand-written**, not generated — thin wrapper calling `this.http.post(...)` directly, methods named `tokenObtainPair()`, `tokenRefresh()`, plus a `details` signal. Same domain as the row above, incompatible method names. |
| `AuthService` (class name) | `admin/.../services/api/admin/services/auth.service.ts` | **Generated**, but this is the wrapper for Django's built-in `auth.User` / `auth.Group` admin endpoints (`authUserList`, `authUserCreate`, `authGroupList`, ...) — used by admin's user/group-management pages. It has **nothing to do with login.** The class name collides with the login `AuthService` this plan introduces in `shared/services/auth.service.ts`. |
| `MoneyService`, `ActionsService`, `ExtraService` | `admin/.../services/api/admin/services/*` | **Generated**, admin-only endpoints (`/api/v1/admin/...`). No `client` equivalent exists — pure addition, no conflict. |
| `AwqafService`, `CommingsService`, `GlobalsService`, `PointsService`, `StudentsService`, `ReportsService` | exist in both, generated separately | Same backend domain, but generated independently — must be diffed, not assumed identical (see 4.2). |

### 4.2 Reconciliation procedure (run once, per service, in this order)

1. **Login/token/identity domain →** keep `client`'s generated `AccountsService` as canonical (it's the properly generated one, and the new `shared/services/auth.service.ts` is written against its exact method names). **Delete** `admin`'s hand-written `api/accounts/accounts.service.ts` entirely. Any admin code calling `tokenObtainPair`/`tokenRefresh`/`.details` is rewritten to use `shared/services/auth.service.ts` (see §5) instead of talking to the API directly.
2. **Django auth.User/auth.Group domain →** keep admin's generated `auth.service.ts` as-is (only admin needs it) but **rename the exported class** to `UsersGroupsService` (or similar) before moving it into `features/admin/services/`, specifically to eliminate the name collision with the login `AuthService` in `shared/`. Update its one call site (`features/admin/pages/groups/auth/**`) accordingly. This is a pure rename, not a logic change.
3. **Admin-only domains (`money`, `actions`, `extra`) →** move as-is into `shared/services/api/` (they're part of the one reconciled API client now) — no reconciliation needed since there's nothing to reconcile against.
4. **Overlapping domains (`awqaf`, `comings`/`commings`, `globals`, `points`, `students`, `reports`) →** for each pair of files (`admin/.../admin/services/X.service.ts` vs `client/.../services/X.service.ts`):
   - Diff the method lists (`grep -oE "^\s*[a-zA-Z]+\(" file` on both, `diff` the sorted output).
   - If `admin`'s file is a strict superset of `client`'s methods (expected — admin does full CRUD, client mostly reads/creates) with **identical signatures on the overlapping methods**, keep `admin`'s version as canonical (more complete) and delete `client`'s.
   - If any overlapping method has a **different signature or return type** between the two (possible if the schema drifted between generation runs), treat `client`'s version as authoritative for that one method only (it's the one currently running in production for the public site) and manually patch it into the kept file — do not silently prefer one file wholesale without checking this.
   - Record which file "won" for each domain in a short table in the PR description so the choice is traceable.
5. **Land the result** as a single `shared/services/api/` directory: one `services/` folder, one `models/` folder, one `base-service.ts`, one `api-configuration.ts`, one `strict-http-response.ts`, one `services.ts` barrel, one `models.ts` barrel.
6. **Update `package.json`**: keep exactly one `generate:services` script, pointed at `./src/app/shared/services/api`, for future use — even though this migration doesn't run it.

### 4.3 Verification

```sh
# every consumer resolves through the one reconciled client
grep -rn "services/api/admin/\|services/api/reports/\|services/api/accounts/" src/app/ | grep -v "src/app/shared/services/api"
# expect: zero results

tsc --noEmit
# expect: zero errors
```

---

## 5. Auth, guards, interceptors, login screen

- `shared/services/auth.service.ts` — ported from `client`'s `AuthService` verbatim (refresh-token flow, `provideAppInitializer`, `currentUser` signal exposing `isAdmin`/`groups: Group[]` using the canonical `Group` enum from `shared/types/`). This becomes the **only** place any code reads or writes `zidnahum-token` / `zidnahum-refresh-token`.
- `shared/guards/admin.guard.ts` (new):
  ```ts
  export const adminGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return toObservable(auth.currentUser).pipe(
      filter(u => u !== undefined),
      map(u => u?.isAdmin ?? false),
      tap(ok => { if (!ok) router.navigateByUrl('/'); }),
    );
  };
  ```
  This is a genuinely new protection — `admin` today has **zero** client-side route guards (confirmed: no `guards/` directory anywhere in `frontend/admin`), relying entirely on the backend rejecting unauthorized API calls. This guard is mandatory on the `admin` route, not optional hardening.
- `features/client/guards/{auth,non-auth,group}.guard.ts` — ported from `client` unchanged, stay feature-local per the promotion rule (nothing in `features/admin` uses them).
- `interceptors/auth.interceptor.ts` — one version, based on `client`'s (`inject(AuthService).token`), replacing `admin`'s raw-`localStorage` version.
- `interceptors/error.interceptor.ts` — based on `admin`'s (the only one of the two apps that had one), updated to import `SnackbarService`/`LOADING` token from their new `shared/` locations.
- **Login screen: one component, in `common/login/`, not two.** Both apps have separate login pages hitting the same backend token endpoint. Build one `LoginComponent` in `common/` that calls `AuthService.login()`, and after success routes to `/admin` if `currentUser().isAdmin`, else `/`. `app.routes.ts` exposes it once at `path: 'login'`, guarded by a client-local `nonAuthGuard` (or promote that one guard to `shared/guards/` immediately, since as soon as the login screen moves to `common/`, `nonAuthGuard` is used by a route outside `features/client` too — this is a real, immediate second-use case, not speculative promotion).
- `common/not-found/` — new; neither app has a 404 today. Wildcard route (`path: '**'`) in `app.routes.ts` renders it.

### Verification
```sh
grep -rn "localStorage.getItem('zidnahum-token')\|localStorage.getItem('zidnahum-refresh-token')" src/app/ | grep -v "shared/services/auth.service.ts"
# expect: zero results — confirms AuthService is the only reader/writer
```

---

## 6. Layouts, theming, i18n (decisions, condensed — rationale for each was reviewed and holds)

- **Two layouts, not one universal shell**: `features/client/layout/` and `features/admin/layout/` stay separate components — they're structurally different products (public site chrome vs. back-office sidenav+navbar). No shared "layout" concept exists in `shared/` unless a specific piece (e.g. a theme toggle) is proven to be needed in both.
- **Theme**: adopt `client`'s dark-mode-capable `theme.scss`/`styles.scss`/`index.html` bootstrap script as the base for the merged app; regenerate the Material palette once from the agreed seed (`#009587`) so the primary/tertiary drift between the two existing `theme.scss` files doesn't carry forward.
- **i18n**: standardize on `admin`'s `TranslateService`/`TranslatePipe` dictionary pattern app-wide (`shared/services/translate.service.ts`, `shared/pipes/translate.pipe.ts`). `client`'s currently-hardcoded Arabic strings are left as-is for this migration (they're already correct Arabic) — sweeping them into the dictionary is explicitly deferred, §8.
- **Environments**: one `baseApiUrl` config (`/api/v1` prod, `http://127.0.0.1:8000/api/v1` dev) for the whole app; drop `appUrlPrefix` — it existed to work around `admin` being a separately-deployed app, which is no longer true once `/admin` is just a route.

---

## 7. Phased execution (each phase = one agent-run unit, verified before moving on)

### Phase 0 — Scaffold
```sh
cd frontend && ng new new-frontend --directory new-frontend --style scss --ssr false --routing false
```
- Copy `angular.json` schematics block + `tsconfig.json` strict flags from either old app (identical in both).
- Add to `tsconfig.json`: `"paths": { "@shared": ["./src/app/shared/index.ts"] }`.
- Create the empty directory skeleton from §1 (`common/`, `shared/{services,guards,pipes,components,tokens,types,constants}/`, `features/{client,admin}/`, `interceptors/`).
- **Verify:** `ng build` succeeds on the empty shell.

### Phase 1 — Shared infrastructure
1. Run the API reconciliation procedure, §4, in full. Land the single `shared/services/api/`.
2. Build the types layer, §3, in full: `shared/types/{group,message-type,memo-item,student-level,masjed}.enum.ts`, `shared/types/current-user.type.ts`, `shared/constants/extra-hadeeth.const.ts`.
3. Port `shared/services/{auth,snackbar,confirmation,translate}.service.ts`, `shared/pipes/translate.pipe.ts`, `shared/tokens/loading.token.ts`, `shared/guards/admin.guard.ts`.
4. Write `interceptors/{auth,error}.interceptor.ts`.
5. Write `app.config.ts` (`provideHttpClient(withInterceptors(...))`, `provideAppInitializer` → `AuthService.initialize()`, `MAT_FORM_FIELD_DEFAULT_OPTIONS`).
6. Write `common/login/` and `common/not-found/`.
7. **Verify:** `tsc --noEmit` clean; `ng build` succeeds; `grep -rn "TODO-MERGE" src/` returns nothing (agent should not leave placeholder stubs — every file landed in this phase must be complete).

### Phase 2 — `features/client`
1. Move `client/src/app/pages/*` → `features/client/pages/*`.
2. Move `client/src/app/layout/*` → `features/client/layout/`.
3. Move `client/src/app/guards/*` → `features/client/guards/` (except `nonAuthGuard`, which — per §5 — is promoted to `shared/guards/` since `common/login` needs it immediately).
4. Move `client/src/app/shared/pipes/*` → `features/client/pipes/` (`level`, `masjed`, `message-type`, `memo` pipes), rewritten to consume the canonical enums in `shared/types/`.
5. Assemble `features/client/client.routes.ts` from the old `app.routes.ts`.
6. Wire `path: ''` in the top-level `app.routes.ts` to `loadChildren` this route file.
7. **Verify:** `tsc --noEmit` clean; `ng build` succeeds; `grep -rn "@shared" features/client/` shows only genuinely shared imports (spot-check, not exhaustive).

### Phase 3 — `features/admin`
1. Move `admin/src/app/pages/groups/*` → `features/admin/pages/groups/*`.
2. Move `admin/src/app/shared/{table,view,create,changes-field,student-search}` → `features/admin/shared/*`.
3. Move the admin CRUD-kit types (`TableAction`, `FieldConfig`, `TableComponentConfig`, `Filter`, `DialogData`, `ExtraData` — currently in `admin/src/app/shared/table/table.component.interface.ts` and siblings) → `features/admin/types/`.
4. Rename and relocate the Django auth.User/auth.Group generated service per §4.2 step 2 (`AuthService` → `UsersGroupsService`, into `features/admin/services/`).
5. **Delete** `MemorizeMessageTypeService`, `LevelService`, `MasjedService`; rewrite their call sites to use the canonical `shared/types/*.enum.ts` + (promoted, per §2's worked example) `shared/pipes/{message-type,level,masjed}.pipe.ts`.
6. Rewrite every remaining import that pointed at the old `admin/src/app/services/api/*` paths to `@shared` (mechanical — see the collision table in §4.1 for what maps where).
7. Replace every read of `AccountsService.details` / raw `localStorage` identity access with `inject(AuthService).currentUser()` from `shared/`.
8. Assemble `features/admin/admin.routes.ts` from the old `app.routes.ts`'s children.
9. Wire `path: 'admin'` in the top-level `app.routes.ts`, `canActivate: [adminGuard]`, `loadChildren` this route file.
10. **Verify:** `tsc --noEmit` clean; `ng build` succeeds; `grep -rn "MemorizeMessageTypeService\|LevelService\|MasjedService\|localStorage.getItem('zidnahum-token')" src/app/` returns zero results (excluding `shared/services/auth.service.ts` itself).

### Phase 4 — Consolidation sweep
Run all of these; every one must come back clean before Phase 5:
```sh
tsc --noEmit
ng lint
grep -rn "services/api/admin/\|services/api/reports/\|services/api/accounts/" src/app/ | grep -v shared/services/api
grep -rn "zidnahum-sidenav" src/app/ | grep -v "features/admin/layout"   # confirm sidenav state stays admin-local, not leaked elsewhere
grep -rn "of(\[" src/app/features/admin/services/ 2>/dev/null            # confirm no leftover fake "of([...])" services remain
find src/app -name "*.component.ts" | xargs grep -L "^import"           # sanity: no orphaned empty component shells left from the move
```
Then regenerate the Material theme once from the agreed palette (§6); confirm no compile errors.

### Phase 5 — Backend wiring + cutover
1. Edit `backend/backend/urls.py`: replace the two `TemplateView`s (`client_view`, `admin_view`) and their path patterns with **one** SPA-fallback view serving a single `index.html`; remove the `admin/` path-prefix special-casing (Angular's router owns that now).
2. Run `make build` (this already targets `frontend/new-frontend` — no change needed there) and confirm it completes without error, producing `backend/templates/index.html` and `backend/static/`.
3. Run `make run` and hit the app through Django (not `ng serve`) for at least: `/`, `/login`, `/admin`, `/admin/login`-style deep link, one asset URL under `static/assets/...` — this is the one step in this plan that needs a human/browser check, because `build.py`'s asset-path rewriting (`static/assets/...`) is exactly the kind of thing that looks fine under `ng serve` and silently breaks only when Django serves the built output.
4. Delete `frontend/admin/`, `frontend/client/`, and the old `frontend/MERGE-PLAN.md`.
5. Update root `README.md` if it references the old frontend paths.

---

## 8. Explicitly deferred (tracked, not forgotten)

1. Sweeping `client`'s remaining hardcoded Arabic strings into `TranslateService` for full consistency — not a merge blocker.
2. Retroactive unit test coverage — neither app has meaningful coverage today; cheaper to add once there's one app, not during the move itself.
3. Evaluating whether `features/admin/shared`'s generic table/view/create kit could also power some of `features/client`'s list/detail views (e.g. the `student` page) — a real potential win, but an API-design question deserving its own follow-up, not something to improvise mid-merge.

---

## 9. Conventions to enforce going forward (so this doesn't re-diverge)

- **One canonical type per domain concept, in `shared/types/`.** Before adding a new enum or option-list anywhere in `features/`, check `shared/types/` first — if the concept already exists there, use it; if a near-duplicate exists, that's a bug to fix, not a pattern to repeat.
- **No direct `localStorage` access outside `shared/services/auth.service.ts`** for anything token/identity-related.
- **Promotion only on real second use**, per §2's rule — resist moving things to `shared/` "for consistency" or "just in case."
- **No hand-edits inside `shared/services/api/`** — if the backend schema changes, this is the one place a future regeneration run is expected to touch, and manual edits there will be silently lost.
