# Frontend Enhancement Plan I: Code health, service placement, foundations

**For a single agent, working sequentially.** Verified against a fresh pull of `combine-frontend` (this is post-cutover: `frontend/` is now the one app) plus a live regeneration of the backend schema to confirm what actually changed since the last review.

## What's already solid — don't touch, this is a genuine win

- The API client overhaul from the last plan was carried out well: the `adminstration/utils.py` duplicate-serializer-name bug is fixed via `@lru_cache`, the `admin-actions`/`admin-extra` grab-bag tags are gone (each operation now tags into its real domain), the 15 previously-invisible endpoints are fixed, and the switch to **Orval** (`orval.config.ts`, `mode: 'tags'`, `clean: true`) produces exactly what was asked for: 31 clean, single-responsibility, meaningfully-named files, one per backend tag.
- The enum duplication flagged in two earlier reviews (`MessageType`, `StudentLevel`, `Masjed` each existing in 2–3 places) is now **fully and durably resolved** — `LevelService`/`MasjedService`/`MemorizeMessageTypeService` are rebuilt to derive their option lists from the schema-generated `StudentLevelEnum`/`MasjedEnum`/`MessageTypeEnum` directly, and the old hand-maintained duplicate enum files are deleted. This is the right fix (anchored in the one place that can't drift — the backend schema) and it's done.
- The two structural nits from the prior review (`href="/admin"` → `routerLink`, duplicate `TranslatePipe`) are both fixed.

## 1. Fix now: a real regression in report exports (do this first, before anything else)

Verified by reading the generated code and the old hand-written code side by side, not by inference:

The old hand-written admin `reports.service.ts` (deleted during the cutover) explicitly set `responseType: 'blob'` on every excel-export call. The new Orval-generated `reports.ts` has **no `responseType` override at all**, and its `options` parameter type (`HttpClientBodyOptions`) doesn't even expose `responseType` as a pass-through field. The call sites (`features/client/pages/reports/reports.component.ts`, admin's equivalent) call `reportsStudentAllCreate(data, { excel: true })` and then do `.subscribe((res) => this.downloadBlob(res as any))` — the `as any` is a visible symptom of the underlying gap. Since nothing sets `responseType: 'blob'`, Angular's `HttpClient` will request/parse the response as **JSON by default**, which will not work correctly against a raw `.xlsx` binary payload.

