---
title: SEO + GEO Playbook
date: 2026-05-01
type: seo
status: partially-verified
verified_sections:
  [§2 competitor metrics, §4 keyword clusters, §11 SERP intelligence]
---

# SEO + GEO Playbook — 1baraban.com

## 0. Status — Ahrefs data verified 2026-05-01

Ahrefs MCP was re-run from the parent session on 2026-05-01. **Sections 2 (competitor metrics) and 4 (keyword clusters) now contain first-party Ahrefs data for the GB market.** Raw dumps live in `ahrefs-raw/`:

- `ahrefs-raw/site-metrics-competitors_2026-05-01.md` — 7 competitor metrics
- `ahrefs-raw/keyword-overviews_2026-05-01.md` — 54 keywords across 4 verticals
- `ahrefs-raw/serp-overviews_2026-05-01.md` — 5 SERP top-10 analyses

**See §11 at the end** for the strategy-changing findings from this verified data — read that first.

---

## 1. Project Context

| Attribute           | Value                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Brand               | 1baraban (new — zero existing authority)                                                                                                                     |
| Target geos         | EU + global English (UK first, then IE, MT, CY, NL, DE-EN, AU, CA-EN)                                                                                        |
| Primary language    | English (other locales will live behind hreflang)                                                                                                            |
| Verticals           | Online casino, sports betting, poker, slots                                                                                                                  |
| Monetization        | Affiliate (revshare + CPA)                                                                                                                                   |
| YMYL classification | YES — gambling, financial transactions, addiction risk                                                                                                       |
| Stack               | Strapi v5 (CMS) + Nuxt 3 (frontend) + Vercel (hosting)                                                                                                       |
| Goals               | (1) Top-3 Google rankings on commercial gambling clusters within 18-24 months. (2) Cited inline by ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews. |

**Strategic constraint:** A brand-new domain in YMYL gambling cannot rank for head terms ("best online casino", "casino bonus") in 0-12 months regardless of budget. The realistic path is long-tail-first → cluster authority → mid-tail → eventual head-term contention. Plan link velocity and content velocity to match an 18-24 month curve, not a 6-month one.

---

## 2. Competitor SEO Snapshot — VERIFIED via Ahrefs (2026-05-01, GB)

First-party Ahrefs data, GB market, mode=subdomains.

| Domain                | Org Keywords | Top 1-3 Keywords | GB Org Traffic / mo | Org Traffic Value (USD) | Top-3 % |
| --------------------- | -----------: | ---------------: | ------------------: | ----------------------: | ------: |
| **oddschecker.com**   |       23,768 |           10,820 |           1,208,386 |              $4,006,063 |     46% |
| **askgamblers.com**   |        6,124 |            1,541 |              83,098 |                $522,678 |     25% |
| **casino.guru**       |        4,881 |              825 |              53,745 |                $275,974 |     17% |
| **casino.org**        |        4,131 |              643 |              71,936 |                $380,326 |     16% |
| **gambling.com**      |        3,686 |              278 |              44,256 |                $395,184 |      8% |
| **casinomeister.com** |        2,392 |              300 |              39,298 |                $333,397 |     13% |
| **lcb.org**           |          710 |              101 |               3,070 |                 $10,611 |     14% |

**Surprises vs prior estimates:**

- **lcb.org is much smaller in GB than estimated** — 3,070 traffic (not 1.13M global Semrush figure). LCB is US-centric.
- **AskGamblers leads casino category** on top-1-3 ratio (25%) — the strongest authority signal.
- **Casinomeister punches above weight** — $333K traffic value despite niche forum.
- **Oddschecker is the GB sports giant** — 1.2M monthly traffic, 10x next casino-focused site.

### Competitor Read

- **casino.org** is the giant, supercharged after the **CasinoScores → Casino.org redirect (Dec 2025)** that consolidated `/casinoscores/` traffic into the parent domain. Direct beats organic on their stack now (~57% direct vs ~41% organic).
- **casino.guru** is the only site where organic search dominates the mix (>51%). Their moat is the **bonus database** (millions of bonus offers indexed) plus **18,000+ free game pages** plus **the largest active player forum**. This is a programmatic SEO + community combo we cannot replicate quickly.
- **askgamblers.com** is a brand-led property — direct traffic dominates (~45%). Its SEO moat is **complaint resolution** (the player-vs-casino arbitration content) and individual casino review pages.
- **lcb.org** wins on **bonus codes** (one of the oldest active bonus DBs) and **forum threads** that rank for tail queries.
- **gambling.com** is the publicly traded compliance leader — wins state-licensed US markets where stricter Google requirements knock smaller affiliates out. Not a content moat; a **regulatory + brand** moat.
- **oddschecker.com** is the UK sports-odds aggregator. Their pages get cited in newspapers and news — strong link velocity from journalism.
- **casinomeister.com** is a fading authority but still gets cited by older players and forum users — useful for E-E-A-T citation/link targeting.

### Strategic Implication for 1baraban

- We **cannot** out-program casino.guru on bonus DBs in year one. We can **out-edit** lcb and casinomeister with a tighter, cleaner editorial standard and **out-experience** new entrants by publishing first-hand verified review evidence (screenshots, withdrawal proof, customer-service transcripts).
- Easiest entry vectors: long-tail review queries ("[casino name] withdrawal review", "[casino name] complaints", "[casino name] safe?"), regional bonus pages in non-saturated EU markets (NL, IE, MT), and game-provider pages (Pragmatic Play, Evolution, NetEnt by RTP/volatility).

---

## 3. Top-Page Mining — Pattern Extraction

(Page-level URL data not available without Ahrefs/Semrush API — patterns inferred from public site exploration of casino.org, casino.guru, lcb.org.)

### Repeating page archetypes across the top 3 sites

| Archetype                  | URL pattern (typical)                                       | Rendering | Why it ranks                 | We need it?                |
| -------------------------- | ----------------------------------------------------------- | --------- | ---------------------------- | -------------------------- |
| Pillar "best X"            | `/best-online-casinos/`, `/us/casino/best/`                 | SSG/ISR   | Volume + commercial intent   | YES (top priority)         |
| Geo "best X for Y country" | `/uk/best-online-casinos/`, `/us/online-casinos/nj/`        | SSG/ISR   | Geo modifier intent          | YES (UK/IE/MT/NL phase 1)  |
| Single-casino review       | `/reviews/[casino-slug]/`, `/online-casinos/reviews/[slug]` | ISR       | Brand + intent + bonus       | YES (review hub)           |
| Single-casino bonus        | `/bonus/[casino-slug]/`, `/casino-bonuses/[slug]`           | ISR       | Bonus-code transactional     | YES                        |
| Bonus-type pillar          | `/bonus/free-spins/`, `/no-deposit-bonus/`                  | SSG       | High volume, commercial      | YES                        |
| Game category              | `/slots/`, `/live-casino/`, `/poker/`                       | SSG       | Vertical heads               | YES                        |
| Game-provider hub          | `/slots/pragmatic-play/`, `/slots/netent/`                  | SSG       | Provider-modifier traffic    | YES (year 1 cluster)       |
| Individual slot review     | `/slots/starburst/`, `/slots/sweet-bonanza/`                | SSG       | Long-tail volume aggregate   | YES (programmatic, year 2) |
| Comparison                 | `/draftkings-vs-fanduel/`                                   | SSG       | Mid-funnel commercial        | YES                        |
| Guide                      | `/guides/how-to-play-blackjack/`                            | SSG       | Informational top-of-funnel  | YES                        |
| Free games                 | `/free-casino-games/`, `/slots/free/`                       | SSG/CSR   | Casino.guru moat             | NO (year 1 — too thin)     |
| Forum / community          | `/forum/...`                                                | CSR/SSR   | UGC engagement signals       | NO (year 1)                |
| Complaints / dispute       | `/complaints/`, `/casino-blacklist/`                        | SSR       | E-E-A-T trust + traffic      | YES (differentiator)       |
| News / industry            | `/news/...`                                                 | ISR       | Freshness + journalism links | YES (digital PR engine)    |
| Tools                      | odds calculator, RTP calculator, bonus calc                 | SSG       | Linkable assets              | YES (year 1 link bait)     |
| State licensing pages      | `/us/online-gambling/[state]/`                              | SSG       | Regulatory long-tail         | LATER (when US-licensed)   |

