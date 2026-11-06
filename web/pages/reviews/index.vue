<script setup lang="ts">
import { gbLicensed, notInGb, operators, CHECKED } from '~/data/operators'

const faq = [
  {
    q: 'Which of these operators are licensed in Great Britain?',
    a: `${gbLicensed.map(o => o.name).join(', ')} hold an active UK Gambling Commission licence on our check date (${CHECKED}). ${notInGb.map(o => o.name).join(', ')} do not, and are not available to GB players.`,
  },
  {
    q: 'How do I check a UK gambling licence?',
    a: 'Search the UK Gambling Commission public register by account number or company name on gamblingcommission.gov.uk. Each profile here links to the register entry. Check that the licence is active and that the site domain is listed against it.',
  },
  {
    q: 'Are these tested reviews?',
    a: 'No. They are fact profiles built from regulator registers and operator pages. We have not made deposits or withdrawals, and we publish no scores.',
  },
]

useSeoMeta({
  title: 'Gambling operator fact profiles: licensed and unlicensed in Great Britain',
  description: `${operators.length} operator fact profiles with UK licence status, owner, regulatory actions and sources, last checked ${CHECKED}. No scores, no paid rankings.`,
  ogTitle: 'Gambling operator fact profiles',
  ogDescription: 'Sourced, dated facts about gambling operators, GB first.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com/reviews' }] })
useSchemaOrg([
  defineWebPage({ name: 'Operator fact profiles' }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Profiles', item: 'https://1baraban.com/reviews' },
    ],
  },
  {
    '@type': 'ItemList',
    itemListElement: operators.map((o, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://1baraban.com/reviews/${o.slug}`, name: o.name })),
  },
  {
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
])
</script>

<template>
  <article class="container-page hub">
    <h1>Operator fact profiles</h1>
    <p class="lead">
      These are fact profiles, not tested reviews. Each fact comes from a regulator register or an operator page, with a source link and a check date. We publish no scores and no paid rankings.
      Read <NuxtLink to="/methodology">how we check facts</NuxtLink> or <NuxtLink to="/compare">compare all operators in one table</NuxtLink>. Last checked {{ CHECKED }}.
    </p>

    <section>
      <h2>Licensed in Great Britain</h2>
      <div class="grid"><OperatorCard v-for="o in gbLicensed" :key="o.slug" :operator="o" /></div>
    </section>

    <section>
      <h2>Not available in Great Britain</h2>
      <p class="sub">Information only. We do not link to these operators.</p>
      <div class="grid"><OperatorCard v-for="o in notInGb" :key="o.slug" :operator="o" /></div>
    </section>

    <section>
      <h2>Questions</h2>
      <div v-for="f in faq" :key="f.q" class="faq">
        <h3>{{ f.q }}</h3>
        <p>{{ f.a }}</p>
      </div>
      <p><NuxtLink to="/responsible-gambling">Responsible gambling help</NuxtLink></p>
    </section>
  </article>
</template>

<style scoped>
.hub { padding-top: 48px; padding-bottom: 64px; }
h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 16px; letter-spacing: -0.02em; }
h2 { font-size: 24px; margin: 40px 0 8px; }
.lead { font-size: 18px; line-height: 1.65; color: var(--text-secondary); max-width: 760px; }
.lead a, .hub p a { color: var(--accent-primary); text-decoration: underline; }
.sub { color: var(--text-secondary); margin: 0 0 8px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 16px; margin-top: 16px; }
.faq h3 { font-size: 17px; margin: 20px 0 4px; }
.faq p { margin: 0; line-height: 1.65; max-width: 760px; }
</style>
