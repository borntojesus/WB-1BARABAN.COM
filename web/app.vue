<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · 1baraban',
  title: 'Independent gambling operator facts',
  description: 'Sourced and dated facts about online gambling operators, from regulators\' public registers and operators\' own pages. No ads, no scores, 18+ only.',
  ogType: 'website',
  ogSiteName: '1baraban',
  twitterCard: 'summary',
})

useSchemaOrg([
  defineOrganization({
    name: '1baraban',
    url: 'https://1baraban.com',
    email: 'editorial@1baraban.com',
    description: 'Independent reference for online gambling operators, built on sourced and dated facts.',
  }),
  defineWebSite({
    name: '1baraban',
    description: 'Sourced and dated facts about online gambling operators.',
  }),
])

</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <ComplianceAgeGateModal />
  </ClientOnly>
</template>
