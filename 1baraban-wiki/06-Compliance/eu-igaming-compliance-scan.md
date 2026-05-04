---
title: EU + UK iGaming Affiliate Compliance Scan
date: 2026-05-01
type: compliance
status: draft
disclaimer: "Not legal advice. For informational planning only. Engage qualified counsel before launch."
---

# EU + UK iGaming Affiliate Compliance Scan — 1baraban.com

> **Important disclaimer.** This is an informational planning artefact for **1baraban.com**. It is **not legal advice**, does not create a lawyer-client relationship, and may be incomplete or out of date by the time you read it. Gambling regulation is one of the most volatile areas of EU/UK law. Engage qualified counsel in each target jurisdiction before launch and before signing any operator contracts.

---

## 1. Executive summary

**1baraban.com** is a new English-language iGaming review/affiliate platform targeting EU and global English-speaking audiences across casino, sports betting, poker and slots verticals, monetised through affiliate links. The founder is based in Ukraine; stack is Nuxt 3 + Strapi + Vercel.

Because 1baraban is **not** an operator, the regulatory burden is materially lighter than for a licensed gambling business — but it is **not** zero. EU/UK regulators increasingly treat affiliates as part of the "marketing chain" and apply most operator-side advertising and consumer-protection rules to anyone who promotes operators commercially. In several markets (UK, NL, SE, ES, DE), affiliates can be sanctioned directly or through the operators they promote.

| Risk area                                                    | Severity        | Notes                                                                  |
| ------------------------------------------------------------ | --------------- | ---------------------------------------------------------------------- |
| Linking to unlicensed operators in regulated markets         | **Critical**    | Direct liability in NL, DE, ES, IT; operator-mediated everywhere else. |
| Bonus / "free" / "risk-free" claims                          | **High**        | Banned or heavily restricted in UK, NL, SE, DE, ES, IT.                |
| Targeting / imagery (under-25, athletes, addictive language) | **High**        | UK CAP/ASA rules apply if targeting UK users.                          |
| Geo-blocking failures                                        | **High**        | US, GCC, large parts of Asia, Russia.                                  |
| GDPR + ePrivacy on newsletter, AI chat, cookies              | **High**        | DPA chain (Strapi/Vercel/AI providers) must be in place.               |
| AI chat giving "advice" in regulated markets                 | **Medium-High** | Treat as marketing; restrict scope by IP.                              |
| Affiliate disclosure (DSA + CAP + FTC)                       | **Medium**      | Easy to fix but easy to forget.                                        |

**Bottom line.** A defensible MVP is achievable, but requires (a) explicit jurisdiction targeting, (b) hard geo-blocking of high-risk countries, (c) operator vetting (license + market-of-supply), (d) compliance-aware content rules, and (e) full GDPR plumbing on day one.

---

## 2. Affiliate vs operator — where the line blurs

An **operator** offers gambling services for stake; an **affiliate** promotes operators in exchange for commission. 1baraban is squarely affiliate: no wallets, no bets, no game outcomes, no T&Cs creating a gaming contract with the user.

**Where the line blurs (and where you accidentally become an operator):**

1. **Skill-game / "social casino" widgets.** Embedding a free-play slot demo can, in NL/DE/BE, be deemed gambling promotion if the demo mirrors a real-money product 1:1.
2. **Promo-code redemption flows.** If 1baraban issues its own promo codes (rather than passing through operator codes), some regulators argue it is "offering" the bonus.
3. **Streaming / live-odds / aggregated betting tickers.** Real-time odds combined with deep-links to specific bet slips can be classified as facilitating betting.
4. **Account-funding redirects.** If the affiliate handles deposit data, you slip into payments + gambling perimeter.
5. **AI chat giving operator-specific recommendations** to users in restricted jurisdictions — personalised gambling promotion.
6. **"White-label" arrangements** — never accept these; you become a reseller of the operator's licensed product and inherit operator obligations.

**Practical rule:** keep all betting interactions on the operator side, never hold user funds, never custodian an account, never personalise odds/bet slips, treat AI chat as "informational content" not "advice".

