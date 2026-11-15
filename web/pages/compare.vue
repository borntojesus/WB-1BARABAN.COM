<script setup lang="ts">
import { mockOperators } from '~/data/operators'
import { Building2, Gauge, BadgeCheck, Timer, UserCheck, Wallet, Coins, Gift } from 'lucide-vue-next'

const operators = [...mockOperators].sort((a, b) => b.score - a.score)

const payout = (h: number) => (h < 24 ? `~${h}h` : `~${Math.round(h / 24)}d`)
const topLicense = (o: (typeof operators)[number]) => o.licenses[0]?.authority ?? '—'
const bonus = (o: (typeof operators)[number]) => o.bonuses[0]?.headline ?? 'No welcome bonus'

useSeoMeta({
  title: 'Compare online casinos side by side',
  description:
    'Trust Index, licence, payout speed, KYC, minimum deposit and welcome bonus for every operator we review, in one table.',
})
</script>

<template>
  <div class="cmp">
    <section class="cmp-hero hero-gradient">
      <div class="container-page">
        <p class="eyebrow mono">compare</p>
        <h1 class="cmp-title">Every operator, side by side.</h1>
        <p class="cmp-lead">
          Same methodology, same columns. Sorted by Trust Index. Tap a name for the full review.
        </p>
      </div>
    </section>

    <section class="container-page cmp-body">
      <div class="cmp-scroll">
        <table class="cmp-table">
          <thead>
            <tr>
              <th scope="col"><span class="cmp-th"><Building2 :size="14" aria-hidden="true" />Operator</span></th>
              <th scope="col"><span class="cmp-th"><Gauge :size="14" aria-hidden="true" />Trust Index</span></th>
              <th scope="col"><span class="cmp-th"><BadgeCheck :size="14" aria-hidden="true" />Licence</span></th>
              <th scope="col"><span class="cmp-th"><Timer :size="14" aria-hidden="true" />Payout</span></th>
              <th scope="col"><span class="cmp-th"><UserCheck :size="14" aria-hidden="true" />KYC</span></th>
              <th scope="col"><span class="cmp-th"><Wallet :size="14" aria-hidden="true" />Min deposit</span></th>
              <th scope="col"><span class="cmp-th"><Coins :size="14" aria-hidden="true" />Crypto</span></th>
              <th scope="col"><span class="cmp-th"><Gift :size="14" aria-hidden="true" />Welcome bonus</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in operators" :key="o.slug">
              <th scope="row">
                <NuxtLink :to="`/reviews/${o.slug}`" class="cmp-op">
                  <span class="cmp-logo" aria-hidden="true">
                    <img v-if="o.logo" :src="o.logo" alt="" loading="lazy" />
                    <span v-else>{{ o.name.slice(0, 2).toUpperCase() }}</span>
                  </span>
                  {{ o.name }}
                </NuxtLink>
              </th>
              <td class="mono cmp-score">{{ o.score.toFixed(1) }}</td>
              <td>{{ topLicense(o) }}</td>
              <td class="mono">{{ payout(o.payoutSpeedHours) }}</td>
              <td>{{ o.kycLevel }}</td>
              <td class="mono">€{{ o.minDepositEur }}</td>
              <td>{{ o.cryptoSupported ? 'yes' : 'no' }}</td>
              <td>{{ bonus(o) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="cmp-note">
        Scores follow our <NuxtLink to="/methodology">public methodology</NuxtLink>. Some links are affiliate links,
        see the <NuxtLink to="/affiliate-disclosure">disclosure</NuxtLink>. 18+, play responsibly.
      </p>
    </section>
  </div>
</template>

<style scoped>
.cmp-hero { padding: var(--space-12) 0 var(--space-8); }
.eyebrow { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-primary); margin: 0 0 var(--space-3); }
.cmp-title { font-size: clamp(32px, 5vw, 52px); letter-spacing: -0.03em; margin: 0 0 var(--space-4); }
.cmp-lead { color: var(--text-secondary); max-width: 60ch; margin: 0; }
.cmp-body { padding-bottom: var(--space-16); }
.cmp-scroll { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--bg-secondary); }
.cmp-table { width: 100%; border-collapse: collapse; min-width: 860px; font-size: 14px; }
.cmp-table th, .cmp-table td { padding: var(--space-3) var(--space-4); text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; }
.cmp-table thead th { font-size: 12px; font-weight: 500; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.06em; background: var(--bg-tertiary); }
.cmp-table tbody tr:last-child th, .cmp-table tbody tr:last-child td { border-bottom: 0; }
.cmp-table td:last-child { white-space: normal; min-width: 220px; }
.cmp-th { display: inline-flex; align-items: center; gap: 6px; }
.cmp-th svg { color: var(--accent-primary); flex-shrink: 0; }
.cmp-op { display: inline-flex; align-items: center; gap: var(--space-3); color: var(--text-primary); text-decoration: none; font-weight: 600; }
.cmp-op:hover { color: var(--accent-primary); }
.cmp-logo { width: 32px; height: 32px; border-radius: var(--radius-sm); background: var(--bg-tertiary); border: 1px solid var(--border); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 11px; padding: 4px; flex-shrink: 0; }
.cmp-logo img { width: 100%; height: 100%; object-fit: contain; }
.cmp-score { color: var(--accent-success); font-weight: 600; }
.cmp-note { color: var(--text-tertiary); font-size: 13px; margin-top: var(--space-4); }
.cmp-note a { color: var(--accent-primary); }
</style>
