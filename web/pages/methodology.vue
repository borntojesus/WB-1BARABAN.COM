<script setup lang="ts">
const pillars = [
  {
    label: 'License & Safety',
    weight: 30,
    summary: 'Regulator tier, licence verifiability, complaint-handling track record, fund segregation.',
    detail: 'We treat licensing as a floor, not a feature. Tier-1 regulators (UKGC, MGA, Spelinspektionen, KSA, Gibraltar) score materially higher than offshore licences (Curaçao, Anjouan), because tier-1 jurisdictions impose meaningful complaint-handling, segregation-of-funds, and self-exclusion requirements. We verify every licence number against the regulator\'s public register at review time and re-verify quarterly. Sanctions and licence suspensions are checked in the regulator\'s news feed.',
  },
  {
    label: 'Banking & Payouts',
    weight: 20,
    summary: 'Real withdrawal speed, fees, deposit/withdrawal method coverage, KYC friction.',
    detail: 'Marketing pages claim "instant withdrawals." Reality is messier. We test withdrawal speed with real account placements, recording the time from request to settled funds — separately for crypto and fiat rails. We also score fees (some operators quietly take 1-2% on withdrawals), KYC threshold (full KYC at signup vs. soft KYC triggered at €5k volume materially affects the player experience), and method coverage.',
  },
  {
    label: 'Bonuses (true value)',
    weight: 15,
    summary: 'Welcome offer expected value after wagering, max-bet rules, eligible-game restrictions.',
    detail: 'Headline bonus numbers are misleading. A "200% up to €2,000" bonus with 50× wagering is mathematically negative-EV at typical 96% slot RTP. We score bonuses on expected value after wagering — accounting for wagering multiplier, max-bet during clearing, eligible-game RTP weighting, and expiry. We publish the math.',
  },
  {
    label: 'Player Experience',
    weight: 15,
    summary: 'UX quality, mobile, performance, account features, game library depth.',
    detail: 'A site that loses your session mid-spin loses points. We score load performance (Core Web Vitals on a mid-range phone over 4G), mobile UX, account-management depth (limit-setting, session timers, transaction history clarity), and game library depth weighted by provider quality — not raw count.',
  },
  {
    label: 'Support',
    weight: 10,
    summary: 'Live chat availability, response time, dispute escalation paths.',
    detail: 'We initiate at least three support contacts per review across off-peak hours. We score availability (24/7 vs. business hours), response time, and — critically — quality of escalation. An operator that auto-replies "your dispute is under review" for 14 days scores worse than one that gives a real human in 90 seconds, even if both eventually resolve.',
  },
  {
    label: 'Complaints',
    weight: 10,
    summary: 'Volume, severity, and resolution rate of public complaints across forums and ADR bodies.',
    detail: 'We aggregate public complaint data from regulator ADR (alternative dispute resolution) bodies, AskGamblers, Trustpilot (filtered for verified reviews), and Reddit. We score volume normalised by operator size, severity (a single confiscation case weighs more than 50 "withdrawal was slow" reports), and resolution rate (did the operator engage and resolve, or stonewall?). The (n=) count next to each operator\'s Complaints score is the sample size.',
  },
] as const

const changelog = [
  { version: 'v2.4', date: '2026-04-01', changes: 'Increased Banking & Payouts from 18% → 20%, reduced License & Safety from 32% → 30% to reflect post-2025 banking-rail volatility.' },
  { version: 'v2.3', date: '2026-01-15', changes: 'Added max-bet-during-bonus-clearing as a sub-factor under Bonuses. Documented per-vertical weight overrides.' },
  { version: 'v2.2', date: '2025-10-01', changes: 'Switched complaint-volume normalisation from raw count to count-per-month-per-1k-monthly-active-users.' },
  { version: 'v2.1', date: '2025-07-01', changes: 'Initial public methodology release.' },
] as const

useSeoMeta({
  title: 'Trust Index methodology v2.4',
  description: 'How 1baraban scores online gambling operators. Six pillars, public weights, quarterly re-verification — full transparency on the rating process.',
  ogTitle: '1baraban Trust Index methodology v2.4',
  ogDescription: 'Public, weighted, quarterly re-verified. The full scoring rubric.',
  ogType: 'article',
})

