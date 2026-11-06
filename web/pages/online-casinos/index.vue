<script setup lang="ts">
import { operators as all, CHECKED } from '~/data/operators'

const operators = all.filter(o => o.verticals.value?.includes('casino'))
  .sort((a, b) => Number(b.gbStatus === 'licensed') - Number(a.gbStatus === 'licensed'))

useSeoMeta({
  title: 'Online casino operator profiles: licence status and facts',
  description: `Online casino operator profiles with UK licence status, owner and regulatory actions. Sourced and dated, last checked ${CHECKED}. No scores.`,
  ogTitle: 'Online casino operator profiles: licence status and facts',
  ogDescription: `Online casino operator profiles with UK licence status, owner and regulatory actions. Sourced and dated, last checked ${CHECKED}. No scores.`,
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com/online-casinos' }] })
useSchemaOrg([
  defineWebPage({ name: 'Online casino operator profiles: licence status and facts' }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Online casinos', item: 'https://1baraban.com/online-casinos' },
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
    eyebrow="Online casinos"
    title="Online casino profiles"
    intro="Fact profiles of online casino operators, GB-licensed first. Every fact has a source and a check date. We do not score or rank casinos because we have not tested them."
    :operators="operators"
    empty-text=""
  />
</template>
