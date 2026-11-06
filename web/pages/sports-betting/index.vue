<script setup lang="ts">
import { operators as all, CHECKED } from '~/data/operators'

const operators = all.filter(o => o.verticals.value?.includes('sportsbook'))
  .sort((a, b) => Number(b.gbStatus === 'licensed') - Number(a.gbStatus === 'licensed'))

useSeoMeta({
  title: 'Sports betting operator profiles: licence status and facts',
  description: `Sports betting operator profiles with UK licence status, owner and regulatory actions. Sourced and dated, last checked ${CHECKED}. No scores.`,
  ogTitle: 'Sports betting operator profiles: licence status and facts',
  ogDescription: `Sports betting operator profiles with UK licence status, owner and regulatory actions. Sourced and dated, last checked ${CHECKED}. No scores.`,
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com/sports-betting' }] })
useSchemaOrg([
  defineWebPage({ name: 'Sports betting operator profiles: licence status and facts' }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Sports betting', item: 'https://1baraban.com/sports-betting' },
    ],
  },
  {
    '@type': 'ItemList',
    itemListElement: operators.map((o, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://1baraban.com/reviews/${o.slug}`, name: o.name })),
  },
])
</script>

<template>
  <VerticalHub
    eyebrow="Sports betting"
    title="Sports betting profiles"
    intro="Fact profiles of operators that offer sports betting, GB-licensed first. Every fact has a source and a check date. No tips, no odds comparison and no scores."
    :operators="operators"
    empty-text=""
  />
</template>