### Rule of thumb extracted

The top 3 sites all share four structural patterns:

1. **One pillar per vertical.** `/online-casinos/`, `/sports-betting/`, `/poker/`, `/slots/`. Each pillar links down to dozens of children and up only to home.
2. **Review pages own brand-name traffic.** Every casino name they cover has a dedicated `/reviews/[slug]/` page. This is non-negotiable.
3. **Bonus pages are split from review pages.** `/bonus/[slug]/` is a separate URL from `/reviews/[slug]/`. Different intents, different SERP features (bonus pages target rich result snippets with TermsAndConditions, BetAndPlayCondition).
4. **Geo modifiers use subdirectories, not subdomains.** `/uk/`, `/us/`, `/de/` — never `uk.casino.org`. This concentrates authority on a single host.

---

## 4. Keyword Clusters by Vertical

All volume / KD figures below are `[ESTIMATE — public data]` based on public reports. Replace with Ahrefs data on next pass. Volumes are global EN unless GB-specific.

### 4.1 Online Casino vertical — 5 actionable clusters

#### Cluster A — "Best online casino" (HEAD, transactional/commercial)

**Pillar URL:** `/online-casinos/best/` (and `/uk/online-casinos/best/`, `/us/online-casinos/best/`, etc.)

| Keyword               | Vol (GB est.) | KD est. | Intent     | Notes                         |
| --------------------- | ------------- | ------- | ---------- | ----------------------------- |
| best online casino    | 30-50K        | 80+     | Commercial | Casino.org / Gambling.com own |
| best online casino uk | 15-25K        | 75+     | Commercial | Localised                     |
| best online casinos   | 20-30K        | 75+     | Commercial | Plural variant                |
| top online casinos    | 8-12K         | 70+     | Commercial |                               |
| best casino sites     | 5-10K         | 70+     | Commercial |                               |
| best casinos online   | 3-5K          | 65+     | Commercial |                               |
| online casino reviews | 8-15K         | 65+     | Commercial |                               |

**Ranking realism:** 18-30 months for top-10 with sustained link velocity (10+ DR50+ refdomains/mo) and demonstrable E-E-A-T.

#### Cluster B — "Casino bonus" (HEAD, transactional)

**Pillar URL:** `/casino-bonuses/`

| Keyword              | Vol est. | KD est. | Intent |
| -------------------- | -------- | ------- | ------ |
| casino bonus         | 60-100K  | 75+     | Trans  |
| casino bonus codes   | 20-30K   | 70+     | Trans  |
| casino welcome bonus | 8-12K    | 65+     | Trans  |
| best casino bonuses  | 5-10K    | 65+     | Comm   |
| free casino bonus    | 5-8K     | 60+     | Trans  |

#### Cluster C — "Free spins / no deposit" (HEAD-MID, transactional)

**Pillar URL:** `/casino-bonuses/free-spins/` and `/casino-bonuses/no-deposit/`

| Keyword                  | Vol est. | KD est. | Intent                        |
| ------------------------ | -------- | ------- | ----------------------------- |
| free spins no deposit    | 40-70K   | 70+     | Trans                         |
| no deposit bonus         | 30-50K   | 70+     | Trans                         |
| no deposit casino        | 15-25K   | 65+     | Trans                         |
| free spins               | 80-120K  | 60+     | Mixed (slot game + bonus)     |
| free spins uk            | 8-15K    | 65+     | Trans                         |
| 50 free spins no deposit | 5-10K    | 55+     | Trans (long-tail entry point) |

**Long-tail entry points worth targeting first:** `[number] free spins no deposit`, `[casino name] free spins`, `free spins on registration no deposit no card details uk`.

#### Cluster D — "Live casino" (MID, commercial)

**Pillar URL:** `/live-casino/`

| Keyword            | Vol est. | KD est. | Intent   |
| ------------------ | -------- | ------- | -------- |
| live casino        | 25-40K   | 65+     | Comm     |
| best live casino   | 5-10K    | 60+     | Comm     |
| live dealer casino | 8-15K    | 60+     | Comm     |
| evolution gaming   | 15-25K   | 50+     | Info/Nav |
| live blackjack     | 8-12K    | 55+     | Mixed    |
| live roulette      | 10-18K   | 55+     | Mixed    |

#### Cluster E — "Crypto casino" (MID, growing)

**Pillar URL:** `/crypto-casinos/`

| Keyword               | Vol est. (global)            | KD est. | Intent                       |
| --------------------- | ---------------------------- | ------- | ---------------------------- |
| crypto casino         | ~49.5K (cited industry data) | 60+     | Comm                         |
| bitcoin casino        | 30-50K                       | 65+     | Comm                         |
| best crypto casino    | 8-15K                        | 55+     | Comm                         |
| crypto casino no kyc  | 3-8K                         | 45+     | Trans (high-converting tail) |
| usdt casino           | 2-5K                         | 40+     | Trans                        |
| stake.com alternative | 1-3K                         | 35+     | Comm (entry tail)            |

### 4.2 Sports Betting vertical — 5 actionable clusters

#### Cluster A — "Best sportsbook / betting site" (HEAD)

**Pillar URL:** `/sports-betting/best-sportsbooks/`

| Keyword               | Vol est. | KD  | Intent |
| --------------------- | -------- | --- | ------ |
| best sportsbook       | 20-40K   | 75+ | Comm   |
| best betting sites    | 30-50K   | 75+ | Comm   |
| best betting sites uk | 8-15K    | 70+ | Comm   |
| sports betting sites  | 10-20K   | 70+ | Comm   |

#### Cluster B — Sport-specific odds (MID, oddschecker territory)

**Pillar URL:** `/sports-betting/odds/`

| Keyword                | Vol est. | KD  | Intent                 |
| ---------------------- | -------- | --- | ---------------------- |
| nfl odds               | 60-100K  | 70+ | Info/Comm              |
| premier league odds    | 15-25K   | 60+ | Info/Comm              |
| champions league odds  | 10-20K   | 60+ | Info/Comm              |
| nba odds               | 30-50K   | 65+ | Info/Comm              |
| betting odds explained | 5-10K    | 40+ | Info (great GEO entry) |

#### Cluster C — Betting bonuses & promotions

**Pillar URL:** `/sports-betting/bonuses/`

| Keyword              | Vol est. | KD  | Intent     |
| -------------------- | -------- | --- | ---------- |
| betting offers       | 15-25K   | 70+ | Trans      |
| free bets            | 30-50K   | 70+ | Trans      |
| free bets no deposit | 8-15K    | 65+ | Trans      |
| matched betting      | 8-15K    | 60+ | Info/Trans |
| best free bet offers | 3-8K     | 60+ | Trans      |

#### Cluster D — How-to / informational (low KD, GEO-friendly)

**Pillar URL:** `/sports-betting/guides/`

