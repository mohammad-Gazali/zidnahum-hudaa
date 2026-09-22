# Testing Plan: Frontend (new) + Backend (fill the gaps)

Both halves are grounded in real measurements, not estimates — I ran the existing backend suite with coverage, and confirmed the frontend's actual test tooling and current file count.

## Part A — Backend: fill the gaps in an already-partially-tested codebase

**Baseline (measured just now, all 34 existing tests pass):**

| File | Coverage | Notes |
|---|---|---|
| `accounts/*`, `awqaf/views.py`, `globals/views.py`, `points/views.py`, `students/serializers.py`, `reports/serializers.py` | 94–100% | Already well tested — public-facing apps are in good shape. |
| `comings/views.py` | 94% | Good. |
| `students/utils.py` | 71% | Decent, some edge cases uncovered. |
| `adminstration/actions_views.py` / `actions_utils.py` | 68–69% | The generic delete-action factory — partially covered. |
| `adminstration/extra_views.py` | 47% | Settings, statistics, elite-test, money-total, the ad-hoc creation endpoints. |
| `adminstration/utils.py` | **55%** | **The core generic viewset/serializer factory that powers ~19 of the 21 admin API domains.** This is the highest-leverage file in the whole backend — a bug or gap here affects nearly every admin CRUD screen at once, the same way the `lru_cache` bug from the schema-generation work did. |
| `reports/views.py` | 30% | |
| `reports/utils.py` | **4%** (451 statements, 431 untested) | **The Excel report-generation logic — essentially completely untested**, and this is the exact code path flagged earlier as having a live type-safety/regression risk (the `?excel=true` response isn't schema-typed and the new frontend client may not request it as a blob correctly). Untested code at exactly the spot with a known live risk is the top priority here. |
| `money` app | no dedicated tests | Has no `views.py` of its own — its endpoints are generated entirely through `adminstration`'s generic factory, so this is really the same gap as `adminstration/utils.py`, not a separate one. |

**Priority order and what to actually write:**

1. **`reports/utils.py` and `reports/views.py` — start here.** Write tests that actually call the excel-generation functions and assert on the produced file (e.g. load the returned bytes with `openpyxl` and check expected sheet/row content), for at least: single-student report, category/group report, all-students report. Then add a view-level test that hits `?excel=true` and asserts the response has the correct binary content-type and non-empty body, alongside the existing-pattern JSON-mode tests. This directly de-risks the regression flagged in the code-health review — if this test exists and passes against the real backend, and the frontend can consume it correctly, that closes the loop.
2. **`adminstration/utils.py` — test the generic factory itself, not each of the 19 domains it powers.** Pick 1–2 representative models (e.g. `MoneyDeleting`, since it has no other app-level tests at all, plus one with a distinct field-type mix). Write a thorough test class covering: list (with pagination and filtering), create, update, delete, and — critically — **permission variations**: anonymous user (should be rejected), authenticated non-staff (rejected), staff-but-not-superuser (check whatever the actual intended access level is), superuser (allowed). Also specifically test that the `@lru_cache`-memoized serializer factory doesn't leak field configuration between two different models that both go through `create_serializer` in the same test run — this is exactly the kind of subtle bug the recent fix could reintroduce if touched again later, and there's currently nothing guarding against a regression there.
3. **`adminstration/actions_utils.py` — test the generic bulk-delete action factory** similarly: valid IDs, empty ID list, IDs belonging to a different model, permission variations, and confirm the response/behavior is consistent across at least two of the ~19 domains that use it (to catch a per-domain wiring mistake, not just a factory-level bug).
4. **`adminstration/extra_views.py`** — one test per endpoint (`ControlSettingsReadUpdateView`, `StatisticsView`, `TotalMoneyListView`, `AddEliteTestCreateView`, the awqaf/money quick-add endpoints) — these are small, standalone, and currently have no coverage at all beyond what leaked in from the one existing `ExtraViewsTestCase`.
5. Once 1–4 are done, revisit `students/utils.py`'s remaining gaps and `comings/views.py`'s few missed lines — lower priority, smaller and already reasonably covered.

**Tooling additions:**
- Add `coverage` (already confirmed installable) as a dev dependency, with a simple `coverage run manage.py test && coverage report` script, so progress against this baseline is measurable rather than a feeling. Consider a `.coveragerc` excluding migrations.
- If there's CI, add a coverage-doesn't-regress check once a baseline is committed — ratchet the number up over time rather than mandating a big jump immediately.
- Optional, not required: `pytest-django` is a nicer test-writing experience than raw `unittest`-style `TestCase`, but the existing suite is already in good shape using Django's built-in runner — don't migrate the existing 34 tests just for style, only consider it if writing net-new tests feels meaningfully better with it.

## Part B — Frontend: there is currently no test infrastructure at all

`find src -iname "*.spec.ts"` returns zero files. Angular's newer unified test builder (`@angular/build:unit-test`, vitest-based under the hood) is already configured in `angular.json` and `vitest` is already a dependency — the tooling is ready, nothing has been written yet.

**Priority order (highest-risk/highest-leverage logic first, not highest file count):**

1. **`shared/services/auth.service.ts`** — the most important file to test in the whole frontend. Cover: `login()` correctly populates `currentUser` only after the details fetch resolves (this is precisely the race condition found and fixed in an earlier review — a test here means it can never silently come back), `isAdmin`/`isSuperUser`/`isStaff` derivation from `is_staff`/`is_superuser` combinations, token refresh on a 401, and `logout()` clearing state and navigating correctly. Use Angular's `HttpTestingController` to mock the generated `AccountsService`'s HTTP calls rather than mocking the service itself, so the test also catches a future accidental change to the request shape.
2. **`shared/guards/admin.guard.ts` and `features/client/guards/group.guard.ts`** — these are access-control logic; a guard bug is a security bug. Test: unauthenticated → redirected/blocked, authenticated non-admin → blocked from `/admin`, authenticated admin → allowed, and for `groupGuard`, each `Group` membership combination against a representative protected route.
3. **`interceptors/auth.interceptor.ts` and `interceptors/error.interceptor.ts`** — confirm the token is attached to outgoing requests (and correctly *not* attached to the login/token-refresh calls themselves, to avoid a circular-auth situation), and that a 401 triggers the expected refresh-then-retry (or logout) flow, and that the global `LOADING` signal and error snackbar fire correctly on failure.
4. **The schema-derived option services** (`LevelService`, `MasjedService`, `MemorizeMessageTypeService`) — these are now pure, small, and derive from generated enums, making them cheap, high-value, easy first wins: assert `getLevels()`/`getMasjeds()`/`getTypes()` return one entry per enum value with the correct label, and that the label maps don't have a missing entry for any enum value (a test here would have caught a stale label map immediately, which is exactly the kind of drift this whole area was rebuilt to prevent).
5. **The admin generic CRUD kit** (`features/admin/components/{table,create,view}`) — highest leverage in the whole component layer, since it's reused across ~80 pages. Component-level tests (using Angular's `TestBed` with a mocked backing service) for: the table renders rows from provided data, sorting/filtering/pagination interact correctly, the bulk-actions menu only enables when rows are selected, and the create/view forms correctly map their config into the right field types. A bug caught here is a bug fixed ~80 times over.
6. **Form validation logic in the "add a record" components** (`add-memo`, `add-coming`, `add-points`, etc.) — these are simpler and more repetitive; a couple of representative ones are enough to establish the pattern (required-field validation, student-picker requiring a selection before submit), rather than writing near-identical tests for every one of them.

