# syntax=docker/dockerfile:1
#
# Builds the whole repo the same way `make build` does locally:
#   python backend/manage.py build          (internally shells out to `ng build`)
#   python backend/manage.py collectstatic --no-input
# so this Dockerfile is a wrapper around the project's own build command,
# not a second, parallel implementation of it. If `backend/commands/.../build.py`
# ever changes, this Dockerfile does not need to change to match it.
#
# Repo layout is preserved exactly as in local dev: /app/backend and /app/frontend
# as siblings, because Django's settings.py resolves db.sqlite3 / staticfiles / media
# relative to that layout (BASE_DIR.parent).

########################
# Stage 1 — builder
# (needs both Python and Node, because manage.py build calls `ng build` itself)
########################
FROM python:3.14-slim AS builder

# Node, for the `ng build` step build.py shells out to.
# NodeSource's 22.x line always resolves to the latest 22.x patch, which matters here:
# Angular 22's CLI refuses to run on Node < 22.22.3.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# build.py calls `ng build` directly (not a package-manager script), so the
# Angular CLI needs to be resolvable globally, matching what a developer's
# machine has. The frontend itself is managed with bun (bun.lock is the real
# lockfile here — there is no package-lock.json/yarn.lock to fall back to),
# so bun is what actually installs its dependencies, not npm.
RUN npm install -g @angular/cli@22 bun

WORKDIR /app

# --- uv, taken from Astral's own image (no pip anywhere in the build) ---
# `latest` resolves to the newest uv release, mirroring how the NodeSource 22.x
# line above always resolves to the newest 22.x patch.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# --- Backend dependencies (own layer, cached unless pyproject.toml/uv.lock change) ---
COPY pyproject.toml uv.lock ./
RUN uv export --frozen --no-dev --format requirements-txt -o requirements.txt \
    && uv pip install --system -r requirements.txt gunicorn

# --- Frontend dependencies (own layer, cached unless package.json/bun.lock change) ---
COPY frontend/package.json frontend/bun.lock ./frontend/
RUN cd frontend && bun install --frozen-lockfile

# --- Now the actual source ---
COPY backend ./backend
COPY frontend ./frontend

# Place holder for django SECRET_KEY for building process
ENV SECRET_KEY="django-insecure--this-is-a-placeholder-for-building-process-only"

RUN python backend/manage.py build \
    && python backend/manage.py collectstatic --no-input

########################
# Stage 2 — runtime
# (slim, Python-only — the Node toolchain from Stage 1 never ships)
########################
FROM python:3.14-slim AS runtime

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv export --frozen --no-dev --format requirements-txt -o requirements.txt \
    && uv pip install --system -r requirements.txt gunicorn \
    && rm requirements.txt

# Application code + the build output produced in Stage 1
COPY backend ./backend
COPY --from=builder /app/backend/static ./backend/static
COPY --from=builder /app/backend/templates ./backend/templates
COPY --from=builder /app/staticfiles ./staticfiles

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && useradd --create-home --shell /usr/sbin/nologin appuser \
    && mkdir -p /app/media /app/db-data \
    && chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["gunicorn", "backend.wsgi:application", "--chdir", "backend", "--bind", "0.0.0.0:8000", "--workers", "3"]
