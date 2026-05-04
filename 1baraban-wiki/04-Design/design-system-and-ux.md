---
title: Design System & UX Architecture
date: 2026-05-01
type: design
status: draft
---

# 1baraban — Design System & UX Architecture

> Founding doc. Solo founder, Nuxt 3 + Vue 3 + Strapi + Vercel. EU + global English. Mobile-first, dark by default, AI-concierge-led, transparency-as-feature. Decisions, not options.

---

## 0. Strategic Frame (so design choices have a why)

The competitor research is unambiguous: incumbents win on age and complaint history, lose on UX and AI. 1baraban's design must read as **the modern, transparent, AI-first answer to a 2014 category** — without looking like a casino itself. The visual job: signal "trustworthy SaaS for gambling decisions," not "another gambling site." Think: a Linear/Stripe build that happens to review operators, not a dark-purple-with-neon-gold review portal.

Three tensions to resolve up front:

1. **Brand needs to mean something globally.** "1baraban" is etymologically Slavic. To English speakers it's an empty signifier — that's a feature, but only if the visual brand fills the meaning. We give it a meaning: a single drum/reel mark = "the one source of truth."
2. **Affiliate compliance vs conversion.** EU regulators (UKGC, MGA, Spelinspektionen) are tightening 2026–2027. Design for the strictest near-future rule, not today's. Disclosure becomes a visible feature, not a footer.
3. **Mobile-first is not a slogan.** 60–70% of traffic is mobile. The signature comparison and rating UX must be designed on a 390px frame first, scaled up — not the other way round.

---

## 1. Brand Identity Direction

### Direction A — Premium Institutional ("Bloomberg of iGaming")

- **5-word descriptor**: Authoritative, dense, financial-grade, navy, serif-headlines.
- **Palette**:

| Token            | Hex       | Use                  |
| ---------------- | --------- | -------------------- |
| `--bg-primary`   | `#0B1220` | Page background      |
| `--bg-secondary` | `#121C2E` | Cards                |
| `--text-primary` | `#E7ECF3` | Body                 |
| `--accent-gold`  | `#C8A04A` | Trust marks, ratings |
| `--accent-blue`  | `#3D7BFF` | CTAs                 |
| `--danger`       | `#E5484D` | Rogue/warning        |

- **Fonts**: `Source Serif 4` headings + `Inter` body + `JJ Mono` for data.
- **TOV line**: _"We score 1,400 operators against a public methodology. Here is what the data says."_

### Direction B — Modern Playful Gen-Z ("Duolingo for gambling decisions")

- **5-word descriptor**: Bright, rounded, friendly, illustrated, conversational.
- **Palette**: `#FF4F8B` primary, `#7C5CFF` secondary, `#FFD23F` accent, `#0F1115` ink, `#F7F4EE` cream.
- **Fonts**: `Bricolage Grotesque` headings + `DM Sans` body.
- **TOV line**: _"Don't gamble on your gambling site. We did the homework."_
- _Risk: reads as a casino itself; harder to land "trustworthy."_

### Direction C — Minimal Linear-Style AI-First ("Stripe-meets-Perplexity")

- **5-word descriptor**: Quiet, precise, monochrome, AI-native, dense-but-airy.
- **Palette**:

| Token              | Hex       | Use                  |
| ------------------ | --------- | -------------------- |
| `--bg-primary`     | `#0A0A0B` | Page (dark)          |
| `--bg-secondary`   | `#111114` | Cards                |
| `--bg-tertiary`    | `#1A1A1F` | Hover/raised         |
| `--border`         | `#26262C` | Dividers             |
| `--text-primary`   | `#F5F5F7` | Body                 |
| `--text-secondary` | `#A1A1AA` | Meta                 |
| `--accent-primary` | `#7C5CFF` | CTA / AI signal      |
| `--accent-success` | `#34D399` | Verified, high score |
| `--accent-warn`    | `#F59E0B` | Caveats              |
| `--accent-danger`  | `#EF4444` | Rogue                |
| `--accent-gold`    | `#E2B770` | Ratings (only)       |

- **Fonts**: `Geist` (or `Inter`) headings + `Geist` body + `Geist Mono` for ratings/IDs/data.
- **TOV line**: _"Ask anything. We've already read every license, T&C, and complaint."_