---

## 3. Per-jurisdiction rules

### 3.1 UK — UKGC + ASA + CAP Code

**Regulators:** UK Gambling Commission (gamblingcommission.gov.uk), ASA + CAP (asa.org.uk). The strictest mainstream English-language market.

| Rule                            | Requirement                                                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operator licensing              | Affiliate must only link to UKGC-licensed operators when targeting UK users. UKGC publishes the public register.                                                                                                             |
| Operator liability flow-through | LCCP 1.1.2: licensed operators are responsible for their affiliates. Operators routinely cut affiliates over breaches.                                                                                                       |
| ASA/CAP rules                   | No targeting under-25 imagery, no athletes who are role models, no cartoons, nothing appealing to children. No "risk-free", "free bet" without clear T&Cs upfront, no urgency/pressure language, no implied guaranteed wins. |
| Required disclosures            | "18+", BeGambleAware.org link, responsible-gambling messaging. Affiliate disclosure required under CAP.                                                                                                                      |
| GamStop interaction             | Cannot target self-excluded users. Honour unsubscribes immediately.                                                                                                                                                          |
| Content gating                  | Reviews / bonus content should sit behind 18+ acknowledgement.                                                                                                                                                               |

**Source:** UKGC LCCP, CAP Code Section 16 (Gambling), ASA enforcement notes 2022-2025.

### 3.2 Malta — MGA

**Regulator:** Malta Gaming Authority (mga.org.mt).

| Rule                      | Requirement                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Operator licensing        | Promote MGA-licensed operators only when targeting Malta-based users.                                                                  |
| Affiliate code of conduct | MGA Directive 2018: licensed operators must have a contract with each affiliate, including IP/brand clauses and content review rights. |
| Content rules             | No targeting minors, no misleading bonus claims, mandatory responsible-gambling messaging.                                             |
| Disclosure                | License number + link to MGA register on each operator page.                                                                           |

Relatively permissive for English-language affiliate content, but MGA-licensed operators will demand contractual compliance.

### 3.3 Sweden — Spelinspektionen

**Regulator:** Spelinspektionen (spelinspektionen.se). Swedish Gambling Act requires "moderate marketing" (måttfull marknadsföring) — one of the strictest standards in the EU.

| Rule               | Requirement                                                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operator licensing | Must hold Swedish license to target Swedish users.                                                                                                                   |
| Marketing standard | "Moderate" — Swedish courts have ruled out aggressive bonuses, urgency language, large bonus amounts as the headline, and most "bet now" CTAs.                       |
| Bonuses            | Licensed operators may only offer a bonus on a player's first interaction. Listing "weekly reload bonuses" of Swedish-licensed operators is generally non-compliant. |
| Self-exclusion     | Spelpaus.se national registry; affiliates should not solicit/retarget excluded users.                                                                                |

**Source:** Spelinspektionen guidance 2019-2024; Patent and Market Court decisions on "moderate marketing".

### 3.4 Netherlands — KSA (Kansspelautoriteit)

**Regulator:** KSA (kansspelautoriteit.nl). Post-2021 KOA Act reform.

| Rule                       | Requirement                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operator licensing         | Must hold Dutch license. Affiliating to unlicensed operators when targeting NL users is heavily fined.                                                           |
| Untargeted advertising ban | From July 2023, "untargeted" online gambling advertising is banned. Affiliate sites still permitted but must respect this when pushing paid social/programmatic. |
| Role-model ban             | Athletes, celebrities, influencers under 25 cannot appear in gambling promotion.                                                                                 |
| Bonuses                    | Strict — no "free", "risk-free", or unconditional bonus framing. Wagering requirements must be displayed prominently.                                            |

### 3.5 Germany — GlüStV 2021

**Regulator:** GGL (Gemeinsame Glücksspielbehörde der Länder, gluecksspiel-behoerde.de).

