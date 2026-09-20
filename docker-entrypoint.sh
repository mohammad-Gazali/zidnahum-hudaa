#!/bin/sh
set -e

# --- SQLite persistence ---
# settings.py resolves the DB to a fixed path (BASE_DIR.parent / "db.sqlite3",
# i.e. /app/db.sqlite3) — it isn't configurable via an environment variable
# without editing the repo. Rather than doing that, this points the fixed path
# at a file inside /app/db-data, which is the directory the compose file
# actually mounts a volume at. Mounting a volume directly at /app/db.sqlite3
# itself would have Docker create a *directory* there instead of a file the
# first time the volume is empty, which breaks SQLite outright — routing
# through a real directory avoids that.
mkdir -p /app/db-data
if [ ! -e /app/db.sqlite3 ]; then
    ln -s /app/db-data/db.sqlite3 /app/db.sqlite3
fi

# --- Only run migrate/collectstatic ahead of the actual server command ---
# (so `docker compose run web python backend/manage.py shell`, etc. still work
# without also migrating/collecting static every time as a side effect).
case "$1" in
    gunicorn)
        python backend/manage.py migrate --no-input
        # Re-run on every start, not just at image build time: when staticfiles/
        # is served from a volume shared with a reverse proxy (see the compose
        # file), a freshly-created empty volume would otherwise hide the files
        # already baked into the image. Safe to repeat — it's idempotent.
        python backend/manage.py collectstatic --no-input
        ;;
esac

exec "$@"