### Recommendation: **Direction C — Minimal Linear-Style AI-First.**

**Why:** A is too close to legacy "authority" sites and competes on a moat (decades of history) we don't have. B reads as a casino, undermining the editorial voice. C is the only direction that visually says _"this is not a 2018 affiliate site, this is an AI-first product"_ — which is the actual wedge per competitor research §4.1. We borrow the gold accent from A (only on rating glyphs) so trust signals still have a "premium" tell, and we use violet (`#7C5CFF`) as the AI/CTA signal. Dark by default; light mode is a respectable second-class citizen.

---

## 2. Core Screen Specs (text wireframes)

### 2.1 Homepage (`/`)

- **Hero (above fold, ~92vh on desktop, ~78svh on mobile):**
  - Top-left: 1baraban wordmark + reel-glyph. Top-right: vertical nav (`Casino · Sports · Poker · Slots · Bonuses`), theme toggle, search icon.
  - Centered: H1 in 56px (mobile 36px): _"Find a gambling site you can actually trust."_ Subhead in `--text-secondary`: _"Independent reviews, public methodology, AI concierge. EU + global."_
  - **AI concierge prompt input** (the hero element, not a banner): 64px tall, full-width to ~720px, placeholder rotates: _"Curaçao casino with sub-1-hour BTC payouts…" → "UK sportsbook with bet builder and cash-out…"_. Send button = violet pill.
  - Below input: 4 chip suggestions ("Best slots casinos EU", "Fastest withdrawals", "Bonus EV calculator", "Casinos that take Revolut").
  - Trust strip: _"1,420 operators tracked · methodology v2.4 · last updated today"_ with mono numerals.
- **Below fold:**
  1. **Vertical entry cards** (4-up grid → 2x2 on tablet → stack on mobile). Each card: vertical icon, count of operators, top-3 ranked operators with mini-score chips, "Explore casino →" link.
  2. **"This week's movers"** — horizontal scroll on mobile, grid on desktop. Cards show operator + ▲/▼ Trust Index delta + reason ("Withdrawal limits raised").
  3. **"How we rate"** strip — 4 icons (Methodology · Independence · Complaint Service · Last Audit Date) linking to the methodology page. This is intentionally hero-area on home, not buried.
  4. **Latest reviews/news** — 3-up.
  5. **Footer** — RG resources, license disclaimers, jurisdiction selector, sitemap.

### 2.2 Vertical Hub (`/casino`, `/sports-betting`, `/poker`, `/slots`)

- Sticky sub-nav (vertical-specific): `Top rated · New · Best for [bonuses/payouts/live/etc] · Compare · Methodology`.
- **Filter rail** (left on desktop ≥1024px, drawer on mobile/tablet). Filters: License, Country availability, Payment methods, Withdrawal speed, Software providers, Min deposit, RG tools, Crypto y/n.
- **Result list**: Operator cards (see component §3). Default sort: Trust Index. Sticky top: results count + active-filter chips + "Clear all".
- **Right rail (desktop only, ≥1280px)**: Compare drawer (max 4) + AI concierge mini-input ("Refine in chat →").
- **Pagination**: Cursor-based "Load more" (no infinite scroll — kills SEO and orientation).

### 2.3 Operator Review Page (THE workhorse — `/casino/[slug]`)

This page is the product. Spec it as exceptional.

- **Header band (sticky on scroll, collapses to compact on scroll-down):**
  - Operator logo (96×96, rounded-2xl) · Name · License badge(s) · Country availability dot · "Verified by 1baraban · 2026-04-18" stamp.
  - Right side: **Trust Index gauge** (see §4) + primary CTA _"Visit Operator"_ (violet pill, with disclosure tooltip "ℹ Affiliate link · how this works") + secondary "Add to compare".