| Rule                  | Requirement                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operator licensing    | Sports betting + online slots licensed federally (since 2021). Online casino tables are state-level patchwork (Schleswig-Holstein notably).                         |
| Marketing windows     | TV/radio ads restricted between 06:00–21:00; online ads not allowed during live sports for first 5 minutes after kickoff.                                           |
| Stakes/content limits | Slots: €1 max stake, mandatory 5-second spin delay. Affiliates can describe these but cannot promote operators that don't observe them when targeting German users. |
| Sports betting        | Live betting on events other than next goal/next point restricted.                                                                                                  |
| Bonuses               | Heavy restrictions — most "welcome bonus" framings used in UK/Malta will not pass German rules.                                                                     |

### 3.6 Other EU markets

| Market      | Regulator                           | Key rule for affiliates                                                                                                                                                       |
| ----------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Spain**   | DGOJ (ordenacionjuego.es)           | Royal Decree 958/2020 — no welcome bonuses to new players, no celebrity marketing, advertising windows 01:00–05:00 only (TV); promote only DGOJ-licensed operators.           |
| **France**  | ANJ (anj.fr)                        | Online casino is **prohibited**. Only sports betting, poker, horse racing licensed online. Affiliating to online casinos targeting French users is illegal.                   |
| **Italy**   | ADM (adm.gov.it)                    | Dignity Decree 2018 bans most gambling advertising. Affiliates can produce informational/comparison content but must avoid promotional language. ADM-licensed operators only. |
| **Denmark** | Spillemyndigheden                   | Danish-licensed operators only. ROFUS self-exclusion register. Marketing must include 18+ and StopSpillet helpline.                                                           |
| **Finland** | Veikkaus monopoly until 2027 reform | Currently state monopoly. Affiliating to private operators is in a grey zone shifting rapidly. Watch the 2026-2027 reform.                                                    |
| **Ireland** | GRAI (Gambling Regulation Act 2024) | New advertising restrictions: no advertising 05:30-21:00 on TV/radio; "designated operators" registration phasing in. Track GRAI codes through 2026.                          |

### 3.7 Curaçao — the controversial case

The CGA replaced the old master/sublicense system on 22 December 2024 under the new National Ordinance (LOK). New direct licenses now issued by CGA.

**Risk profile for an EU-targeting affiliate:**

- Curaçao licensing is **not** equivalent to EU licensing. A Curaçao-only operator is **unlicensed** for UK, NL, DE, SE, ES, IT, FR, DK.
- Linking to Curaçao-only operators while targeting users in those countries is a violation in each.
- Curaçao-only operators are widely used in **unregulated markets** (parts of LATAM, Africa, Asia) — but those markets bring payment-rail risk, AML exposure, restricted-country issues.

**Practical rule:** if you list Curaçao-licensed operators at all, geo-restrict server-side to lawful jurisdictions, never serve to UK/EU IPs. Curaçao-only operators are a credibility liability for an EU-targeting brand.

### 3.8 Restricted countries — geo-blocking

| Country / region                                 | Reason                                                       | Recommendation                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **United States**                                | State-level regimes, UIGEA, Wire Act exposure for affiliates | Hard geo-block. Do not accept US traffic for affiliate links.          |
| **GCC (KSA, UAE, Qatar, Kuwait, Oman, Bahrain)** | Gambling illegal                                             | Hard geo-block. Generic "about" page only.                             |
| **China, HK, Macau (online), Singapore**         | Strict prohibition / state monopoly                          | Hard geo-block.                                                        |
| **Japan, South Korea**                           | Restricted regimes                                           | Hard geo-block unless licensed coverage.                               |
| **Russia, Belarus**                              | Sanctions + prohibition                                      | Hard geo-block; EU sanctions exposure for any commercial relationship. |
| **Turkey**                                       | Online gambling banned, ISP-level enforcement                | Hard geo-block.                                                        |
| **Iran, North Korea, Cuba, Syria**               | Sanctions + prohibition                                      | Hard geo-block.                                                        |
| **Australia**                                    | IGA 2001 — online casino prohibited; sports betting licensed | Restrict to sports-betting content with ACMA-compliant operators.      |

