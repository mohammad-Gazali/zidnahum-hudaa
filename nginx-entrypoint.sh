#!/bin/sh
# nginx container entrypoint (docker-compose.prod.yml). All certificate handling
# lives inside docker: on first boot this seeds a self-signed fallback into the
# shared /etc/letsencrypt volume so nginx can start before certbot has issued the
# real Let's Encrypt certificate (certbot then overwrites these files); after each
# renewal the reload loop below makes nginx pick up the new cert.
set -e

live="/etc/letsencrypt/live/${DOMAIN:?DOMAIN must be set in .env}"

mkdir -p "$live"

if [ ! -s "$live/fullchain.pem" ]; then
  # The official nginx image has no openssl CLI — install it once (needs network).
  command -v openssl >/dev/null 2>&1 || apk add --no-cache openssl >/dev/null
  openssl req -x509 -nodes -newkey rsa:2048 -days 3650 \
    -keyout "$live/privkey.pem" \
    -out "$live/fullchain.pem" \
    -subj "/CN=${DOMAIN}" -addext "subjectAltName=DNS:${DOMAIN}" >/dev/null 2>&1
fi

(
  trap : TERM INT
  while :; do
    sleep 6h
    nginx -s reload 2>/dev/null || true
  done
) &

exec nginx -g "daemon off;"