- **Quick Facts grid** (6 tiles, JSON-LD-ready, mono numerals): Min deposit · Avg withdrawal time · KYC verification · Support 24/7 · Bonus headline · Software count.
- **Answer-first paragraph (≤60 words)**: factual, citable, dated, bylined. This is the GEO/LLM-extractable block.
- **Sub-score strip**: 5–7 sub-scores with horizontal progress bars and tooltips linking to that section.
- **Tabbed deep-dive** (sticky tabs, scroll-spy): Overview · Bonuses · Banking · Games · Mobile · Support · T&Cs · Complaints · Methodology.
  - Each tab section is anchor-linked, expandable on mobile (accordion) but expanded by default on desktop.
- **Bonuses table** (filterable: welcome, no-deposit, reload, free spins). Each bonus row has WR, max bet, contribution %, expiry, and an inline "Calculate true value" button → opens Bonus EV calculator drawer prefilled.
- **Banking grid**: payment methods × deposit/withdrawal × min/max × fee × speed. Mobile: convert to swipe-card stack.
- **Complaints panel**: counts by status (resolved / open / unresolved / rejected), avg days-to-resolution, link to public complaint stream filtered by this operator. If we have zero data at launch, render the panel empty with honest copy: _"No complaints submitted via 1baraban yet. We start tracking from your first."_ — better than hiding it.
- **Pros / Cons** — two columns, max 5 each, no fluff.
- **Author + methodology footer**: photo + name + credentials + "What I tested" + last review date + next review date + revision changelog. This is the trust closer.
- **Sticky mobile bottom bar**: `[★ 8.4]  [Add ⊕]  [Visit Operator →]` always visible.
- **Affiliate disclosure tooltip** on every CTA: _"1baraban earns a commission if you sign up. We rated this 8.4/10 before any deal existed. See our methodology and our public partner list."_

### 2.4 "Best X for Y" Listicle (`/best/[slug]` e.g. `/best/casinos-for-fast-withdrawals`)

- H1 + dated sub-line + answer-first 60-word summary block (JSON-LD `ItemList`).
- **Ranked list** (1–10): each item is a horizontal card — rank badge, logo, name, one-line "Why #2", 3 mini-attribute chips, mini-score, _"Read full review"_ + _"Visit"_.
- Sticky TOC sidebar (jump to operator).
- Below list: _"How we ranked this list"_ — methodology specific to this filter.
- FAQ block (FAQPage schema).

### 2.5 Comparison Page (`/compare?ids=a,b,c`)

- 2–4 operators side-by-side. Mobile = horizontal swipe with snap; desktop = grid.
- Sticky header row with logo + name + Trust Index + remove (×) + Visit CTA.
- Body rows: collapsible groups (Trust, Bonuses, Banking, Games, Mobile, Support). Differences are **highlighted automatically** (best value gets a violet outline; worst gets muted).
- Sticky footer on mobile: `[Visit A] [Visit B] [Visit C]`.
- "Ask AI which is best for me" → opens concierge prefilled with the 3 IDs.

### 2.6 Bonus / Offer Page (`/bonuses/[slug]`)

- Hero: bonus headline + operator + "True Value" score (our verdict number, e.g., "Headline: $1,000 · True value: ~$214 after WR @ realistic play").
- **Bonus EV calculator**, embedded inline, prefilled. Sliders for stake, game type, RTP. Live-recalculates EV.
- T&C red flags surfaced as chips: _Max bet €5 · 35× WR · 7-day expiry · Slots only_.
- Visit CTA + disclosure.

### 2.7 AI Chat Interface — **Decision: hybrid (full page + persistent floating launcher)**

- **Floating launcher** (bottom-right, 56×56 violet circle with reel glyph): present site-wide. On tap: opens a 70vh sheet on mobile, 480px right-drawer on desktop.
- **Full-page mode** at `/ask`: same chat, expanded canvas, with structured "result cards" that render comparisons/ratings/operator cards inline (not just text). Shareable URLs per conversation.
- **Why hybrid, not widget-only**: a widget lacks SEO surface and shareability; a full page lacks ambient access. Hybrid gives us /ask as an SEO/shareable artifact and the launcher for ambient use.
- Chat UI: large input, model badge ("1baraban Concierge · powered by [model]"), tool-call chips render as inline pills ("🔎 Searched 1,420 operators"), sources cited as numbered footnotes linking to operator pages, "Refine filters" button converts the chat answer into a filtered list view.
- First-message scaffolding: 4 tappable starter prompts.
- Persistence: localStorage thread (no account); "Send to email" optional.
- Disclaimer banner: _"Concierge can be wrong. Verify on the operator page."_