**Implementation:** CDN-level (Vercel Edge Middleware) IP geolocation block returning HTTP 451 with a plain "service not available in your region" page. Do **not** rely on client-side detection.

---

## 4. Content rules that trip affiliate sites up

| Pattern                                                | Where restricted       | Safer alternative                                                                                                 |
| ------------------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| "100% bonus up to €500" headline without T&Cs          | UK, NL, SE, DE, ES, IT | Show bonus + wagering + min deposit + expiry on equal visual weight, in same component, above the fold.           |
| "Free spins", "Risk-free bet", "No risk"               | UK (banned), NL, SE    | Neutral descriptions: "20 spins on registration (T&Cs apply)". Never use "free" if any wagering condition exists. |
| Athletes, celebrities, anyone <25 in imagery           | UK, NL, ES, IT         | Stock imagery of products/UI. If using people, ensure 25+ and no role-model association.                          |
| Implied guarantees ("our top pick will win you money") | All EU + UK            | Neutral comparative language: "highest-rated by editorial team based on [criteria]".                              |
| Welcome-bonus comparison tables sorted by bonus size   | UK, DE, NL             | Sort by editorial score; surface wagering + max-cashout in same row at equal visual weight.                       |
| Urgency / scarcity ("Claim now! Today only!")          | UK, NL, SE             | Avoid. Evergreen language.                                                                                        |
| "Beat the casino" / "system" / "strategy guarantees"   | All EU + UK            | Educational only, with "no system overcomes house edge" disclaimer.                                               |
| Targeting financial vulnerability ("solve your debt")  | All EU + UK + ASA      | Banned. Never associate gambling with solving financial problems.                                                 |

**Editorial safeguard:** every operator review and bonus listing should pass a content-compliance lint step before publish.

---

## 5. Mandatory site-wide elements

| Element                                          | Detail                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Age gate**                                     | UK + most EU accept clear 18+ disclosure on every gambling page rather than hard interstitial. Interstitial is required in DE for some content and is best practice for first-visit users. Recommended: first-visit modal "I confirm I am 18+ (or 21+ where local law requires)" with cookie persistence; persistent 18+ marker in footer.                             |
| **Responsible-gambling resources**               | Country-aware footer:<br>UK: BeGambleAware, GamCare, GAMSTOP<br>Ireland: Problem Gambling Ireland<br>Malta: Responsible Gaming Foundation<br>Sweden: Stödlinjen, Spelpaus<br>NL: Loketkansspel<br>DE: BZgA spielen-mit-verantwortung<br>ES: Jugar Bien<br>Globally: GamCare, Gambling Therapy                                                                          |
| **License disclosure**                           | Every operator review/listing: license authority, license number, jurisdictions of supply, link to regulator's public register.                                                                                                                                                                                                                                        |
| **Affiliate disclosure (FTC + DSA + CAP)**       | On every page with affiliate links: _"This page contains affiliate links. If you sign up with an operator through one of these links, 1baraban may receive a commission at no cost to you. This does not affect our editorial reviews or rankings."_ DSA Art. 26 requires platforms to clearly indicate commercial content. CAP requires it visible without scrolling. |
| **"Last updated" + author credentials**          | E-E-A-T + DSA: every review needs a named author with bio, role, conflicts-of-interest statement; "last updated" date visible; methodology page linked from every review.                                                                                                                                                                                              |
| **Editorial policy page**                        | Public, dated, versioned. Explains how operators are scored, what affiliate relationships exist, dispute handling.                                                                                                                                                                                                                                                     |
| **Transparency report**                          | Annual publication of commercial partners (DSA-aligned best practice).                                                                                                                                                                                                                                                                                                 |
| **Complaints / contact**                         | Working email + postal address. Required by EU consumer law (Directive 2011/83) and DSA.                                                                                                                                                                                                                                                                               |
| **Terms of service + privacy + cookie policies** | All three, dated, with prior-version archives.                                                                                                                                                                                                                                                                                                                         |

---

## 6. GDPR + ePrivacy

