---
title: Product Strategy & PRD
date: 2026-05-01
type: strategy
status: draft
owner: Dmytro
---

# 1baraban.com — Founding Product Strategy & PRD

> Author: Alex (Product) for Dmytro (Founder)
> Status: Draft v1.0 — for founder review and revision before any roadmap commitment.
> Confidence levels stated explicitly throughout. Where the answer is "we don't know yet", that is the answer.

---

## 1. Vision

**Vision paragraph.** 1baraban.com is the iGaming review and recommendation platform built for how people actually search in 2026 — through chat, voice, and AI assistants, not just blue links. We combine deep, structured operator data (bonuses, payment rails, RTP, license, payout speed, complaint history) with an AI concierge that answers the real question behind every search ("which casino actually pays out fast in Germany with crypto?") in seconds, in plain English. Where legacy affiliate sites optimize for ranking, we optimize for being the answer. We cover casino, sports betting, poker, and slots under one trusted brand, monetize through honest affiliate partnerships, and treat user trust as the only durable moat in a category that has very little of it.

**One-liner.** _The AI concierge for online gambling — ask a question, get the right operator, skip the SEO theatre._

---

## 2. Target Users

We start with three primary personas. All three share one trait: they have already decided to gamble online — we are not in the "should I gamble?" funnel.

### Persona 1 — "Bonus-Hunter Ben" (casual casino, value-driven)

- **Context:** 28–42, EU-based (DE, NL, FI, IE, UK), plays 2–6 hrs/wk, deposits €50–€200/mo.
- **Goals:** Best welcome bonus with realistic wagering; switch operators every few weeks; never leave value on the table.
- **Pain:** Bonus T&Cs are deliberately confusing. "Up to €1,000" usually means 5x deposit-matched at 40x wagering, which he cannot evaluate at a glance. Existing review sites bury this.
- **Current alternatives:** AskGamblers, Casino.Guru forums, r/onlinegambling, YouTube bonus reviewers.
- **Wants from us:** Side-by-side bonus calculator that surfaces _effective_ value after wagering + chat that answers "best DE-licensed casino bonus right now under 35x wagering."

### Persona 2 — "Sharp Sam" (serious sports bettor)

- **Context:** 30–50, +EV mindset, 4–8 books, bets €500–€5,000/wk.
- **Goals:** Books with best lines, fastest withdrawals, minimal limits/restrictions on winners.
- **Pain:** Most affiliate sites recommend whichever sportsbook pays the most CPA, not which has the best lines or doesn't limit winners. He doesn't trust them.
- **Current alternatives:** OddsPortal, OddsJam, niche forums, X/Twitter capper accounts, direct experience.
- **Wants from us:** Honest, data-backed reviews of bet limits, withdrawal friction, line quality. He'll never click "Top 10 Sportsbooks." He _will_ click a chat answer that says "Pinnacle and Sportmarket don't limit; Bet365 limits at €500 stake on most leagues; here's the data."

### Persona 3 — "Crypto-Curious Chloe" (slots + crypto-native)

- **Context:** 24–35, mobile-first, comfortable with self-custody, plays slots/crash games, deposits in BTC/USDT, distrusts heavy KYC.
- **Goals:** Provably-fair, low-KYC, fast-withdrawal crypto casinos; avoid scams.
- **Pain:** Crypto-casino space is full of obvious scams and SEO spam. Trust signals nearly absent. She has been burned at least once.
- **Current alternatives:** Trustpilot (gamed), Reddit (slow), Twitter/X (noisy), trial and error.
- **Wants from us:** Reputation-first directory with hot/cold-wallet status, withdrawal SLA tracking, license transparency (Curacao vs Anjouan vs none), and chat that filters "BTC + no KYC under €5k + Pragmatic slots" instantly.

**Personas we are NOT building for in year 1:** professional poker grinders (too small, too sophisticated), US users (regulatory complexity), affiliate managers / B2B (different product entirely).

---

## 3. Jobs-To-Be-Done

Top 5 JTBDs. Everything in MVP must trace back to one.

