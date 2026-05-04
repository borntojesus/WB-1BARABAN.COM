<script setup lang="ts">
import { operatorsByVertical } from '~/data/operators'

const operators = operatorsByVertical('casino')
const avgPayout = (operators.reduce((s, o) => s + o.payoutSpeedHours, 0) / operators.length).toFixed(0)
const tier1Count = operators.filter(o => o.licenses.some(l => l.tier === 'tier1')).length

useSeoMeta({
  title: 'Best online casinos · independent reviews',
  description: 'Top online casinos ranked by Trust Index. Verified licenses, real payout speeds, honest bonus math. EU and global. Methodology v2.4.',
  ogTitle: 'Best online casinos — 1baraban Trust Index',
  ogDescription: `${operators.length} casinos reviewed. ${tier1Count} tier-1 licensed. Average withdrawal time: ${avgPayout}h.`,
})

useSchemaOrg([
  defineWebPage({ name: 'Best online casinos' }),
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
    vertical="casino"
    title="Online casinos, ranked honestly."
    tagline="From crypto-native challengers to MGA-licensed legacy brands — scored on what actually matters: license tier, banking speed, bonus value, and complaint volume."
    intro="We review online casinos against a published 6-pillar methodology. Every operator on this page has been verified against their licensing register, tested for withdrawal speed, and analysed for bonus terms (real wagering math, not headline numbers). Ratings update quarterly. Operators don't pay to appear here, and they can't pay to move up — affiliate relationships are disclosed on every review."
    :operators="operators"
    :facts="[
      { label: 'operators reviewed', value: String(operators.length) },
      { label: 'tier-1 licensed', value: String(tier1Count) },
      { label: 'avg payout time', value: `${avgPayout}h` },
      { label: 'methodology', value: 'v2.4' },
    ]"
  />
</template>
