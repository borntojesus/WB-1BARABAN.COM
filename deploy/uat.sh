#!/usr/bin/env bash
# Build the current HEAD and publish it to UAT https://uat-1baraban.antonyuk.org
# (Caddy CT 213, VPN-only, see DEPLOY.md "UAT"). Called by `deploy/publish.sh uat`.
#
# The build is the production build, so UAT shows exactly what Netlify would serve.
# Netlify redirect rules of the build are converted to a Caddy snippet
# (/etc/caddy/uat/1baraban.caddy); Caddy restarts only when that snippet changed,
# after `caddy validate`, and the old snippet is put back if validation fails.
# Needs the LAN or Tailscale (PVE 192.168.31.182). Never touches production.
set -euo pipefail
cd "$(dirname "$0")/.."

SLUG=1baraban
DIST=web/dist
RULES=(web/dist/_redirects netlify.toml)
build() { (cd web && pnpm install --frozen-lockfile && pnpm generate); }

PVE=root@192.168.31.182
WEB=/var/www/uat-$SLUG
SNIP=/etc/caddy/uat/$SLUG.caddy
ct() { ssh -o ConnectTimeout=8 "$PVE" "pct exec 213 -- bash -c '$1'"; }

git diff --quiet HEAD -- || { echo "tracked files differ from HEAD: commit or stash first" >&2; exit 1; }
sha=$(git rev-parse --short HEAD)
echo "building $sha"
build
test -f "$DIST/index.html"
printf '{"commit":"%s","built":"%s"}\n' "$(git rev-parse HEAD)" "$(date -u +%FT%TZ)" > "$DIST/__uat.json"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
node deploy/netlify-to-caddy.mjs "${RULES[@]}" > "$tmp/redirects.caddy"

# Files: unpack next to the live dir, then swap, so removed pages disappear too.
COPYFILE_DISABLE=1 tar -C "$DIST" --no-xattrs -czf - . | ct "rm -rf $WEB.new && mkdir -p $WEB.new && tar -xzf - -C $WEB.new --no-same-owner 2>/dev/null && chmod -R a+rX $WEB.new && rm -rf $WEB.old && { [ ! -d $WEB ] || mv $WEB $WEB.old; } && mv $WEB.new $WEB && rm -rf $WEB.old"

# Redirects: restart Caddy only when they changed.
ct "cat > $SNIP.new" < "$tmp/redirects.caddy"
ct "if cmp -s $SNIP $SNIP.new; then rm $SNIP.new; echo redirects unchanged; else cp $SNIP $SNIP.prev; mv $SNIP.new $SNIP; set -a; . /etc/caddy/cloudflare.env; set +a; if caddy validate --config /etc/caddy/Caddyfile >/tmp/$SLUG-validate.log 2>&1; then systemctl restart caddy && echo caddy restarted; else tail -5 /tmp/$SLUG-validate.log; mv $SNIP.prev $SNIP; echo redirects NOT applied; exit 1; fi; fi"

sleep 2
code=$(curl -s -o /dev/null -w '%{http_code}' "https://uat-$SLUG.antonyuk.org/__uat.json")
echo "published $sha to https://uat-$SLUG.antonyuk.org (/__uat.json: $code, expected 200 over VPN)"
