<script setup lang="ts">
const tools = [
  {
    name: 'Deposit limits',
    detail: 'Set a daily, weekly, or monthly cap on what you can deposit. Available at every tier-1 licensed operator on this site. Reductions take effect immediately; increases require a 24-hour cool-off (UKGC) or longer.',
  },
  {
    name: 'Loss limits',
    detail: 'A cap on net losses over a chosen period. Bites earlier than deposit limits if you\'re recycling withdrawals back into wagers.',
  },
  {
    name: 'Session timers',
    detail: 'Force a hard stop after a set time logged in. Particularly useful for slot play, where session length is the strongest predictor of total loss.',
  },
  {
    name: 'Reality checks',
    detail: 'Mid-session pop-ups showing your time logged in and net P&L. Available across most MGA and UKGC operators.',
  },
  {
    name: 'Self-exclusion',
    detail: 'Block your account for a set period (24 hours, 7 days, 6 months, or permanent). Tier-1 operators are required to honour this without contesting it.',
  },
  {
    name: 'GAMSTOP (UK) / multi-operator self-exclusion',
    detail: 'A single self-exclusion that propagates across every UKGC-licensed operator. Free. Use this when individual self-exclusions aren\'t holding.',
  },
] as const

const helplines = [
  { region: 'UK', name: 'GamCare', phone: '0808 8020 133', web: 'https://www.gamcare.org.uk/' },
  { region: 'UK', name: 'BeGambleAware', phone: '0808 8020 133', web: 'https://www.begambleaware.org/' },
  { region: 'Ireland', name: 'GamblingCare.ie', phone: '+353 1 822 5050', web: 'https://www.gamblingcare.ie/' },
  { region: 'Global', name: 'Gambling Therapy', phone: 'Online chat 24/7', web: 'https://www.gamblingtherapy.org/' },
  { region: 'EU', name: 'EUGamble (multi-country)', phone: 'Country-specific', web: 'https://www.eugamble.eu/' },
] as const

useSeoMeta({
  title: 'Responsible gambling resources',
  description: 'Tools, helplines, and self-assessment guides for staying in control of gambling. Free, confidential support across the EU and UK.',
  ogTitle: 'Responsible gambling — 1baraban',
  ogDescription: 'Set limits. Get help. Block yourself if you need to. Resources that work.',
})

useSchemaOrg([
  defineWebPage({
    name: 'Responsible gambling resources',
    description: 'Tools, helplines, and self-exclusion guidance.',
  }),
])
</script>

