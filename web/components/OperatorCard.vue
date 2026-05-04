<script setup lang="ts">
import type { Operator } from '~/data/operators'

type Props = {
  operator: Operator
  variant?: 'grid' | 'list' | 'compact'
}
const props = withDefaults(defineProps<Props>(), { variant: 'grid' })

function bandColor(score: number): string {
  if (score < 4) return 'var(--accent-danger)'
  if (score < 6) return 'var(--accent-warn)'
  if (score < 7.5) return 'var(--text-secondary)'
  if (score < 9) return 'var(--accent-success)'
  return 'var(--accent-gold)'
}

const scoreColor = computed(() => bandColor(props.operator.score))
const primaryBonus = computed(() => props.operator.bonuses[0])
const primaryLicense = computed(() => props.operator.licenses[0])
const initials = computed(() => props.operator.name.slice(0, 2).toUpperCase())
</script>

<template>
  <article class="op-card" :class="`variant-${variant}`">
    <NuxtLink :to="`/reviews/${operator.slug}`" class="op-link" :aria-label="`Read ${operator.name} review`">
      <div class="op-head">
        <div class="op-logo" aria-hidden="true">
          <span>{{ initials }}</span>
        </div>
        <div class="op-name-block">
          <h3 class="op-name">{{ operator.name }}</h3>
          <p class="op-tagline">{{ operator.tagline }}</p>
        </div>
        <div class="op-score" :style="{ color: scoreColor }">
          <span class="op-score-num mono">{{ operator.score.toFixed(1) }}</span>
          <span class="op-score-denom">/10</span>
        </div>
      </div>

      <p v-if="variant !== 'compact'" class="op-tldr">{{ operator.tldr.slice(0, 180) }}…</p>

      <div class="op-meta">
        <TrustLicenseBadge
          v-if="primaryLicense"
          :authority="primaryLicense.authority"
          :register-url="primaryLicense.registerUrl"
          :tier="primaryLicense.tier"
        />
        <TrustPayoutSpeedBadge :hours="operator.payoutSpeedHours" />
        <span v-if="operator.cryptoSupported" class="meta-chip mono">crypto</span>
        <span v-if="operator.kycLevel === 'soft'" class="meta-chip mono">soft KYC</span>
      </div>

      <div v-if="primaryBonus && variant !== 'compact'" class="op-bonus">
        <span class="bonus-label mono">welcome bonus</span>
        <span class="bonus-headline">{{ primaryBonus.headline }}</span>
      </div>
    </NuxtLink>

    <div class="op-actions">
      <NuxtLink :to="`/reviews/${operator.slug}`" class="op-secondary">
        Read review
      </NuxtLink>
      <AffiliateAffiliateCTA
        :operator-name="operator.name"
        :href="operator.affiliateUrl"
        :score="operator.score"
        size="sm"
      />
    </div>
  </article>
</template>

<style scoped>
.op-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: border-color var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.op-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.op-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.op-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-4);
  align-items: center;
}
.op-logo {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--accent-primary) 0%, #34D399 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}
.op-name-block { min-width: 0; }
.op-name {
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
}
.op-tagline {
  font-size: 13px;
  color: var(--text-tertiary);
  margin: 2px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.op-score {
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-mono);
  font-weight: 600;
  line-height: 1;
}
.op-score-num { font-size: 28px; letter-spacing: -0.02em; }
.op-score-denom { font-size: 12px; color: var(--text-tertiary); margin-left: 2px; }
.op-tldr {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.55;
}
.op-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.meta-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  color: var(--text-tertiary);
}
.op-bonus {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  border: 1px dashed var(--border);
}
.bonus-label {
  font-size: 10px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
}
.bonus-headline {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}
.op-actions {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
}
.op-secondary {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
  border-bottom: 1px dotted var(--border);
}
.op-secondary:hover { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }

.variant-list { padding: var(--space-4) var(--space-5); }
.variant-list .op-tldr { display: none; }
.variant-compact { padding: var(--space-3) var(--space-4); }
.variant-compact .op-bonus { display: none; }
</style>
