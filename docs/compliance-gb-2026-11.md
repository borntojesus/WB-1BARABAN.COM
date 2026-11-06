# Gambling affiliate review site: legal and advertising checklist (GB primary, IE/MT secondary)

Researched 2026-11-07. **Not legal advice.** Built from web search plus page fetches; items marked [VERIFY] were not confirmed on a primary page and need a check (or a gambling lawyer) before launch. Several statutory pages (legislation.gov.uk, CMA207, GRAI) could not be fetched directly.

## 0. Core position

- Affiliates are not licensed by the UKGC and the LCCP does not bind them directly. The licensed operator is responsible for its affiliates (LCCP SR code 1.1.2), so operators will impose contract terms on you. The CAP Code applies to you directly: Section 16 scope covers "third parties, such as affiliate marketers, acting on an advertiser's behalf", and both operator and affiliate are responsible.
  - https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/page/affiliates-or-third-parties
  - https://www.asa.org.uk/type/non_broadcast/code_section/16.html
  - https://www.asa.org.uk/advice-online/affiliate-marketing.html
- Genuinely independent editorial is outside the Code, but content with affiliate links, odds or offers is treated as marketing. Even where out of remit, ASA expects the Code principles (especially under-18 rules) to be followed.
  - https://www.asa.org.uk/news/the-odds-are-it-s-an-ad-gambling-content-marketing-and-the-code.html

## 1. Which operators may be promoted to GB users

