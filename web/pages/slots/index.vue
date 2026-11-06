<script setup lang="ts">
import { operators as all, CHECKED } from '~/data/operators'

const operators = all.filter(o => o.verticals.value?.includes('casino'))
  .sort((a, b) => Number(b.gbStatus === 'licensed') - Number(a.gbStatus === 'licensed'))

useSeoMeta({
  title: 'Slots operators: online casino profiles with licence facts',
  description: `Online slots are offered by online casinos. These casino operator profiles show UK licence status, owner and sources, last checked ${CHECKED}.`,
  ogTitle: 'Slots operators: online casino profiles with licence facts',
  ogDescription: `Online slots are offered by online casinos. These casino operator profiles show UK licence status, owner and sources, last checked ${CHECKED}.`,
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com/slots' }] })
useSchemaOrg([
  defineWebPage({ name: 'Slots operators: online casino profiles with licence facts' }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Slots', item: 'https://1baraban.com/slots' },
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
    eyebrow="Slots"
    title="Slots operators"
    intro="Slots are a game type inside online casinos, so this page lists the casino operators we have profiled. We do not rate individual slot games or publish RTP claims. GB-licensed operators come first."
    :operators="operators"
    empty-text=""
  />
</template>
