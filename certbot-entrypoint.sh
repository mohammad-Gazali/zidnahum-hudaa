#!/bin/sh
# certbot container entrypoint (docker-compose.prod.yml). Obtains a real Let's
# Encrypt certificate on first boot (replacing nginx's self-signed fallback) via
# the HTTP-01 challenge — nginx serves /.well-known/acme-challenge/ on port 80 —
# then renews forever. Certificates live in the named certbot_conf volume shared
# with nginx; no certificate data ever touches the host.
set -e

: "${DOMAIN:?DOMAIN must be set in .env}"
: "${LETSENCRYPT_EMAIL:?LETSENCRYPT_EMAIL must be set in .env}"

if [ ! -f /etc/letsencrypt/.provisioned ]; then
  certbot certonly --webroot -w /var/www/certbot \
    -d "$DOMAIN" \
    --email "$LETSENCRYPT_EMAIL" \
    --agree-tos --no-eff-email --non-interactive \
    --force-renewal
  touch /etc/letsencrypt/.provisioned
fi

while :; do
  sleep 12h
  certbot renew --quiet || true
done