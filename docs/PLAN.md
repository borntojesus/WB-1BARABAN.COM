# 1baraban.com: finish plan (2026-11-07)

## Where it stood

Nuxt 3 static site (`nuxi generate`, preset `netlify_static`, output `web/dist`), ~35 routes,
moved from a disabled Vercel project to Netlify site `1baraban` on 2026-11-06.

Audit of the MVP build (commit `b8d6146`):

| Area                                    | State before this pass                                                                                                                                                       |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operator data (`web/data/operators.ts`) | Mock. 5 operators with invented Trust Index scores, sub-scores, complaint counts, payout speeds, affiliate URLs and named reviewers ("Anna K.", "Marek S.") who do not exist |
| Methodology                             | Claimed hands-on testing (real deposits, support contacts, withdrawal timing) and a v2.1 to v2.4 changelog that never happened                                               |
| `/ask`                                  | Mock "AI concierge" answering from the mock data, noindex                                                                                                                    |
| Links                                   | `/compare`, `/authors/*`, `/privacy` returned 404; no `/reviews/` hub                                                                                                        |
| Theme                                   | Dark by default with a toggle, large radii                                                                                                                                   |
| Monetisation                            | Affiliate URLs pointed straight at operators with made-up tracking codes                                                                                                     |

## Niche and market (assumption)

- **Language:** English only (all existing copy, `lang="en"`, EUR amounts).
- **Target geo:** Great Britain first, with Ireland and Malta as secondary English-speaking EU readers.
  The wiki (`1baraban-wiki/00-Strategy`, `06-Compliance`) aims at "EU English markets"; the strictest
  English-language regime is GB (UKGC licensing, CAP Code, Gambling Act 2005 s.33), so the whole
  site is built to GB rules. A page that is fine in GB is fine in IE and MT, not the other way round.
- **Niche:** independent, fact-first operator profiles for online casinos and sportsbooks. Facts are
  sourced from regulators' public registers and operators' own terms, each with a source link and a
  check date. No hands-on testing has been done yet, and the site says so.

Consequences of the GB baseline:

1. Only operators licensed by the UK Gambling Commission get an outbound `/go/<slug>` link.
2. Curaçao-licensed crypto casinos (Stake, BC.Game, BitStarz) stay as **editorial profiles only**:
   no outbound commercial link, a visible "not licensed in Great Britain, not available to GB players" notice.
3. 18+ and safer gambling notices on every page (BeGambleAware, GamCare, GAMSTOP; Gambling Care Ireland for IE).
4. Bonus headlines always shown with their significant terms (wagering, min deposit, expiry) and a dated source.
5. No numeric ratings or "best" rankings: we have not tested anything, so a score would be an invented
   review under the DMCC Act 2024 fake-review rules.

## Page types

| Route                                                    | Type              | Notes                                                                                              |
| -------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `/`                                                      | Home              | Explains what the site is, links to hubs, latest checked profiles                                  |
| `/reviews/`                                              | Hub               | Every profile, grouped by licence status (GB-licensed vs offshore)                                 |
| `/reviews/<slug>`                                        | Operator profile  | Sourced fact sheet, verdict in plain words, "what we could not verify" block                       |
| `/compare`                                               | Comparison        | One table built from the data: licence, owner, launch year, payments, bonus terms, GB availability |
| `/online-casinos`, `/sports-betting`, `/poker`, `/slots` | Vertical hubs     | Filtered lists; empty verticals say so honestly                                                    |
| `/authors/` and `/authors/editorial-team`                | Editorial         | One honest editorial-team page, no invented people                                                 |
| `/methodology`                                           | Trust             | What we check, where from, how often; what we do not do yet                                        |
| `/responsible-gambling`                                  | Trust             | Helplines GB + IE, tools, warning signs                                                            |
| `/affiliate-disclosure`                                  | Trust             | How we earn, current status (no paid deals yet), link attributes                                   |
| `/privacy`                                               | Trust             | Static site, no analytics, no cookies beyond local 18+ confirmation                                |
| `/about`                                                 | Trust             | Who runs it, editorial independence, contact                                                       |
| `/ask`                                                   | Static FAQ helper | Labelled "static FAQ, not AI", answers from the data, noindex                                      |
| `/go/<slug>`                                             | Redirect          | Netlify `_redirects` 302, `rel="sponsored nofollow noopener"`, disallowed in robots                |

## Mock vs real after this pass

| Item                                                   | Status                                                                                                                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Licence, regulator, licence holder, owner, launch year | Real, sourced, dated                                                                                                                                     |
| Payment methods, welcome bonus terms                   | Real as published by the operator on the check date, sourced; marked unverified where the page was geo-blocked                                           |
| Ratings, scores, complaint counts, payout timings      | Removed (never measured)                                                                                                                                 |
| Reviewers                                              | Replaced by "1baraban Editorial Team"                                                                                                                    |
| Affiliate tracking                                     | None yet. `/go/<slug>` points to the operator's official GB site. Swap in the tracking URL in `web/data/operators.ts` once a programme approves the site |
| AI chat                                                | None. `/ask` is a static FAQ helper. If it ever becomes real AI it needs Cloudflare Turnstile and rate limiting                                          |
| AdSense                                                | Never on this site (gambling content would endanger the shared publisher account)                                                                        |

## SEO and AEO

- Titles and descriptions per page; canonical slash-less URLs (`pretty_urls = false` on Netlify).
- Schema: `Organization` + `WebSite` sitewide, `BreadcrumbList`, `FAQPage` where a page carries a real FAQ,
  operator `Organization` facts on profiles. No `Review`/`AggregateRating` markup, because there is no tested rating.
- Sitemap from `@nuxtjs/seo`; `/ask` and `/go/*` excluded.
- `robots.txt` unchanged: AI training crawlers blocked, citation fetchers allowed (Dmytro's choice).
- `llms.txt` lists the profiles and the trust pages.

## Next (not in this pass)

- Apply to affiliate programmes for the GB-licensed brands; add tracking URLs.
- Hands-on testing (deposit, withdrawal, support) before any score returns.
- More GB-licensed operators; re-check every fact quarterly (each profile shows its check date).
- A named editor with real credentials, if Dmytro wants a person on the byline.