<template>
  <article class="rg">
    <section class="rg-hero hero-gradient">
      <div class="container-narrow rg-hero-inner">
        <p class="rg-eyebrow mono">responsible gambling</p>
        <h1 class="rg-title">It&rsquo;s a game.<br /><span class="gradient-text-violet">Until it isn&rsquo;t.</span></h1>
        <p class="rg-tagline">
          Most people can gamble without harm. A meaningful minority cannot.
          Knowing the difference — and acting on it — is the single most
          important thing you can do for yourself if you play.
        </p>
      </div>
    </section>

    <section class="container-narrow rg-body">
      <section class="rg-section">
        <h2 class="rg-h2">Self-check: am I still in control?</h2>
        <p>
          The questions below are adapted from the Problem Gambling Severity
          Index (PGSI). If you answer "sometimes" or "often" to two or more,
          we strongly suggest engaging the helplines further down this page.
          Honest self-assessment is the start. It is not a diagnosis.
        </p>
        <ul class="rg-checklist">
          <li>Have you bet more than you could really afford to lose?</li>
          <li>Have you needed to gamble with larger amounts to get the same excitement?</li>
          <li>Have you returned another day to try and win back what you lost?</li>
          <li>Have you borrowed money or sold anything to get money to gamble?</li>
          <li>Have you felt that gambling has caused you any health problems, including stress or anxiety?</li>
          <li>Have people criticised your gambling, or told you that you had a problem — regardless of whether you thought it was true?</li>
          <li>Has your gambling caused financial problems for you or your household?</li>
          <li>Have you felt guilty about the way you gamble, or what happens when you gamble?</li>
        </ul>
      </section>

      <section class="rg-section">
        <h2 class="rg-h2">Tools every operator should give you</h2>
        <p>
          Tier-1 licensed operators (UKGC, MGA, Spelinspektionen, KSA) are
          required to provide all of the tools below. If you can&rsquo;t find one of
          these in your account settings at a tier-1 operator, escalate to
          their support — it&rsquo;s a regulatory obligation, not a courtesy.
        </p>
        <ul class="rg-tools">
          <li v-for="t in tools" :key="t.name">
            <p class="rg-tool-name">{{ t.name }}</p>
            <p class="rg-tool-detail">{{ t.detail }}</p>
          </li>
        </ul>
      </section>

      <section class="rg-section">
        <h2 class="rg-h2">Free, confidential helplines</h2>
        <p>
          Every helpline below is free, confidential, and not connected to any
          operator. They will not push you toward any particular product or
          service. They will listen.
        </p>
        <table class="rg-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Service</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in helplines" :key="h.name">
              <td class="mono">{{ h.region }}</td>
              <td>{{ h.name }}</td>
              <td>
                <a :href="h.web" rel="noopener" target="_blank">{{ h.web.replace(/https?:\/\//, '') }} ↗</a><br />
                <span class="rg-table-phone mono">{{ h.phone }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="rg-section">
        <h2 class="rg-h2">If you&rsquo;re a friend or family member</h2>
        <p>
          If someone close to you is showing signs of problem gambling, the
          temptation to confront, control, or "fix it" is strong — and largely
          ineffective. The services above also support family members
          directly. <a href="https://www.gamanon.org.uk/" rel="noopener" target="_blank">Gam-Anon</a>
          (UK) and equivalents in other countries focus exclusively on
          supporting family members of problem gamblers. Use them.
        </p>
      </section>

      <section class="rg-section">
        <h2 class="rg-h2">A note from us</h2>
        <p>
          1baraban earns money when people gamble. We are aware of that
          tension. We refuse to write content that pressures readers toward
          deposits, ranks operators by aggression of bonus offers, or downplays
          risk. The Trust Index materially upweights operators that take
          responsible-gambling tooling seriously. We don&rsquo;t consider that
          a marketing position — we consider it a baseline.
        </p>
        <p>
          18+ only. Gambling can be addictive. If you need help, the resources
          on this page are real, free, and confidential.
        </p>
      </section>
    </section>
  </article>
</template>

<style scoped>
.rg-hero { padding: var(--space-16) 0; text-align: center; }
.rg-hero-inner { max-width: 720px; }
.rg-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-4);
}
.rg-title {
  font-size: clamp(2.25rem, 6vw, 4rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: var(--space-5);
}
.rg-tagline {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.55;
}
.rg-body { padding: var(--space-12) var(--space-6) var(--space-16); }
.rg-section { margin-bottom: var(--space-12); }
.rg-h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  letter-spacing: -0.025em;
  margin-bottom: var(--space-5);
}
.rg-section p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}
.rg-section :deep(a) { color: var(--accent-primary); border-bottom: 1px dotted var(--accent-primary); }

.rg-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.rg-checklist li {
  position: relative;
  padding: var(--space-3) var(--space-4) var(--space-3) var(--space-8);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.55;
}
.rg-checklist li::before {
  content: '?';
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  color: var(--accent-primary);
  font-weight: 600;
}
.rg-tools { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.rg-tools li {
  padding-left: var(--space-5);
  border-left: 2px solid var(--accent-success);
}
.rg-tool-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2) !important;
  font-size: var(--text-lg);
}
.rg-tool-detail {
  font-size: 14px;
  margin-bottom: 0 !important;
}

.rg-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid var(--border);
}
.rg-table tr { border-bottom: 1px solid var(--border); }
.rg-table th, .rg-table td {
  text-align: left;
  padding: var(--space-3) var(--space-2);
  font-size: 14px;
  vertical-align: top;
}
.rg-table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  font-weight: 500;
}
.rg-table-phone { font-size: 12px; color: var(--text-tertiary); }
</style>