| #   | When I...                                              | I want to...                                                                | So I can...                                    | MVP feature mapping                                                   |
| --- | ------------------------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| 1   | want to start playing at a new casino this weekend     | quickly compare 3–5 trustworthy options for _my_ country and payment method | not waste a deposit at a slow / shady operator | Filtered operator list + AI chat                                      |
| 2   | see a "100% up to €500" bonus                          | understand whether it's worth claiming after wagering and game weighting    | avoid locking up my bankroll on a bad bonus    | Bonus calculator with effective-value scoring                         |
| 3   | deposit at a new sportsbook                            | confirm the book pays winners and doesn't limit sharp action                | trust I can build a bankroll there             | Withdrawal tracker + limit-policy data on review pages                |
| 4   | hear about a new crypto / offshore casino              | verify it's not a scam in <60 seconds                                       | protect my deposit                             | License lookup + complaint feed + community rating, surfaced via chat |
| 5   | want operator-specific information at 11pm on a Sunday | get an instant, accurate, source-cited answer instead of reading 8 articles | actually start playing                         | AI concierge with retrieval over our structured operator DB           |

If a feature does not directly serve one of these five, it does not ship in MVP.

---

## 4. Differentiation (and where we cannot win)

### Where we win

1. **AI-native UX from day one.** Every legacy review site treats AI as a content tool. We treat it as the primary interface. Chat is not a widget — it's the home page experience.
2. **Structured data over prose.** Competitors rank with 4,000-word articles full of filler. We invest in a well-modeled operator database (license, payment rails, withdrawal SLAs, bonus terms parsed into structured fields, complaint feed) so our AI can answer specific questions and our pages surface specific facts.
3. **GEO discipline.** We write content explicitly to be _cited_ by ChatGPT, Perplexity, Google AI Overviews, and Gemini. Sites cited in AI Overviews see 2–5% traffic _uplift_ while uncited review sites are losing 27% on average. This is the entire game now.
4. **Multi-vertical, single trust brand.** Casino.org, Casino.Guru, and Gambling.com are siloed by name or feel cluttered when they expand. 1baraban can house casino, sports, poker, and slots under one consistent brand.
5. **Honest negative reviews.** We will publicly list operators we _don't_ recommend and why. Most affiliate sites can't because every operator is a partner. We will lose some commercial deals; we will gain trust we can compound.

### Where we cannot win (yet, or ever)

- **Raw DR / backlink profile.** Casino.org has DR ~80 and ~6.15M monthly visits (Similarweb, March 2026). Casino.Guru is ranked #221 in casinos globally. We will not out-link-build these sites in 2 years, possibly ever.
- **Brand recognition.** Players type "casino.guru" directly. Nobody types "1baraban.com" yet.
- **Casino.Guru's complaint resolution moat.** A 10-year network effect we can't replicate — and shouldn't try in year one.
- **Generic "best casino 2026" head-term SEO.** Owned, AI-Overview-cannibalised, not worth fighting for. We win long-tail and conversational queries instead.

**Strategic implication:** We do not compete on the legacy SEO axis. We compete on **answer quality in AI surfaces** and **structured-data depth** — a game where 5-year-old DR is much less load-bearing than freshness, schema, and citation-worthiness.

---

## 5. MVP Scope

**MVP target: end of Q1 (~12 weeks from kickoff).** Solo founder + 1–2 contractors.

### In scope (MVP must-have)

1. **Operator database (Strapi v5)** — schema for ~30 launch operators across casino + slots. Fields: license, geos accepted, payment rails, min/max deposit, withdrawal SLA (target & observed), bonus structures (parsed), supported game providers, our editorial score, our verdict.
2. **30 launch reviews** — Dmytro + 1 contractor writer. Structured for AI citation (clear H2s, fact tables, schema.org Review markup).
3. **Comparison & filter UI** — "show me operators that accept DE, support Trustly, withdraw <24h." Core daily-driver feature.
4. **AI Chat concierge (v0.5)** — Vercel AI SDK + AI Gateway, retrieval over our Strapi data only (no open-web). Answers questions, links to 1–3 operator pages with affiliate UTM. Strict guardrails — only recommends operators in our DB; refuses out-of-scope queries.
5. **Bonus calculator** — input deposit, bonus %, wagering, game weighting → output expected value. One feature, one URL, GEO-optimized to be cited.
6. **Affiliate link infrastructure** — server-side click tracking, UTM hygiene, redirect /go/[operator] route, basic conversion postback handling (manual reconciliation in MVP).
7. **Responsible-gambling footer + age gate.** Non-negotiable.
8. **Cookie consent + GDPR basics.**
9. **SEO/GEO foundations** — XML sitemap, llms.txt, robots.txt, structured data on every review (Review, Organization, FAQPage), fast SSG/SSR via Nuxt 3 on Vercel.

### Explicitly OUT of scope for MVP