**Regulators:** national DPAs (CNIL, AEPD, Garante, ICO, AP, IMY, BfDI), EDPB. **GDPR (2016/679)** + **ePrivacy Directive 2002/58** apply.

### 6.1 Newsletter consent

- Lawful basis: **consent** (Art. 6(1)(a)). Soft opt-in does not apply (no prior commercial relationship).
- Double opt-in is best practice, effectively required in DE.
- Record: timestamp, IP, exact consent wording, privacy notice version.
- Unsubscribe: one-click in every email; honour within 24 hours.

### 6.2 Cookie consent (TCF v2.2)

- Pre-consent: only strictly necessary cookies. No analytics, GTM, Meta Pixel, affiliate pixels until consent.
- **Reject All** equally prominent as **Accept All** (CNIL + EDPB cookie banner taskforce 2023).
- IAB TCF v2.2 acceptable for programmatic; if not running programmatic, simpler self-built CMP is fine.
- No pre-ticked boxes. Scrolling/continuing is not consent.
- Categories: Necessary / Functional / Analytics / Marketing.

### 6.3 AI chat — chat queries are personal data

- Treat chat queries as personal data (GDPR Recital 26 — text + IP/session is identifiable).
- Lawful basis: consent (preferred) or legitimate interest with documented LIA.
- Inform users **before** the first message: what is logged, retention, who processes it, whether it leaves the EU.
- For OpenAI / Anthropic / Google Vertex / Mistral: sign DPA, configure zero-retention / no-training where available.
- Cross-border: SCCs + TIA for any non-EU processor.

### 6.4 Right to be forgotten

- Account-free DSAR form (email or web).
- SLA: 30 days (Art. 12(3)). Document each request.
- Chat logs: must be deletable by identifier (session ID, email, IP).
- Newsletter: deletion = ESP removal + suppression list + analytics.

### 6.5 Data-processor agreements

| Vendor                                                             | Role       | Required document                                |
| ------------------------------------------------------------------ | ---------- | ------------------------------------------------ |
| Vercel                                                             | Hosting    | Vercel DPA.                                      |
| Strapi Cloud / DB host                                             | CMS / DB   | Strapi Cloud DPA + DB host DPA (Neon, Supabase). |
| Email service (Mailchimp/Postmark/Resend)                          | Newsletter | ESP DPA + SCCs if non-EU.                        |
| Anthropic / OpenAI / Google / Mistral                              | AI chat    | Provider DPA + zero-retention.                   |
| Analytics (Plausible/Fathom/Umami; avoid GA4 unless EU-configured) | Analytics  | Provider DPA.                                    |
| Cloudflare (if used)                                               | CDN / DDoS | Cloudflare DPA.                                  |

Maintain internal **RoPA** (Art. 30) — required for non-occasional processing.

### 6.6 Cross-border transfer mechanisms