**What "done" looks like for this plan, in stages — don't try to reach full coverage in one pass:**
- Stage 1 (items 1–3 above): the app's security- and correctness-critical logic has real tests. This is the non-negotiable minimum.
- Stage 2 (items 4–5): the highest-leverage shared pieces are covered.
- Stage 3 (item 6 onward): expand coverage requirement to any *new* business logic going forward, without retroactively demanding tests for every existing thin wrapper component — that would be low-value effort for what's mostly configuration, not logic.

**Tooling notes:**
- Standalone components: use `TestBed.configureTestingModule({ imports: [ComponentUnderTest] })` (no `declarations` array needed) and provide mocked versions of injected services via `providers`.
- For anything touching `HttpClient` (the generated API services, `AuthService`), use `provideHttpClient(withFetch())` + `provideHttpClientTesting()` and `HttpTestingController` rather than hand-rolled service mocks, so tests stay accurate if the generated client's method signatures change.
- For signal-based state (`currentUser`, `LOADING`, etc.), assert directly on the signal's value after triggering the relevant action — no special tooling needed beyond calling the signal as a function in the assertion.
- Add `"test": "ng test"` is already present; once real coverage exists, consider adding a coverage threshold the same way as the backend, and wiring `ng test` into CI if there is one.

## Verification for this whole plan
```sh
# backend
cd backend && coverage run manage.py test && coverage report

# frontend
cd frontend && ng test
```
Track the backend coverage number over time from the measured baseline above; track the frontend number up from zero. Neither needs to hit 100% to be a success — the goal is that the highest-risk logic (auth, guards, the generic admin factory/CRUD kit, and the reports excel path) is never untested again, not that every line in the codebase has a test.
