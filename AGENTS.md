# Zidnahum Hudaa — AGENTS.md

## Project structure

- **`backend/`** — Django 6 + DRF monolith (Python 3.14, SQLite, JWT auth, drf-spectacular)
  - Apps: `accounts`, `adminstration`, `awqaf`, `comings`, `globals`, `money`, `points`, `students`, `reports`, `commands`
  - Entry point: `backend/manage.py` (settings module: `backend.settings`)
  - API: all endpoints under `/api/v1/`; admin endpoints under `/api/v1/admin/`
  - Serves the SPA via a single template view (`backend/templates/index.html`): `path("")` plus a `re_path(r"^(?P<path>.*)/$")` catch-all appended after all `api/v1/...` routes in `backend/backend/urls.py` (`docs/` and the MEDIA handler are DEBUG-only)
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

## Docker

The repo ships with a Docker setup (added in the "initial docker and docker compose setup" commit):

- `Dockerfile` — multi-stage: builder (Python + Node) runs `manage.py build` + `collectstatic`; slim runtime stage runs Gunicorn.
- `docker-compose.prod.yml` — `web` (Gunicorn) behind `nginx` (serves `/static/` and `/media/` directly, proxies the rest) plus a `certbot` sidecar; terminates HTTPS (Let's Encrypt, wait for `DOMAIN` DNS + ports 80/443) and redirects HTTP→HTTPS. Named volumes for SQLite (`/app/db-data`), media, and the certificate lifecycle (`certbot_conf`, `certbot_www` — certs never touch the host). Reads `env_file: .env` — **copy `.env.example` → `.env` (gitignored) and fill in `SECRET_KEY`, `DEBUG`, `ALLOWED_HOST`, `DOMAIN`, `LETSENCRYPT_EMAIL`, `Q_COMING_CATEGORY_ID`**. `web` has a `/` healthcheck that `nginx` gates on (`service_healthy`); `certbot` gates on `nginx`.
- `docker-entrypoint.sh` — symlinks SQLite into the named volume, runs `migrate` + `collectstatic` before serving (only for the `gunicorn` command). This is why Django needs no dotenv loader.
- `nginx-entrypoint.sh` — nginx's entrypoint: seeds a self-signed fallback cert into the shared `certbot_conf` volume so nginx boots before the real cert exists, then reloads nginx every 6h so renewed certs apply.
- `certbot-entrypoint.sh` — certbot's entrypoint: first-boot `certonly --webroot` for `DOMAIN` (replaces the self-signed fallback via `--force-renewal`), then renews forever.
- `nginx.conf` — matches `STATIC_URL` (`static/`), `MEDIA_URL` (`/media/`), and `DOMAIN`; serves `/.well-known/acme-challenge/` on port 80.

Run with `docker compose up --build`.

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

### Custom management commands

Besides `build`, `points`, and `reset-data`

## Lint & format

- Ruff with indent-width 2, double quotes, space indent
- Frontend TS is formatted with prettier (also orval's `formatter`); no ESLint configured
- No pre-commit or CI workflows configured

## Build pipeline

`make build` runs a custom management command (`python manage.py build`) that:
1. Wipes `backend/templates/`, `backend/static/`, `backend/staticfiles/`
2. Builds the single Angular app in `frontend/` with `ng build`
3. Copies `index.html` → `backend/templates/index.html`
4. Copies `dist/frontend/browser/` → `backend/static/`
5. Patches `fonts/fonts.css`/`favicon.ico` → `static/...` in the template and `logo.svg`/`logo-dark.svg` → `static/...` in JS files

After a full build, `collectstatic` is also called. `angular.json` sets `deployUrl: "static/"` so build-time asset references are already prefixed. Django serves the SPA through the template view in `backend/backend/urls.py`: `path("")` plus the `re_path(r"^(?P<path>.*)/$")` catch-all (`api/v1/...` routes are registered first).

## Codegen

The API client is **generated by orval** (v8) from the live drf-spectacular schema.

- Regenerate: `bun run generate:services` in `frontend/` (runs `orval -c orval.config.ts`)
- The backend dev server must be running — `orval.config.ts` fetches the schema from `http://127.0.0.1:8000/docs/schema/`
- Output (`clean: true`, so the target is wiped first):
  - `frontend/src/app/shared/services/api/<tag>.ts` — one flat service file per OpenAPI tag
  - `frontend/src/app/shared/services/api/models/` — component models
- Generated files **are committed**. `frontend/src/app/shared/services/index.ts` is the hand-managed barrel: it re-exports `api/models`, every `api/<tag>`, `api.api-base-url`, and the hand-written services (auth, snackbar, confirmation, translate, memo, test, masjed, report-export, layout). Update it manually after a regenerate.

### Schema contract (`backend/backend/schema_hooks.py`)

Both hooks are registered in `POSTPROCESSING_HOOKS` in `backend/backend/settings.py` (replacing the drf-spectacular defaults — the built-in enum hook is deliberately NOT included).

- `disambiguate_duplicate_schema_names` — renames hyphenated action-serializer components (`Student-details`, `Coming-list`, …) to `Admin`-prefixed names so they don't collide with their camelCase siblings (`StudentDetails`, …) after orval file-name sanitization.
- `set_enum_varnames` — promotes inline enums to components and pins `x-enum-varnames` (drf-spectacular never emits these itself) for the three value-sets the frontend keys on:
  - `(1, 2, 3, 4)` → `MasjedEnum` (`HASANIN`/`SALAM`/`QAZZAZ`/`KHANSAA`) via `StudentMasjedChoice`
  - `(1, 2, 3)` → `StudentLevelEnum` (`ONE`/`TWO`/`THREE`) via `StudentLevelChoice`
  - `(1, …, 8)` → `MessageTypeEnum` (`MEMO`/`TEST`/`ALNAWAWIA`/`ALSAALIHIN`/`ALLAH_NAMES`/`ELITE_TEST`/`VIEWING`/`EXTRA_HADEETH`) via `MessageTypeChoice`

The generated enum models (`masjedEnum.ts`, `studentLevelEnum.ts`, `messageTypeEnum.ts`) are the **canonical enums** — `frontend/src/app/shared/enums/` only keeps `Group` and `MemoItemType`. Pipes/labels/services import them from `api/models` and use SCREAMING_SNAKE member keys (e.g. `MasjedEnum.HASANIN`). Renaming a component means updating the pin table in the hook AND every frontend import of that enum model in the same change.

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
- **DRF required-ness drives generated model optionality.** A model field with a `default` becomes `required=False` in DRF, so drf-spectacular leaves it out of the component `required` array and orval emits it as `?: T`. For an always-present output field, override it in the serializer explicitly — e.g. `message_type = serializers.ChoiceField(choices=MessageTypeChoice.choices, required=True)` — which also preserves the enum `$ref` (a plain `IntegerField(required=True)` would drop the `$ref` and regress to a bare `integer`).
- Enum pipes (`masjed`, `level`, `messageType`) take the canonical enum types directly (`transform(value: MasjedEnum)`); do not widen pipe inputs with `| undefined` — fix the source (serializer `required`) instead.