- **EU-US:** SCCs + DPF (provider must be DPF-certified) + TIA.
- **EU-UK:** UK adequacy decision applies — no SCCs needed.
- **EU-Ukraine (founder location):** Ukraine has **no** adequacy decision. If 1baraban data is accessed from Ukraine for support/admin, document via SCCs between the EU controller and the Ukrainian processor (likely founder's company), plus a TIA acknowledging martial-law context.

---

## 7. AI chat — specific risk areas

The AI chat is the single most regulator-novel surface. Treat it conservatively.

| Risk                                                          | Mitigation                                                                                                                                                                         |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Personalised gambling advice                                  | System prompt forbids personalised advice ("do I have a problem", "should I bet on X"). Default safe responses route to RG resources.                                              |
| Operator recommendations to users in restricted jurisdictions | Detect user country at session start. Restricted country: chat refuses operator-specific Q&A, serves only generic content.                                                         |
| Recommendations to self-excluded users                        | Pre-prompt asking users to confirm not self-excluded; refuse operator recommendations to anyone who declines.                                                                      |
| Under-18 exposure                                             | Chat gated behind 18+ confirmation. Reinforce in system prompt.                                                                                                                    |
| Hallucinated bonus terms / odds                               | Constrain chat to retrieve from your own vetted content (RAG over your reviews). Always include "AI may be inaccurate, see operator T&Cs" disclaimer.                              |
| Hallucinated license claims                                   | Never let model answer "is X licensed in country Y?" from memory. Route to structured lookup over your operator DB.                                                                |
| Logging sensitive disclosures                                 | Users may type "I have a gambling problem". Treat as special-category-by-handling: redact, do not retain >30 days, do not feed analytics, escalate to static help-resources reply. |
| Data retention                                                | Default: 30 days for chat logs. Exception: same-day deletion on RTBF. Document in privacy notice.                                                                                  |
| Provider data sharing                                         | Zero-retention mode where provider supports it (Anthropic — opt out of training; OpenAI — zero retention via API).                                                                 |
| Disclaimer per session                                        | "1baraban AI provides informational content only. Not financial, legal or medical advice. Gambling involves risk. If you need help, visit BeGambleAware / GamCare."                |

---

## 8. Entity setup note (founder in Ukraine, EU/UK targeting)

> **Reminder:** flagging considerations only. Engage a qualified tax/corporate lawyer in each candidate jurisdiction.

**Founder location.** Ukraine residency is **not** a regulatory blocker for UK/MGA/KSA/Spelinspektionen/GGL. None exclude Ukrainian-resident UBOs. However, banking and payment processing for Ukrainian-resident UBOs has tightened post-2022; expect more diligence from EMIs and banks.

| Option                        | Pros                                                                                                          | Cons                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **UK Ltd**                    | Cheap (~£12), trusted, Wise/Tide/Revolut Business banking                                                     | UK corp tax 25%, requires UK-resident director or office service, post-Brexit not EU. |
| **Estonian OÜ (e-Residency)** | EU entity, e-Residency suits non-EU founders, deferred corp tax (paid only on distribution), Wise/LHV banking | Small market; some EU operators prefer Malta/Cyprus counterparties.                   |
| **Cyprus Ltd**                | EU entity, 12.5% corp tax, IP Box, common in iGaming                                                          | Setup ~€2-4k, substance requirements increasingly enforced.                           |
| **Malta Ltd**                 | EU entity, gold-standard for iGaming counterparties, deep operator network                                    | Expensive, slow banking, high substance, scrutinised by EU AMLA from 2025.            |
| **Gibraltar / IoM**           | iGaming-friendly                                                                                              | Not EU; Gibraltar lost EU passporting post-Brexit.                                    |

**Initial-stage suggestion (informational):** an **Estonian OÜ** is often pragmatic for a Ukrainian-resident founder targeting EU users — EU jurisdiction, lean setup, manageable cost. If revenue scales and operator contracts demand higher-prestige counterparty, redomicile or set up Maltese/Cypriot subsidiary. Have a tax adviser model the personal-tax-residency interaction with Ukraine.

**Banking caveat.** EMIs (Wise, Revolut Business, Payoneer) will ask detailed questions during onboarding. Some blanket-decline anything gambling-adjacent — even affiliates. Plan 2-3 weeks of banking onboarding with a backup EMI lined up.

---

## 9. MVP launch compliance checklist

Binary (done / not done) items before going live.

### Legal & policies (1-7)

1. **Terms of service** published, dated, version-controlled.
2. **Privacy policy** published, GDPR-compliant, lists every processor + transfer mechanism + retention.
3. **Cookie policy** published, lists every cookie category, links to CMP preferences.
4. **Affiliate disclosure** prominently shown on every page with affiliate links.
5. **Editorial policy / methodology** page published, dated, explains scoring + commercial relationships.
6. **Complaints / contact** page with working email + postal address + response SLA.
7. **Responsible-gambling page** with country-aware helpline links + self-exclusion guidance.

### Site-wide elements (8-13)

8. **Age gate**: first-visit 18+ confirmation modal + persistent 18+ footer marker.
9. **Responsible-gambling footer block** on every gambling-content page, country-aware.
10. **License disclosure block** on every operator review/listing.
11. **Author bio + last-updated date** on every review.
12. **Geo-blocking** active for US, GCC, China, Russia, Belarus, Iran, NK, Cuba, Syria, Turkey at Vercel edge with HTTP 451.
13. **Country-aware operator filter**: only operators licensed in user's jurisdiction shown by default.

### GDPR & consent (14-20)

14. **CMP** live, Reject-All as prominent as Accept-All, no pre-ticked boxes, granular categories.
15. **No analytics, marketing or affiliate pixels fire pre-consent** (verify via Lighthouse + manual proxy).
16. **Newsletter** uses double opt-in with logged consent metadata.
17. **DSAR form** published, routed to working inbox, SLA documented.
18. **DPAs signed** with Vercel, Strapi/DB host, ESP, AI provider, analytics, CDN.
19. **RoPA** drafted and filed internally.
20. **AI-chat privacy notice** shown before first message; logs ≤30 days; zero-retention enabled with LLM provider.

### Content rules (21-25)

21. **Bonus listings** show wagering, min deposit, expiry, max bet on equal visual weight to bonus size.
22. **No "free", "risk-free", "guaranteed", urgency or scarcity language** anywhere (verify via automated content-lint).
23. **No imagery of athletes, celebrities, anyone under 25** in marketing-leaning pages.
24. **Comparison tables** sorted by editorial score, not bonus size, with visible methodology explanation.
25. **AI chat system prompt** restricts personalised advice, refuses operator-specific recs to restricted-country users, includes disclaimer in first message of every session.

### Operator vetting (26-28)

26. **Operator vetting checklist** documented and applied to every listed operator: regulator, license number, register-lookup verified by hand on first listing and quarterly.
27. **Affiliate contracts** with each operator, including content-takedown clauses and audit rights.
28. **Curaçao / unregulated operators** (if listed at all) geo-restricted server-side to lawful jurisdictions; never served to UK/EU IPs.

### Operational (29-30)

29. **Incident-response plan**: written runbook for (a) data breach (72-hour clock), (b) regulator inquiry, (c) operator content takedown demand. Named owner, escalation path.
30. **Quarterly compliance review** scheduled: regulator update sweep, content lint, geo-block test, DPA refresh, RoPA update.

---

## 10. Top regulator references

- UK Gambling Commission — https://www.gamblingcommission.gov.uk
- ASA / CAP Code — https://www.asa.org.uk
- Malta Gaming Authority — https://www.mga.org.mt
- Spelinspektionen — https://www.spelinspektionen.se
- KSA (Netherlands) — https://kansspelautoriteit.nl
- GGL (Germany) — https://www.gluecksspiel-behoerde.de
- DGOJ (Spain) — https://www.ordenacionjuego.es
- ANJ (France) — https://anj.fr
- ADM (Italy) — https://www.adm.gov.it
- Spillemyndigheden (Denmark) — https://www.spillemyndigheden.dk
- EDPB — https://www.edpb.europa.eu
- ICO — https://ico.org.uk
- BeGambleAware — https://www.begambleaware.org
- GamCare — https://www.gamcare.org.uk

---

## 11. What to do next (priority order)

1. Engage iGaming counsel (UK or Malta) for one-time pre-launch review of policies, geo-blocking matrix, operator vetting checklist.
2. Pick the entity (Estonian OÜ, UK Ltd, or Cyprus Ltd) with a tax adviser who understands the Ukrainian tax-residency interaction.
3. Build geo-blocking middleware (Vercel Edge) and country-aware operator filter **before** any operator deal is signed.
4. Stand up CMP, DSAR form and RoPA before the first newsletter sign-up or chat session.
5. Draft editorial policy, methodology and author-bio template before the first review goes live.
6. Publish a public changelog / "last updated" pattern from day one.

---

> **Final reminder.** Planning aid only, not legal advice. iGaming regulation is updated frequently (2024-2026 alone has seen material changes in DE, NL, IE, NO and Curaçao). Validate every item above with qualified counsel in priority markets before launch.
