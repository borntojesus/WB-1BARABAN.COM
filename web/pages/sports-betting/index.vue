<script setup lang="ts">
import { operatorsByVertical } from '~/data/operators'

const operators = operatorsByVertical('sportsbook')
const tier1Count = operators.filter(o => o.licenses.some(l => l.tier === 'tier1')).length

useSeoMeta({
  title: 'Best sportsbooks · independent reviews',
  description: 'Top sportsbooks ranked by Trust Index. Pre-match and live odds, bet builder, cash-out, plus license verification and payout testing.',
  ogTitle: 'Best sportsbooks — 1baraban Trust Index',
  ogDescription: `${operators.length} sportsbooks reviewed. ${tier1Count} tier-1 licensed. Methodology v2.4.`,
})

useSchemaOrg([
  defineWebPage({ name: 'Best sportsbooks' }),
  defineItemList({
    itemListElement: operators.map((op, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://1baraban.com/reviews/${op.slug}`,
      name: op.name,
    })),
  }),
])
</script>

<template>
  <VerticalHub
    vertical="sportsbook"
    title="Sportsbooks, scored on what wins."
    tagline="Pre-match depth, live latency, bet builder logic, cash-out fairness — sportsbook reviews that go beyond the welcome bonus."
    intro="A sportsbook isn't just an odds feed. We test live latency, bet builder pricing, cash-out logic, and how each operator handles disputes when a market is suspended mid-event. Tier-1 licensing matters more in sports than crypto chains do — and we say so. Every operator on this page has been verified against their regulator's register and tested with real placed bets."
    :operators="operators"
    :facts="[
      { label: 'operators reviewed', value: String(operators.length) },
      { label: 'tier-1 licensed', value: String(tier1Count) },
      { label: 'methodology', value: 'v2.4' },
      { label: 'last updated', value: '2026-04-30' },
    ]"
  />
</template>
