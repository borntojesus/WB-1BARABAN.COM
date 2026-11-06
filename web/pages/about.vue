<script setup lang="ts">
useSeoMeta({
  title: 'About 1baraban',
  description: 'About 1baraban: an independent, ad-free reference for online gambling operators, built on sourced and dated facts.',
})
useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage', name: 'About 1baraban', description: 'About the 1baraban reference site.' }),
])
</script>

<template>
  <ComplianceProsePage eyebrow="About" title="About 1baraban" lead="1baraban is an independent reference for online gambling operators. It lists what can be checked in public sources and says plainly what cannot.">
    <h2>What this site is</h2>
    <p>Each operator profile gathers facts such as licence, licence holder, owner, Great Britain availability and regulatory actions. Every fact shows its source and the date we checked it. Our baseline is Great Britain, with Ireland and Malta as secondary readers.</p>

    <h2>What this site is not</h2>
    <p>It is not a testing lab. We have not played with real money or contacted support at any operator, so there are no scores or rankings. It is not an ad site: there are no ads and no AdSense, now or planned. There is no analytics and we set no cookies.</p>

    <h2>How to read it</h2>
    <ul>
      <li><NuxtLink to="/methodology">Methodology</NuxtLink>: what we check, where from, and what we do not do yet.</li>
      <li><NuxtLink to="/authors/editorial-team">Editorial team</NuxtLink>: who writes this and how corrections work.</li>
      <li><NuxtLink to="/affiliate-disclosure">Affiliate disclosure</NuxtLink>: how we may earn money and how links are labelled.</li>
      <li><NuxtLink to="/responsible-gambling">Responsible gambling</NuxtLink>: help, tools and warning signs.</li>
      <li><NuxtLink to="/privacy">Privacy</NuxtLink>: what data the site handles.</li>
    </ul>

    <h2>Contact</h2>
    <p><a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a></p>
  </ComplianceProsePage>
</template>