| Keyword              | Vol est. | KD  | Intent |
| -------------------- | -------- | --- | ------ |
| how to bet on sports | 5-10K    | 35+ | Info   |
| accumulator bet      | 3-8K     | 30+ | Info   |
| asian handicap       | 3-8K     | 30+ | Info   |
| each way bet         | 5-10K    | 35+ | Info   |
| spread betting       | 5-10K    | 40+ | Info   |

#### Cluster E — Event-driven (seasonal traffic spikes)

**Pillar URL:** `/sports-betting/events/`

| Keyword                | Vol est.               | KD  | Intent |
| ---------------------- | ---------------------- | --- | ------ |
| world cup betting      | seasonal 50-200K spike | 60+ | Mixed  |
| grand national betting | seasonal 30-80K spike  | 60+ | Mixed  |
| super bowl betting     | seasonal               | 65+ | Mixed  |
| cheltenham tips        | seasonal UK 30-50K     | 60+ | Comm   |

### 4.3 Poker vertical — 5 actionable clusters

#### Cluster A — Poker rooms / sites

**Pillar URL:** `/poker/best-poker-sites/`

| Keyword            | Vol est. | KD  | Intent   |
| ------------------ | -------- | --- | -------- |
| best poker sites   | 8-15K    | 65+ | Comm     |
| online poker sites | 8-15K    | 60+ | Comm     |
| best online poker  | 5-10K    | 60+ | Comm     |
| pokerstars review  | 3-8K     | 50+ | Comm/Nav |
| ggpoker review     | 2-5K     | 45+ | Comm/Nav |

#### Cluster B — Poker how-to (best long-tail GEO targets)

**Pillar URL:** `/poker/guides/`

| Keyword             | Vol est. | KD  | Intent |
| ------------------- | -------- | --- | ------ |
| how to play poker   | 30-50K   | 50+ | Info   |
| poker rules         | 15-25K   | 50+ | Info   |
| texas holdem rules  | 15-25K   | 45+ | Info   |
| poker hands         | 30-50K   | 50+ | Info   |
| poker hand rankings | 20-30K   | 45+ | Info   |

#### Cluster C — Poker strategy

| Keyword               | Vol est. | KD  | Intent                |
| --------------------- | -------- | --- | --------------------- |
| poker strategy        | 8-15K    | 45+ | Info                  |
| poker odds calculator | 5-10K    | 40+ | Tool (linkable asset) |
| pot odds              | 3-8K     | 35+ | Info                  |
| gto poker             | 3-8K     | 35+ | Info                  |

#### Cluster D — Poker bonuses

| Keyword            | Vol est. | KD  | Intent |
| ------------------ | -------- | --- | ------ |
| poker bonus        | 3-8K     | 50+ | Trans  |
| poker rakeback     | 2-5K     | 45+ | Trans  |
| best poker bonuses | 1-3K     | 50+ | Trans  |

#### Cluster E — Live poker / events

| Keyword                | Vol est. | KD  | Intent   |
| ---------------------- | -------- | --- | -------- |
| wsop                   | 50-100K  | 60+ | Info/Nav |
| ept                    | 5-15K    | 50+ | Info     |
| live poker tournaments | 1-5K     | 40+ | Info     |

### 4.4 Slots vertical — 5 actionable clusters

#### Cluster A — Best slots / online slots

**Pillar URL:** `/slots/best-online-slots/`

| Keyword           | Vol est. | KD  | Intent |
| ----------------- | -------- | --- | ------ |
| online slots      | 80-120K  | 70+ | Comm   |
| best online slots | 15-25K   | 65+ | Comm   |
| best slots        | 8-15K    | 60+ | Comm   |
| slot games        | 30-50K   | 60+ | Mixed  |
| real money slots  | 10-20K   | 65+ | Trans  |

#### Cluster B — Slots by RTP / volatility (GEO gold mine)

**Pillar URL:** `/slots/highest-rtp-slots/`

| Keyword               | Vol est. | KD  | Intent    |
| --------------------- | -------- | --- | --------- |
| highest rtp slots     | 8-15K    | 55+ | Info/Comm |
| best rtp slots        | 3-8K     | 45+ | Info/Comm |
| rtp explained         | 1-3K     | 25+ | Info      |
| volatility slots      | 1-3K     | 30+ | Info      |
| high volatility slots | 2-5K     | 40+ | Comm      |

#### Cluster C — Slot reviews (programmatic — scale via templates)

**Pillar URL:** `/slots/reviews/`

| Keyword          | Vol est. | KD  | Intent   |
| ---------------- | -------- | --- | -------- |
| starburst slot   | 8-15K    | 40+ | Comm/Nav |
| sweet bonanza    | 30-60K   | 50+ | Comm/Nav |
| gates of olympus | 20-40K   | 45+ | Comm/Nav |
| big bass bonanza | 15-30K   | 45+ | Comm/Nav |
| book of dead     | 10-20K   | 45+ | Comm/Nav |

This cluster is where **programmatic SEO** earns its keep. ~5,000-10,000 popular slot titles × `/slots/[slug]/` template = a long-tail traffic engine that can run at low marginal cost (provided each page has unique RTP, volatility, max-win, demo embed, and screenshot — no scraped duplicate content).

#### Cluster D — Slot providers (hub pages)

**Pillar URL:** `/slots/providers/`

| Keyword                | Vol est. | KD  | Intent   |
| ---------------------- | -------- | --- | -------- |
| pragmatic play slots   | 8-15K    | 50+ | Comm/Nav |
| netent slots           | 5-10K    | 50+ | Comm/Nav |
| evolution gaming slots | 3-8K     | 50+ | Comm/Nav |
| play'n go slots        | 2-5K     | 45+ | Comm/Nav |
| nolimit city slots     | 1-3K     | 40+ | Comm/Nav |

#### Cluster E — Slot bonuses / free spins on specific games

| Keyword                  | Vol est. | KD  | Intent |
| ------------------------ | -------- | --- | ------ |
| free spins starburst     | 1-5K     | 50+ | Trans  |
| free spins sweet bonanza | 1-3K     | 45+ | Trans  |
| no wagering free spins   | 2-5K     | 50+ | Trans  |

### 4.5 Cluster prioritisation matrix (where to start)

Score = **(Volume × Conversion_Probability) / KD**. Higher = start here.

| Cluster                                 | Vol                 | KD    | Conv | Start?           |
| --------------------------------------- | ------------------- | ----- | ---- | ---------------- |
| Slot reviews (per-game, programmatic)   | High aggregate      | 40-50 | Mid  | YES — month 1    |
| Slots by RTP / volatility               | Mid                 | 30-55 | Mid  | YES — month 1    |
| Sports-betting how-to / guides          | Mid                 | 30-40 | Low  | YES — GEO entry  |
| Poker how-to / hands / rules            | High                | 45-50 | Low  | YES — GEO entry  |
| Single-casino reviews (long-tail)       | Long-tail aggregate | 30-50 | High | YES — month 1    |
| Crypto casino tail (no-kyc, usdt, etc.) | Mid                 | 35-45 | High | YES — month 2    |
| Bonus codes per casino                  | Long-tail aggregate | 40-50 | High | YES — month 2    |
| Best [vertical] head terms              | Highest             | 70-80 | High | LATER — month 6+ |
| Geo "best X UK / IE / NL"               | Mid-high            | 60-75 | High | LATER — month 4+ |

---

## 5. GEO / LLM Playbook

### 5.1 Why this matters for 1baraban

LLM citation patterns observed in 2025-2026:

