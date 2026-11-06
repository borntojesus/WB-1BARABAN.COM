# Deploy: 1baraban.com

- **Target:** Netlify, full static (`nuxi generate`, nitro preset `netlify_static`)
- **Team:** `alpina` (CLI: `netlify switch --email borntojesus@gmail.com`, switch back to socialblasterx@gmail.com after)
- **Site:** `1baraban` (site id: `1a0d34e9-863a-4890-bb55-7a264591c4db`, site name `1baraban`, team alpina (Pro), Netlify login borntojesus@gmail.com; domain 1baraban.com attached; the temporary 1baraban-com site in team borntojesus was deleted 2026-11-06)
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
netlify deploy --no-build --dir "$PWD/web/dist" --site <site-id>
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
