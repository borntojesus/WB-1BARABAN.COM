#!/bin/sh
# Vendored copy of KT-KIT/KT-SEO-SVC watcher/bin/kt-seo-check.sh @ ba6eedfa (github.com/borntojesus/KT-SEO-SVC); re-copy, do not edit.
# KT-SEO-SVC post-deploy check client (docs/WATCHER.md "On-demand check").
# Usage: kt-seo-check.sh <site> <env> [baseUrl]
#   env: prod | uat (staging = uat). baseUrl overrides the checked URL (deploy previews, uat hosts).
# Token: $SEO_CHECK_TOKEN, else ~/.config/kt-seo-check/token. URL: $SEO_CHECK_URL (default http://192.168.31.229:4852).
# Optional: $SEO_CHECK_SOURCE (publish.sh|gha|ship|manual, default manual), $SEO_CHECK_REF (commit sha).
# Exit: 0 pass, 1 fail. An unreachable checker prints a WARNING and exits 0 (it must not fail a deploy).
# Vendor this file as is; it needs only POSIX sh, curl, grep and sed.
set -u
site=${1:-}
env=${2:-}
base=${3:-}
if [ -z "$site" ] || [ -z "$env" ]; then
  echo "usage: kt-seo-check.sh <site> <env> [baseUrl]" >&2
  exit 2
fi
url=${SEO_CHECK_URL:-http://192.168.31.229:4852}
token=${SEO_CHECK_TOKEN:-}
if [ -z "$token" ] && [ -r "$HOME/.config/kt-seo-check/token" ]; then
  token=$(tr -d ' \r\n' < "$HOME/.config/kt-seo-check/token")
fi
if [ -z "$token" ]; then
  echo "WARNING: kt-seo-check: no token (SEO_CHECK_TOKEN or ~/.config/kt-seo-check/token), check skipped"
  exit 0
fi
source=${SEO_CHECK_SOURCE:-manual}
ref=${SEO_CHECK_REF:-}
if [ -z "$ref" ] && command -v git >/dev/null 2>&1; then
  ref=$(git rev-parse --short HEAD 2>/dev/null || true)
fi
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }
body="{\"site\":\"$(esc "$site")\",\"env\":\"$(esc "$env")\",\"source\":\"$(esc "$source")\""
[ -n "$base" ] && body="$body,\"baseUrl\":\"$(esc "$base")\""
[ -n "$ref" ] && body="$body,\"ref\":\"$(esc "$ref")\""
body="$body}"

tmp=$(mktemp 2>/dev/null || echo "/tmp/kt-seo-check.$$")
code=$(curl -sS -o "$tmp" -w '%{http_code}' --max-time "${SEO_CHECK_TIMEOUT:-1200}" \
  -H "Authorization: Bearer $token" -H 'Content-Type: application/json' \
  -X POST --data "$body" "$url/check" 2>/dev/null)
rc=$?
resp=$(cat "$tmp" 2>/dev/null)
rm -f "$tmp"
if [ "$rc" -ne 0 ] || [ "$code" != "200" ]; then
  echo "WARNING: kt-seo-check: check API unreachable or refused (curl $rc, HTTP $code), deploy not blocked"
  [ -n "$resp" ] && printf '%s\n' "$resp" | head -c 400 && echo
  exit 0
fi
summary=$(printf '%s' "$resp" | sed -n 's/.*"summary":"\(.*\)"}[[:space:]]*$/\1/p')
[ -n "$summary" ] && printf '%b\n' "$summary"
if printf '%s' "$resp" | grep -q '^{"ok":true,'; then
  exit 0
fi
if printf '%s' "$resp" | grep -q '^{"ok":false,'; then
  exit 1
fi
echo "WARNING: kt-seo-check: unexpected answer, deploy not blocked"
printf '%s\n' "$resp" | head -c 400; echo
exit 0