- **ChatGPT** — Wikipedia ~48% of cited sources, then news + educational. To get cited, content must read like reference material (definitions, tables, attributions).
- **Perplexity** — Reddit was ~47% of cited sources until the Oct 2025 lawsuit collapsed Reddit citations 86%; YouTube and editorial content rose to fill the gap. Recency matters — Perplexity prefers content < 90 days old.
- **Claude** — Heavier on long-form authoritative editorial; rewards clear structure and explicit source citations within content.
- **Google AI Overviews / SGE** — Pulls disproportionately from existing top-10 organic results, plus structured data. Schema.org Review/AggregateRating/FAQPage all increase citation odds.

### 5.2 Schema.org markup — required by page type

| Page type            | Required schema                                                                                                                   | Optional / enhanced                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Homepage             | `Organization`, `WebSite` (with `SearchAction`)                                                                                   | `BreadcrumbList`                                                       |
| Single casino review | `Review` (itemReviewed = `Organization` with sameAs links to operator), `AggregateRating`, `BreadcrumbList`, `FAQPage`            | `VideoObject` (review walkthrough), `Person` (author with credentials) |
| "Best X" listicle    | `ItemList` with each item as `Review` of an `Organization`, `BreadcrumbList`, `FAQPage`                                           | `HowTo` if "how we ranked them"                                        |
| Bonus page           | `Offer` or `Product` (where item is the bonus), `Review` (of issuing casino), `BreadcrumbList`, `FAQPage`                         | `PriceSpecification` for bonus value                                   |
| Slot review          | `VideoGame` or `Game`, `AggregateRating`, `Review`, `Person` (developer = provider), `Organization` (publisher), `BreadcrumbList` | `Offer` if branded free-spins offer attached                           |
| Guide / how-to       | `Article` or `HowTo`, `Person` (author with `knowsAbout`, `hasCredential`), `BreadcrumbList`, `FAQPage`                           | `VideoObject`, `LearningResource`                                      |
| Sports event page    | `SportsEvent`, `Article`, `BreadcrumbList`                                                                                        | `OddsRating` (custom — use carefully)                                  |
| News page            | `NewsArticle` (note: only legitimate news media should use this), `Person`, `Organization`, `BreadcrumbList`                      |                                                                        |
| Author bio           | `Person` with `jobTitle`, `worksFor`, `knowsAbout`, `hasCredential`, `sameAs` (LinkedIn, X, etc.)                                 |                                                                        |
| About / methodology  | `Article` + `Organization` with `foundingDate`, `numberOfEmployees`, `editorialPolicy` (custom prop or text)                      |                                                                        |
| Contact              | `Organization` + `ContactPoint`                                                                                                   |                                                                        |

**Implementation in Nuxt 3:** use the official `nuxt-schema-org` module via `@nuxtjs/seo` meta-module. It auto-generates the `Organization` + `WebSite` graph, exposes `defineReview()`, `defineProduct()`, `defineFAQPage()`, `defineBreadcrumb()`, `definePerson()` composables, and emits a single combined `@graph` JSON-LD per page. Configure once in `nuxt.config.ts`, override per-page with `useSchemaOrg([...])`.

### 5.3 llms.txt — recommended structure for 1baraban.com

Place at `https://1baraban.com/llms.txt`. Use Markdown with H1 title, blockquote summary, then H2 sections grouping curated links. Keep total file <50KB.

```markdown
# 1baraban — Online Gambling Reviews

> Independent affiliate publisher reviewing online casinos, sportsbooks, poker
> rooms, and slot games. Every review on 1baraban is based on first-hand
> account testing including deposits, gameplay, and withdrawals. We disclose
> affiliate relationships and do not accept payment for ranking position.
> Founded 2026. Editorial team in [country]. Licenses verified against the
> UKGC, MGA, GBGA, and other tier-1 regulators.

## About

- [About 1baraban](https://1baraban.com/about): who we are, ownership, funding model
- [Editorial policy](https://1baraban.com/editorial-policy): how we test, rate, and update reviews
- [Methodology](https://1baraban.com/methodology): the 200-point rubric we score every casino against
- [Affiliate disclosure](https://1baraban.com/affiliate-disclosure): how we make money
- [Contact](https://1baraban.com/contact)

## Online casinos

- [Best online casinos UK](https://1baraban.com/uk/online-casinos/best/)
- [Best crypto casinos](https://1baraban.com/crypto-casinos/)
- [Casino bonuses index](https://1baraban.com/casino-bonuses/)
- [Free spins no deposit](https://1baraban.com/casino-bonuses/free-spins/)
- [Live casino guide](https://1baraban.com/live-casino/)

## Sports betting

- [Best sportsbooks](https://1baraban.com/sports-betting/best-sportsbooks/)
- [Betting odds explained](https://1baraban.com/sports-betting/guides/odds-explained/)
- [Free bets and sign-up offers](https://1baraban.com/sports-betting/bonuses/)

## Poker

- [Best online poker sites](https://1baraban.com/poker/best-poker-sites/)
- [How to play poker](https://1baraban.com/poker/guides/how-to-play/)
- [Poker hand rankings](https://1baraban.com/poker/guides/hand-rankings/)

## Slots

- [Best online slots](https://1baraban.com/slots/best-online-slots/)
- [Highest RTP slots](https://1baraban.com/slots/highest-rtp/)
- [Slot provider directory](https://1baraban.com/slots/providers/)

## Responsible gambling

- [Help & resources](https://1baraban.com/responsible-gambling/)
- [Self-exclusion tools](https://1baraban.com/responsible-gambling/self-exclusion/)

## Optional

- [Glossary](https://1baraban.com/glossary/)
- [Authors](https://1baraban.com/authors/)
```

Also publish a longer `/llms-full.txt` (Markdown export of the canonical content of each page in the curated list above). Several AI vendors prefer this two-file convention.

**Reality check (cited from 2026 industry analyses):** llms.txt has near-zero observable bot adoption to date. Treat it as cheap insurance that costs you ~30 minutes of build time, not a primary GEO signal. The primary GEO levers are still (1) being in the top-10 organic SERP, (2) having clean structured data, and (3) writing in extractable answer-first format.

### 5.4 ai.txt — usage permissions (separate from llms.txt)

Place at `/ai.txt`. Recommended posture for an affiliate review site that **wants** to be cited:

```
# ai.txt v1.1.1 — 1baraban.com
# Specification: https://www.ai-visibility.org.uk/specifications/ai-txt/

User-Agent: *
No-Training: /            # Do not use our content to train base models
Allow-RAG: /              # Allow real-time retrieval if the answer cites us back
No-Inference: /private/   # Do not use private/admin paths even for inference

User-Agent: PerplexityBot
Allow-RAG: /

User-Agent: ChatGPT-User
Allow-RAG: /

User-Agent: ClaudeBot
Allow-RAG: /

User-Agent: GoogleOther
Allow-RAG: /
```

The "block training, allow RAG" posture maximises our chance of being **cited** while not contributing free training data. This is the default editorial-publisher stance in 2026.

### 5.5 "Quotable answer" content patterns LLMs lift verbatim

Across ChatGPT / Claude / Perplexity / AI Overviews, the same patterns get picked up over and over:

1. **Definitional first paragraph (40-60 words).** Lead every review and guide with a one-paragraph plain-English definition of what the page is about. Format: `[Subject] is [definition]. It [primary attribute] and is used to [primary purpose].` Example for a casino review: `Casino X is a UK Gambling Commission-licensed online casino founded in 2018 by Operator Y. It offers 4,200+ slots, 80+ live tables, and a £100 + 50 free spins welcome package. It is best suited to mid-roller slot players who value fast crypto withdrawals.`

