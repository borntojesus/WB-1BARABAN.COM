<script setup lang="ts">
import { mockOperators, type Operator } from '~/data/operators'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const operator = computed<Operator | undefined>(() =>
  mockOperators.find(o => o.slug === slug.value)
)

if (!operator.value) {
  throw createError({ statusCode: 404, statusMessage: 'Operator not found', fatal: true })
}

const op = operator.value!

const related = computed(() =>
  mockOperators
    .filter(o =>
      o.slug !== op.slug &&
      o.verticals.some(v => op.verticals.includes(v))
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
)

const primaryBonus = computed(() => op.bonuses[0])
const initials = op.name.slice(0, 2).toUpperCase()

function tierLabel(t: 'tier1' | 'tier2' | 'offshore'): string {
  if (t === 'tier1') return 'Tier-1 (EU/UK regulator)'
  if (t === 'tier2') return 'Tier-2'
  return 'Offshore'
}

function fmtPayout(h: number): string {
  if (h <= 1) return 'under 1 hour'
  if (h < 24) return `~${h} hours`
  return `${Math.round(h / 24)}d`
}

function bonusValueAfterWagering(b: typeof primaryBonus.value): string {
  if (!b || !b.bonusEur || !b.wagering) return '—'
  const ev = b.bonusEur * (1 - 0.04 * b.wagering * 0.97)
  if (ev > 0) return `~€${Math.max(0, ev).toFixed(0)} expected value (96% slot RTP, ${b.wagering}× WR)`
  return 'Negative EV at typical 96% RTP — bonus is unlikely to clear profitably'
}

useSeoMeta({
  title: `${op.name} review · Trust Index ${op.score.toFixed(1)}/10`,
  description: `${op.tldr.slice(0, 155)}…`,
  ogTitle: `${op.name} — Trust Index ${op.score.toFixed(1)}/10`,
  ogDescription: op.tldr.slice(0, 200),
  ogType: 'article',
})

useSchemaOrg([
  defineWebPage({
    name: `${op.name} review`,
    description: op.tldr,
  }),
  defineOrganization({
    name: op.name,
    legalName: op.legalName,
    url: op.websiteUrl,
    foundingDate: String(op.founded),
    parentOrganization: op.parent ? { '@type': 'Organization', name: op.parent } : undefined,
  }),
  {
    '@type': 'Review',
    name: `${op.name} — independent review`,
    reviewBody: op.tldr,
    datePublished: op.lastVerified,
    author: {
      '@type': 'Person',
      name: op.reviewer.name,
      jobTitle: op.reviewer.credentials,
      url: `https://1baraban.com${op.reviewer.href}`,
    },
    publisher: { '@type': 'Organization', name: '1baraban', url: 'https://1baraban.com' },
    itemReviewed: {
      '@type': 'Organization',
      name: op.name,
      url: op.websiteUrl,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: op.score,
      bestRating: 10,
      worstRating: 0,
    },
  },
])
</script>

<template>
  <article v-if="operator" class="rev">
    <section class="rev-hero hero-gradient">
      <div class="container-page rev-hero-inner">
        <nav class="rev-crumbs mono" aria-label="Breadcrumb">
          <NuxtLink to="/">1baraban</NuxtLink>
          <span aria-hidden="true"> / </span>
          <NuxtLink to="/online-casinos">reviews</NuxtLink>
          <span aria-hidden="true"> / </span>
          <span>{{ op.name }}</span>
        </nav>

        <div class="rev-hero-grid">
          <div class="rev-hero-left">
            <div class="rev-logo" aria-hidden="true"><span>{{ initials }}</span></div>
            <h1 class="rev-title">
              {{ op.name }} <span class="rev-title-sub">review</span>
            </h1>
            <p class="rev-tagline">{{ op.tagline }}</p>
            <div class="rev-meta-row">
              <TrustLicenseBadge
                v-for="lic in op.licenses"
                :key="lic.authority"
                :authority="lic.authority"
                :number="lic.number"
                :register-url="lic.registerUrl"
                :tier="lic.tier"
              />
              <TrustPayoutSpeedBadge :hours="op.payoutSpeedHours" />
              <span v-if="op.cryptoSupported" class="rev-chip mono">crypto</span>
              <span class="rev-chip mono">{{ op.kycLevel }} KYC</span>
            </div>

            <div class="rev-hero-actions">
              <AffiliateAffiliateCTA
                :operator-name="op.name"
                :href="op.affiliateUrl"
                :score="op.score"
                size="lg"
              />
              <a href="#methodology" class="rev-secondary mono">how we scored {{ op.name }}</a>
            </div>
          </div>

          <div class="rev-hero-right">
            <TrustTrustIndexGauge
              :score="op.score"
              :score-prev="op.scorePrev"
              :verified-date="op.lastVerified"
              :next-review-date="op.nextReviewDue"
              :reviewer="op.reviewer"
              :sub-scores="op.subScores"
              :vertical="op.verticals[0]"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="container-narrow rev-body">
      <div class="rev-tldr">
        <p class="rev-tldr-label mono">tl;dr</p>
        <p class="rev-tldr-text">{{ op.tldr }}</p>
      </div>

      <div class="rev-proscons" id="proscons">
        <div class="rev-pros">
          <h2 class="rev-h2">What works</h2>
          <ul>
            <li v-for="p in op.pros" :key="p"><span class="rev-tick" aria-hidden="true">+</span>{{ p }}</li>
          </ul>
        </div>
        <div class="rev-cons">
          <h2 class="rev-h2">What doesn't</h2>
          <ul>
            <li v-for="c in op.cons" :key="c"><span class="rev-cross" aria-hidden="true">−</span>{{ c }}</li>
          </ul>
        </div>
      </div>

      <section class="rev-section" id="bonus" v-if="primaryBonus">
        <h2 class="rev-h2">Bonus, decoded</h2>
        <div class="rev-bonus-card">
          <p class="rev-bonus-headline">{{ primaryBonus.headline }}</p>
          <dl class="rev-bonus-grid">
            <div v-if="primaryBonus.bonusEur">
              <dt>Headline</dt>
              <dd class="mono">€{{ primaryBonus.bonusEur }}</dd>
            </div>
            <div v-if="primaryBonus.freeSpins">
              <dt>Free spins</dt>
              <dd class="mono">{{ primaryBonus.freeSpins }}</dd>
            </div>
            <div v-if="primaryBonus.wagering">
              <dt>Wagering</dt>
              <dd class="mono">{{ primaryBonus.wagering }}×</dd>
            </div>
            <div v-if="primaryBonus.minDeposit">
              <dt>Min deposit</dt>
              <dd class="mono">€{{ primaryBonus.minDeposit }}</dd>
            </div>
            <div v-if="primaryBonus.expiryDays">
              <dt>Expiry</dt>
              <dd class="mono">{{ primaryBonus.expiryDays }}d</dd>
            </div>
          </dl>
          <p class="rev-bonus-math">
            <span class="rev-bonus-math-label mono">our math:</span>
            {{ bonusValueAfterWagering(primaryBonus) }}
          </p>
        </div>
      </section>

      <section class="rev-section" id="banking">
        <h2 class="rev-h2">Banking & payouts</h2>
        <table class="rev-table">
          <tbody>
            <tr>
              <th>Withdrawal speed</th>
              <td class="mono">{{ fmtPayout(op.payoutSpeedHours) }}</td>
            </tr>
            <tr>
              <th>Minimum deposit</th>
              <td class="mono">€{{ op.minDepositEur }}</td>
            </tr>
            <tr>
              <th>Crypto support</th>
              <td>{{ op.cryptoSupported ? 'Yes' : 'No' }}</td>
            </tr>
            <tr>
              <th>KYC threshold</th>
              <td>{{ op.kycLevel === 'none' ? 'None' : op.kycLevel === 'soft' ? 'Soft (volume-based)' : 'Full at signup' }}</td>
            </tr>
            <tr>
              <th>Methods</th>
              <td>{{ op.paymentMethods.join(', ') }}</td>
            </tr>
            <tr>
              <th>24/7 live chat</th>
              <td>{{ op.liveChat247 ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="rev-section" id="licensing">
        <h2 class="rev-h2">Licensing & corporate</h2>
        <ul class="rev-license-list">
          <li v-for="lic in op.licenses" :key="lic.authority">
            <p class="rev-license-auth">{{ lic.authority }}</p>
            <p class="rev-license-meta mono">
              <span>{{ tierLabel(lic.tier) }}</span>
              <template v-if="lic.number">
                <span aria-hidden="true"> · </span>
                <span>#{{ lic.number }}</span>
              </template>
              <span aria-hidden="true"> · </span>
              <a :href="lic.registerUrl" rel="nofollow noopener" target="_blank">verify on register ↗</a>
            </p>
          </li>
        </ul>
        <dl class="rev-corp">
          <div v-if="op.legalName"><dt>Legal entity</dt><dd>{{ op.legalName }}</dd></div>
          <div><dt>Founded</dt><dd class="mono">{{ op.founded }}</dd></div>
          <div v-if="op.parent"><dt>Parent group</dt><dd>{{ op.parent }}</dd></div>
          <div><dt>Website</dt><dd><a :href="op.websiteUrl" rel="nofollow noopener" target="_blank">{{ op.websiteUrl.replace(/https?:\/\//, '') }} ↗</a></dd></div>
        </dl>
      </section>

      <section class="rev-section" id="methodology">
        <h2 class="rev-h2">How we scored {{ op.name }}</h2>
        <p class="rev-methodology-intro">
          We score every operator against six pillars on the same 10-point scale,
          weighted by what materially affects player outcomes. The same 6-pillar
          framework runs across every vertical — vertical-specific weights live
          in our <NuxtLink to="/methodology">public methodology</NuxtLink>.
        </p>
        <table class="rev-table">
          <thead>
            <tr><th>Pillar</th><th>Weight</th><th>{{ op.name }} score</th></tr>
          </thead>
          <tbody>
            <tr v-for="sub in op.subScores" :key="sub.label">
              <th>{{ sub.label }}<span v-if="sub.count" class="rev-table-count"> (n={{ sub.count }})</span></th>
              <td class="mono">{{ sub.weight }}%</td>
              <td class="mono">{{ sub.score.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
        <p class="rev-methodology-foot mono">
          Verified {{ op.lastVerified }} by
          <NuxtLink :to="op.reviewer.href">{{ op.reviewer.name }}</NuxtLink>
          ({{ op.reviewer.credentials }}). Next review due {{ op.nextReviewDue }}.
        </p>
      </section>

      <ComplianceResponsibleGamblingBlock variant="full" />
    </section>

    <section v-if="related.length" class="rev-related">
      <div class="container-page">
        <h2 class="rev-h2">Other operators in this vertical</h2>
        <div class="rev-related-grid">
          <OperatorCard v-for="r in related" :key="r.slug" :operator="r" variant="compact" />
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.rev-hero { padding: var(--space-12) 0 var(--space-16); position: relative; }
.rev-hero-inner { position: relative; z-index: 1; }
.rev-crumbs {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: var(--space-8);
}
.rev-crumbs :deep(a):hover { color: var(--accent-primary); }
.rev-hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
  align-items: start;
}
@media (min-width: 1024px) {
  .rev-hero-grid { grid-template-columns: 1fr 1fr; gap: var(--space-12); }
}
.rev-logo {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--accent-primary) 0%, #34D399 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 22px;
  margin-bottom: var(--space-5);
}
.rev-title {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: var(--space-3);
}
.rev-title-sub {
  color: var(--text-tertiary);
  font-weight: 400;
}
.rev-tagline {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  max-width: 560px;
}
.rev-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-8);
}
.rev-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  color: var(--text-tertiary);
}
.rev-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
}
.rev-secondary {
  font-size: 12px;
  color: var(--text-tertiary);
  border-bottom: 1px dotted var(--border);
}
.rev-secondary:hover { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }

.rev-body { padding: var(--space-12) var(--space-6) var(--space-16); }
.rev-tldr {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-12);
}
.rev-tldr-label {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-2);
}
.rev-tldr-text {
  font-size: var(--text-lg);
  line-height: 1.65;
  color: var(--text-primary);
}

