# Merge Plan: admin + client → single Angular 22 app

## Goal

Replace `frontend/admin/` and `frontend/client/` with a single Angular 22 app rooted at `new-frontend/` that serves both the public-facing site and the admin dashboard in one SPA.

---

## Phase 0 — Scaffold the new app

```sh
# scaffold new-frontend (no routing flag — we'll wire it manually)
ng new new-frontend . --style scss --ssr false
```

Apply existing conventions from the backups:
- `angular.json`: set `"packageManager": "bun"`, `skipTests: true` in schematics, and set the `schematics` for naming convention in like it is used in admin and client apps
- `.editorconfig`: `indent_size = 2`, `quote_type = single` for `*.ts`
- `tsconfig.json`: strict mode, `paths` alias `@shared` → `src/app/shared/index.ts`
- Delete generated `src/app/app.*` contents (keep the files as shells)

---

## Phase 1 — Core/infrastructure layer (app/)

This is shared code that both client and admin pages depend on.

### 1.1 Auth (`shared/services/auth.service`)

Merge `AccountsService` (admin) + `AuthService` (client) into one service:

```typescript
// shared/service/auth.service
@Injectable({ providedIn: 'root' })
export class AuthService {
  // signal-based state
  currentUser = signal<UserDetails | null>(null);
  loading = signal(true);

  // localStorage tokens: zidnahum-token, zidnahum-refresh-token (already same key)
  login(username, password): Observable<void>;
  logout(): void;
  refreshToken(): Observable<void>;
  initialize(): Promise<void>;  // called in provideAppInitializer
}
```