2. **TL;DR / "Quick verdict" boxes near the top.** A 3-5-bullet summary above the fold. LLMs frequently lift these wholesale.

3. **Fact tables.** A horizontal "key facts" table (License, Year founded, Welcome bonus, Min deposit, Withdrawal time, Game count, RTP avg, Live games, Mobile app, Crypto). LLMs treat these as canonical structured data. Always pair with `Review` schema so machines and humans both get the same numbers.

4. **Pros / cons lists.** Two-column. Be specific ("Withdrawals processed in under 2 hours via crypto" not "fast withdrawals"). LLMs favour specific claims over vague ones.

5. **FAQ blocks (3-7 questions).** Mark up with `FAQPage` schema. Mirror the **People Also Ask** questions from the SERP. Answer in 40-80 words with the answer in the first sentence.

6. **Comparison tables.** "Casino X vs Casino Y" tables with attributes in rows. These get cited heavily by Perplexity and Gemini.

7. **Methodology callout box.** A 100-word "How we tested this" inset somewhere visible. This is the single highest-impact E-E-A-T signal we can add per page.

8. **Last-updated stamp + author block visible at top.** "Reviewed by [Person] on [Date], last verified [Date]". Critical for both Google freshness signals and LLM trust scoring.

9. **Inline citations to primary sources.** Link out to UKGC license register, MGA register, the operator's own T&Cs, regulator press releases. LLMs are likelier to cite a page that itself cites authoritative sources.

10. **Original data / first-hand evidence.** Withdrawal-speed test logs, live-chat response-time tables with timestamps, deposit screenshot proofs (with PII redacted). This is the single biggest moat against thin-content competitors.

### 5.6 E-E-A-T checklist — non-negotiable for YMYL gambling

| Signal                                      | Where it lives                               | Status check                                                                            |
| ------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| Named author with bio + photo + credentials | Every review and guide                       | Author has `Person` schema with `hasCredential`, `knowsAbout`, `sameAs` social profiles |
| Editor-in-chief / responsible editor named  | About + footer + each article                | Real human, real LinkedIn                                                               |
| Editorial policy page                       | `/editorial-policy/`                         | Covers fact-checking, sourcing, conflict-of-interest disclosure, correction policy      |
| Methodology page                            | `/methodology/`                              | Explains the 200-point rubric, scoring weights, refresh cadence                         |
| Affiliate disclosure                        | Every page footer + `/affiliate-disclosure/` | Plain English, above the fold                                                           |
| Last-updated date                           | Every page top, machine-readable in schema   | Date in ISO `dateModified`                                                              |
| Reviewed-by date                            | Reviews                                      | Separate from "published" date                                                          |
| Licensing verification                      | Every casino review                          | Live link to regulator's public register                                                |
| Responsible gambling block                  | Every gambling page footer                   | Links to GamCare / GambleAware / state equivalents                                      |
| Original photography / screenshots          | Reviews                                      | Watermarked with our domain                                                             |
| Primary-source citations                    | Reviews + news                               | Direct links to regulators, court documents, operator T&Cs                              |
| Corrections log                             | `/corrections/`                              | Public, dated                                                                           |
| Ownership / funding transparency            | About                                        | Who owns 1baraban, how we make money, what we will not do for money                     |
| External validation                         | Linked from authoritative directories        | Listed on `igamingbusiness.com`, `affpapa.com`, regulator-recognised affiliate lists    |

A page missing more than ~3 of these will struggle in YMYL. A page with all of them is **months** ahead of 95% of affiliate competition on the trust dimension alone.

---

## 6. Technical SEO Requirements — Strapi + Nuxt 3 + Vercel

### 6.1 Rendering strategy by page type

Use Nuxt 3 hybrid rendering via `routeRules` in `nuxt.config.ts`.

| Page type                                  | Strategy                | Why                                                             | Nuxt rule                                                         |
| ------------------------------------------ | ----------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| Homepage                                   | SSG                     | Rarely changes                                                  | `'/': { prerender: true }`                                        |
| Vertical pillars (`/online-casinos/best/`) | ISR (5 min)             | Changes weekly when rankings update                             | `'/online-casinos/best/': { isr: 300 }`                           |
| Geo pillars (`/uk/online-casinos/best/`)   | ISR (5-10 min)          | Same                                                            | `'/uk/**': { isr: 600 }`                                          |
| Single casino reviews (`/reviews/[slug]/`) | ISR (60 min)            | Edited periodically; 1000s of pages → SSG would blow build time | `'/reviews/**': { isr: 3600 }`                                    |
| Slot reviews (`/slots/reviews/[slug]/`)    | ISR (1 day)             | 5000+ pages, low edit frequency                                 | `'/slots/reviews/**': { isr: 86400 }`                             |
| Bonus pages (`/bonus/[slug]/`)             | ISR (15 min)            | Bonus terms change without notice; need fast invalidation       | `'/bonus/**': { isr: 900 }`                                       |
| Guides / educational                       | SSG                     | Evergreen                                                       | `'/guides/**': { prerender: true }`                               |
| News (`/news/[slug]/`)                     | ISR (5 min)             | Frequent updates                                                | `'/news/**': { isr: 300 }`                                        |
| Live odds widgets                          | CSR within an SSR shell | Realtime data, can't cache                                      | Component-level `<ClientOnly>`                                    |
| Author / about / methodology               | SSG                     | Rarely changes                                                  | `prerender: true`                                                 |
| Search results                             | SSR (no-index)          | Dynamic, not indexable                                          | `'/search': { ssr: true, headers: { 'X-Robots-Tag': 'noindex' }}` |

**Cache invalidation:** Strapi v5 webhook → Vercel Deploy Hook on content publish, OR Vercel On-Demand Revalidation (`res.revalidate('/reviews/casino-x')`) — the second is preferred to avoid full rebuilds.

**Build-time guardrail:** never SSG-prerender the slot-review or single-casino-review collections at build time once they exceed ~500 entries. ISR + on-demand revalidation only.

### 6.2 Internal linking architecture (hub-and-spoke)

```
Homepage
  ├── Online Casinos pillar
  │     ├── Best online casinos pillar (head term)
  │     ├── Geo pillars (UK, IE, MT, NL)
  │     ├── Type pillars (live, mobile, crypto, fast-payout)
  │     ├── Bonus pillar
  │     │     ├── Free spins pillar
  │     │     ├── No-deposit pillar
  │     │     └── Welcome bonus pillar
  │     └── Casino reviews directory
  │           └── /reviews/[casino]/   <-- spoke
  │
  ├── Sports Betting pillar
  │     ├── Best sportsbooks
  │     ├── Odds hubs (NFL, NBA, EPL...)
  │     ├── Bonuses
  │     └── Guides
  │
  ├── Poker pillar
  │     ├── Best poker sites
  │     ├── Strategy / how-to
  │     └── Reviews
  │
  └── Slots pillar
        ├── Best slots / RTP / volatility
        ├── Provider hubs
        └── Slot reviews directory
              └── /slots/reviews/[slug]/   <-- spoke
```

**Linking rules:**

1. Every spoke links **up** to its immediate hub and to the vertical pillar; never directly to the homepage from spokes.
2. Every hub links **down** to its spokes (limit ~50 down-links per hub; paginate beyond that).
3. **Lateral links** between sibling spokes only via curated "Related" modules — never algorithmic mass cross-linking, which dilutes anchor signal.
4. **Anchor text:** ~60% exact match where natural, ~30% partial match, ~10% branded/generic. Audit with Screaming Frog every 90 days.
5. **No more than 3 clicks from homepage to any commercial spoke.**

