# Enhancement Plan: One clean, type-safe, meaningfully-named API client

**For a single agent, working sequentially — no parallel workstreams.** Every phase ends in a command to run and a concrete pass/fail condition, in that order, top to bottom.

## 0. Grounding — this was verified against the real schema, not inferred

I pulled `combine-frontend` fresh, stood up the Django backend locally (sqlite, migrations applied), and actually ran:
```sh
python manage.py spectacular --format openapi-json --file schema.json
```
This is the single most useful diagnostic available and it had never been run and inspected before. It reveals the *real* reason the API client has been unmanageable — it isn't that nobody reconciled the generated files carefully enough, it's that **the schema itself currently has real defects**, so any codegen run — past or future — inherits them. Fix these first; the frontend generation step becomes almost mechanical afterward.

**29 tags already exist and 27 of them are already clean and well-named** — 8 public (`accounts`, `awqaf`, `comings`, `globals`, `points`, `reports`, `students`, plus implicit) and ~19 admin tags that are already one-tag-per-model (`admin-student`, `admin-money-deleting`, `admin-awqaf-test-no-q`, etc., via a single factory in `adminstration/utils.py` that auto-tags every generated admin viewset as `admin-<model-name-kebab>`). **This means the naming foundation is already good** — the fix is concentrated in a small, specific set of places, not a redesign.

### Finding 1 — one systemic bug is very likely producing ~38 schema warnings at once
```
Warning [Result > Result]: Encountered 2 components with identical names "<Model>-create/list/update" ...
```
This fires for **38 distinct model/action pairs** — `Group`, `User`, `AwqafNoQStudentRelation`, `AwqafTestNoQ`, `ComingCategory`, `Coming`, `AssetFile`, `AssetsCategory`, `News`, `MoneyDeletingCause`, `MoneyDeleting`, `PointsAddingCause`, `PointsAdding`, `PointsDeletingCause`, `PointsDeleting`, `StudentCategory`, `StudentGroup`, `MemorizeMessage`, `MemorizeNotes` — i.e. **nearly every single admin CRUD domain**, all traced to the exact same line: `adminstration/utils.py:88`, inside `create_serializer`, called from `create_admin_viewset`. That uniformity across every domain is the tell: **this is one bug, not 38.** Something in `create_admin_viewset`/`get_serializer_class()` is almost certainly calling `create_serializer(...)` twice for the same (model, action) pair — once eagerly at class-body-evaluation time and again lazily when `get_serializer_class()` runs during schema introspection — producing two distinct Python classes that both resolve to the same schema component name. **Investigate and fix this once, in `create_admin_viewset`/`create_serializer` (memoize the per-action serializer class instead of recomputing it), and expect most or all 38 warnings to disappear together.** Do not go model-by-model patching `extra_ref` on 38 call sites before confirming this — that treats the symptom, not the cause.

Real consequence if left unfixed: for any of these 38, a generated TypeScript model could silently describe the wrong shape for one of the two colliding operations. This is exactly the "sensitivity of Angular to type safety" risk — a compiled, "type-safe"-looking client whose types are quietly wrong for ~19 domains.

### Finding 2 — 15 endpoints are completely invisible to any generator today
```
Error [<ViewName>]: ... Ignoring the view for now.
```
These are dropped from the schema entirely — no generator, past or future, will ever produce a client method for them until fixed. Two groups:

**Admin-side (6)** — fixable by adding a `serializer_class` (or `get_serializer_class()`/`@extend_schema`) to each:
- `adminstration/actions_views.py`: `AdminUserPasswordUpdateView` (34), `AdminUserUpdateActiveView` (56), `AdminMoneyDeletingUpdateActiveView` (80)
- `adminstration/actions_utils.py:23` — the shared base/factory behind the ~19 generic `AdminXxxDeleteAction` views (`admin-actions` tag). These 19 already appear in the schema (the tag shows 22 ops total = 19 deletes + the 3 above), just with fallback/untyped request bodies — worth fixing at the same time so their generated methods are properly typed, not just present.
- `adminstration/extra_views.py`: `AddEliteTestCreateView` (286), `ControlSettingsReadUpdateView` (159)

**Public-side (9) — these matter more, because the client app's users hit them directly today, almost certainly via hand-written fallback code that must not get deleted by accident in Phase 3:**
- `comings/views.py:92` — `ComingDeleteView`
- `points/views.py:51` — `PointsAddingDeleteView`
- `students/views/memorize_messages_views.py:21` — `MemorizeMessageDeleteView`
- `students/views/memorize_notes_views.py:19` — `MemorizeNotesDeleteView`
- `students/views/students_update_views.py`: `StudentUpdateAlarbaeinAlnawawiaView` (279), `StudentUpdateAllahNamesView` (398), `StudentUpdateExtraHadeethView` (321), `StudentUpdatePartsReceivedView` (427), `StudentUpdateRiadAlsaalihinView` (360)