- User accounts / login
- UGC / forums / comments
- Multi-language (English only at MVP; localization Q3+)
- Sports betting and poker verticals (Q3)
- Tipster picks / community predictions (Q4)
- Mobile native app (web-first, mobile-responsive only)
- Complaint mediation service (Casino.Guru's moat — not worth fighting for now)
- Live chat with humans
- Newsletter beyond a simple Mailchimp/Resend list capture
- Crypto-native onsite payments / token / loyalty program
- Programmatic SEO at scale (Q2+, after we know what converts)

**Explicit non-goal for MVP:** ranking #1 for "best online casino." We chase 200–500 long-tail queries where AI Overview citations and Perplexity surfaces are still winnable.

---

## 6. Roadmap (Now / Next / Later)

### North Star Metric

**Affiliate-attributed FTDs per month** — captures both traffic and whether traffic converts. Vanity metrics ignored; FTDs are the only thing that pays the bills.

### Q1 — MVP Launch (Months 1–3) — NOW

| Initiative                                             | Outcome                                   | Owner                        | Risk     |
| ------------------------------------------------------ | ----------------------------------------- | ---------------------------- | -------- |
| Strapi schema + 30 operator reviews live               | Indexable content + chat retrieval corpus | Dmytro + writer              | Med      |
| Nuxt 3 frontend with comparison + bonus calculator     | Core UX shipped                           | Dmytro + frontend contractor | Low      |
| AI chat v0.5 (Vercel AI SDK + AI Gateway)              | Differentiator live at launch             | Dmytro                       | Med      |
| 5 affiliate program approvals (mid-tier)               | Revenue plumbing live                     | Dmytro                       | **High** |
| GEO content templates + schema.org coverage            | Foundation for AI citation                | Dmytro                       | Low      |
| Public soft-launch on r/onlinegambling, X, ProductHunt | First 1k users                            | Dmytro                       | Low      |

### Q2 — Optimize & Scale Casino (Months 4–6) — NEXT

- AI chat v1.0 — multi-turn, personalization by geo + payment, conversion-tracked.
- Operator DB 30 → 100 reviews.
- Apply to and onboard with 2 affiliate networks (Income Access, NetRefer).
- Negotiate first hybrid deal (CPA + RevShare) with one mid-tier operator.
- Programmatic SEO: 50+ "best casino for [payment method] in [country]" pages, AI-assisted but human-edited.
- First retro: which content + operators actually converted? Kill bottom 30%.

### Q3 — Vertical & Geo Expansion (Months 7–9) — LATER (committed)

- **Sports betting launch** — 30 sportsbook reviews, line-quality + limits data, dedicated chat persona. Hire 1 sports-betting writer.
- **Poker launch** — smaller scope (12–15 reviews), traffic for poker is hard, mostly for SEO completeness.
- **GEO scaling** — German + Spanish localization (highest GGR EU markets we can serve).
- AI chat v2.0 — voice input, mobile-first, integrated with comparison filters.

### Q4 — Community & Differentiation (Months 10–12) — LATER (directional)

- Lightweight UGC: verified-deposit reviews tied to affiliate clickstream — unique data moat.
- Tipster picks for sports — opt-in, performance-tracked, ROI-public. High virality, high moderation cost.
- Comparison tools v2 — "build my casino" wizard.
- First negotiated direct partnerships (skip network markup).

**Re-planning trigger:** if Q1 traffic <5k/month or we cannot get 5 affiliate approvals, Q2 plan compresses and we focus on niche/crypto operators (lower bar) before pursuing tier-1 brands.

---

## 7. Monetization Model

Full deep-dive in `/05-Affiliate/affiliate-economics.md`. Summary of strategic decisions here.

### Commission models

| Model        | Typical range                                                    | Best for                             | Worst for                                             |
| ------------ | ---------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------- |
| **RevShare** | Casino 25–50% NGR (premium 60%+); Sports 25–45%; Poker 15–35%    | Long-term sites with quality traffic | New sites — slow cashflow                             |
| **CPA**      | Casino €100–€400/FTD Tier-1 EU; Sports €150–€400; Poker €65–€200 | New sites needing immediate cashflow | Sites sending high-LTV players (leave money on table) |
| **Hybrid**   | e.g. €65 CPA + 20% RevShare                                      | Sweet spot for established sites     | Requires negotiation leverage                         |

### LTV math (illustrative — to validate by Month 6)

Assumptions for a Tier-1 EU casino player:

- Average NGR per player over 12 months: **€350**
- RevShare at 35%: **€122 per FTD over 12 months**
- CPA flat: **€200 per FTD upfront**
- Click → registration: 1–3%; registration → FTD: 25–40%
- Click → FTD ≈ 0.5–1.2%. At 0.7% and €200 CPA: **EPC ≈ €1.40**. RevShare blended EPC ≈ €0.85 month-one, €1.50+ at 12 months.

### Cookie windows & payment terms (industry norms)

- **Cookie window:** 30–60 days standard. Some premium 90 days. Lifetime cookies rare.
- **Payment terms:** Net-30 standard for established affiliates; Net-60 for new accounts at major operators. Hold periods cover refunds/chargebacks.
- **Minimum payout:** €50–€100 typical. Some demand €500.

### Networks to prioritize (application order)

1. **Income Access (Paysafe)** — Betsson, PartyCasino, Genesis Global. ~10.5% market share.
2. **NetRefer** — old-school big brands. ~7.8%.
3. **MyAffiliates** — most-used iGaming software at ~16%.
4. **Direct programs** — LeoVegas, Mr Green, Bitstarz, BC.Game, Stake (where geo-permitted).
5. **Easier-bar networks for Q1** — Royal Partners, N1 Partners, BigBetty, 888STARZ Partners.

### Recommendation: CPA-first, transition to Hybrid by Q3, RevShare-heavy by year 2

A new site has near-zero cashflow tolerance. RevShare compounds beautifully but takes 6–12 months to feel like real money. CPA pays this month and funds Q2. The trap: pure CPA misaligns incentives — we'd send any player just to clear FTDs, destroying long-term relationships. Therefore:

- **Q1–Q2:** CPA on 80% of deals.
- **Q3:** Negotiate hybrid (CPA + 15–20% RevShare) on top-converting partners.
- **Year 2:** 70%+ revenue from RevShare/Hybrid where we have proven traffic and leverage.

Confidence: ~75%. Judgment call, not data — revalidate after 90 days of conversion data.

---

## 8. OKRs — First 12 Months

### Objective 1 — Become a credible, indexed iGaming destination in EU English markets.

- **KR1.1** Publish 100 high-quality operator reviews (30 by EOQ1, 100 by EOQ2). Each with schema.org, fact table, internal QA.
- **KR1.2** 50,000 monthly organic + AI-referral sessions by EOQ4.
- **KR1.3** Cited by AI Overviews / Perplexity / ChatGPT browse on ≥25 distinct queries (tracked monthly).

### Objective 2 — Validate affiliate revenue model and reach cashflow-positive operations.

- **KR2.1** 15 active affiliate partnerships across 3+ networks by EOQ2.
- **KR2.2** 500 cumulative FTDs by EOQ4.
- **KR2.3** €15,000 monthly affiliate revenue (run-rate) by EOQ4 — covers founder living costs + contractor budget; ramen-profitable.

### Objective 3 — Prove AI-native UX is a real differentiator (not a gimmick).

- **KR3.1** AI chat sessions ≥30% of site sessions by EOQ4.
- **KR3.2** Chat-attributed FTDs ≥20% of total affiliate FTDs by EOQ4.
- **KR3.3** Chat session NPS / thumbs-up rate ≥75%, structured logging of every exchange.

**Confidence on hitting all 9 KRs: ~40%.** KR2.3 is riskiest — €15k/month in 12 months is achievable but assumes affiliate approvals don't bottleneck Q1. KR3.2 is also aggressive; nobody has industry data on chat-attributed FTD rates because no competitor has shipped this seriously.

---

## 9. Key Risks & Mitigations

| #   | Risk                                                                                                 | Likelihood          | Impact | Mitigation                                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------- | ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | AI search cannibalises review-site traffic — affiliate sites lose 27% organic on AI-Overview queries | High                | High   | GEO-first content; target being _cited by_ AI; chat as primary UX so we benefit from the shift                                |
| 2   | Affiliate program rejection of low-DR new sites                                                      | High                | High   | Mid-tier networks first (Royal, N1, BigBetty); warm intros; start with crypto operators; direct outreach playbook             |
| 3   | Google core update penalises AI-assisted content                                                     | Med                 | High   | Human editor on every page; first-party data and original tables; original screenshots; founder byline / E-E-A-T              |
| 4   | EU regulation tightens on affiliate marketing (DE GlüStV, NL KOA already restrictive)                | Med                 | High   | Geo-fence per market; only promote licensed operators in regulated markets; legal review per new geo                          |
| 5   | Operator non-payment / chargeback fraud                                                              | Med                 | Med    | Diversify across 5+ programs; Net-30 only after Q2; track everything server-side; never >30% revenue from one operator        |
| 6   | Crypto/offshore operator scams reflect on our brand                                                  | Med                 | High   | Strict editorial criteria for crypto; complaint feed monitoring; willingness to publicly de-list                              |
| 7   | AI hallucination in chat recommends a bad operator                                                   | High                | Med    | Strict retrieval — chat _cannot_ recommend operators outside our vetted DB; every answer cites source; weekly chat-log review |
| 8   | Solo-founder burnout                                                                                 | Med                 | High   | Aggressive use of contractors; weekly written prioritization; protected weekly review; ruthless "no" to non-roadmap work      |
| 9   | Bonus T&Cs change faster than we update — outdated bonus info destroys trust                         | High                | Med    | Automated change-detection on T&C pages; weekly editorial sweep; "last verified" timestamp on every review                    |
| 10  | Lack of brand trust delays first-page rankings                                                       | High                | Med    | PR, podcast appearances, gambling-news outlet links; founder personal brand; transparent "about" + methodology page           |
| 11  | Vercel / Strapi / AI Gateway cost overruns at scale                                                  | Low                 | Med    | Aggressive caching of AI responses; static generation everywhere possible; build alerts; CLAUDE.md local-build rules enforced |
| 12  | Paid acquisition is closed (most ad networks ban gambling affiliate creatives)                       | High (already true) | High   | We are organic + AI-search + community-only by design. Plan accepts this; no paid acquisition assumed in OKRs                 |

---

## 10. Resourcing

### Year 1 lean-team plan

| Role                                       | Type                 | Allocation               | When  | Cost (EU rates)               |
| ------------------------------------------ | -------------------- | ------------------------ | ----- | ----------------------------- |
| Founder / PM / SEO / BD                    | Dmytro (FT)          | 100%                     | Now   | —                             |
| Senior content writer (iGaming experience) | Contractor           | 20–30 hrs/wk             | Q1    | €2.5–4k/mo                    |
| Frontend Nuxt/Vue developer                | Contractor           | 40–60 hrs/mo, decreasing | Q1–Q2 | €3–5k/mo Q1, €1.5k/mo from Q2 |
| Designer / UX                              | Contractor (one-off) | Project-based            | Q1    | €2–4k one-off                 |
| Sports betting writer                      | Contractor           | 15–20 hrs/wk             | Q3    | €1.5–2.5k/mo                  |
| Translator (DE, ES)                        | Contractor           | Project-based            | Q3    | ~€2k/language                 |
| Affiliate manager / outreach               | Eventually FT        | 25% in Q4                | Q4    | Founder-handled until then    |

**Tooling stack budget (monthly).**

- Vercel Pro: ~€20 base + usage; build minutes controlled per CLAUDE.md.
- Strapi self-hosted (Vercel/Railway): ~€20–€50/mo.
- Neon Postgres: free tier scaling to ~€20/mo.
- AI Gateway / model spend: €100–€300/mo Q1, scaling with chat usage.
- SEO tools (Ahrefs lite or SE Ranking): €100/mo.
- Email (Resend): free tier.
- Domain + Cloudflare: nominal.

**Total cash burn estimate Q1: €5–8k/mo** (mostly contractors). Founder unpaid or symbolic until KR2.3 hits.

**Skills the team must collectively cover:**

- iGaming domain expertise (Dmytro core + writers)
- SEO + GEO + technical SEO (Dmytro + consultant if needed)
- Content production at quality + scale (writers + AI-assisted with editorial review)
- Nuxt/Vue + Strapi development (contractor)
- AI engineering (RAG, prompting, evals) — Dmytro to upskill, hire as needed
- Affiliate program negotiation and account management (Dmytro)
- Compliance / responsible gambling literacy (Dmytro + part-time legal review pre-launch)

**Skills we will deliberately not hire for in year 1:** dedicated designer (templates + contractor), DevOps (Vercel + managed services), data analyst (founder + GA4 + Metabase), social media manager (founder + scheduling tool).

---

## Appendix — Decisions explicitly deferred

- Paid newsletter / Substack as parallel channel (revisit Q3).
- Incorporate as Maltese / Curacao / Estonian entity for affiliate-tax efficiency (revisit when MRR >€10k).
- Expand into US sweepstakes / social casinos (different regime, separate doc).
- Build a public API of operator data for B2B licensing (interesting future moat, premature now).