### 6.3 URL structure (locked-in conventions)

```
https://1baraban.com/                                   # global EN root
https://1baraban.com/online-casinos/                    # vertical pillar
https://1baraban.com/online-casinos/best/               # head pillar
https://1baraban.com/casino-bonuses/                    # bonus pillar
https://1baraban.com/casino-bonuses/free-spins/         # bonus type
https://1baraban.com/reviews/[casino-slug]/             # casino review
https://1baraban.com/bonus/[casino-slug]/               # casino bonus page (separate URL)
https://1baraban.com/sports-betting/best-sportsbooks/
https://1baraban.com/poker/best-poker-sites/
https://1baraban.com/slots/best-online-slots/
https://1baraban.com/slots/highest-rtp/
https://1baraban.com/slots/providers/[provider-slug]/
https://1baraban.com/slots/reviews/[slot-slug]/
https://1baraban.com/guides/[topic-slug]/
https://1baraban.com/news/[year]/[month]/[slug]/        # NewsArticle pages

# Geo subfolders for non-EN-global localisations:
https://1baraban.com/uk/online-casinos/best/
https://1baraban.com/de/online-casinos/best/
https://1baraban.com/nl/online-casinos/best/
```

**Rules:**

- Lowercase, hyphens, no trailing parameters for indexable pages.
- Trailing slash, consistently present (Vercel + Nuxt config: `trailingSlash: 'always'`).
- No date in casino review URLs (reviews are evergreen). Date only in news.
- Maximum 4 segments deep for indexable pages.
- Filter / sort parameters → `noindex,follow` + parameter ignored in canonical.

### 6.4 Sitemap strategy

- Master index: `/sitemap.xml` linking to per-type sitemaps.
- One sitemap per content type, capped at 25K URLs each:
  - `/sitemap-reviews.xml`
  - `/sitemap-bonuses.xml`
  - `/sitemap-slots.xml` (the largest — split into `/sitemap-slots-1.xml`, `/sitemap-slots-2.xml`...)
  - `/sitemap-guides.xml`
  - `/sitemap-news.xml` (Google News-format, last 48h only)
  - `/sitemap-pillars.xml`
- Use `@nuxtjs/sitemap` (part of `@nuxtjs/seo`). Generates per-locale sitemaps automatically with `i18n` integration.
- `lastmod` populated from Strapi `updatedAt`. Update sitemap on every Strapi publish webhook.
- `<xhtml:link rel="alternate" hreflang="..."/>` blocks inside each URL for multi-locale.
- Reference master sitemap in `robots.txt`.

### 6.5 robots.txt + llms.txt + ai.txt

```
# robots.txt (1baraban.com)
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /search
Disallow: /*?*sort=
Disallow: /*?*filter=
Allow: /

# Block heavy AI scrapers we don't want training on us
# (training control — pair with ai.txt for purpose-based control)
User-agent: GPTBot
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: anthropic-ai
Disallow: /
User-agent: CCBot
Disallow: /

# Allow bots that fetch on-demand for citation
User-agent: PerplexityBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: GoogleOther
Allow: /

Sitemap: https://1baraban.com/sitemap.xml
```

`/llms.txt` and `/ai.txt` — see sections 5.3 and 5.4 above.

### 6.6 Core Web Vitals targets and tactics

Same Google thresholds apply uniformly (no industry-specific carve-out for gambling). Mobile is primary because most gambling search is mobile.

| Metric | Target        | Tactic in Nuxt + Strapi                                                                                                                                                   |
| ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LCP    | < 2.5s mobile | Preload hero image, serve as AVIF via Nuxt Image, host on Vercel CDN, inline critical CSS, no client-side hydration blocking on the LCP element                           |
| INP    | < 200ms       | Defer all third-party scripts (affiliate trackers via `nuxtjs/partytown` or `<script async>`), avoid heavy reactive computations on input handlers, virtualise long lists |
| CLS    | < 0.1         | Set explicit `width`/`height` on every image, reserve space for ads/promotional banners, lock font with `font-display: swap` + preloaded WOFF2                            |
| TTFB   | < 600ms       | Use Vercel Edge runtime for ISR pages where possible, keep Strapi DB on same region as Vercel build                                                                       |

**Affiliate-specific gotcha:** Affiliate tracking pixels and banner ads are the #1 INP/CLS killer on review sites. Lazy-load all affiliate banners below-the-fold and load tracker scripts in a Web Worker via Partytown. Test specifically the "click-out" CTA — if it triggers a 300ms+ INP it directly impacts both ranking and conversion.

---

## 7. Phased Roadmap (18 months)

| Phase                    | Months | Focus                                                                                                                                | Output                                                                 |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| 0 — Foundation           | 0-1    | Stack live, schema in place, methodology + editorial pages, 5 author bios, robots/sitemap/llms.txt/ai.txt                            | Site indexable, E-E-A-T scaffolding live                               |
| 1 — Long-tail launch     | 1-4    | 50 single-casino reviews, 100 slot reviews, 30 evergreen guides                                                                      | First 1,000 indexed pages, first organic clicks                        |
| 2 — Cluster build        | 4-8    | All vertical pillars + geo pillars (UK first), 100 more casino reviews, 200 more slot reviews, 20 comparison pages                   | Topical authority signal in 4 verticals                                |
| 3 — Authority push       | 8-14   | Digital PR campaigns (industry data reports, RG advocacy), HARO/Connectively responses, broken-link reclamation, journalist outreach | DR climb, refdomain growth, first head-term page-2 rankings            |
| 4 — Head-term contention | 14-24  | Pillar refresh cycle, programmatic expansion (slot DB to 5K+ pages), Tier-2 EU geo expansion (DE, NL, IE)                            | Top-10 contention on head terms in primary geo, AI Overviews citations |

---

## 8. Measurement / KPI dashboard

Build a Looker Studio dashboard combining:

- **Google Search Console** — impressions, clicks, CTR, avg position by query AND by page (split branded vs non-branded; the cannibalization audit needs page+query dimensions, not query alone).
- **GA4** — organic landing-page sessions, affiliate-click events, click-out CR by casino.
- **Ahrefs site explorer** — DR, refdomains, organic traffic value, keyword position tracking for ~500 priority terms.
- **CrUX / PageSpeed Insights API** — LCP/INP/CLS at p75 daily, by template type.
- **AI citation tracking** — AI Visibility Index (or equivalent: Profound, Otterly, AI Monitor) tracking how often 1baraban appears in ChatGPT / Perplexity / Gemini / AI Overviews answers for our priority queries. Establish baseline at month 0, weekly snapshot from month 3.

KPI gates by quarter:

- Q1: ≥1K indexed pages, CWV all green on review template
- Q2: ≥10K monthly organic sessions, ≥1 head-term ranking <50, first AI citation observed
- Q3: ≥50K monthly organic, DR>30, ≥10 AI citations/mo
- Q4: ≥150K monthly organic, DR>40, head-term top-20
- Q6: ≥500K monthly organic, DR>50, head-term top-10 in at least one geo

---

## 9. Cannibalization Prevention — Site-Architecture Rules (locked-in)

These are rules to enforce in CMS validation, not afterthoughts:

