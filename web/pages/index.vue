<script setup lang="ts">
import { mockOperators } from '~/data/operators'

const verticals = [
  {
    slug: 'online-casinos',
    name: 'Online casinos',
    eyebrow: 'casino',
    blurb: 'Crypto-native and EU-licensed casinos, scored on banking speed and license tier.',
    count: mockOperators.filter(o => o.verticals.includes('casino')).length,
  },
  {
    slug: 'sports-betting',
    name: 'Sportsbooks',
    eyebrow: 'sportsbook',
    blurb: 'Pre-match and live odds, bet builders, cash-out — analysed for fairness, not flash.',
    count: mockOperators.filter(o => o.verticals.includes('sportsbook')).length,
  },
  {
    slug: 'poker',
    name: 'Poker rooms',
    eyebrow: 'poker',
    blurb: 'Cash-game traffic, rake structures, rakeback — the metrics that actually move EV.',
    count: mockOperators.filter(o => o.verticals.includes('poker')).length,
  },
  {
    slug: 'slots',
    name: 'Slot sites',
    eyebrow: 'slot',
    blurb: 'Provider depth, RTP transparency, free-spin terms that don\'t lock your money.',
    count: mockOperators.filter(o => o.verticals.includes('slot')).length,
  },
] as const

const topOperators = computed(() =>
  [...mockOperators].sort((a, b) => b.score - a.score).slice(0, 5)
)

const stats = {
  operators: mockOperators.length,
  avgScore: (mockOperators.reduce((s, o) => s + o.score, 0) / mockOperators.length).toFixed(1),
  methodology: 'v2.4',
  lastUpdated: '2026-04-30',
}

useSeoMeta({
  title: 'Independent iGaming Reviews',
  description: 'Find a gambling site you can actually trust. Independent reviews, public methodology, AI concierge. Casinos, sportsbooks, poker, slots — EU and global.',
  ogTitle: '1baraban — Independent iGaming Reviews',
  ogDescription: 'Public methodology. Verified licenses. AI concierge that only recommends operators we\'ve reviewed.',
  ogType: 'website',
})

useSchemaOrg([
  defineWebPage({
    name: 'Independent iGaming Reviews',
    description: 'Trust Index reviews of online casinos, sportsbooks, poker rooms and slot sites.',
  }),
  defineItemList({
    itemListElement: topOperators.value.map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://1baraban.com/reviews/${op.slug}`,
      name: op.name,
    })),
  }),
])
</script>

<template>
  <div class="home">
    <section class="home-hero hero-gradient">
      <div class="container-page home-hero-inner">
        <p class="home-eyebrow mono">independent iGaming reviews</p>
        <h1 class="home-title">
          Find a gambling site<br />
          <span class="gradient-text-violet">you can actually trust.</span>
        </h1>
        <p class="home-tagline">
          Trust Index scoring with public methodology. Verified licenses, real payout speeds,
          honest bonus math — and an AI concierge that won't recommend an operator we haven't reviewed.
        </p>

        <div class="home-ai">
          <AIAIConciergeInput size="lg" :show-starters="true" />
        </div>

        <div class="home-stats">
          <div class="home-stat">
            <p class="home-stat-value mono">{{ stats.operators }}</p>
            <p class="home-stat-label mono">operators reviewed</p>
          </div>
          <div class="home-stat">
            <p class="home-stat-value mono">{{ stats.avgScore }}</p>
            <p class="home-stat-label mono">average Trust Index</p>
          </div>
          <div class="home-stat">
            <p class="home-stat-value mono">{{ stats.methodology }}</p>
            <p class="home-stat-label mono">methodology version</p>
          </div>
          <div class="home-stat">
            <p class="home-stat-value mono">{{ stats.lastUpdated }}</p>
            <p class="home-stat-label mono">last verified</p>
          </div>
        </div>
      </div>
    </section>

    <section class="home-verticals">
      <div class="container-page">
        <header class="home-section-head">
          <h2 class="home-section-title">Pick a vertical</h2>
          <p class="home-section-sub">Each hub ranks operators by Trust Index — same methodology, vertical-specific weighting.</p>
        </header>
        <div class="home-vert-grid">
          <NuxtLink
            v-for="v in verticals"
            :key="v.slug"
            :to="`/${v.slug}`"
            class="home-vert-card"
          >
            <p class="home-vert-eyebrow mono">{{ v.eyebrow }}</p>
            <h3 class="home-vert-name">{{ v.name }}</h3>
            <p class="home-vert-blurb">{{ v.blurb }}</p>
            <div class="home-vert-foot">
              <span class="mono home-vert-count">{{ v.count }} reviewed</span>
              <span class="home-vert-arrow" aria-hidden="true">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="home-top">
      <div class="container-page">
        <header class="home-section-head">
          <h2 class="home-section-title">Top operators across all verticals</h2>
          <p class="home-section-sub">
            <span class="mono">methodology v2.4</span> · sorted by editorial Trust Index
          </p>
        </header>
        <div class="home-op-grid">
          <OperatorCard v-for="op in topOperators" :key="op.slug" :operator="op" />
        </div>
      </div>
    </section>

    <section class="home-promise">
      <div class="container-page home-promise-inner">
        <h2 class="home-promise-title">What we promise</h2>
        <div class="home-promise-grid">
          <div class="home-promise-item">
            <p class="home-promise-eyebrow mono">no pay-to-rank</p>
            <p class="home-promise-text">Editorial scores are not for sale. Operators can't pay to move up.</p>
          </div>
          <div class="home-promise-item">
            <p class="home-promise-eyebrow mono">public methodology</p>
            <p class="home-promise-text">
              Every weight is public. Every change is logged.
              <NuxtLink to="/methodology">Read it</NuxtLink>.
            </p>
          </div>
          <div class="home-promise-item">
            <p class="home-promise-eyebrow mono">verified licenses</p>
            <p class="home-promise-text">License numbers link directly to the regulator's public register. Click and check.</p>
          </div>
          <div class="home-promise-item">
            <p class="home-promise-eyebrow mono">honest affiliate</p>
            <p class="home-promise-text">
              We earn from affiliate links — never from positive coverage.
              <NuxtLink to="/affiliate-disclosure">How it works</NuxtLink>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="container-page home-rg">
      <ComplianceResponsibleGamblingBlock variant="full" />
    </section>
  </div>