### 2.8 Search / Filter Results (`/search?q=`)

- Top: search bar (autocomplete with operators, articles, bonuses, providers — typed result groups).
- Tabs: All · Operators · Reviews · Bonuses · Guides.
- Result cards reuse the operator-card and article-card components.
- Empty state: large concierge prompt — _"Didn't find it? Ask the concierge →"_.

### 2.9 Author / Methodology Page (`/methodology`, `/team/[author]`)

- **Methodology page**: public weighted formula visualised (donut chart of weights, e.g., License & Safety 30 / Banking 20 / Bonuses 15 / Player Experience 15 / Support 10 / Complaints 10), versioned (v2.4), changelog with dates and reasons, "What we don't measure" section (radical transparency move), public list of partner operators with relationship type (`RevShare / CPA / Hybrid / None`), public list of operators we refuse to partner with.
- **Author page**: photo, credentials, jurisdictions reviewed, conflicts disclosed, articles authored, contact, PGP/email.

---

## 3. Component Library Plan (Vue 3 PascalCase)

| #   | Component                                                         | Notes                                                   |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | `AppShell`                                                        | Layout wrapper with header/footer slots, theme provider |
| 2   | `SiteHeader`                                                      | Logo, nav, search trigger, theme toggle, AI launcher    |
| 3   | `SiteFooter`                                                      | RG, jurisdictions, sitemap, license, copyright          |
| 4   | `BrandMark`                                                       | Logo + reel glyph, monogram fallback                    |
| 5   | `ThemeToggle`                                                     | Light / Dark / System tri-state                         |
| 6   | `AgeGateModal`                                                    | 18+/21+ blocking, jurisdiction-aware, persisted         |
| 7   | `CookieBanner`                                                    | GDPR-compliant, granular consent                        |
| 8   | `JurisdictionSwitcher`                                            | Country chip in header, opens drawer                    |
| 9   | `SearchBar`                                                       | Global typeahead, grouped results                       |
| 10  | `AIConciergeInput`                                                | Hero/inline input, opens chat                           |
| 11  | `AIConciergeLauncher`                                             | Floating bottom-right button                            |
| 12  | `AIConciergeSheet`                                                | Mobile bottom-sheet chat                                |
| 13  | `AIConciergeDrawer`                                               | Desktop right-drawer chat                               |
| 14  | `AIChatMessage`                                                   | Bubble + tool-call pill + citations                     |
| 15  | `AIChatStarterPrompts`                                            | Tappable suggestion chips                               |
| 16  | `OperatorCard`                                                    | List/grid card with score + CTA                         |
| 17  | `OperatorCardCompact`                                             | Listicle row variant                                    |
| 18  | `OperatorHeader`                                                  | Review-page sticky band                                 |
| 19  | `TrustIndexGauge`                                                 | Hero rating widget (see §4)                             |
| 20  | `SubScoreBar`                                                     | Horizontal sub-score bar with tooltip                   |
| 21  | `LicenseBadge`                                                    | MGA/UKGC/Curaçao etc with verify link                   |
| 22  | `PayoutSpeedBadge`                                                | Mono-time chip ("~38m avg")                             |
| 23  | `ComplaintCounter`                                                | Resolved/open/avg-days mini-stat                        |
| 24  | `VerifiedStamp`                                                   | "Verified by 1baraban · date"                           |
| 25  | `AffiliateCTA`                                                    | Visit-operator button + disclosure tooltip              |
| 26  | `AffiliateDisclosureTooltip`                                      | Reusable explainer popover                              |
| 27  | `BonusCard`                                                       | Bonus headline + true-value chip + CTA                  |
| 28  | `BonusEVCalculator`                                               | Inline calc with sliders                                |
| 29  | `WRCalculator`                                                    | Wagering requirement calc                               |
| 30  | `BankingMatrix`                                                   | Payment × deposit/withdraw grid                         |
| 31  | `FilterRail`                                                      | Desktop sidebar filters                                 |
| 32  | `FilterDrawer`                                                    | Mobile drawer filters                                   |
| 33  | `FilterChipBar`                                                   | Active filters with ×                                   |
| 34  | `CompareDrawer`                                                   | Right-side compare tray (max 4)                         |
| 35  | `CompareTable`                                                    | Side-by-side comparison body                            |
| 36  | `StickyMobileCTA`                                                 | Bottom bar on review pages                              |
| 37  | `BottomNav`                                                       | Mobile primary nav (4 items + AI)                       |
| 38  | `TableOfContents`                                                 | Sticky scroll-spy TOC                                   |
| 39  | `ProsCons`                                                        | Two-column block                                        |
| 40  | `MethodologyDonut`                                                | Weight visualisation                                    |
| 41  | `ReviewChangelog`                                                 | Versioned revision list                                 |
| 42  | `AuthorByline`                                                    | Photo + name + credentials + date                       |
| 43  | `BreadcrumbTrail`                                                 | SEO + UX                                                |
| 44  | `Tabs` / `Accordion` / `Tooltip` / `Modal` / `Toast` / `Skeleton` | Primitives                                              |

