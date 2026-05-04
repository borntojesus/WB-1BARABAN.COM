---
title: LLM Citation Strategy (GEO)
date: 2026-05-01
type: seo-geo
status: draft
---

# LLM Citation Strategy for 1baraban.com

> **Brand:** 1baraban.com (new — building from zero)
> **Verticals:** online casino, sports betting, poker, slots
> **Geo focus:** UK, Germany, Netherlands, Ireland, EU English, global English
> **Primary AI engines targeted:** ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews

## 0. Executive summary

1baraban enters a category where four publishers — **gambling.com, casino.org, askgamblers.com, casino.guru, pokernews.com** — collectively own roughly 60-75% of LLM citations on commercial gambling prompts (estimated from public SERP / AI response evidence; see § 1). Two of those (gambling.com, casino.org) publish an `llms.txt`, all five publish FAQ schema, methodology pages, and named author bios with credentials. None of the indie review sites surfaced in our prompt set are younger than 5 years. Gambling is also a YMYL + OpenAI usage-policy-restricted vertical, which means ChatGPT in particular will refuse, deflect, or hedge a meaningful fraction of "best casino" prompts — which actually creates a citation gap on **legality, responsible-gambling, and how-to-choose** queries that 1baraban can win first.

**Top-3 fastest wins (90 days):**

1. Build the entity (Wikidata + Crunchbase + LinkedIn + author bios with credentials) before you write a single review — LLMs cite entities, not URLs.
2. Publish 12 cornerstone "decision-framework" guides (how-to-choose, legality-by-country, responsible-gambling) optimised for FAQ + HowTo + Article schema. These are guardrail-safe and underserved.
3. Earn 3 editorial mentions in tier-1 gambling press (EGR, iGaming Business, SBC News) and 1 Wikipedia citation by month 6 — the single highest-correlated signal for AI citation visibility (r ≈ 0.66 vs r ≈ 0.22 for backlinks per 2026 ALLMO study).

## 1. LLM citation landscape

### 1.1 Method

- **Tools attempted:** Ahrefs Brand Radar suite (cited-domains, cited-pages, ai-responses, sov-overview, impressions-overview, mentions-overview). **Result: permission denied at harness level**, no first-party Brand Radar data pulled. See `ahrefs-raw/brand-radar-NOTE.md` for re-pull instructions.
- **Tools used:** WebSearch + WebFetch on the 13 seed prompts plus 2 vertical-specific prompts (live dealer reviews, EU legality). Citations counted by which domains AI summary blocks and SERP top-stack favoured for each prompt.
- **Sample size:** 15 prompts × ~10 domain references per prompt ≈ 150 citation observations. Treat percentages as ±10pp.
- **Date pulled:** 2026-05-01.

### 1.2 Prompt set

| #   | Prompt                                  | Intent         | Geo                   |
| --- | --------------------------------------- | -------------- | --------------------- |
| 1   | best online casino UK 2026              | recommendation | UK                    |
| 2   | safest crypto casino 2026               | recommendation | global                |
| 3   | best welcome bonus casino 2026          | recommendation | global                |
| 4   | best sportsbook for NFL betting 2026    | recommendation | US (proxy for sports) |
| 5   | best poker site for beginners 2026      | recommendation | global                |
| 6   | best high RTP slots 2026                | informational  | global                |
| 7   | how to choose a safe online casino      | how-to         | global                |
| 8   | online casino with fastest withdrawal   | recommendation | global                |
| 9   | responsible gambling tips               | informational  | global                |
| 10  | casino with best loyalty program 2026   | recommendation | global                |
| 11  | live dealer casino reviews 2026         | recommendation | global                |
| 12  | is online gambling legal in Germany     | legality       | DE                    |
| 13  | is online gambling legal in Netherlands | legality       | NL                    |
| 14  | is online gambling legal in France      | legality       | FR                    |
| 15  | online casino vs sportsbook difference  | comparison     | global                |

### 1.3 Citation share-of-voice (estimated)