</template>

<style scoped>
.home-hero {
  padding: clamp(var(--space-16), 14vw, var(--space-24)) 0 var(--space-16);
  position: relative;
}
.home-hero-inner {
  max-width: 880px;
  text-align: center;
}
.home-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-4);
}
.home-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.04;
  margin: 0 0 var(--space-5);
}
.home-tagline {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  line-height: 1.55;
  max-width: 640px;
  margin: 0 auto var(--space-10);
}
.home-ai {
  max-width: 720px;
  margin: 0 auto var(--space-12);
  text-align: left;
}
.home-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
  max-width: 640px;
  margin: 0 auto;
  padding-top: var(--space-8);
  border-top: 1px solid var(--border);
}
@media (min-width: 640px) {
  .home-stats { grid-template-columns: repeat(4, 1fr); }
}
.home-stat { padding: var(--space-3); text-align: center; }
.home-stat-value {
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 4px;
}
.home-stat-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin: 0;
}

.home-section-head {
  margin-bottom: var(--space-8);
}
.home-section-title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  letter-spacing: -0.025em;
  margin-bottom: var(--space-2);
}
.home-section-sub {
  font-size: 13px;
  color: var(--text-tertiary);
}
.home-section-sub :deep(a),
.home-promise-text :deep(a) {
  color: var(--accent-primary);
  border-bottom: 1px dotted var(--accent-primary);
}

.home-verticals { padding: var(--space-16) 0; }
.home-vert-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}
@media (min-width: 640px) { .home-vert-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .home-vert-grid { grid-template-columns: repeat(4, 1fr); } }
.home-vert-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: border-color var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
}
.home-vert-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-3px);
}
.home-vert-eyebrow {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-3);
}
.home-vert-name {
  font-size: var(--text-xl);
  margin: 0 0 var(--space-2);
}
.home-vert-blurb {
  flex: 1;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0 0 var(--space-5);
}
.home-vert-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-tertiary);
}
.home-vert-arrow {
  color: var(--accent-primary);
  font-size: var(--text-lg);
  transition: transform var(--duration-base) var(--ease-out);
}
.home-vert-card:hover .home-vert-arrow { transform: translateX(4px); }

.home-top { padding-bottom: var(--space-16); }
.home-op-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}
@media (min-width: 768px) { .home-op-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1280px) { .home-op-grid { grid-template-columns: repeat(3, 1fr); } }

.home-promise {
  padding: var(--space-16) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--bg-secondary);
}
.home-promise-inner { max-width: 960px; }
.home-promise-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  text-align: center;
  margin-bottom: var(--space-10);
}
.home-promise-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}
@media (min-width: 768px) { .home-promise-grid { grid-template-columns: repeat(2, 1fr); } }
.home-promise-item {
  padding: var(--space-5) 0 var(--space-5) var(--space-5);
  border-left: 2px solid var(--accent-primary);
}
.home-promise-eyebrow {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-2);
}
.home-promise-text {
  font-size: var(--text-base);
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
}

.home-rg { padding: var(--space-16) 0; }
</style>
