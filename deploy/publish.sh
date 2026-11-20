#!/usr/bin/env bash
# Deploy entry point.
#   deploy/publish.sh uat   build HEAD and publish to https://uat-1baraban.antonyuk.org (VPN-only, see DEPLOY.md "UAT")
# Production stays on Netlify, see DEPLOY.md.
set -euo pipefail
case "${1:-}" in
  uat) exec "$(dirname "$0")/uat.sh" ;;
  *) echo "usage: deploy/publish.sh uat" >&2; exit 1 ;;
esac
