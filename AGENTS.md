# Zidnahum Hudaa — AGENTS.md

## Project structure

- **`backend/`** — Django 5.2 + DRF monolith (SQLite, JWT auth, drf-spectacular)
  - Apps: `accounts`, `adminstration`, `awqaf`, `comings`, `globals`, `money`, `points`, `students`, `reports`, `commands`
  - Entry point: `backend/manage.py` (settings module: `backend.settings`)
  - Env config: `backend/backend/env.py` (committed, prod must override)
  - API: all endpoints under `/api/v1/`; admin endpoints under `/api/v1/admin/`
  - Serves the SPA via a single catch-all template view (`backend/templates/index.html`) for all non-API/static/docs paths
- **`frontend/`** — one merged Angular 22 app (public-facing client **and** admin dashboard), package manager: **bun**
  - `src/app/shared/` — shared types/enums/constants/services/pipes/tokens/guards (barrel: `@shared` → `shared/index.ts`)
  - `src/app/features/client/` — public client (routes under `/`, barrel: `@client/*`)
  - `src/app/features/admin/` — admin dashboard (routes under `/admin`, barrel: `@admin/*`)
  - `src/app/common/` — canonical login + not-found
  - `src/app/interceptors/` — auth + error interceptors (wired via `withInterceptors` in `app.config.ts`)
- **`database/backup/`** — SQLite backups

## Setup

```sh
uv sync                     # Python deps (creates .venv)
make migrate                # run migrations
bun install --cwd frontend  # JS deps (single app)
```

The `make` targets call `@python`/`@ng` — activate the venv first (`source .venv/bin/activate`) or prefix `make` commands with the venv binary.

## Commands

| `make` target     | runs                              |
|-------------------|-----------------------------------|
| `make`            | `python backend/manage.py runserver` |
| `make migrate`    | migrations                        |
| `make migrations` | makemigrations                    |
| `make test`       | tests (suppresses RuntimeWarning) |
| `make shell`      | Django shell                      |
| `make build`      | frontend build + collectstatic    |
| `make points`     | export points to `exported_points.xlsx` |
| `make reset-data` | reset DB for new year             |

- Run backend tests: `make test`
- Run a single app's tests: `python -W ignore::RuntimeWarning backend/manage.py test backend/students`
- Serve frontend in dev: `ng serve` in `frontend/` (client at `/`, admin at `/admin`)

## Lint & format

- Ruff with indent-width 2, double quotes, space indent
- No pre-commit or CI workflows configured; no ESLint configured for the frontend

## Build pipeline

`make build` runs a custom management command (`python manage.py build`) that:
1. Wipes `backend/templates/`, `backend/static/`, `backend/staticfiles/`
2. Builds the single Angular app in `frontend/` with `ng build`
3. Copies `index.html` → `backend/templates/index.html`
4. Copies `dist/frontend/browser/` → `backend/static/`
5. Patches `fonts/fonts.css`/`favicon.ico` → `static/...` in the template and `logo.svg`/`logo-dark.svg` → `static/...` in JS files

After a full build, `collectstatic` is also called. `angular.json` sets `deployUrl: "static/"` so build-time asset references are already prefixed. Django serves one SPA fallback (`backend/backend/urls.py`): `re_path(r"^(?!api/|static/|docs/).*", spa_fallback)`.

## Codegen

API service classes are **hand-managed and committed**; `ng-swagger-gen` was removed during the app merge. Do not regenerate them — edit by hand in `frontend/src/app/shared/services/api/`.

## Testing quirks

- Backend tests suppressed `RuntimeWarning` — use the `-W ignore::RuntimeWarning` flag
- Frontend tests use **vitest** (via `ng test` / `@angular/build:unit-test`)
- Angular schematics are set to `skipTests: true` by default

## Conventions

- **Arabic** (`ar`) locale, timezone `Asia/Damascus`
- Angular schematics scaffold without test files by default
- TypeScript in frontend: single quotes (`.editorconfig`), strict mode
- Python: 2-space indent, double quotes (ruff defaults)
- Path aliases: `@shared`, `@admin/*`, `@client/*` (see `frontend/tsconfig.json`)
- Admin navigation links must target `/admin/...` (e.g. `routerLink="/admin/..."`); the admin feature is mounted at `/admin` in `app.routes.ts`