**This needs verification against a live backend immediately** (click every "export to Excel" button in both the client reports page and admin reports page) — if it's broken, this is the highest-priority fix in this whole plan, since it's a working feature from before the merge that may now be silently non-functional. Root cause is on the backend: `reports/views.py`'s `@extend_schema` declares `responses={200: ReportsStudentResponseSerializer}` unconditionally even though the view returns raw binary bytes when `?excel=true`. Fix by making the schema honest (conditional response typing via `PolymorphicProxySerializer` or two explicitly-decorated response variants for the JSON vs. binary case) so Orval generates a correctly-typed, correctly-configured method for the excel path. If that's not worth the schema-design effort right now, the fallback is a small, explicitly-documented hand-written exception specifically for the excel calls (not a full duplicate service — just the handful of blob-returning calls, clearly commented on *why* they're hand-written).

## 2. Service placement audit — move things to where they're actually used

The "promotion rule" from the original merge plan was: code lives in the feature that needs it, and only moves to `shared/` the moment a second feature genuinely needs it too. Checking real, current cross-feature usage (not assumptions) turned up several services sitting in `shared/services/` that only one feature actually uses:

| Service | Actually used by | Action |
|---|---|---|
| `level.service.ts` | `features/admin` only (5 files) | Move to `features/admin/services/level.service.ts` |
| `memo.service.ts` | `features/client` only (2 files) | Move to `features/client/services/memo.service.ts` |
| `memorize-message-type.service.ts` | `features/admin` only (3 files) | Move to `features/admin/services/memorize-message-type.service.ts` |
| `confirmation.service.ts` | `features/client` only (4 files) today | See below — judgment call, not a mechanical move |
| `masjed.service.ts` | both (16 files) | Correctly placed, leave as-is |
| `layout.service.ts` | `features/client` + `common` | Correctly placed (used by the shared login screen), leave as-is |
| `test.service.ts` | both (12 files) | Correctly placed, leave as-is |

**On `confirmation.service.ts`:** rather than a pure mechanical move, this is worth a real decision. Check whether `features/admin/components/{table,create,view}` has its own separate delete-confirmation mechanism today (likely a raw `MatDialog` call). If so, this is a good opportunity to unify onto the one existing `ConfirmationService` instead of moving it out of `shared/` — that's a genuine consistency win (see the UI enhancement plan for the user-facing side of this) and would make its current `shared/` placement correct rather than premature. Decide this before moving it; don't move it reflexively just because only one feature uses it *today* if the intent is for both to use it *next*.

For each actual move: relocate the file, update its own internal imports if any changed relative paths, update every consumer's import path, then run `npx tsc --noEmit` to confirm nothing broke before moving to the next one.

## 3. Documentation debt — write down the rules that are currently only "known," not written

Two things from the original plan were meant to be durable but were never actually written down anywhere a future contributor (or agent) would see them:
1. Add `frontend/src/app/shared/services/api/README.md`: *this folder is 100% generated by `npm run generate:services` (Orval). Never hand-edit a file in it. If a generated name looks wrong or a service is a grab-bag, the fix belongs in the backend's `@extend_schema`/tag, not here.* This is the actual load-bearing fix from the last plan — the rule needs to survive past the people who currently remember it.
2. Add a short root-level `CONTRIBUTING.md` (or a section in the existing README) stating the promotion rule from §2 explicitly: code starts in the feature that needs it, moves to `shared/` only on a genuine second use. Without this written down, the `shared/` folder will slowly refill with single-feature code again, the same way it did the first time.

## 4. Testing — there is currently zero test coverage anywhere in the app

`find src -iname "*.spec.ts"` returns nothing. This isn't something to fully solve in one pass, but it shouldn't stay at literally zero either. Recommended entry point, in priority order (highest-risk logic first, not highest-coverage-percentage first):
1. `shared/services/auth.service.ts` — the token refresh flow and the `currentUser`/`isAdmin`/`isSuperUser` derivation. This is the single piece of logic where a subtle bug has already happened once (the login-redirect race condition from an earlier review) and would happen silently again.
2. `shared/guards/admin.guard.ts` and `features/client/guards/group.guard.ts` — access control; a guard bug is a security-relevant bug, not just a UX one.
3. `interceptors/{auth,error}.interceptor.ts`.
4. Only after those three: start requiring a spec file for genuinely new business logic (not for every new thin CRUD-wrapper component — that would be low-value, high-friction coverage theater).

## 5. Tooling — add static analysis beyond the TypeScript compiler

Prettier is configured (`.prettierrc`) but there's no ESLint configuration anywhere in the repo — the only current gate is `tsc`. Add `@angular-eslint` + `typescript-eslint` with a baseline ruleset (at minimum: no-unused-vars, consistent Angular lifecycle/DI patterns, the `@angular-eslint/prefer-standalone` rule since this app is fully standalone-components already). Wire `"lint": "ng lint"` into `package.json` and, if there's CI, make it a required check. This is a foundational investment that makes the next round of enhancement work (including the UI plan) safer to execute, since it catches an entire class of mistakes before a human or agent has to notice them by reading code.

## 6. Verification for this whole plan

```sh
npx tsc --noEmit -p tsconfig.app.json   # clean after every service move
ng lint                                  # clean once configured
ng build                                 # real production build, in an environment with a supported Node version
```
Plus the manual excel-export check from §1 — that one can't be caught by any of the above, which is exactly why it needs to be checked by hand.