Same fix pattern for all: add `serializer_class` (a minimal one is fine if the view barely needs a body) or a `get_serializer_class()` override.

### Finding 3 — two tags are grab-bags that would generate meaninglessly-named services
- `admin-actions` (22 ops) spans ~19 unrelated domains (student, user, group, money, points, comings, awqaf, assets, news — literally everything that has a generic delete action). Regenerating today would produce one `AdminActionsService` with 22 methods that have nothing to do with each other.
- `admin-extra` (11 ops) is similar — student update, awqaf test creation ×2, money-deleting quick-add ×2, settings, statistics, total-money, elite-test.

**Fix by re-tagging each operation to join its actual domain's existing tag** instead of inventing a new tag per operation:
| View | Current tag | Retag to |
|---|---|---|
| `AdminStudentDeleteAction`, `StudentUpdateView` | `admin-actions` / `admin-extra` | `admin-student` |
| `AdminUserPasswordUpdateView`, `AdminUserUpdateActiveView`, `AdminUserDeleteAction` | `admin-actions` | `admin-user` |
| `AdminGroupDeleteAction` | `admin-actions` | `admin-group` |
| `AdminAwqafTestNoQDeleteAction`, `AddAwqafNoQTestCreateView`, `AddAwqafQTestCreateView` | both | `admin-awqaf-test-no-q` |
| `AdminAwqafNoQStudentRelationDeleteAction` | `admin-actions` | `admin-awqaf-no-q-student-relation` |
| `AdminComingCategoryDeleteAction` | `admin-actions` | `admin-coming-category` |
| `AdminComingDeleteAction` | `admin-actions` | `admin-coming` |
| `AdminAssetsCategoryDeleteAction` | `admin-actions` | `admin-assets-category` |
| `AdminAssetFileDeleteAction` | `admin-actions` | `admin-asset-file` |
| `AdminNewsDeleteAction` | `admin-actions` | `admin-news` |
| `AdminMoneyDeletingCauseDeleteAction` | `admin-actions` | `admin-money-deleting-cause` |
| `AdminMoneyDeletingUpdateActiveView`, `AddMoneyDeletingNormalCreateView`, `AddMoneyDeletingCategoryCreateView` | both | `admin-money-deleting` |
| `AdminPointsDeletingCauseDeleteAction` | `admin-actions` | `admin-points-deleting-cause` |
| `AdminPointsDeletingDeleteAction` | `admin-actions` | `admin-points-deleting` |
| `AdminPointsAddingCauseDeleteAction` | `admin-actions` | `admin-points-adding-cause` |
| `AdminPointsAddingDeleteAction` | `admin-actions` | `admin-points-adding` |
| `AdminStudentCategoryDeleteAction` | `admin-actions` | `admin-student-category` |
| `AdminStudentGroupDeleteAction` | `admin-actions` | `admin-student-group` |
| `AdminMemorizeMessageDeleteAction` | `admin-actions` | `admin-memorize-message` |
| `AdminMemorizeNotesDeleteAction` | `admin-actions` | `admin-memorize-notes` |
| `AddEliteTestCreateView` | `admin-extra` | new `admin-elite-test` (doesn't fit an existing domain) |
| `ControlSettingsReadUpdateView` | `admin-extra` | new `admin-settings` |
| `StatisticsView` | `admin-extra` | new `admin-statistics` |
| `TotalMoneyListView` | `admin-extra` | new `admin-money-total` |

After this, `admin-actions` and `admin-extra` should have **zero** operations left and can be deleted as tags. (Small unrelated consistency nit while you're in here: `admin-asset-file` is singular but `admin-assets-category` is plural — pick one convention, e.g. rename the model/tag to `admin-assets-file` for consistency. Optional, cheap, do it if convenient.)

### Finding 4 — a real type-safety trap in `reports`, worth calling out directly
`reports/views.py`'s `ReportsStudentView.post` (and its siblings for categories/groups/all-students) declare `responses={HTTP_200_OK: ReportsStudentResponseSerializer}` **unconditionally**, but at runtime, if the request includes `?excel=true`, the view returns a raw `.xlsx` binary blob (`HttpResponse` with an Excel content-type) instead. **The schema doesn't know this.** A freshly generated client method for this operation will be typed as always returning `ReportsStudentResponse` JSON — which is simply wrong for the excel case, and is exactly the kind of "looks type-safe, isn't" bug worth avoiding on purpose rather than discovering at runtime.

This also resolves something worth correcting from an earlier review: I previously described the old hand-written admin `reports.service.ts` and the generated `reports-client.service.ts` as hitting "genuinely different backend endpoints." That was wrong — I hadn't traced the URL construction at the time. Both call the exact same `/api/v1/reports/...` domain (confirmed: the old hand-written service builds its URL by stripping `admin` off `ApiConfiguration.rootUrl`). The hand-written version exists because of this exact excel/blob typing gap, not because of a separate backend surface.

**Recommended fix, in order of preference:**
1. Best: make the schema honest. Use `drf-spectacular`'s conditional response support (e.g. `@extend_schema(responses={200: PolymorphicProxySerializer(...)})` covering both the JSON and binary shapes, or split into two explicitly-decorated methods) so the generated client is correctly typed for both cases.
2. Acceptable fallback if (1) isn't worth the effort right now: keep the excel-flavored calls as a small, explicitly-documented hand-written exception (e.g. `shared/services/api/reports-excel.service.ts`, with a comment explaining exactly why it isn't generated, linking back to this doc), and use the generated `ReportsService` for the plain JSON case. Don't let this turn into another silent duplicate — one clearly-named, clearly-justified exception file, not a shadow copy of the whole domain.

### Finding 5 — cosmetic schema issue
```
Warning: encountered multiple names for the same choice set (LevelEnum) ... Add an entry to ENUM_NAME_OVERRIDES
```
Fix in `SPECTACULAR_SETTINGS` (`backend/settings.py`) by adding the relevant `ENUM_NAME_OVERRIDES` entry so the `Level` choices get one stable generated enum name instead of a schema-generated disambiguated alias.

---

## Phase 1 — Backend schema hygiene (do this before touching the frontend at all)

1. Reproduce the baseline locally: `python manage.py spectacular --format openapi-json --file schema.json`, capture the warning/error count.
2. Fix Finding 1 (the systemic `create_serializer` double-instantiation bug in `adminstration/utils.py`) first, alone, then regenerate and diff the warning count — confirm most/all of the 38 collision warnings disappear from one change.
3. Fix Finding 2's 15 missing-serializer views (add `serializer_class`/`get_serializer_class()` per view listed above).
4. Fix Finding 3's re-tagging (table above) — every operation currently under `admin-actions`/`admin-extra` moves to its real domain's tag; create the 4 new standalone tags (`admin-elite-test`, `admin-settings`, `admin-statistics`, `admin-money-total`) for the ones that don't fit an existing domain.
5. Fix Finding 4 (reports excel typing) using whichever option you choose above.
6. Fix Finding 5 (`ENUM_NAME_OVERRIDES` for `LevelEnum`).
7. **Verify:** regenerate the schema one more time. Target: **0 errors, 0 warnings.** If anything remains, it should be something new and unexpected — investigate rather than ignore, since the whole point of this phase is that the frontend generation step afterward requires no manual judgment calls.
8. Confirm the tag list matches expectations: every tag name, read as `Admin<PascalCase>Service` / `<PascalCase>Service`, should be a name you'd be comfortable committing to code. If any tag still reads awkwardly, fix the tag string now — it's a one-line change here, versus a manual rename after generation.

## Phase 2 — Establish an actual, committed generation pipeline (currently doesn't exist)

There is currently no `ng-swagger-gen.json` committed anywhere in the repo — every past generation was a one-off, ungoverned, manual run, which is a big part of how this drifted. Fix that structurally:

1. Add `frontend/ng-swagger-gen.json`:
   ```json
   {
     "$schema": "node_modules/ng-swagger-gen/ng-swagger-gen-schema.json",
     "swaggerUrl": "http://127.0.0.1:8000/docs/schema/",
     "output": "src/app/shared/services/api",
     "removeStaleFiles": true
   }
   ```
   (`removeStaleFiles: true` matters here — it means a future backend rename/removal automatically removes the corresponding frontend file next generation, instead of leaving an orphaned stale service around, which is exactly the kind of drift that happened before.)
2. Add/confirm the `package.json` script: `"generate:services": "ng-swagger-gen -c ng-swagger-gen.json"`.
3. Document the one precondition in the frontend README: the Django dev server must be running locally in `DEBUG` mode (schema is only served when `settings.DEBUG` is true) before running `npm run generate:services`.
4. Write down, somewhere durable (a short `src/app/shared/services/api/README.md` is fine), the rule this whole plan exists to establish: **this folder is 100% generated. Never hand-edit a file in it. Never manually consolidate two tags into one hand-merged service. If the generated output looks wrong or awkwardly named, the fix belongs in the backend's `@extend_schema`/tag/serializer_class, not here.** This is the actual durable fix — not just cleaning up the current mess, but making it structurally harder for the next person (or agent) to recreate it.

## Phase 3 — Regenerate and cut over the frontend

1. Before deleting anything, grep the current `shared/services/api` for any method whose backend call targets one of the **9 public-side endpoints from Finding 2** (comings/points/students delete + the 5 student-update views) — confirm exactly what currently calls them and how. These will not come back from a fresh generation until Phase 1's fixes land; if Phase 1 already fixed their `serializer_class`, they'll generate correctly now — but verify this explicitly rather than assuming, since losing one of these silently would be a real regression, not a cosmetic one.
2. Delete the entire current `frontend/src/app/shared/services/api` folder.
3. Start the Django dev server (`DEBUG=True`), run `npm run generate:services`.
4. Confirm the output: **one file per tag**, no `-client` suffixes, no hand-written accounts/reports wrappers unless Phase 1's reports decision calls for the one documented exception. Expect roughly 29 files (8 public + ~21 admin, adjusted for the 4 new tags from Finding 3 and the removal of `admin-actions`/`admin-extra`).
5. Update every consumer import across `features/admin` and `features/client`. Key renames to expect and handle explicitly:
   - `users-groups.service.ts` (the manually-renamed class from the earlier merge, covering Django's `auth.User`/`auth.Group`) is superseded by two properly-tagged, naturally-disambiguated services: `AdminUserService` and `AdminGroupService`. This resolves the original `AuthService`-naming collision *structurally* — there's no longer any manual rename needed to avoid colliding with the shared login `AuthService`, because the generated names were never going to collide with a hand-named service that was never part of the schema to begin with.
   - `awqaf.service.ts`'s admin-side methods split across `AdminAwqafTestNoQService` and `AdminAwqafNoQStudentRelationService`; `awqaf-client.service.ts`'s one method now just comes from the public `AwqafService`.
   - Same fan-out pattern for `comings`, `globals`, `points`, `students` — each old bundled admin service splits into several smaller, per-model services; each `*-client.service.ts` disappears in favor of the one public service.
   - `reports.service.ts` (hand-written) and `reports-client.service.ts` (generated) both disappear in favor of the one generated `ReportsService`, plus whatever thin exception Phase 1's Finding 4 decision produced.
6. Delete every now-empty/redundant file: all `*-client.service.ts`, the old `users-groups.service.ts`, the old hand-written `reports.service.ts`/`reports.type.ts` (once confirmed superseded).

## Phase 4 — Verify

1. `npx tsc --noEmit -p tsconfig.app.json` — must be clean.
2. `ng build` (a real one, in an environment with a supported Node version) — must succeed, and check the build output for any new warnings about unused generated models (a sign a tag/service still isn't wired up anywhere).
3. `grep -rn "AwqafClientService\|CommingsClientService\|GlobalsClientService\|PointsClientService\|StudentsClientService\|ReportsClientService\|UsersGroupsService" src/` — expect zero results.
4. Re-run the same route/nav parity check used for the merge itself (every route still resolves, every sidenav link still points somewhere real) — this is a mechanical re-verification, not new work, since nothing about *routes* should have changed in this phase, only the API layer underneath them. If anything broke, it'll show up as a component failing to compile against a renamed service, which Phase 4.1/4.2 already catches — this step is the final human-facing double-check.

## Phase 5 — Small deferred cleanups (optional, do only if time remains after Phase 4 passes)

These were flagged in earlier reviews, are unrelated to the API client work, and don't block it — bundling them here so they're not lost, not because they're urgent:
- `features/client/layout/layout.component.html` still links to the admin panel via `<a href="/admin" target="_blank">` in two places — now that admin is a route in the same SPA, this should be `routerLink="/admin"`.
- Two functionally-identical `TranslatePipe` classes exist (`shared/pipes/translate.pipe.ts` and `features/admin/pipes/translate.pipe.ts`), both wrapping the same `TranslateService` — delete one, repoint its importers.
- `features/admin/types/` was never created; the admin CRUD-kit's own types (`TableAction`, `FieldConfig`, etc.) still live inline under `features/admin/shared/table/` — cosmetic, move when convenient.