That's 49 — comfortably above the 25–40 target with the primitives bucket folded in.

---

## 4. Rating Widget Design — `TrustIndexGauge`

The signature element. One unified system across all four verticals; sub-scores swap by vertical, master score and visual stay identical.

```
┌──────────────────────────────────────────────────────────────┐
│  ╭──────╮   1baraban Trust Index           v2.4 · methodology│
│  │ 8.4  │   ████████████████████░░░░  84/100                  │
│  │ /10  │   Verified · 2026-04-18 by Anna K.                 │
│  ╰──────╯   Next review: 2026-07-18                          │
├──────────────────────────────────────────────────────────────┤
│  Sub-scores (casino vertical)                                │
│  License & Safety       ███████████████████░  9.2  ⓘ         │
│  Banking & Payouts      █████████████████░░░  8.5  ⓘ         │
│  Bonuses (true value)   ████████████░░░░░░░░  6.1  ⓘ         │
│  Player Experience      ██████████████████░░  9.0  ⓘ         │
│  Support                ███████████████░░░░░  7.6  ⓘ         │
│  Complaints (n=42)      ████████████████░░░░  8.0  ⓘ         │
├──────────────────────────────────────────────────────────────┤
│  Δ +0.3 since last review · changelog →                      │
│  Reviewed by Anna K. (UKGC compliance, 6 yrs) · email · PGP  │
└──────────────────────────────────────────────────────────────┘
```

- **Master gauge**: numeric 0.0–10.0 in `Geist Mono`, plus 0–100 bar. Colour gradient by band: 0–4 danger red, 4–6 warn amber, 6–7.5 neutral, 7.5–9 success green, 9+ accent gold. Only 9+ shows the gold tell — scarcity matters.
- **Sub-scores**: weighted 0–10 bars. Tooltips reveal weight (`License & Safety = 30%`) and the inputs. Each `ⓘ` deep-links to the methodology section.
- **Vertical-specific sub-scores**:
  - Casino: License & Safety, Banking & Payouts, Bonuses, Player Experience, Support, Complaints.
  - Sportsbook: License & Safety, Odds Quality, Markets & In-play, Cash-out & Bet-builder, Banking & Payouts, Support.
  - Poker: License & Safety, Traffic & Liquidity, Software & Mobile, Rake & Rakeback, Banking, Support.
  - Slot (single-game): RTP & Variance Honesty, Provider Trust, Mechanics, Mobile Experience, Volatility Disclosure, Bonus Value. (Slot games rated separately from operators.)
- **Master score = weighted sum of sub-scores**, weights public on `/methodology`. Cross-vertical comparison of operators uses the average of their per-vertical scores, weighted by what verticals they actually offer. This is the "unified cross-vertical Trust Index" wedge from competitor research §4.3.
- **Audit metadata always present**: reviewer name, credential, date, next review, version.
- **Mobile**: gauge collapses to single-line chip `[ ★ 8.4  ▼ ]` that expands the full panel.

---

## 5. Mobile-First Patterns

