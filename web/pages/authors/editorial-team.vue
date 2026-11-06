<script setup lang="ts">
useSeoMeta({
  title: '1baraban Editorial Team',
  description: 'Who is behind 1baraban, what the editorial team does and does not do, editorial independence and how corrections work.',
})
useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage', name: '1baraban Editorial Team', description: 'The editorial team behind 1baraban.' }),
])
</script>

<template>
  <ComplianceProsePage eyebrow="Authors" title="1baraban Editorial Team" lead="An independent editorial team. It writes and maintains every operator profile on this site.">
    <h2>What we do</h2>
    <ul>
      <li>Collect operator facts from regulators' public registers and operators' own pages.</li>
      <li>Record the source and the check date next to each fact.</li>
      <li>Write short plain-language summaries from those facts.</li>
    </ul>

    <h2>What we do not do</h2>
    <ul>
      <li>We have not tested operators with real deposits, withdrawals or support requests.</li>
      <li>We do not score or rank operators.</li>
      <li>We do not publish player reviews or testimonials.</li>
      <li>We do not run ads.</li>
    </ul>

    <h2>Editorial independence</h2>
    <p>Operators cannot pay for placement, ratings, wording or edits, and they do not see our text before it is published. No affiliate agreements are in place at the moment. If that changes, the <NuxtLink to="/affiliate-disclosure">affiliate disclosure</NuxtLink> and every affected link will say so, and payment will not change the facts we publish.</p>

    <h2>Corrections policy</h2>
    <p>We correct confirmed errors as soon as we can and update the check date on the affected profile. Material corrections are noted on the page. Operators and readers use the same route: email <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a>, ideally with a source.</p>

    <h2>Read more</h2>
    <ul>
      <li><NuxtLink to="/methodology">Methodology</NuxtLink></li>
      <li><NuxtLink to="/about">About 1baraban</NuxtLink></li>
      <li><NuxtLink to="/responsible-gambling">Responsible gambling</NuxtLink></li>
    </ul>

    <h2>Contact</h2>
    <p><a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a></p>
  </ComplianceProsePage>
</template>