.rev-proscons {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}
@media (min-width: 768px) { .rev-proscons { grid-template-columns: 1fr 1fr; } }
.rev-pros, .rev-cons {
  padding: var(--space-5);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
}
.rev-pros ul, .rev-cons ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.rev-pros li, .rev-cons li {
  display: flex;
  gap: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary);
}
.rev-tick {
  color: var(--accent-success);
  font-family: var(--font-mono);
  font-weight: 600;
  flex-shrink: 0;
  font-size: 16px;
  line-height: 1.4;
}
.rev-cross {
  color: var(--accent-danger);
  font-family: var(--font-mono);
  font-weight: 600;
  flex-shrink: 0;
  font-size: 16px;
  line-height: 1.4;
}

.rev-section {
  margin-bottom: var(--space-12);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}
.rev-h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  letter-spacing: -0.025em;
  margin-bottom: var(--space-5);
}

.rev-bonus-card {
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.rev-bonus-headline {
  font-size: var(--text-xl);
  font-weight: 500;
  margin: 0 0 var(--space-5);
}
.rev-bonus-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  margin: 0 0 var(--space-5);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
@media (min-width: 640px) { .rev-bonus-grid { grid-template-columns: repeat(5, 1fr); } }
.rev-bonus-grid dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  margin: 0 0 4px;
}
.rev-bonus-grid dd {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}
.rev-bonus-math {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
}
.rev-bonus-math-label {
  color: var(--accent-primary);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.06em;
  margin-right: 6px;
}