- **Bottom nav** (mobile only): 5 items — `Home · Casino · Sports · Compare · Concierge`. Active state in violet; thumb-zone-optimised. Hides on scroll-down, reappears on scroll-up.
- **Sticky top mini-header** on review pages: shrinks to logo + score chip + Visit CTA after 80px scroll.
- **Sticky bottom CTA bar** on operator/bonus pages: `[★]  [Add ⊕]  [Visit →]`. Always-visible primary action; respects iOS safe-area inset.
- **Swipeable comparison cards**: snap-scroll horizontal cards, page indicators, swipe to advance, "+" card at the end to add another. Native iOS feel.
- **Drawer filters**: bottom-sheet (not full-screen modal) with a backdrop tap-to-close. Filters apply on "Show 124 results" CTA, not live (avoids re-flow on every tap on flaky mobile networks).
- **Concierge sheet**: 70svh bottom sheet with drag-handle, expandable to 100svh.
- **Tap targets**: ≥44×44px. **Form inputs**: ≥16px font (prevents iOS zoom).
- **PWA**: installable, offline shell for read-later reviews, home-screen icon = reel glyph.
- **No hover-only affordances anywhere.**

---

## 6. Trust UX

A unified visual language for trust signals. Every signal is a Vue component, every component has the same anatomy: glyph + label + meta + verifiable-source link.

| Signal                               | Visual                                                                    | Meta                                      | Source link      |
| ------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------- | ---------------- |
| License badge                        | Outlined chip with regulator monogram (UKGC, MGA, Curaçao GCB, KGC, etc.) | License #                                 | Regulator page   |
| Verified-by-1baraban stamp           | Filled gold chip + reel glyph                                             | Date + reviewer initials                  | Review changelog |
| Payout speed badge                   | Mono chip with clock glyph                                                | "~38m avg · n=214"                        | Payout dataset   |
| Complaint counter                    | Three-dot status (●○○) + count                                            | "42 cases · 86% resolved"                 | Complaint stream |
| RG tools chip                        | Icon row                                                                  | Self-exclusion · Limits · Reality-check   | Operator RG page |
| Affiliate-relationship chip          | Outlined neutral chip                                                     | `RevShare` / `CPA` / `Hybrid` / `No deal` | Methodology      |
| Last-updated stamp                   | Mono date                                                                 | "2026-04-18 · v2.4"                       | Changelog        |
| Operators-we-don't-partner-with link | Footer chip                                                               | Visible on every operator page            | Public list      |

- **Placement rule**: every operator page has the trust strip above the fold (header band) and again at the bottom (closer). Listicle cards show License + Payout + Verified stamp at minimum.
- **No fake urgency, no fake counts, no "247 people viewing now," no "deal expires in 3:42."** Hard rule.

---

## 7. Affiliate CTA Pattern

- **Component**: `AffiliateCTA`. Single source of truth.
- **Visual**: violet filled pill, 48px tall, label `Visit [Operator] →` (always names the operator — never "Click here"). On hover/active: subtle scale 1.02, shadow lift. On dark mode: violet stays vivid; on light mode: same violet, contrast-tuned.
- **Always paired** with `AffiliateDisclosureTooltip` (small ℹ next to the button). Tooltip copy: _"1baraban may earn a commission if you sign up. We scored this {score}/10 against our public methodology before any commercial relationship. See full disclosure."_ — links to `/methodology#partners` and to the per-operator partner-relationship chip.
- **HTML**: `rel="sponsored nofollow noopener"`, `target="_blank"`, with click event tagged in analytics for downstream tracking. Server-side redirect through `/go/[operator-id]` to keep affiliate URL changes centralised and trackable.
- **Compliance copy block** below CTA on review pages (always rendered, not toggled): _"18+ (21+ in some jurisdictions). Gambling can be addictive. Play responsibly. {RG resource link by jurisdiction}."_
- **No dark patterns** — no countdowns, no "only 3 left," no preselected upsells, no auto-opening pop-ups. The CTA is loud because the page is quiet, not because it tricks.
- **Compliance variant**: in jurisdictions where affiliate marketing is restricted (e.g., NL, parts of DE), the CTA renders as `Operator unavailable in your region` (greyed, non-clickable) — driven by the jurisdiction switcher.

---

## 8. Dark Mode + Light Mode Strategy