useSchemaOrg([
  defineWebPage({
    name: 'Trust Index methodology v2.4',
    description: 'Public scoring rubric for online gambling operator reviews.',
  }),
])
</script>

<template>
  <article class="meth">
    <section class="meth-hero hero-gradient">
      <div class="container-narrow meth-hero-inner">
        <p class="meth-eyebrow mono">methodology · v2.4</p>
        <h1 class="meth-title">How we score operators.</h1>
        <p class="meth-tagline">
          Six pillars. Public weights. Quarterly re-verification. Operators
          can&rsquo;t pay to move up — and we publish the math.
        </p>
      </div>
    </section>

    <section class="container-narrow meth-body">
      <section class="meth-section">
        <h2 class="meth-h2">The Trust Index, in plain English</h2>
        <p>
          Every operator on 1baraban is scored on a 0–10 Trust Index. The score
          is a weighted average of six pillars, each scored independently
          on the same 0–10 scale. The pillars and their weights are below — they
          are public, they are versioned, and they are the same rubric we apply
          internally before we ever publish a review.
        </p>
        <p>
          We don&rsquo;t accept payment for placement. We do accept affiliate revenue
          when readers click through to operators we&rsquo;ve already rated — this is
          disclosed on every page and explained in our
          <NuxtLink to="/affiliate-disclosure">affiliate disclosure</NuxtLink>.
        </p>
      </section>

      <section class="meth-section" id="pillars">
        <h2 class="meth-h2">The six pillars</h2>
        <p class="meth-pillars-intro">
          Vertical-specific overrides apply (poker downweights "Bonuses",
          sportsbooks reweight "Player Experience" toward odds quality). The
          base weighting below is what runs by default.
        </p>
        <div class="meth-pillars">
          <article v-for="p in pillars" :key="p.label" class="meth-pillar">
            <header class="meth-pillar-head">
              <h3 class="meth-pillar-name">{{ p.label }}</h3>
              <span class="meth-pillar-weight mono">{{ p.weight }}%</span>
            </header>
            <p class="meth-pillar-summary">{{ p.summary }}</p>
            <p class="meth-pillar-detail">{{ p.detail }}</p>
          </article>
        </div>
      </section>

      <section class="meth-section" id="bands">
        <h2 class="meth-h2">Score bands</h2>
        <p>The Trust Index is a continuous 0–10 score, but for quick comparison the bands below correspond to the colours you&rsquo;ll see on operator cards and gauges.</p>
        <table class="meth-table">
          <thead>
            <tr>
              <th>Score</th>
              <th>Band</th>
              <th>What it means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">9.0–10</td>
              <td><span class="band band-gold">Exceptional</span></td>
              <td>Tier-1 license, fast verified payouts, low complaint volume, premium UX. Reserved for operators that materially outperform peers across every pillar.</td>
            </tr>
            <tr>
              <td class="mono">7.5–8.9</td>
              <td><span class="band band-good">Recommended</span></td>
              <td>Solid licensing, no significant red flags, competitive offer. The bulk of well-run operators.</td>
            </tr>
            <tr>
              <td class="mono">6.0–7.4</td>
              <td><span class="band band-mid">Cautious</span></td>
              <td>Functional but with material flaws — slow payouts, weak licensing, complaint volume. Read the review before signing up.</td>
            </tr>
            <tr>
              <td class="mono">4.0–5.9</td>
              <td><span class="band band-warn">Avoid</span></td>
              <td>Multiple serious issues. We don&rsquo;t recommend depositing.</td>
            </tr>
            <tr>
              <td class="mono">0–3.9</td>
              <td><span class="band band-bad">Blacklisted</span></td>
              <td>Confirmed predatory practices, unresolved fund-confiscation reports, or licence suspension. Never deposit.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="meth-section" id="re-verification">
        <h2 class="meth-h2">Re-verification cadence</h2>
        <p>
          Operator scores are not static. We re-verify every operator on a
          quarterly cadence — license status against the regulator&rsquo;s register,
          fresh withdrawal-speed test, fresh complaint scrape, and a
          re-walkthrough of UX changes. The "Verified" date on every review
          card and gauge is when this last happened. The "Next review due"
          date is our commitment.
        </p>
        <p>
          When an operator&rsquo;s score changes by more than 0.5 between reviews,
          we publish a changelog entry on the operator page explaining what
          changed and why.
        </p>
      </section>

      <section class="meth-section" id="changelog">
        <h2 class="meth-h2">Methodology changelog</h2>
        <p>The methodology itself evolves. Significant changes are logged here.</p>
        <ul class="meth-changelog">
          <li v-for="entry in changelog" :key="entry.version">
            <p class="meth-changelog-head">
              <span class="meth-changelog-version mono">{{ entry.version }}</span>
              <span class="meth-changelog-date mono">{{ entry.date }}</span>
            </p>
            <p class="meth-changelog-text">{{ entry.changes }}</p>
          </li>
        </ul>
      </section>

      <section class="meth-section" id="conflicts">
        <h2 class="meth-h2">Conflicts of interest</h2>
        <p>
          Reviewers do not hold financial positions in the operators they review.
          Affiliate income is paid at the publisher level — never to individual
          reviewers, and never tied to a specific operator&rsquo;s performance in
          ranking. Reviewers receive bylines and credentials so readers can
          assess their background directly.
        </p>
        <p>
          Disagree with a score? Email
          <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a>
          with the operator, the pillar, and your evidence. We re-open reviews
          when readers surface verifiable new information.
        </p>
      </section>
    </section>
  </article>