.rev-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid var(--border);
}
.rev-table tr { border-bottom: 1px solid var(--border); }
.rev-table th, .rev-table td {
  text-align: left;
  padding: var(--space-3) 0;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  vertical-align: top;
}
.rev-table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
}
.rev-table tbody th {
  font-weight: 500;
  color: var(--text-primary);
  width: 40%;
  padding-right: var(--space-4);
}
.rev-table-count { color: var(--text-tertiary); font-weight: 400; }

.rev-license-list { list-style: none; padding: 0; margin: 0 0 var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); }
.rev-license-list li {
  padding: var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
}
.rev-license-auth {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 4px;
}
.rev-license-meta {
  font-size: 12px;
  color: var(--text-tertiary);
}
.rev-license-meta a { color: var(--accent-primary); border-bottom: 1px dotted var(--accent-primary); }

.rev-corp {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  font-size: 14px;
}
@media (min-width: 640px) { .rev-corp { grid-template-columns: repeat(2, 1fr); } }
.rev-corp > div { display: flex; gap: var(--space-3); }
.rev-corp dt { color: var(--text-tertiary); min-width: 110px; }
.rev-corp dd { margin: 0; color: var(--text-primary); }
.rev-corp dd a { color: var(--accent-primary); }

.rev-methodology-intro {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0 0 var(--space-5);
}
.rev-methodology-intro :deep(a) { color: var(--accent-primary); border-bottom: 1px dotted var(--accent-primary); }
.rev-methodology-foot {
  font-size: 12px;
  color: var(--text-tertiary);
  margin: var(--space-4) 0 0;
}
.rev-methodology-foot :deep(a) { color: var(--accent-primary); }

.rev-related {
  padding: var(--space-12) 0;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
}
.rev-related-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
}
@media (min-width: 768px) { .rev-related-grid { grid-template-columns: repeat(3, 1fr); } }
</style>
