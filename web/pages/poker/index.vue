<script setup lang="ts">
import { operatorsByVertical } from '~/data/operators'

const operators = operatorsByVertical('poker')

useSeoMeta({
  title: 'Best poker rooms · independent reviews',
  description: 'Top poker rooms ranked by Trust Index. Cash-game traffic, rake structure, rakeback economics — analysed for grinder EV, not just sign-up bonuses.',
  ogTitle: 'Best poker rooms — 1baraban Trust Index',
  ogDescription: 'Rake-structure-aware reviews of major poker rooms. EV-first scoring methodology.',
})

useSchemaOrg([
  defineWebPage({ name: 'Best poker rooms' }),
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
    vertical="poker"
    title="Poker rooms, judged by EV."
    tagline="Cash-game traffic, rake structure, rakeback math, MTT field strength — the metrics that move long-run win-rate, not just deposit bonuses."
    intro="Poker is unforgiving, and the wrong room can cost a winning player money even when they're playing well. We score rooms on cash-game traffic at typical hours, rake cap structure, rakeback or loyalty programme value, MTT field strength, and bot/RTA enforcement. Bonuses are weighted lower here than in casino reviews — the rake structure dwarfs any welcome offer over a meaningful sample size."
    :operators="operators"
    :facts="[
      { label: 'rooms reviewed', value: String(operators.length) || '—' },
      { label: 'methodology', value: 'v2.4' },
      { label: 'next review wave', value: 'Q3 2026' },
      { label: 'editorial focus', value: 'EV-first' },
    ]"
  />
</template>