</template>

<style scoped>
.meth-hero { padding: var(--space-12) 0 var(--space-12); }
.meth-hero-inner { text-align: center; }
.meth-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-3);
}
.meth-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: var(--space-4);
}
.meth-tagline {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.55;
}

.meth-body { padding: var(--space-12) var(--space-6) var(--space-16); }
.meth-section {
  margin-bottom: var(--space-12);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}
.meth-h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  letter-spacing: -0.025em;
  margin-bottom: var(--space-5);
}
.meth-section p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}
.meth-section p :deep(a),
.meth-section :deep(a) { color: var(--accent-primary); border-bottom: 1px dotted var(--accent-primary); }

.meth-pillars-intro {
  border-left: 2px solid var(--accent-primary);
  padding-left: var(--space-4);
  margin-bottom: var(--space-8);
}
.meth-pillars { display: flex; flex-direction: column; gap: var(--space-4); }
.meth-pillar {
  padding: var(--space-5) var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.meth-pillar-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}
.meth-pillar-name {
  font-size: var(--text-xl);
  font-weight: 600;
  margin: 0;
}
.meth-pillar-weight {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--accent-primary);
  letter-spacing: -0.02em;
}
.meth-pillar-summary {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}
.meth-pillar-detail {
  font-size: 14px;
  margin-bottom: 0;
}

.meth-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid var(--border);
  margin-top: var(--space-3);
}
.meth-table tr { border-bottom: 1px solid var(--border); }
.meth-table th, .meth-table td {
  text-align: left;
  padding: var(--space-3);
  vertical-align: top;
  font-size: 14px;
}
.meth-table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  font-weight: 500;
}
.band {
  display: inline-flex;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--radius-full);
  border: 1px solid currentColor;
}
.band-gold { color: var(--accent-gold); }
.band-good { color: var(--accent-success); }
.band-mid { color: var(--text-secondary); }
.band-warn { color: var(--accent-warn); }
.band-bad { color: var(--accent-danger); }

.meth-changelog { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.meth-changelog li {
  padding: var(--space-4);
  border-left: 2px solid var(--border);
  padding-left: var(--space-5);
}
.meth-changelog-head {
  display: flex;
  gap: var(--space-3);
  align-items: baseline;
  margin-bottom: var(--space-2) !important;
}
.meth-changelog-version {
  font-weight: 600;
  color: var(--accent-primary);
  font-size: var(--text-base);
}
.meth-changelog-date {
  font-size: 12px;
  color: var(--text-tertiary);
}
.meth-changelog-text {
  font-size: 14px;
  margin-bottom: 0 !important;
}
</style>