- [ ] Affiliate-link and promote only operators holding a current UKGC remote licence. Verify each on the UKGC public register before publishing and re-check periodically. Since 2014 only UKGC-licensed operators may advertise to GB consumers or provide them remote gambling (ASA's statement of the regime):
  - https://www.asa.org.uk/advice-online/betting-and-gaming-online-casinos.html
- [ ] Law: providing gambling facilities to GB users without a licence is an offence (Gambling Act 2005 s.33, remote scope via s.36); advertising unlawful gambling is an offence under s.330. The old s.331 "foreign gambling" advertising offence was repealed by the Gambling (Licensing and Advertising) Act 2014. UK government said in 2026 that there is no standalone offence of advertising unlicensed gambling beyond s.330. Treat this as: do not rely on a gap. ASA refers unlicensed-operator ads to the UKGC. [VERIFY exact current s.330 wording]
  - https://www.legislation.gov.uk/ukpga/2014/17/notes
  - https://cms.law/en/gbr/legal-updates/from-stake-to-tgp-what-you-need-to-know-about-advertising-unlicensed-gambling
- [ ] Pending: DCMS consultation (15 July 2026) on an offence of advertising or sponsorship by unlicensed operators across sectors, fixed start in Aug 2027 under one option, focused on physical advertising/sponsorship; online advertising is reported as outside this consultation (needs primary legislation). Watch it; design the site now to be compliant.
  - https://cms.law/en/gbr/legal-updates/consultation-launched-to-ban-unlicensed-gambling-sponsorship-and-advertising
  - https://www.harrishagan.com/dcms-launches-consultation-on-unlicensed-gambling-advertising-and-sponsorship-ban/
- [ ] Practical consequences of linking to offshore operators from a GB-targeted page: operator-side action by UKGC, ASA referral to the UKGC, reputational and payment-network risk, possible s.330 exposure, and loss of UKGC-licensed partners (they contractually require affiliates to behave as if licensed). [inference, no ruling found against a pure affiliate]

## 2. Curaçao-licensed crypto casinos (plain answer)

- Curaçao licences give no right to serve GB players. Do **not** put affiliate or tracking links, bonus codes, "visit site" buttons, or "best casino" rankings alongside licensed brands for them on any GB-facing page.
- If reviewed at all, treat it as editorial information only:
  - [ ] no affiliate link, no referral code, no commission, not in "top lists" or comparison tables with licensed brands;
  - [ ] clear boxed notice at the top: "This operator is not licensed by the UK Gambling Commission and is not available to players in Great Britain. We do not link to it. Using unlicensed sites means no UK consumer protections, no GAMSTOP, no access to UK dispute resolution."
  - [ ] no bonus figures, no "how to sign up", no VPN or workaround hints; factual and critical tone.
  - [ ] Best option for a GB-first site: do not review them on GB pages at all, or keep a separate non-GB "information" section clearly walled off. Also note the Curaçao Gaming Authority itself warned in 2025 about operators relying on foreign B2C licences, so Curaçao status is a weak trust signal.
  - https://www.soloazar.com/en/category/legislation/curacao-to-strengthen-enforcement-against-illegal-gaming-activities
  - https://www.thelines.com/uk/legal-betting/could-a-gambling-advertising-ban-help-illegal-operators/

## 3. Required notices (site-wide)

- [ ] 18+ clearly shown on every page (header/footer) and next to each offer. CAP Section 16 does not itself prescribe 18+ wording; this is industry convention plus operator contract terms. [VERIFY with operator affiliate T&Cs and CAP 16 text]
- [ ] Safer gambling message near offers and in the footer: "Gambling can be addictive. Play responsibly." with links to GambleAware (BeGambleAware) and the National Gambling Helpline (0808 8020 133), GAMSTOP (self-exclusion for GB-licensed sites), and GamCare. [VERIFY helpline number and current branding on gambleaware.org / gamcare.org.uk / gamstop.co.uk]
- [ ] Must not target under-18s: no placement in youth media; do not feature anyone who is or appears under 25 gambling; no strong-appeal content (see 5). Rule refs: CAP 16.3.x.
  - https://www.asa.org.uk/type/non_broadcast/code_section/16.html
- [ ] Separate page: responsible gambling / how we review / how we earn money (see 4, 7).

## 4. Affiliate disclosure

- [ ] Content must be obviously identifiable as marketing. If a page is wholly about affiliate products, label it before the reader engages (e.g. "Ad" or "Advertisement: we earn commission if you sign up" in the headline area). Footer-only disclaimers are usually insufficient. If only some links are affiliate, mark those links.
- [ ] Avoid vague wording ("may earn commission"); the standalone label "affiliate" was ruled insufficient. Use plain text such as "Ad. We are paid when you join through our links."
- [ ] If all offers are affiliate-linked, say so to every visitor on the page, not only on About or Terms.
- [ ] Optional extra: state that you earn a share. Not required by the Code.
  - https://www.asa.org.uk/advice-online/affiliate-marketing.html
- [ ] CMA: hidden advertising and failing to identify commercial intent is a possible unfair commercial practice under the DMCC Act regime (CMA207, updated 18 Nov 2025; CMA hidden-advertising guidance). [VERIFY CMA wording on affiliate links]
  - https://www.gov.uk/government/publications/unfair-commercial-practices-cma207/unfair-commercial-practices
  - https://assets.publishing.service.gov.uk/media/68b81754536d629f9c82aa16/Who_regulates_hidden_advertising.pdf
- [ ] rel attributes: no regulator source found. Google's guidance (not legal) is `rel="sponsored"` (add `nofollow`) on affiliate links; `rel="sponsored nofollow noopener"` is a reasonable default. Do not rely on rel as disclosure; it is invisible to readers.

## 5. Bonus and promotion presentation

- [ ] CAP Code rule 8.17: state significant conditions clearly and prominently near the headline offer; less significant terms at most one click away via a clear link (not buried in footers or small print). If unsure whether a condition is significant, include it. Rule 8.18 for limited space: give as much as practicable plus a link.
  - https://www.asa.org.uk/advice-online/gambling-betting-and-gaming-free-bets-and-bonuses.html
  - https://www.asa.org.uk/static/uploaded/08173495-b3af-40a3-943fd92505be58c2.pdf
- [ ] Significant conditions include: minimum deposit, wagering requirement, min odds or bet type, time limits (incl. claim/reply deadlines), eligibility limits, excluded payment methods, stake limits on matched offers, new customers only, T&Cs apply, 18+.
- [ ] Wagering: UKGC rules in force 19 Jan 2026 cap bonus wagering requirements at 10x and ban mixed-product promotions (e.g. betting plus slots). Do not display or promote older 35x/50x offers; operators reportedly must comply, so a stale figure on your site is a misleading claim. Check each offer on the operator's current T&Cs and put a "last checked" date on it.
  - https://www.gamblingcommission.gov.uk/news/article/gambling-promotions-to-be-safer-and-simpler
- [ ] Wording: "free" only if the customer does not risk their own money to qualify; "risk free" only if the customer genuinely cannot lose their own funds; "money back" must be cash if so described.
  - https://www.asa.org.uk/advice-online/gambling-betting-and-gaming-free-bets-and-bonuses.html
- [ ] Inducements must not encourage excessive or harmful play; rewards must not escalate faster than spend.
  - https://www.asa.org.uk/advice-online/betting-and-gaming-online-casinos.html
- [ ] Dated, specific, accurate claims; avoid superlatives you cannot substantiate (CAP Section 3 applies).

## 6. Prohibited content (CAP Section 16)

- [ ] No strong appeal to under-18s (stricter test since 1 Oct 2022): no cartoon or youth culture themes, no top-flight footballers or influencers with under-18 following (guidance rule of thumb: ~100,000 under-18 followers across platforms indicates strong appeal). AI-generated depictions of players have been ruled against.
  - https://www.asa.org.uk/advice-online/betting-and-gaming-appeal-to-children.html
  - https://www.asa.org.uk/news/tough-new-rules-to-curb-broad-appeal-of-gambling-ads-and-better-protect-under-18s.html
- [ ] No one who is or seems under 25 gambling or in a significant role (18-24 only on operator sites where a bet can be placed).
- [ ] No suggestion that gambling solves financial problems, is an alternative to a job, a route to financial security, an "investment", or guaranteed wins; no escapism claims (relieving loneliness or depression); no social-success or sexual-success claims.
  - https://www.asa.org.uk/advice-online/gambling-betting-and-gaming-personal-financial-problems.html
- [ ] No urgency that pressures play ("last chance, bet now") and no encouragement of regular, fixed-schedule or large-stake play; real expiry dates of an offer are significant conditions and may be stated factually. [urgency: no explicit CAP rule found; derived from 16.1 and the responsibility guidance]
- [ ] No "guaranteed" tips, systems or betting-strategy promises.

## 7. Reviews, scores and ratings (DMCC Act 2024, in force 6 April 2025)

- [ ] Fake or misleading reviews and concealed incentivised reviews are banned; CMA can fine up to 10% of global turnover; CMA began active checks in 2025. Applies to anyone publishing consumer reviews, so do not publish invented "player reviews", testimonials or AI-generated ones as real.
  - https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf
  - https://cms.law/en/gbr/legal-updates/the-dmcc-act-consumer-elements-come-into-force-from-6-april-2025
- [ ] Editorial scores: publish your methodology, make clear scores are your opinion, and explain that commission may exist but does not set the score. Do not let commission rank order overrule stated criteria without saying "ranking influenced by commission" or equivalent. [practice recommendation; CMA expects review info not to mislead by omission]
- [ ] If you ever show user reviews: have a written policy against fake reviews and on incentivised reviews, take reasonable and proportionate steps to detect and remove fakes, and disclose any incentive. Simplest: no user reviews.
- [ ] Do not suppress negative operator facts (withdrawal issues, licence history) while publishing positive ones.

## 8. GDPR and cookies for a static site with no analytics

- [ ] No analytics and no non-essential storage means no cookie banner is needed under PECR; analytics cookies are not "strictly necessary". Still publish a short privacy notice (what, if anything, is processed: server logs, hosting provider, contact form, newsletter).
  - https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/
- [ ] Watch third-party embeds (YouTube, social widgets, fonts from CDNs, operator banners/iframes): they can set cookies and require consent. Self-host fonts and images; use click-to-load embeds. Affiliate redirect links to operators that set cookies on their own domain are the operator's responsibility, but tell users in the privacy notice that clicking leads to third-party sites with their own cookies.
- [ ] EU/IE readers: same logic under ePrivacy and GDPR (EU rules still require consent for non-essential cookies). Also state a contact and, if you use a form or newsletter, lawful basis and retention. Email marketing needs PECR/GDPR consent; remove self-excluded people if you ever email gambling offers (UKGC expectation on operators passes to you by contract).
  - https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/page/affiliates-or-third-parties

## 9. Ireland and Malta (secondary readers)

- Ireland: Gambling Regulation Act 2024 requires a GRAI licence to offer gambling to people in Ireland, wherever the operator is based. Remote betting licences from 1 July 2026; in-person from 1 December 2026. As of Oct 2026 Dáil answers, the advertising provisions (including the s.149 5:30am to 9pm watershed for broadcast) are **not yet commenced**; GRAI has published guidance on advertising obligations and says further regulations are to follow on a date to be confirmed. Nothing found that specifically covers affiliates. [VERIFY at grai.ie before launch]
  - https://www.grai.ie/guidance-on-advertising-obligations
  - https://www.drugsandalcohol.ie/47032/
  - https://www.arthurcox.com/knowledge/whats-new-under-the-gambling-regulation-act-2024/
  - https://www.olbg.com/news/irelands-gambling-ad-watershed-law-it-still-isnt-switched
- Site approach for IE: promote only GRAI-licensed operators to Irish readers once the register is populated; until then, say clearly that licensing is new, show only operators whose Irish status you verified, and do not state or imply that an operator is licensed in Ireland without checking. Apply the UK-grade rules (18+, safer gambling, no under-18 appeal) as the baseline. Irish helpline details: use Gambling Awareness Trust / GRAI resources [VERIFY].
- Malta: MGA licence does not authorise services to GB (UKGC) or Ireland (GRAI). Do not present MGA as sufficient for GB/IE readers. Malta-specific affiliate requirements were not researched; check MGA directives only if targeting Malta residents. [NOT RESEARCHED]

## 10. Launch checklist (short)

1. Operator list: UKGC register check, dated; removal process.
2. Header "18+ | Ad", offer-level 18+, T&Cs apply, safer gambling footer + GamCare/GambleAware/GAMSTOP.
3. Ad/disclosure label at top of every affiliate page, with plain wording.
4. Bonus tables: headline plus significant terms adjacent; 10x cap compliant; "last checked" date.
5. Methodology and "how we make money" pages; no fake reviews.
6. No Curaçao/offshore affiliate links; unlicensed notice if mentioned at all.
7. Content QA pass for under-18 appeal, financial-success claims, "risk-free/free" claims.
8. Privacy notice; no analytics; self-host assets.
9. Recheck: UKGC register, DCMS consultation outcome, GRAI commencement, CMA207 updates, operator T&Cs.
