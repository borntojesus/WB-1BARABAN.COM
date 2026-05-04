<script setup lang="ts">
import { operatorsByVertical } from '~/data/operators'

const operators = operatorsByVertical('slot')
const cryptoCount = operators.filter(o => o.cryptoSupported).length

useSeoMeta({
  title: 'Best slot sites · independent reviews',
  description: 'Top slot sites ranked by Trust Index. Provider depth, RTP transparency, free-spin terms — slot site reviews focused on long-run player value.',
  ogTitle: 'Best slot sites — 1baraban Trust Index',
  ogDescription: 'Provider-depth and RTP-transparency-aware slot site reviews. Free-spin terms decoded.',
})

useSchemaOrg([
  defineWebPage({ name: 'Best slot sites' }),
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
    vertical="slot"
    title="Slot sites, ranked beyond RTP."
    tagline="Provider depth, RTP transparency, free-spin terms that don't quietly lock your funds — slot site reviews where the small print gets read."
    intro="Most slot site reviews chase the highest free-spin number on the welcome banner. We don't. Our scoring weights provider depth (Pragmatic, NetEnt, Hacksaw, Nolimit, Push), RTP transparency (does the operator publish per-game RTP?), bonus terms (wagering, max-bet, eligible-game restrictions), and the speed at which winnings actually arrive. Bonuses are scored on real value after wagering — not headline value."
    :operators="operators"
    :facts="[
      { label: 'sites reviewed', value: String(operators.length) },
      { label: 'crypto-supporting', value: String(cryptoCount) },
      { label: 'methodology', value: 'v2.4' },
      { label: 'last updated', value: '2026-04-30' },
    ]"
  />
</template>
