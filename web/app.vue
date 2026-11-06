<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · 1baraban',
  title: 'Independent iGaming Reviews',
  description: 'Find a gambling site you can actually trust. Independent reviews, public methodology, AI concierge. EU + global.',
  ogType: 'website',
  ogSiteName: '1baraban',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineOrganization({
    name: '1baraban',
    url: 'https://1baraban.com',
    logo: 'https://1baraban.com/logo.svg',
    description: 'Independent iGaming review platform — casinos, sportsbooks, poker, slots.',
  }),
  defineWebSite({
    name: '1baraban',
    description: 'Independent iGaming reviews with public methodology and AI concierge.',
  }),
])

</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <AgeGateModal />
    <CookieBanner />
    <AIConciergeLauncher />
  </ClientOnly>
</template>
