# Merge Plan: admin + client → single Angular 21 app

## Goal

Replace `frontend/admin/` and `frontend/client/` with a single Angular 21 app rooted at `frontend/` that serves both the public-facing site and the admin dashboard in one SPA.

---

## Phase 0 — Scaffold the new app

```sh
# backup both existing apps
mv frontend/admin frontend/admin.bak
mv frontend/client frontend/client.bak

# scaffold at frontend/ (no routing flag — we'll wire it manually)
ng new frontend --directory . --style scss --ssr false --standalone true
```

Apply existing conventions from the backups:
- `angular.json`: set `"packageManager": "bun"`, `skipTests: true` in schematics
- `.editorconfig`: `indent_size = 2`, `quote_type = single` for `*.ts`
- `tsconfig.json`: strict mode, `paths` alias `@shared` → `src/app/shared/index.ts`
- Delete generated `src/app/app.*` contents (keep the files as shells)

---

## Phase 1 — Core/infrastructure layer (app/)

This is shared code that both client and admin pages depend on.

### 1.1 Auth (`core/auth/`)

Merge `AccountsService` (admin) + `AuthService` (client) into one service:

```typescript
// core/auth/auth.service.ts
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
- Provide via `APP_INITIALIZER` / `provideAppInitializer` (client's pattern — runs before any route guards fire)

### 1.2 HTTP interceptors (`core/interceptors/`)

Merge both apps' interceptor chains:

```
auth.interceptor.ts      — attaches Bearer token (identical in both)
error.interceptor.ts     — admin's version (catches non-auth errors, shows snackbar)
```

Keep admin's error interceptor over client's simpler one — it's more robust.

### 1.3 Loading state (`core/loading.ts`)

Replace admin's `LOADING` InjectionToken with a simple root service (or keep the token — either works). The key is one source of truth.

```
core/loading.service.ts  — WritableSignal<boolean>, consumed by navbar and guards
```

### 1.4 Snackbar / Confirmation (`core/`)

```
snackbar.service.ts      — merge admin's (success/error/open) + client's (both are near-identical)
confirmation.service.ts  — move from client (admin lacks this; it's useful everywhere)
```

### 1.5 Layout (`core/layout/`)

Build a unified layout that detects the current route prefix and renders the right navigation.

```
layout/
  layout.component.ts       — shell: toolbar + sidenav + <router-outlet />
  navbar/navbar.component   — responsive toolbar with mode-aware nav items
  sidenav/sidenav.component — driven by a route config array (merge admin's GroupsService + client's LayoutService)
```

- Use admin's `mat-sidenav-container` layout as the base (it's more polished: responsive `mode`, persistent state)
- Add client's dark-mode toggle and theme persistence (`localStorage` → `zidnahum-theme`)
- The sidenav config should be a single `RouteConfig[]` with a `scope: 'client' | 'admin' | 'both'` flag, filtered by auth + scope

### 1.6 Shared utilities (`shared/`)

Collect everything both apps need:

```
shared/
  constants/           — Group enum, MessageType enum, StudentLevel, EXTRA_HADEETH_LABEL, EXTRA_HADEETH_LIMIT (merge both — they match)
  pipes/               — all from client: masjed, memo, test, message-type, level; + admin's translate pipe
  services/            — masjed, level, memorize-message-type, helper, date, memo, test, pages-sum (merge both sets)
  quran/               — move client's 4 quran display services (memo, test, elite-test, awqaf-test) — these are domain logic, not API wrappers
  utils/               — delete-model-action factory (admin), mobile-utils (client)
```

### 1.7 Theme & styles

- Keep both theme files — they already use the same primary `#009587` / secondary `#fcb54c`
- Single `styles.scss` + `theme.scss` at `src/`
- Both use same font (Noto Kufi Arabic), RTL layout, Material Icons

---

## Phase 2 — Route architecture

### Top-level route tree

```
/                           → ClientHomeComponent (lazy)
/login                      → LoginComponent (lazy, shared)

/student/:id                → StudentDetailComponent (lazy, client)

/files                      → FilesComponent (lazy, client)
/news                       → NewsComponent (lazy, client)

/add-memo                   → AddMemoComponent (lazy, client)
/add-coming                 → AddComingComponent (lazy, client)
/add-points                 → AddPointsComponent (lazy, client)
/add-hadeeth                → AddHadeethComponent (lazy, client)
/add-student                → AddStudentComponent (lazy, client)

/log-memo                   → LogMemoComponent (lazy, client)
/log-coming                 → LogComingComponent (lazy, client)
/log-points                 → LogPointsComponent (lazy, client)

/reports                    → ReportsComponent (lazy, client)

/admin                      → redirect to /admin/students (or AdminHomeComponent)
/admin/login                → AdminLoginComponent (lazy, shared? or just /login works for both)
/admin/students/*           → AdminStudentsModule (lazy)
/admin/points/*             → AdminPointsModule (lazy)
/admin/comings/*            → AdminComingsModule (lazy)
/admin/awqaf/*              → AdminAwqafModule (lazy)
/admin/globals/*            → AdminGlobalsModule (lazy)
/admin/money/*              → AdminMoneyModule (lazy)
/admin/auth/*               → AdminAuthModule (lazy, superadmin)
/admin/settings             → SettingsComponent (lazy, superadmin)
/admin/reports              → AdminReportsComponent (lazy)
/admin/statistics           → StatisticsComponent (lazy, superadmin)
```

### Implementation notes

- **Every route above is lazy-loaded** via `loadComponent` or `loadChildren`. Currently only admin does this; client is fully eager. Convert client routes to lazy.
- **Login can be shared** — both apps use the same JWT + `/accounts/token` endpoint. One `LoginComponent` handles both. After login, redirect to `/` (client) or `/admin` based on user.isAdmin.
- **Guards**: Use the client's guard pattern (functional `CanActivateFn`, waiting for `auth.currentUser` to be defined) — it's more robust than admin's on-spot check in `AppComponent.init()`.

### Feature directory layout

Merge both apps' pages into a flat-by-scope structure:

```
src/app/
  core/                    ← infra layer (auth, interceptors, layout, core services)
  shared/                  ← shared components, pipes, constants

  client/                  ← public-facing pages
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

  admin/                   ← admin pages
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
```

---

## Phase 3 — API services

### Problem

Both apps have ng-swagger-gen generated services that **share names** (`StudentsService`, `ComingsService`, etc.) but contain **different methods** (client has student-facing endpoints, admin has CRUD endpoints). They cannot coexist at the same import path.

### Solution

Re-generate all services from the unified Django schema into **separate namespaces**:

```
src/app/
  api/
    client/                ← ng-swagger-gen output (client scope)
      services/
        accounts.service.ts
        students.service.ts
        comings.service.ts
        points.service.ts
        awqaf.service.ts
        globals.service.ts
        reports.service.ts
      models/
      base-service.ts
      api-configuration.ts

    admin/                 ← ng-swagger-gen output (admin scope)
      services/
        accounts.service.ts  (or keep a shared version)
        adminstration.service.ts
        students.service.ts
        comings.service.ts
        points.service.ts
        awqaf.service.ts
        globals.service.ts
        money.service.ts
        reports.service.ts
      models/
      base-service.ts
      api-configuration.ts
```

Each namespace gets its own `ApiConfiguration` with the right `rootUrl`:
- Client: `/api/v1`
- Admin: `/api/v1/admin`

**Codegen config** (`ng-swagger-gen.json` or package.json scripts):

```json
{
  "generate:services:client": "ng-swagger-gen -i http://127.0.0.1:8000/docs/schema -o ./src/app/api/client",
  "generate:services:admin": "ng-swagger-gen -i http://127.0.0.1:8000/docs/schema/admin -o ./src/app/api/admin"
}
```

The Django schema at `/docs/schema` includes all endpoints. ng-swagger-gen generates all services from it — the client and admin just use different subsets. Having both in the same app means you can import `ApiConfiguration` with the right prefix for each context.

Alternatively, if ng-swagger-gen can't namespace (it outputs flat files), post-process or alias via `paths` in `tsconfig.json`:
```json
"paths": {
  "@api/client/*": ["src/app/api/client/*"],
  "@api/admin/*": ["src/app/api/admin/*"]
}
```

---

## Phase 4 — Guards & route protection

Unify using client's pattern (more robust):

```typescript
// core/guards/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  // wait for initialize() to finish (currentUser ≠ undefined)
  return toObservable(auth.currentUser).pipe(
    filter(u => u !== undefined),
    map(u => u !== null || '/login')
  );
};

// core/guards/group.guard.ts — client's logic, no change
export const groupGuard = (groups: Group[]): CanActivateFn => ...
```

---

## Phase 5 — Build pipeline update

After the merge, the Django `build` management command (`backend/commands/management/commands/build.py`) needs updating:

- Build targets: was `frontend/admin` + `frontend/client` → now just `frontend/` with two build configurations
- **Option A**: Single `ng build` with `--base-href /` → serves combined app at root. Admin routes are just routes within the SPA.
- **Option B**: Two `ng build` invocations (admin build with `--base-href /admin`, client build with `--base-href /`) → need separate Angular projects in `angular.json`

**Recommendation: Option A** — one SPA, one build, no duplicated bundles. Admin lives at `/admin/*` as client-side routes, not a separate deployment. This is simpler for both development and production.

The `build` command then becomes:
```python
os.chdir(Path.cwd() / "frontend")
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
| App root | `frontend/` |
| Angular version | Keep Angular 21 (as-is) |
| Build strategy | Single SPA, one build (Option A) |
| Route architecture | Lazy-load every feature, admin under `/admin/*` |
| Auth | Merge into one `AuthService` with signal state + `APP_INITIALIZER` |
| API services | Two ng-swagger-gen namespaces: `@api/client/*`, `@api/admin/*` |
| Layout | Admin's sidenav layout as base, add client's dark mode |
| Guards | Client's functional-guard pattern (filter + map) |
| Package manager | `bun` (already set in both angular.json) |
| State | Signals only — no NgRx (current pattern) |
| Codegen | `bun run generate:services:client` / `generate:services:admin` |
| Tests | Vitest (already in both) |

---

## Suggested implementation order

1. Scaffold new app at `frontend/`
2. Copy over core/infrastructure (auth, interceptors, loading, snackbar, confirmation)
3. Copy over shared (constants, pipes, shared services, quran services)
4. Copy over theme/styles/assets
5. Wire up layout component
6. Move client pages as lazy-loaded features (update imports to new paths)
7. Move admin pages as lazy-loaded features under `/admin/*`
8. Regenerate API services into `api/client/` and `api/admin/`
9. Wire up routing + guards
10. Update Django `build` command
11. Build & test
12. Delete `admin.bak/` and `client.bak/`