1. **One owner per primary keyword.** Every primary keyword in the master sheet is mapped to exactly one URL slot in the architecture. Build a Strapi "target_keyword" field on every page and a uniqueness validator at the cluster level.
2. **Title tag uniqueness check at publish time.** Strapi pre-publish hook compares the proposed `<title>` against all existing titles in the same vertical; warns on >70% string similarity.
3. **H1 uniqueness check at publish time.** Same as titles.
4. **Pillar vs spoke role enforced.** Each page has a `cluster_role` enum: `pillar | hub | spoke | guide | review`. Pillars cannot be created without a parent vertical. Spokes cannot exist without a parent hub.
5. **Cross-cluster keyword overlap audit (monthly).** Pull GSC `query × page` for every priority keyword; if two URLs both rank top-20 for the same query and split clicks, raise a ticket. Resolution: consolidate or de-optimise the loser.
6. **Bonus page vs review page separation.** Per casino, the bonus URL and review URL each target their own primary keyword (`[casino] bonus` vs `[casino] review`) and link to each other but never share H1 or `<title>` patterns.

---

## 10. Verification Backlog — Ahrefs MCP calls to run on next pass

Once Ahrefs MCP is connected, run these and replace the `[ESTIMATE — public data]` figures throughout the playbook. Save each output in `/02-SEO/ahrefs-raw/` as one Markdown file per call.

```
# Competitor metrics
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=casino.org           country=gb
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=askgamblers.com      country=gb
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=casino.guru          country=gb
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=lcb.org              country=gb
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=casinomeister.com    country=gb
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=gambling.com         country=gb
mcp__claude_ai_Ahrefs__site-explorer-metrics  target=oddschecker.com      country=gb

# Top pages (top 3 by traffic)
mcp__claude_ai_Ahrefs__site-explorer-top-pages  target=casino.org    limit=20  country=gb
mcp__claude_ai_Ahrefs__site-explorer-top-pages  target=casino.guru   limit=20  country=gb
mcp__claude_ai_Ahrefs__site-explorer-top-pages  target=oddschecker.com limit=20 country=gb

# Organic competitors (find sites we haven't listed)
mcp__claude_ai_Ahrefs__site-explorer-organic-competitors  target=casino.guru  country=gb
mcp__claude_ai_Ahrefs__site-explorer-organic-competitors  target=gambling.com country=gb

# Keyword overviews (per vertical seed)
# Casino seed
mcp__claude_ai_Ahrefs__keywords-explorer-overview  keywords="best online casino,best online casino uk,casino bonus,casino welcome bonus,no deposit bonus,free spins no deposit,live casino,crypto casino,bitcoin casino,online casino reviews,real money slots,best slots"  country=gb

# Sports seed
mcp__claude_ai_Ahrefs__keywords-explorer-overview  keywords="best sportsbook,best betting sites,best betting sites uk,nfl odds,premier league odds,free bets,betting offers,matched betting,how to bet on sports"  country=gb

# Poker seed
mcp__claude_ai_Ahrefs__keywords-explorer-overview  keywords="best poker sites,online poker sites,how to play poker,poker rules,poker hand rankings,texas holdem rules,poker strategy,pokerstars review,ggpoker review"  country=gb

# Slots seed
mcp__claude_ai_Ahrefs__keywords-explorer-overview  keywords="online slots,best online slots,real money slots,highest rtp slots,best rtp slots,slot games,sweet bonanza,gates of olympus,starburst slot,book of dead,big bass bonanza,pragmatic play slots,netent slots"  country=gb

# Matching terms (per pillar — pull 100 each)
mcp__claude_ai_Ahrefs__keywords-explorer-matching-terms  keywords="best online casino"   country=gb  limit=100
mcp__claude_ai_Ahrefs__keywords-explorer-matching-terms  keywords="casino bonus"         country=gb  limit=100
mcp__claude_ai_Ahrefs__keywords-explorer-matching-terms  keywords="free spins no deposit" country=gb limit=100
mcp__claude_ai_Ahrefs__keywords-explorer-matching-terms  keywords="best sportsbook"      country=gb  limit=100
mcp__claude_ai_Ahrefs__keywords-explorer-matching-terms  keywords="online slots"         country=gb  limit=100
mcp__claude_ai_Ahrefs__keywords-explorer-matching-terms  keywords="best poker sites"     country=gb  limit=100

# Related terms (capture semantic siblings)
mcp__claude_ai_Ahrefs__keywords-explorer-related-terms  keywords="best online casino"  country=gb  limit=100

# SERP overviews (decode top-10 per money keyword)
mcp__claude_ai_Ahrefs__serp-overview  keyword="best online casino"        country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="best online casino uk"     country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="casino bonus"              country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="free spins no deposit"     country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="best sportsbook"           country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="online slots"              country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="best poker sites"          country=gb
mcp__claude_ai_Ahrefs__serp-overview  keyword="crypto casino"             country=gb
```

After running, replace every `[ESTIMATE — public data]` cell in this playbook and re-publish status from `draft` → `verified`.

---

## 11. Verified Ahrefs findings — strategy update (2026-05-01)

After re-running Ahrefs MCP from the parent session, three findings change the Q1-Q2 plan. Read these first before executing the original roadmap.

### 11.1 The #1 actionable insight: brand-name reviews are LOW-HANGING FRUIT

| Keyword               | GB Vol |     KD |  TP | SERP top-5 dominated by                                   |
| --------------------- | -----: | -----: | --: | --------------------------------------------------------- |
| **pokerstars review** |    250 | **39** | 600 | Trustpilot, Reddit, Quora, Casinomeister forum (UGC only) |
| **ggpoker review**    |    150 |     50 | 200 | Same UGC pattern                                          |

The PokerStars-review SERP top 5 is **all user-generated content** (Trustpilot reviews, Reddit threads, Quora questions, forum threads). The first real review site (PokerNews, DR 77) only appears at #6. **A new site at DR 30-40 can rank top-10 for brand-name reviews.**

This pattern repeats for every operator brand. **Q1 priority shift:** instead of trying to rank "best online casino" head terms, write **30 detailed brand-name operator reviews** (`/reviews/[operator]/`) — each targets a `[operator] review` keyword at KD 30-50. Aggregate volume across 30 reviews = ~5,000-10,000 GB searches/mo with realistic ranking probability inside Q2.

### 11.2 "no deposit bonus" is a NEWS SERP — KD 20

Surprising finding: KD on "no deposit bonus" (GB) is **20**, not 70-80 as estimated. The reason becomes clear from the SERP analysis: top 10 is dominated by **press releases (GlobeNewswire, Bookies.com, Yahoo Finance)** and **news articles (The Sun)** — most published within the last 24-48 hours.

**Implication:** Google treats "no deposit bonus" as a **freshness query**. Recurring weekly publishing of "this week's no-deposit bonuses" beats long-form pillar content here.

**Action:** add to Q1 a `/news/no-deposit-bonuses-week-[YYYY-WW]/` recurring publishing schedule (1 article/week) + structured `Article` schema with `datePublished` weekly. Combined with the existing pillar at `/casino-bonuses/no-deposit/`, this is a 2-pronged play.

### 11.3 GB market is SMALLER than estimated for many keywords — global EN strategy is correct

Several keywords have lower GB volumes than originally estimated, but **massive global volumes**:

| Keyword            | GB Vol |  Global Vol |          Ratio |
| ------------------ | -----: | ----------: | -------------: |
| sweet bonanza      |  2,400 | **326,000** | 1.4x to global |
| poker hands        | 69,000 |     880,000 |            13x |
| how to play poker  | 10,000 |     101,000 |            10x |
| crypto casino      |  4,700 |     142,000 |            30x |
| best online casino | 12,000 |     165,000 |            14x |
| live casino        |  4,400 |      90,000 |            20x |

