# Cloudflare Pages migration (prepared 2026-11-21)

Why: Netlify credits ran out on 2026-11-18 and paused the team. Pages free plan has unlimited static requests.
Checklist: `~/github/personal/AAA/cf-pages-migration-checklist.md`. Same build works on Netlify and Pages.

## What changed in the repo

- No `netlify.toml` rules to port: the site has no Netlify Forms, functions, edge functions, plugins or build env vars
  (only `NODE_VERSION=22`, set the same on Pages if it builds there; we deploy prebuilt).
- The `nitro:init` hook in `web/nuxt.config.ts` post-processes `web/dist`:
  - `_redirects`: the preset's `/* /404.html 404` rule is dropped (Pages does not accept a 404 status in
    `_redirects`; a root `404.html` is served with HTTP 404 on both hosts). Left: 5 `/go/<slug>` rules, all with
    an explicit `302` (affiliate links, no splats).
  - `_headers`: the SEO module's `X-Robots-Tag: noindex` on `/_nuxt` is removed (fleet rule: no noindex).
    Cache headers kept as generated.
  - `404.html` / `200.html`: the `noindex, nofollow` meta is removed (404 is just the HTTP code).
- Local checks on `web/dist` (43 prerendered routes, 0 link errors): all 19 sitemap URLs exist as files, canonicals
  all `https://1baraban.com/...`, 0 noindex in meta, `_headers`, `robots.txt`.

## Contact form (not on main)

Main has no form. The branch `feat/contact-form` (not merged) already posts to `https://forms.antonyuk.org/contact`
and its `sitekeys.json` has `1baraban.com`. If it is merged, HL-AGENTGW must list `1baraban.com` in `CONTACT_SITES`
and the Turnstile widget must allow the hostname `1baraban.com`. Form can only be tested on the real domain
(Origin and Turnstile hostname checks fail on `*.pages.dev` by design).

## Morning switch

1. Pages project `1baraban-com` in the CF account that holds the `1baraban.com` zone (one site = one account).
   The zone is not in our accounts per DEPLOY.md: Dmytro logs in as the zone owner.
2. `cd web && pnpm install --frozen-lockfile && pnpm generate`, then
   `wrangler pages deploy web/dist --project-name 1baraban-com --branch=main` (from a pushed commit).
3. Check `https://1baraban-com.pages.dev/` and a few pages, `/go/stake` gives 302, a bad URL gives 404.
4. Custom domains `1baraban.com` and `www.1baraban.com` in Pages; remove the Netlify records
   (`CNAME @ apex-loadbalancer.netlify.com`, `CNAME www 1baraban.netlify.app`) so Pages can attach.
5. Check apex serves with `cf-ray` and no `x-nf-request-id`. Resubmit the sitemap in GSC. CF Web Analytics on.
6. `deploy/post-deploy-check.sh 1baraban.com prod` uses the Netlify flow; update it if it assumes Netlify headers.

Rollback: remove the custom domains in Pages and point apex and `www` back to Netlify. Keep the Netlify site
(`1baraban`, id in DEPLOY.md) for 7 days.