- Use the admin-style `AccountsService.userDetails()` approach (simpler, more explicit)
- Provide via `provideAppInitializer` (client's pattern — runs before any route guards fire)

### 1.2 HTTP interceptors (`src/interceptors/`)

Merge both apps' interceptor chains:

```
auth.interceptor.ts      — attaches Bearer token (identical in both)
error.interceptor.ts     — admin's version (catches non-auth errors, shows snackbar)
```

Keep admin's error interceptor over client's simpler one — it's more robust.

### 1.3 Loading state (`shared/tokens/loading.token.ts`)

Replace admin's `LOADING` InjectionToken with a simple root service (or keep the token — either works). The key is one source of truth.

```
core/loading.service.ts  — WritableSignal<boolean>, consumed by navbar and guards
```

### 1.4 Snackbar / Confirmation (`shared/services/`)

```
snackbar.service.ts      — merge admin's (success/error/open) + client's (both are near-identical)
confirmation.service.ts  — move from client (admin lacks this; it's useful everywhere)
```

### 1.5 Common (`common/error/` & `features/login/`)
Those are not related to any feature so keep them as common things.

### 1.6 Features (`features/client/` & `features/admin/`)

Create a features folder that will contain modular logic inside it for each feature.

Make sure each feature has its only necessary code that won't be used globally or in other feature, otherwise move this code to `shared/` in suitable way.

```
features/
  client/
    components/
    services/
    layout/                — coming from the `frontend/client/app/layout/`
    client.routes.ts
  admin/
    components/
    services/
    layout/                — coming from the `frontend/admin/app/layout/`
    admin.routes.ts
```

### 1.7 Shared utilities (`shared/`)

Collect everything both apps need:

```
shared/
  constants/           — Group enum, MessageType enum, StudentLevel, EXTRA_HADEETH_LABEL, EXTRA_HADEETH_LIMIT (merge both — they match)
  pipes/               — all from client: masjed, memo, test, message-type, level; + admin's translate pipe
  services/            — masjed, level, memorize-message-type, helper, date, memo, test, pages-sum, and what we dicussed before (for auth, snackbar, etc...) (merge both sets)
  quran/               — move client's 4 quran display services (memo, test, elite-test, awqaf-test) — these are domain logic, not API wrappers
  utils/               — delete-model-action factory (admin), mobile-utils (client)
```

### 1.7 Theme & styles

- Keep both theme files — like `client-theme.scss` and `admin-theme.scss`
- Single `styles.scss` at `src/` with combined styles from both apps
- Both use same font (Noto Kufi Arabic), RTL layout, Material Icons

---

## Phase 2 — Route architecture

### Top-level route tree

```
/                           → ClientHomeComponent
/login                      → LoginComponent (common)

/student/:id                → StudentDetailComponent (client)

/files                      → FilesComponent (client)
/news                       → NewsComponent (client)

/add-memo                   → AddMemoComponent (client)
/add-coming                 → AddComingComponent (client)
/add-points                 → AddPointsComponent (client)
/add-hadeeth                → AddHadeethComponent (client)
/add-student                → AddStudentComponent (client)

/log-memo                   → LogMemoComponent (client)
/log-coming                 → LogComingComponent (client)
/log-points                 → LogPointsComponent (client)

/reports                    → ReportsComponent (client)

/admin                      → AdminHomeComponent (coming from `frontend/admin/src/app/home/`)
/admin/students/*           → AdminStudentsRoutes
/admin/points/*             → AdminPointsRoutes
/admin/comings/*            → AdminComingsRoutes
/admin/awqaf/*              → AdminAwqafRoutes
/admin/globals/*            → AdminGlobalsRoutes
/admin/money/*              → AdminMoneyRoutes
/admin/auth/*               → AdminAuthRoutes (superadmin)
/admin/settings             → SettingsComponent (superadmin)
/admin/reports              → AdminReportsComponent
/admin/statistics           → StatisticsComponent (superadmin)
```

### Implementation notes

- **Every route above is normally loaded** except for the main `/` and `admin` which represent each feature of `features/client/` and `features/admin/`, those two are lazy loaded via **loadChildren()**.
- **Login is shared** — both apps use the same JWT + `/accounts/token` endpoint. One `LoginComponent` handles both. After login, redirect to `/` (client) or `/admin` based on user.isAdmin.
- **Guards**: Use the client's guard pattern (functional `CanActivateFn`, waiting for `auth.currentUser` to be defined) — it's more robust than admin's on-spot check in `AppComponent.init()`.

### Feature directory layout

Merge both apps' pages into a flat-by-scope structure:

```
src/app/
  common/
    login/
    error/
  interceptors/
  shared/                  ← shared components, pipes, constants and other things
  features/
    client/                  ← public-facing pages
      components/
        home/
        login/                 ← (or keep at app level since shared)
        student/
        files/
        news/
        add-memo/
        add-coming/
        add-points/
        add-hadeeth/
        add-student/
        log-memo/
        log-coming/
        log-points/
        reports/
      layout/
      services/
      (whatever is good to be modular here)
      client.routes.ts (use the layout for this feature here depending on the router-outlet) (normal loading not lazy)
    admin/
      components/
        home/
        students/
        points/
        comings/
        awqaf/
        globals/
        money/
        auth/
        settings/
        reports/
        statistics/
      layout/
      services/
      (whatever is good to be modular here)
      admin.routes.ts (use the layout for this feature here depending on the router-outlet) (normal loading not lazy)
    app.component.ts
    app.config.ts
    app.routes.ts (lazy loading for features and normal for commmon comopnents (login and error))
```

---

## Phase 3 — API services

### Problem

Both apps have ng-swagger-gen generated services that **share names** (`StudentsService`, `ComingsService`, etc.) but contain **different methods** (client has student-facing endpoints, admin has CRUD endpoints). They cannot coexist at the same import path.

### Solution

Move those services into the scope of each feature (except for shared ones) and rename the duplicated names to match the feature scope with file name identical.

For types and models you can make them shared in `src/app/shared/types/` folder you create, same goes for base api configuration it can be in `src/app/shared/services/api-configuration or any name you want`

You can remove the package.json commands for generating services because I won't use it anymore.

---

## Phase 4 — Guards & route protection

Unify using client's pattern (more robust):

```typescript
// src/app/shared/guards/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  // wait for initialize() to finish (currentUser ≠ undefined)
  return toObservable(auth.currentUser).pipe(
    filter(u => u !== undefined),
    map(u => u !== null || '/login')
  );
};

// src/app/shared/guards/group.guard.ts — client's logic, no change
export const groupGuard = (groups: Group[]): CanActivateFn => ...
```

---

## Phase 5 — Build pipeline update

After the merge, the Django `build` management command (`backend/commands/management/commands/build.py`) needs updating:

- Build targets: was `frontend/admin` + `frontend/client` → now just `new-frontend/` with two build configurations
- **Option A**: Single `ng build` with `--base-href /` → serves combined app at root. Admin routes are just routes within the SPA.
- **Option B**: Two `ng build` invocations (admin build with `--base-href /admin`, client build with `--base-href /`) → need separate Angular projects in `angular.json`

**Recommendation: Option A** — one SPA, one build, no duplicated bundles. Admin lives at `/admin/*` as client-side routes, not a separate deployment. This is simpler for both development and production.

The `build` command then becomes:
```python
os.chdir(Path.cwd() / "new-frontend")
os.system("ng build")
```

The template/static patching from `build.py` still applies (replace asset paths).

---

## Phase 6 — Testing & verification

After each phase:
1. `ng build` (no errors)
2. `ng test` (vitest — both apps have vitest as devDep)
3. Manual smoke test: visit `/`, `/login`, `/admin/students`

---

## Summary of key decisions

| Concern | Decision |
|---------|----------|
| App root | `new-frontend/` |
| Angular version | Keep Angular 22 (as-is) |
| Build strategy | Single SPA, one build (Option A) |
| Route architecture | Lazy-load the main `/admin` and `/` at `app.routes.ts` scope |
| Auth | Merge into one `AuthService` with signal state + `provideAppInitializer` |
| API services | Feature scope except for shared one + types in shared folder `src/app/shared/types/` |
| Layout | Seperate layout for each feature used in its `<feature-name>.routes.ts` |
| Guards | Client's functional-guard pattern (filter + map) |
| Package manager | `bun` (already set in both angular.json) |
| State | Signals only — no NgRx (current pattern) |
| Tests | Vitest (already in both) |

---

## Suggested implementation order

1. Scaffold new app at `new-frontend/`
2. Copy over /interceptors
3. Make /common
4. Copy over shared (constants, pipes, shared services, quran services)
5. Copy over theme + styles + assets
6. Unify the `src/environments/`
7. Create /features and make two features `client` and `admin`, move two them their content as I described before.
8. Create `src/app/shared/types/` and move api services for each feature.
9. Wire up routing + guards
10. Update Django `build` command
11. Build & test