**Implication:** the original "EU + global English" decision is validated. **Don't over-index on GB-only.** Build the canonical EN content first, then localise to other Anglo geos (IE, AU, CA, NZ) via hreflang to multiply traffic without rewriting content. Tier-1 ranking in `en-US` for "sweet bonanza" alone could be ~30-50K monthly traffic.

### 11.4 Top-3 ranking ratio is the real authority signal

| Domain            | Top 1-3 / Total Keywords | Authority signal                   |
| ----------------- | -----------------------: | ---------------------------------- |
| oddschecker.com   |                  **46%** | Sports vertical owner              |
| askgamblers.com   |                  **25%** | Casino category leader             |
| casino.guru       |                      17% | Strong but not dominant            |
| casino.org        |                      16% | Older brand, lots of low-rank tail |
| casinomeister.com |                      13% | Old domain authority               |
| lcb.org           |                      14% | (US-focused)                       |
| gambling.com      |                       8% | Wide but shallow                   |

**Implication:** raw keyword count is misleading. AskGamblers has **fewer keywords than casino.org but ranks them better** (25% vs 16% in top-3). For 1baraban: **don't chase keyword breadth — go deep on a smaller set and aim for top-3 on each.** Quality over quantity in the Strapi content schedule.

### 11.5 SERPs are full of throwaway/EMD spam — Google has not cleaned this niche

The "best online casino uk" top-10 contains 4 throwaway domains (`bwacademy.co.uk`, `nogamcasinouk.ink`, `ukonlinecasino.us.com`, `onlinecasinonongam.net`) all leveraging "non-GamStop" SEO. The "best betting sites uk" top-2 are EMD spam (DR 92 with 2 refdomains — clearly bought).

**Implication:** the niche is competitively softer than DR/traffic numbers suggest, but ranking targets need to be tier-1 publication-quality (TalkSport, Racing Post, Sun) not affiliate-only — Google's next algorithmic clean of this niche will reward editorial integrity.

### 11.6 Updated Q1-Q2 priority list (replaces §4.5 ranking)

| Priority | Cluster                                                                                                        | Rationale                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------- | --------------------------------------- |
| **P0**   | 30 brand-name `/reviews/[operator]/` pages                                                                     | KD 30-50, low UGC competition — fastest path to first traffic. **Q1 weeks 5-8** |
| **P0**   | Weekly `/news/no-deposit-bonuses/` cadence                                                                     | KD 20 freshness SERP — recurring content wins. **Q1 wk 6 onwards**              |
| **P1**   | Slot reviews (`sweet bonanza`, `gates of olympus`, `big bass bonanza`, `book of dead`, `starburst slot` first) | KD 67-82, but huge global volume via hreflang multiplier. **Q1 weeks 7-9**      |
| **P1**   | Provider hubs (`/slots/providers/[pragmatic-play                                                               | netent                                                                          | evolution]/`) | KD 69-77, TP 12K, low-competition niche |
| **P2**   | Bonus pillar `/casino-bonuses/no-deposit/` + `/casino-bonuses/free-spins/`                                     | High volume but harder; freshness news pages feed the pillar                    |
| **P2**   | Long-tail "how-to" content (poker rules, hand rankings, RTP explained)                                         | Educational, low CPC but big GEO/AI Overview surface                            |
| **P3**   | Head-term pillars (`/online-casinos/best/`, `/casino-bonuses/`)                                                | Q3+ only — expect 18-24 mo to top-10                                            |
| **NO**   | "casino games" (KD 91), "online poker sites" (KD 89), "crypto casino" (KD 88)                                  | Don't try in year 1                                                             |

### 11.7 SoV reality check — first targets

If 1baraban hits ~$0.5M traffic value (≈ AskGamblers' $522K) inside 24 months, that would be 7th place by GB traffic value among the competitor set — realistic given the brand-review entry strategy. Beating Casinomeister's $333K is the ~12-month target.

---

## Sources

- [casino.org Traffic Analytics — Similarweb (Mar 2026)](https://www.similarweb.com/website/casino.org/)
- [casino.org Website Traffic — Semrush (Jan 2026)](https://www.semrush.com/website/casino.org/overview/)
- [CasinoScores Redirect Boosts Casino.org Traffic — Business of iGaming](https://www.businessofigaming.com/casinoscores-redirect-casino-org-traffic-analysis/)
- [casino.guru Traffic Analytics — Similarweb (Mar 2026)](https://www.similarweb.com/website/casino.guru/)
- [askgamblers.com Traffic Analytics — Similarweb](https://www.similarweb.com/website/askgamblers.com/)
- [oddschecker.com Traffic Analytics — Similarweb (Mar 2026)](https://www.similarweb.com/website/oddschecker.com/)
- [gambling.com Traffic Analytics — Similarweb (Mar 2026)](https://www.similarweb.com/website/gambling.com/)
- [lcb.org Website Traffic — Semrush (Mar 2026)](https://www.semrush.com/website/lcb.org/overview/)
- [casinomeister.com Traffic — Similarweb](https://www.similarweb.com/website/casinomeister.com/)
- [Top 20 Biggest Casino Affiliates 2026 — Business of iGaming](https://www.businessofigaming.com/biggest-casino-affiliates/)
- [Most Valuable & Fastest-Growing Gambling Keywords 2025 — Business of iGaming](https://www.businessofigaming.com/most-valuable-fastest-growing-gambling-keywords/)
- [Casino SEO 2025: The Complete Guide — Serpzilla](https://serpzilla.com/blog/casino-seo/)
- [The Ultimate Guide to Casino SEO — Semrush](https://www.semrush.com/blog/casino-seo/)
- [iGaming SEO in 2026 — AffPapa](https://affpapa.com/igaming-seo-strategies-you-need-a-practical-guide/)
- [Crypto Casino Industry Report 2026 — Surgence](https://surgence.io/blog/crypto-casino)
- [What is llms.txt — Bluehost (2026 guide)](https://www.bluehost.com/blog/what-is-llms-txt/)
- [Implementing AI.txt and LLMs.txt — Cookie Script](https://cookie-script.com/guides/beyond-robots-txt-implementing-ai-txt-and-llms-txt-for-purpose-based-scraping-control/amp)
- [ai.txt Specification v1.1.1](https://www.ai-visibility.org.uk/specifications/ai-txt/)
- [GEO Optimization Guide — Passionfruit](https://www.getpassionfruit.com/blog/generative-engine-optimization-guide-for-chatgpt-perplexity-gemini-claude-copilot)
- [AI Platform Citation Patterns — Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)
- [Schema markup strategies for casino affiliates — White Label Coders](https://whitelabelcoders.com/blog/what-schema-markup-strategies-boost-casino-affiliate-rankings/)
- [Review Snippet Structured Data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Nuxt 3 Hybrid Rendering — Dovletova Aygul](https://dovletovaaygul.com/blog/nuxt-3-hybrid-rendering-seo-guide/)
- [Rendering for SEO in 2026 — Nuxt SEO](https://nuxtseo.com/learn-seo/nuxt/routes-and-rendering/rendering)
- [Nuxt on Vercel — Vercel Docs](https://vercel.com/docs/frameworks/full-stack/nuxt)
- [Strapi 5 i18n Guide — Strapi](https://strapi.io/blog/strapi-5-i18n-complete-guide)
- [Nuxt Sitemap i18n — Nuxt SEO](https://nuxtseo.com/docs/sitemap/guides/i18n)
- [Nuxt Schema.org Module — Nuxt SEO](https://nuxtseo.com/docs/schema-org/getting-started/installation)
- [Core Web Vitals 2026 Guide — corewebvitals.io](https://www.corewebvitals.io/core-web-vitals)
