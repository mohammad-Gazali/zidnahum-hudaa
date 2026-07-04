# Zidnahum Hudaa — AGENTS.md

## Project structure

- **`backend/`** — Django 5.2 + DRF monolith (SQLite, JWT auth, drf-spectacular)
  - Apps: `accounts`, `adminstration`, `awqaf`, `comings`, `globals`, `money`, `points`, `students`, `reports`, `commands`
  - Entry point: `backend/manage.py` (settings module: `backend.settings`)
  - Env config: `backend/backend/env.py` (committed, prod must override)
  - API: all endpoints under `/api/v1/`
- **`frontend/client/`** — Angular 22 app (public-facing), package manager: **bun**
- **`frontend/admin/`** — Angular 22 app (admin dashboard), package manager: **bun**
- **`database/backup/`** — SQLite backups

## Setup

```sh
uv sync                              # Python deps
make migrate                         # run migrations
bun install --cwd frontend/client    # JS deps
bun install --cwd frontend/admin     # JS deps
```

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
- Serve frontend in dev: `ng serve` in either `frontend/client/` or `frontend/admin/`

## Lint & format

- Ruff with indent-width 2, double quotes, space indent
- No pre-commit or CI workflows configured

## Build pipeline

`make build` runs a custom management command (`python manage.py build`) that:
1. Builds admin Angular app with `--base-href /admin`
2. Builds client Angular app
3. Copies index.html → `backend/templates/{admin,client}.html`
4. Copies dist → `backend/static/`
5. Patches asset paths (`assets/` → `static/assets/`)

After a full build, run `collectstatic` is also called.

## Codegen

Both frontend apps use `ng-swagger-gen` to generate API service classes:
```sh
cd frontend/client && bun run generate:services
cd frontend/admin && bun run generate:services
```
Requires Django dev server running (serves schema at `/docs/schema`).

## Testing quirks

- Backend tests suppressed `RuntimeWarning` — use the `-W ignore::RuntimeWarning` flag
- Frontend tests use **vitest** (not Karma despite README saying so)
- Angular schematics are set to `skipTests: true` by default

## Conventions

- **Arabic** (`ar`) locale, timezone `Asia/Damascus`
- Angular schematics scaffold without test files by default
- TypeScript in frontend: single quotes (`.editorconfig`), strict mode
- Python: 2-space indent, double quotes (ruff defaults)
