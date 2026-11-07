# Deploy: 1baraban.com

- **Target:** Netlify, full static (`nuxi generate`, nitro preset `netlify_static`)
- **Team:** Dmytro Team (slug `dmytro-team`, owner borntojesus@gmail.com). Pass `NETLIFY_AUTH_TOKEN` per command; never `netlify switch`. The old free team is closing, never use it.
- **Site:** project `1baraban` (site id `1a0d34e9-863a-4890-bb55-7a264591c4db`), domain 1baraban.com + www alias
- **Prod URL:** https://1baraban.com (www.1baraban.com as alias)
- **Previous host:** Vercel, project disabled (402 DEPLOYMENT_DISABLED) on 2026-11-06

## Build (local only, never a Netlify or Vercel remote build)

```sh
cd web && pnpm install --frozen-lockfile && pnpm generate   # output: web/dist
```

Expect 49 prerendered routes and `Total errors: 0` from the link checker.
`/go/<slug>` redirects are written into `web/dist/_redirects` by a nitro hook in
`nuxt.config.ts` (UKGC-licensed operators only); they are excluded from prerender
and the link checker.

## Deploy (prebuilt)

```sh
# draft first (free plan: each prod deploy costs ~15 credits)
NETLIFY_AUTH_TOKEN=<token> netlify deploy --no-build --dir "$PWD/web/dist" --site <site-id>
# then prod
netlify deploy --prod --no-build --dir "$PWD/web/dist" --site <site-id>
```

## DNS (Cloudflare zone, not in our accounts, owner sets it)

| Type  | Name | Target                        | Proxy    |
| ----- | ---- | ----------------------------- | -------- |
| CNAME | @    | apex-loadbalancer.netlify.com | DNS only |
| CNAME | www  | 1baraban.netlify.app      | DNS only |

Remove the old Vercel records (A 76.76.21.21 / CNAME cname.vercel-dns.com).

## Verify

`curl -sI https://1baraban.com/` 200, `/sitemap.xml`, `/robots.txt`, and
`<meta name="robots" content="index, follow` on content pages (only `/ask` is noindex).

## Status

2026-11-06: static build verified locally. Netlify site not created: the
logged-in CLI user (borntojesus@gmail.com) only sees team `alpina`. Note: team
`alpina` already holds an old site named `1baraban`.

2026-11-07: finish pass (see docs/PLAN.md). Mock data replaced with sourced facts,
hub/compare/authors/trust pages added. Draft verified; prod publish is a manual
`netlify api restoreSiteDeploy` by Dmytro.

2026-11-07: deploy ef087bc published to prod by Dmytro. Registry NS are
howard/stella (Netlify records). The previous zone's NS (monroe/jay, pointing at
Vercel) were cached by some resolvers with a 48h TTL, so a few ISPs may still
show the old Vercel 404 until about 2026-11-08 21:00 UTC. Check with
`curl --resolve 1baraban.com:443:75.2.60.5 https://1baraban.com/`.
