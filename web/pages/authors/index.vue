<script setup lang="ts">
useSeoMeta({
  title: 'Authors',
  description: 'The 1baraban Editorial Team writes and maintains every operator profile on this site.',
})
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage', name: 'Authors', description: 'Authors of 1baraban.' }),
])
</script>

<template>
  <ComplianceProsePage eyebrow="Authors" title="Who writes this site" lead="Everything on 1baraban is published by one byline.">
    <div class="pp-card">
      <h3><NuxtLink to="/authors/editorial-team">1baraban Editorial Team</NuxtLink></h3>
      <p>The independent editorial team behind 1baraban. Researches operator facts from public registers and operator pages, and answers corrections at <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a>.</p>
    </div>
  </ComplianceProsePage>
</template>