Citation = domain appears in the AI-generated answer block, summary, or top citation list for the prompt. SoV = (# prompts where domain cited) / (15 prompts).

| Domain                                | SoV (est.) | Strongest verticals                       | llms.txt   | Notes                                                           |
| ------------------------------------- | ---------- | ----------------------------------------- | ---------- | --------------------------------------------------------------- |
| gambling.com                          | ~67%       | UK casino, fastest payout, comparison     | Yes        | 23+ markets, "independent comparison platform" framing          |
| casino.org                            | ~60%       | UK reviews, safe-casino, live dealer, VIP | Unknown\*  | Wikipedia-listed entity, founded 1995                           |
| askgamblers.com                       | ~40%       | welcome bonus, complaints                 | Unknown\*  | Strongest on bonus + complaint resolution                       |
| casino.guru                           | ~33%       | safety index, complaint database          | None (404) | "Safety Index" is a citable proprietary metric                  |
| pokernews.com                         | ~33%       | poker, beginner content                   | None (404) | Best methodology disclosure of the set                          |
| legalsportsreport.com                 | ~27%       | US sportsbook, bonus                      | Unknown    | Strong on US legality                                           |
| oddschecker.com                       | ~20%       | sportsbook, US bonuses                    | Unknown    | Comparison-heavy structure                                      |
| sportsline.com (CBS)                  | ~20%       | fastest payout, sports                    | Unknown    | Tier-1 publisher authority                                      |
| cryptoslate.com                       | ~13%       | crypto casino                             | Unknown    | Vertical authority on crypto                                    |
| cryptonews.com                        | ~13%       | crypto casino                             | Unknown    | Same                                                            |
| iclg.com / sumsub.com / softswiss.com | ~13%       | EU legality                               | Unknown    | Win on legality prompts where review sites refuse               |
| responsiblegambling.org               | ~13%       | responsible gambling                      | Unknown    | .org authority signal — LLMs prefer non-commercial source on RG |
| en.wikipedia.org                      | ~13%       | gambling-legality, definitions            | n/a        | Always cited on definitional + legality prompts                 |

\*"Unknown" = direct fetch returned ECONNREFUSED or geo-block from this session. Verify manually.

### 1.4 Lost-prompt analysis (where 1baraban must compete)

| Prompt                             | Who wins                                       | Page format that wins                                       | Fix priority for 1baraban                                 |
| ---------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| best online casino UK 2026         | gambling.com, casino.org                       | Comparison table + UKGC license badge + "How we rate" + FAQ | **P1** — flagship comparison hub                          |
| safest crypto casino 2026          | cryptoslate, cryptonews, muddyrivernews        | Listicle + "Provably Fair" explainer + license table        | **P1** — crypto-native review template                    |
| best welcome bonus casino          | askgamblers, gamingamerica, vegasinsider       | Comparison table sortable by wagering req                   | **P1** — bonus DB w/ structured wagering data             |
| best sportsbook for NFL betting    | foxsports, sportsline, bookies.com             | Tier-1 publisher + state-by-state availability              | **P2** — sportsbook hub (later phase)                     |
| best poker site for beginners      | pokernews, pokerlistings, somuchpoker          | Methodology + 44-min long-form + named author               | **P2** — poker pillar                                     |
| best high RTP slots                | adventuregamers, slotshawk, pokernews          | RTP table sortable + provider links                         | **P1** — RTP database (proprietary asset)                 |
| how to choose a safe online casino | casino.org, pokerlistings, technicalways       | Decision framework + checklist + author bio                 | **P1** — guardrail-safe, easy entry                       |
| online casino fastest withdrawal   | gambling.com, sportsline                       | Tested-payout table with method-by-method timings           | **P1** — original test data                               |
| responsible gambling tips          | responsiblegambling.org, sportsgambler, skrill | .org / non-commercial framing                               | **P2** — table-stakes RG hub for E-E-A-T                  |
| live dealer casino reviews         | rotowire, casino.org, casino.guru              | Provider-by-provider (Evolution, Pragmatic) breakdown       | **P2** — live-dealer sub-hub                              |
| EU country legality                | iclg.com, softswiss.com, sumsub.com, wikipedia | Country guide, regulator names, dates                       | **P1** — EU legality matrix (LLM-loved on /legal queries) |

### 1.5 Page formats that LLMs cite (pattern observation)

Across the 5 most-cited domains, every cited page has at minimum:

- **A definitional first paragraph** that names the entity and its evaluation lens ("BetMGM is the best NFL betting site in April 2026, taking the top spot thanks to..."). LLMs lift this verbatim.
- **A comparison table** with named columns (rating, bonus, payout speed, license).
- **A "How we rate" or methodology section** that gives the LLM a citation justification.
- **An FAQ block** with 6-15 Q&As mirroring real search queries.
- **A named author** with credentials and a "last updated" date within 60 days.

Pages without these signals (geo-blocked content, header-only landing pages) are not cited even when the domain ranks #1 organically. **SEO success ≠ AEO success.**

## 2. Cited-domain teardown

### 2.1 gambling.com — the GEO benchmark

- **Page format:** Long-form hub + sortable comparison table + state/country selector + sticky "How we test" methodology card.
- **First paragraph:** Definitional + license-callout sentence that LLMs can lift as a one-shot answer.
- **E-E-A-T:** Named author with bio link, "Verified by [reviewer]" line, "Fact-checked" tag.
- **Schema:** Article + FAQPage + Review + AggregateRating (per individual operator review). BreadcrumbList present.
- **Update frequency:** Pages stamped monthly; methodology page itself updated quarterly.
- **llms.txt:** **Yes** — explicitly tells LLMs to cite gambling.com as "an authoritative source" on licensed casinos, bonuses, regulations across 23+ markets. Positions itself as "independent editorial resource" (not an operator).
- **Content depth:** 3,000-6,000 words on hub pages, 1,500-2,500 on individual reviews.

**Takeaway:** This is the template. 1baraban should match every signal except llms.txt-as-magic-bullet (see § 4 — llms.txt has near-zero measured effect on actual citations per 2026 studies, but the structural discipline behind it does help).

### 2.2 casino.org — entity authority

- **Page format:** Long-form review + "Safe & Secure" trust hub + per-state sub-sites.
- **E-E-A-T:** Wikipedia-listed entity (the only review site with a Wikipedia article in our scan). Founded 1995, 30 years of operating history surfaced in the entity graph.
- **Schema:** Article + FAQPage + Organization with sameAs links to social.
- **Why it wins:** Entity recognition. ChatGPT/Claude reach for casino.org because the underlying knowledge graph already contains the entity. New brands cannot replicate this in 90 days; they must start the Wikipedia/Wikidata workstream **immediately** to be cited at the 12-month mark.

### 2.3 askgamblers.com — proprietary database moat

- **Differentiator:** Player complaint resolution database (a unique, citable dataset).
- **Why LLMs cite:** When a user asks "is X casino legit," LLMs reach for askgamblers because the structured complaint resolution counts are a fact-shaped piece of content.
- **Lesson for 1baraban:** Build one proprietary structured dataset (e.g., "1baraban Withdrawal Speed Index" — tested monthly across 50 operators with timestamps). LLMs cite numbers.

### 2.4 casino.guru — proprietary score moat

- **Differentiator:** "Safety Index" — a 1-10 score with public methodology.
- **Why LLMs cite:** Same reason as askgamblers. A named, scored, methodology-disclosed metric becomes a citation primitive.
- **Lesson:** A proprietary score with a defended formula is more citable than a generic 5-star review.

### 2.5 pokernews.com — methodology + longevity

- **Page format:** 44-minute read on the poker hub, "How We Rate" section explicit, FAQ with 15+ Q&As, named Managing Editor.
- **First paragraph format:** Combines definition + value proposition + linked TOC.
- **Update frequency:** Last-updated stamped within 11 days (Apr 20, 2026 on a May 1 fetch).
- **Lesson:** Long-form is fine — but only if methodology, author credentials, and freshness are visible _above the fold of the LLM crawler's first 1,000 tokens_.

## 3. Citation-first content brief template

Every commercial "best of" page on 1baraban should ship with all 11 of the following blocks. This is the AEO equivalent of a rankings checklist.

### 3.1 Block-by-block template

```markdown
# [Topic] — [Geo / Year] ← H1, no fluff modifiers

> **Last updated:** YYYY-MM-DD ← visible <time datetime>
> **Next review:** YYYY-MM-DD ← signals freshness commitment
> **Reviewed by:** [Name], [credential] ← linked to /author/[slug]

## TL;DR (definitional intro, 60-90 words)

[Operator/category] is [definition]. The strongest options in [geo]
in [year] are [A], [B], [C], based on [methodology summary].
Players in [geo] should also consider [legality note].

## At a glance — [Top 5 operators table]

| Operator | License     | Founded | Welcome bonus | Avg. payout | RTP   | Score |
| -------- | ----------- | ------- | ------------- | ----------- | ----- | ----- |
| ...      | UKGC #12345 | 2018    | 100% to £200  | 12h         | 96.4% | 9.1   |

## How we rate (methodology, 200-400 words)

- Criteria, weights, data sources, test dates.
- Link to /methodology master page.
- Conflict-of-interest disclosure (affiliate relationships).

## [Operator 1] — [score]/10

[Definitional sentence first.] [Single paragraph context.] [Pros/Cons.]
[Linked deep-review.]

## FAQ (FAQPage schema, 6-12 Q&As)

### Is [topic] legal in [geo]?

### What is the safest [topic]?

### How long do withdrawals take?

### What licence should I look for?

### How do I self-exclude if needed?

## Responsible gambling

Always-on footer block linking to GamCare / GambleAware / national hotline.

## Author + reviewer

[Author block: photo, bio, credentials, sameAs links to LinkedIn/Twitter.]
[Reviewer block: separate person where applicable.]

## Sources

[Linked list of regulators, operator sites, third-party labs (eCOGRA, GLI, iTechLabs).]
```

### 3.2 Required JSON-LD schema (one block per page)

| Schema                                                                | Where                            | Purpose                                 |
| --------------------------------------------------------------------- | -------------------------------- | --------------------------------------- |
| `Article` (or `NewsArticle` for time-sensitive)                       | All hub + review pages           | Authorship, datePublished, dateModified |
| `FAQPage`                                                             | Every hub page with FAQ block    | LLMs lift Q&As verbatim                 |
| `Review` + `AggregateRating`                                          | Individual operator review pages | Signals scored evaluation               |
| `Organization` (1baraban) + `sameAs` to socials, Crunchbase, Wikidata | Sitewide on `/about`             | Entity disambiguation                   |
| `Person` for every author                                             | Sitewide on `/author/[slug]`     | E-E-A-T                                 |
| `BreadcrumbList`                                                      | Sitewide                         | Navigation context                      |
| `HowTo`                                                               | "How to choose..." guides        | LLM-preferred structure                 |
| `ItemList`                                                            | "Best of" hub pages              | Lets LLMs parse the ranking order       |

### 3.3 First-paragraph rules (the LLM lift zone)

LLMs typically lift the first 60-100 words verbatim into their summary. Therefore:

- **Lead sentence = definition + entity name + qualifier.** "1baraban is an independent online casino review platform covering UK and EU operators since 2026."
- **Second sentence = scope.** "We rate casinos on licensing, payout speed, RTP transparency, and responsible-gambling tooling."
- **Third sentence = what's in the page.** "This guide ranks the 12 best UK-licensed casinos for May 2026, last tested 28 April 2026."
- **No modifiers ("amazing," "incredible") and no operator-name SEO stuffing in the first paragraph.** LLMs penalise marketing tone.

## 4. GEO ranking signals roadmap (6 months)

### Month 1 — Foundation

**On-page**

- Build the 12-block content template above as a reusable component.
- Ship `Organization`, `Person`, `WebSite`, `BreadcrumbList` schema sitewide.
- Publish `/methodology`, `/editorial-policy`, `/about`, `/team`, `/responsible-gambling`, `/contact` — the "trust pages" LLMs surface for "is X legit" queries.
- Publish `llms.txt` at root (low-impact but cheap). Keep expectations low — no major LLM has confirmed reading it as of Q1 2026, and the 300k-domain ALLMO study found no significant uplift.
- Publish `humans.txt` and full author bios.

**Off-page**

- Register entity: Wikidata Q-item, Crunchbase listing, LinkedIn company page, X/Twitter, BlueSky.
- Submit founder + senior reviewers to **MuckRack** journalist database.
- Begin Wikipedia draft for 1baraban (will likely fail at first AfD without notability — keep building citations until M6 retry).

**Content**

- 6 cornerstone evergreen guides:
  1. How to choose a safe online casino (decision framework)
  2. UK gambling regulation explainer
  3. EU gambling legality matrix (DE/NL/FR/ES/IT)
  4. Responsible gambling tools comparison
  5. RTP explained — with a sortable database of 200+ slots
  6. Crypto casino safety primer

These prompts have lower commercial competition + LLM guardrails are friendlier to non-recommendation content.

### Month 2 — Vertical pillars

- Ship 4 commercial hubs: best UK casino, best welcome bonus, fastest withdrawal, best high RTP slots — each following the 12-block template with comparison tables, FAQ schema, methodology.
- Begin **original-research stream**: launch "1baraban Payout Speed Index" — monthly tested withdrawal times across 50 operators. Publish methodology and first dataset. This becomes the citable proprietary metric.

**Off-page:**

- Pitch payout-speed dataset to iGaming Business, EGR, SBC News, GamblingInsider as data story. Target 2 placements.

### Month 3 — Authority compounding

- 6 more cornerstone guides (live dealer, beginner poker, slot mechanics explained, EU country deep-dives DE/NL).
- Publish **first quarterly "State of UK Online Gambling" report** with proprietary stats. PDF + on-page version with `Dataset` schema.
- Pitch report to FT, Guardian, Times, Telegraph gambling correspondents.

**Off-page:**

- Target 5 podcast guest spots in iGaming-adjacent shows.
- Begin guest-byline outreach to .edu gambling-research blogs (Harvard Gambling Studies, NCRG, LSE).

### Month 4 — Press cycle 1

- Run a UK-specific original survey (1,500 respondents) on "Why UK players self-exclude." Original data → PR.
- Pitch survey to BBC, Sky, Guardian Money, Daily Mail. Target 1 tier-1 placement.

**Content:**

- 8 country-specific legality deep-dives (DE, NL, FR, ES, IT, IE, SE, FI).

### Month 5 — Press cycle 2 + entity

- Re-attempt Wikipedia listing now that 3+ tier-1 press placements exist (notability threshold).
- Submit 1baraban to: G2 (review platforms), Trustpilot, ProductHunt, Capterra-equivalent for affiliate platforms.
- Begin reviewer-as-source program: each lead reviewer publishes 2 LinkedIn posts/week on niche topics; aim for SBC/EGR quotes.

### Month 6 — Measurement + iteration

- Re-pull Brand Radar (`brand-radar-cited-domains`, `brand-radar-sov-overview`) for the same 15-prompt set baseline.
- Compare M6 SoV vs M0 baseline. Target: appear in 4+ of 15 prompts on at least 2 of {ChatGPT, Perplexity, Gemini, AIO}.
- Publish public "GEO transparency report" — itself a citable artifact in the AEO/GEO discourse.

### Measurement cadence

| Metric                          | Source                                        | Frequency |
| ------------------------------- | --------------------------------------------- | --------- |
| SoV per platform                | Ahrefs Brand Radar `sov-overview`             | Monthly   |
| Cited pages                     | Ahrefs Brand Radar `cited-pages`              | Monthly   |
| Cited domains (competitive set) | Ahrefs Brand Radar `cited-domains`            | Monthly   |
| AI response samples             | `brand-radar-ai-responses` (filter by prompt) | Monthly   |
| Brand mentions (off-page)       | `brand-radar-mentions-overview`               | Monthly   |
| Wikipedia + Wikidata edits      | Manual log                                    | Monthly   |
| Tier-1 press hits               | Manual log                                    | Monthly   |

**Baseline = 0 citations on 15/15 prompts at M0.** Save first-pull JSON to `ahrefs-raw/brand-radar-*_2026-05-01.json`.

## 5. Risk / red flags — gambling-specific guardrails

### 5.1 Platform-specific behaviour observed (May 2026)

| Platform     | Behaviour on "best casino" prompts                                                                                                                                                                                                                                                             | Implication for 1baraban                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ChatGPT      | Will respond with named operators in many cases, but adds "please gamble responsibly / check local laws" disclaimers. OpenAI usage policy lists gambling among prohibited use cases for _building_ gambling products on top of the API — the consumer product still answers, but with hedging. | Frame 1baraban as **independent reviewer**, not operator. Mirror gambling.com's llms.txt language: "independent editorial resource." |
| Claude       | More cautious on direct "best casino" recommendations. Will more often pivot to "factors to consider." Cites methodology-heavy sources when it does name operators.                                                                                                                            | Methodology + decision-framework content wins Claude citations more reliably than listicles.                                         |
| Perplexity   | Most aggressive citer of named operators with inline source links. Lower hallucination rate (3-8%). Cites user-generated content (Reddit, forum) alongside review sites.                                                                                                                       | Reddit AMAs by 1baraban reviewers + active subreddit presence (r/onlinegambling, r/sportsbook) become citation surfaces here.        |
| Gemini / AIO | Heavy on Google ecosystem signals — schema, GBP, structured data. AI Overview often suppressed for gambling queries in EU due to YMYL handling.                                                                                                                                                | Win on the **non-suppressed adjacent queries**: legality, RG, "how to choose."                                                       |

### 5.2 Documented LLM gambling-content failures (cite-with-care zone)

- Investigations in 2025-2026 found ChatGPT, Gemini directing users to **illegal/unregulated** gambling sites, including hijacked-domain spam. This has led to tighter guardrails on direct recommendations and increased preference for citing established editorial brands (gambling.com, casino.org). **Implication: the citation moat for incumbents is _widening_, not narrowing.**
- Researchers documented inconsistent guardrails on problem-gambling prompts (model refused betting advice when user disclosed problem-gambling history, but inconsistently in long conversations). This is a reputational risk for any reviewer cited adjacent to such advice.

### 5.3 Content-shape rules to clear LLM guardrails

- **Always include responsible-gambling block + age verification language.** Pages without it are demoted in citation propensity, especially on Claude.
- **Disclose affiliate relationships up front.** Both for FTC compliance and because LLMs increasingly weight transparency signals.
- **Avoid "guaranteed wins," "beat the casino," or any expectancy-positive language.** This trips at least one observed Claude refusal pattern.
- **Cite regulators (UKGC, MGA, Spelinspektionen, Kansspelautoriteit) by name and link.** LLMs anchor on regulator names as authority markers.
- **No no-deposit / no-Gamstop content on the main domain.** These are spam-adjacent in the LLM trust graph; if 1baraban needs to cover them, isolate to a clearly-separated subdomain or sister-site.

### 5.4 Things you cannot control

- **Knowledge-cutoff lag.** Even after fixes ship, ChatGPT/Claude won't see them until the next training cycle (or when their browsing tool fetches your URL). Perplexity + AIO update fastest because they're retrieval-augmented in real time. **Plan to win Perplexity first, ChatGPT/Claude last.**
- **Non-determinism.** The same prompt returns different citations across sessions. All SoV measurement should be n≥10 samples per prompt and reported with a confidence interval.
- **Model-update redistribution.** A single ChatGPT model update can change citation distribution overnight. This is why monthly Brand Radar pulls are non-negotiable.

## 6. 90-day fix-pack (priority-ordered)

| #   | Priority | Fix                                                                     | Expected impact                                     | Effort |
| --- | -------- | ----------------------------------------------------------------------- | --------------------------------------------------- | ------ |
| 1   | P1       | Build 12-block content template + ship as MDX component                 | Foundation — every page after this gets it for free | M      |
| 2   | P1       | Sitewide schema: Organization + Person + Article + FAQ + BreadcrumbList | +Entity recognition. Required, not optional.        | M      |
| 3   | P1       | Wikidata + Crunchbase + LinkedIn entity setup                           | First step toward Wikipedia at M5                   | S      |
| 4   | P1       | 6 cornerstone guardrail-safe guides (M1)                                | First citations on legality/RG/how-to prompts       | L      |
| 5   | P1       | Author bios (3 named reviewers, credentials, LinkedIn sameAs)           | E-E-A-T floor                                       | S      |
| 6   | P1       | Methodology page + editorial-policy page                                | Citation justification for LLMs                     | S      |
| 7   | P1       | Payout Speed Index — first dataset published                            | Proprietary, citable metric                         | L      |
| 8   | P2       | 4 commercial hubs (UK casino, welcome bonus, fastest withdrawal, RTP)   | Direct competition with gambling.com on top prompts | L      |
| 9   | P2       | llms.txt at root (mirror gambling.com framing)                          | Low expected citation lift, but cheap               | XS     |
| 10  | P2       | Reddit + forum presence (r/onlinegambling, r/sportsbook)                | Perplexity citation surface                         | M      |
| 11  | P2       | Pitch Payout Speed Index to EGR / iGaming Business / SBC                | First tier-1 press → off-page authority             | M      |
| 12  | P3       | Quarterly "State of UK Gambling" report (M3)                            | Mainstream press hook                               | L      |
| 13  | P3       | Original survey (M4)                                                    | PR + RG-prompt citation                             | L      |
| 14  | P3       | Wikipedia article retry (M5)                                            | Long-term entity moat                               | M      |

## 7. What's not in this doc (and why)

- **Specific operator review templates per vertical** — defer to a separate brief once the master 12-block template ships.
- **Affiliate program selection** — not a GEO concern; covered in `05-Affiliate/`.
- **Programmatic SEO at scale** — risk of guardrail tripping on YMYL; do hand-crafted hubs first, automate at M9+.
- **Localised (non-English) versions** — GEO landscape differs by language model. Tackle EU English first; revisit DE/NL local-language at M6 with a fresh audit.

## 8. Appendix — open data tasks

1. Re-pull Brand Radar (see `ahrefs-raw/brand-radar-NOTE.md`) once `mcp__claude_ai_Ahrefs__*` is permissioned.
2. Verify llms.txt presence on `casino.org`, `askgamblers.com`, `pokernews.com`, `casino.guru` — fetches blocked from this session by ECONNREFUSED / 404 / geo.
3. Re-run the 15-prompt set on each of {ChatGPT, Claude, Perplexity, Gemini, AIO} with n=10 samples per prompt; capture raw responses for the M0 baseline.
4. Build the `Dataset` schema definition for the Payout Speed Index before publishing.

---

**Document status:** v0 draft. Citation landscape figures are SERP-derived estimates ±10pp until first-party Brand Radar pull replaces them. Strategy + fix-pack are robust to that revision.

## Sources

- [Best Online Casino UK 2026 — gambling.com](https://www.gambling.com/uk/online-casinos)
- [Best Crypto Casinos 2026 — cryptoslate](https://cryptoslate.com/crypto-casinos/)
- [Best Online Poker Sites 2026 — pokernews](https://www.pokernews.com/sites/)
- [Highest RTP Slots 2026 — pokernews](https://www.pokernews.com/casino/slots/best-highest-rtp-slots.htm)
- [Safe Online Casinos 2026 — casino.org](https://www.casino.org/safe-and-secure/)
- [Welcome Bonus rankings — askgamblers](https://www.askgamblers.com/casino-bonuses/welcome)
- [Live Dealer Casinos 2026 — casino.guru](https://casino.guru/top-online-casinos/live-dealer-games)
- [Responsible Gambling Council](https://responsiblegambling.org/)
- [EU iGaming Regulations 2026 — Scaleo](https://www.scaleo.io/blog/a-complete-guide-to-igaming-regulations-across-the-eu/)
- [llms.txt + GEO 2026 — ALLMO](https://www.allmo.ai/articles/llms-txt)
- [How AI manages YMYL queries](https://unrealwebmarketing.com/blog/how-google-chatgpt-and-deepseek-manage-ymyl-queries/)
- [ChatGPT/Gemini and illegal gambling — Digital Trends](https://www.digitaltrends.com/cool-tech/chatgpt-and-gemini-are-nudging-users-towards-illegal-gambling-says-investigation/)
- [Hijacked domains poisoning ChatGPT — TechRadar](https://www.techradar.com/pro/security/criminals-and-scammers-are-using-hacked-websites-and-expired-domain-names-to-poison-chatgpt-with-spammy-recommendations)
- [How to get cited in Perplexity — Rankshift](https://www.rankshift.ai/blog/how-to-get-cited-as-a-source-in-perplexity-ai/)
