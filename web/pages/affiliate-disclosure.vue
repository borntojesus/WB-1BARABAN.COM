<script setup lang="ts">
useSeoMeta({
  title: 'Affiliate disclosure',
  description: 'How 1baraban may earn money from operator links, what is true today (no affiliate agreements), and how links are labelled.',
})
useSchemaOrg([
  defineWebPage({ name: 'Affiliate disclosure', description: 'How 1baraban may earn money from operator links.' }),
])
</script>

<template>
  <ComplianceProsePage eyebrow="Disclosure" title="Affiliate disclosure" lead="We may be paid when you join an operator through our links. Today, no such agreements are in place.">
    <div class="pp-note">
      <p><strong>Current status:</strong> we have no affiliate agreements. Links labelled /go/ lead to the operators' official sites without tracking, and we earn nothing from them.</p>
    </div>

    <h2>If this changes</h2>
    <p>When an agreement starts, this page and every affected link label will say so before you click. Links will be marked <strong>Ad</strong> and carry <code>rel="sponsored nofollow"</code>.</p>

    <h2>Payment never changes the facts</h2>
    <p>Operators cannot pay for placement, wording or removal. Licence status, regulatory actions and dates are taken from the sources shown on each profile, whether or not we earn from a link.</p>

    <h2>Who we link to</h2>
    <p>We link only to operators holding a current UK Gambling Commission licence. We do not link to operators that are unlicensed in Great Britain, even when we profile them for information. See the <NuxtLink to="/methodology">methodology</NuxtLink>.</p>

    <h2>No ads</h2>
    <p>This site carries no display ads and no AdSense.</p>

    <h2>18+</h2>
    <p>Gambling is for adults only. Gambling can be addictive, please play responsibly. <NuxtLink to="/responsible-gambling">Get help</NuxtLink>.</p>
  </ComplianceProsePage>
</template>