- **Default = dark.** Reasoning: target audience skews evening/late-night, mobile, and design direction is AI-first (where dark dominates the reference set — Claude.ai, Linear, Perplexity).
- **Tri-state toggle**: Dark / Light / System. Persisted in `localStorage` + `cookie` (so SSR can render correct theme without flash). System falls back to `prefers-color-scheme`.
- **Implementation**: CSS variables on `:root` and `[data-theme="light"]`. Theme set on `<html>` server-side from cookie to prevent FOUC.
- **Light mode is not an afterthought**: same contrast, same hierarchy, slightly warmer paper-like background (`#FAFAF7`) to differentiate from sterile white. All components must be tested in both modes; PR template has a "screenshot in both themes" requirement.
- **Accent violet (`#7C5CFF`) holds across both modes** — single brand cue. Gold rating accent shifts slightly in light mode (`#B8893E`) for AAA contrast on cream.
- **Charts and gauges**: never rely on colour alone — always shape + label + tooltip.

```css
/* Excerpt — design tokens (Direction C, dark default) */
:root {
  --bg-primary: #0a0a0b;
  --bg-secondary: #111114;
  --bg-tertiary: #1a1a1f;
  --border: #26262c;
  --text-primary: #f5f5f7;
  --text-secondary: #a1a1aa;
  --text-tertiary: #71717a;
  --accent-primary: #7c5cff;
  --accent-primary-hover: #6b4deb;
  --accent-success: #34d399;
  --accent-warn: #f59e0b;
  --accent-danger: #ef4444;
  --accent-gold: #e2b770;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
}
[data-theme="light"] {
  --bg-primary: #fafaf7;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f2f2ee;
  --border: #e4e4e0;
  --text-primary: #0a0a0b;
  --text-secondary: #52525b;
  --text-tertiary: #71717a;
  --accent-gold: #b8893e;
  --shadow-sm: 0 1px 2px rgba(20, 20, 30, 0.06);
  --shadow-md: 0 6px 16px rgba(20, 20, 30, 0.08);
}
/* Type scale */
:root {
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 56px;
}
```

---

## 9. Accessibility Baseline (WCAG 2.2 AA, with AAA where free)

- **Contrast**: body text ≥ 4.5:1; large text ≥ 3:1; UI components ≥ 3:1. Trust-Index gauge passes AAA on its filled state.
- **Focus states**: every interactive element has a 2px violet outline with 2px offset. Never `outline: none` without a replacement. Focus-visible only (no outlines on mouse focus).
- **Keyboard nav**: all filter UI is fully keyboard operable. Filter rail is a `<form>` with grouped `<fieldset>`s and labelled checkboxes/radios. Drawer traps focus; ESC closes; tab cycles inside.
- **Screen readers**: semantic HTML. Trust-Index gauge has `role="meter"` with `aria-valuenow/min/max` plus a visually-hidden label. Sub-scores use `<dl>`. Tooltips are `aria-describedby`. Charts have text equivalents.
- **Age gate**: must be operable by keyboard, screen-reader announced as a dialog (`role="dialog" aria-modal="true"`), with focus trap; no auto-dismiss; legible on resize to 200%.
- **Motion**: respects `prefers-reduced-motion`. Gauge fills statically, no parallax, no autoplay.
- **Forms**: label always paired, error messages `aria-live="polite"`, no placeholder-as-label.
- **Touch targets ≥ 44×44 CSS px**, spacing ≥ 8px between adjacent targets.
- **Language**: `<html lang>` set; jurisdiction switcher updates `lang` and `dir`.
- **Skip-to-content link** at top of every page.
- **Test stack**: axe-core in CI on every Storybook story + Lighthouse CI threshold ≥95 a11y per route.

---

## 10. Reference Inventory

