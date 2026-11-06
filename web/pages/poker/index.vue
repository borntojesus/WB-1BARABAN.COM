<script setup lang="ts">
import { operators as all, CHECKED } from '~/data/operators'

const operators = all.filter(o => o.verticals.value?.includes('poker'))
  .sort((a, b) => Number(b.gbStatus === 'licensed') - Number(a.gbStatus === 'licensed'))

useSeoMeta({
  title: 'Poker operator profiles: none published yet',
  description: `We have no poker operator profiles yet. See all gambling operator fact profiles with UK licence status and sources, last checked ${CHECKED}.`,
  ogTitle: 'Poker operator profiles: none published yet',
  ogDescription: `We have no poker operator profiles yet. See all gambling operator fact profiles with UK licence status and sources, last checked ${CHECKED}.`,
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com/poker' }] })
useSchemaOrg([
  defineWebPage({ name: 'Poker operator profiles: none published yet' }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Poker', item: 'https://1baraban.com/poker' },
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
    eyebrow="Poker"
    title="Poker profiles"
    intro="We have not published a poker operator profile yet. We add a vertical only when an operator in it has been checked against the regulator register."
    :operators="operators"
    empty-text="No operator in our data offers poker, so there is nothing to list. We would rather show an empty page than a made-up list."
  />
</template>