| #   | Site                  | URL                            | What we steal                                                                               |
| --- | --------------------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| 1   | Casino.Guru           | https://casino.guru            | Public, transparent, dynamic Safety Index — adapt to multi-vertical Trust Index             |
| 2   | AskGamblers           | https://askgamblers.com        | Public weighted methodology (50/25/15/10) and complaint-service-as-feature                  |
| 3   | SlotCatalog           | https://slotcatalog.com        | Database-not-editorial: 50+ structured attributes per entity                                |
| 4   | Linear                | https://linear.app             | Quiet, dense, AI-first SaaS aesthetic; type system; dark-first                              |
| 5   | Stripe                | https://stripe.com             | Documentation-grade clarity, mono numerals, trust through precision                         |
| 6   | Vercel                | https://vercel.com             | Minimal type-led marketing, Geist font, dark-mode polish                                    |
| 7   | Apple (product pages) | https://apple.com              | Hierarchy of attention, image discipline, sticky compact header                             |
| 8   | Wirecutter            | https://nytimes.com/wirecutter | Reviewer transparency, methodology footers, "we tested" credibility                         |
| 9   | Perplexity            | https://perplexity.ai          | Citation-first answer UX, source numbering, conversational discovery                        |
| 10  | Claude.ai             | https://claude.ai              | Floating launcher + full-page chat hybrid, message density, tool-call pills                 |
| 11  | Oddschecker           | https://oddschecker.com        | Best-priced book auto-routing — apply pattern to "best operator for X" auto-suggestion      |
| 12  | The Athletic          | https://theathletic.com        | Bylined-author authority on a category competitors treat as commodity                       |
| 13  | Bloomberg Terminal    | (reference)                    | Mono-numeral data density without feeling cluttered — for stat-heavy review pages           |
| 14  | Notion                | https://notion.so              | Inline tooltip definitions and slash-style command UX — model for AI concierge inline tools |
| 15  | Trainline             | https://thetrainline.com       | Mobile-first comparison/swipe patterns under EU regulation — for compare drawer             |

---

## Appendix A — Implementation Priority for Dev Handoff

1. **Foundation**: tokens (`tokens.css`), theme provider, `Geist` + `Geist Mono` self-hosted, `AppShell`, `SiteHeader`, `SiteFooter`, `ThemeToggle`, `AgeGateModal`, `CookieBanner`.
2. **Primitives**: `Button`, `Tooltip`, `Modal`, `Tabs`, `Accordion`, `Toast`, `Skeleton`, `BreadcrumbTrail`.
3. **Trust system**: `TrustIndexGauge`, `SubScoreBar`, `LicenseBadge`, `PayoutSpeedBadge`, `ComplaintCounter`, `VerifiedStamp`, `AffiliateCTA`, `AffiliateDisclosureTooltip`.
4. **Cards**: `OperatorCard`, `OperatorCardCompact`, `BonusCard`.
5. **Pages**: Operator review page first (workhorse), then vertical hub, then homepage, then comparison, then listicle, then methodology, then bonus page, then search, then `/ask`.
6. **AI concierge**: `AIConciergeLauncher`, `AIConciergeSheet/Drawer`, `AIChatMessage`, full-page `/ask`. Build the structured-result-card render layer early — text-only chat is a regression vs the wedge.
7. **Filters & compare**: `FilterRail`, `FilterDrawer`, `FilterChipBar`, `CompareDrawer`, `CompareTable`, `StickyMobileCTA`, `BottomNav`.
8. **Calculators**: `BonusEVCalculator`, `WRCalculator` — embed in review and bonus pages.
9. **Methodology surface**: `/methodology`, `MethodologyDonut`, `ReviewChangelog`, `AuthorByline`, `/team/[author]`.

## Appendix B — Hard Rules (do not violate)

1. Affiliate disclosure tooltip on **every** affiliate CTA. No exceptions.
2. Age gate before any operator review content. Persisted but re-triggerable.
3. RG resources visible in footer of every page; jurisdiction-aware link.
4. No fake urgency, fake scarcity, or fake social proof. Ever.
5. Every score has a date + reviewer + version. If we don't have it, we don't show a score.
6. Mobile sticky CTAs must respect iOS safe-area; never overlap content.
7. Light mode parity in every PR.
8. No third-party fonts loaded from Google CDN — self-host `Geist` for performance + privacy.
9. JSON-LD `Review`/`AggregateRating`/`ItemList`/`FAQPage` on every relevant page from day one.
10. The reel glyph is the only piece of "casino" iconography in the brand. No dice, cards, slot machines, or coins anywhere in the chrome.
