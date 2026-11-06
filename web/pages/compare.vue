<script setup lang="ts">
import { operators, gbStatusLabel, verticalLabels, CHECKED } from '~/data/operators'

const sorted = [...operators].sort((a, b) => Number(b.gbStatus === 'licensed') - Number(a.gbStatus === 'licensed'))
const nv = 'Not verified'
const licLine = (o: (typeof operators)[number]) =>
  o.licences.map(l => `${l.regulator}${l.number ? ' ' + l.number : ''}`).join('; ')
const holders = (o: (typeof operators)[number]) =>
  [...new Set(o.licences.map(l => l.holder).filter(Boolean))].join('; ') || nv

const rows: { label: string; get: (o: (typeof operators)[number]) => string }[] = [
  { label: 'Great Britain status', get: o => gbStatusLabel[o.gbStatus] },
  { label: 'Licence(s) and number', get: licLine },
  { label: 'Licence holder', get: holders },
  { label: 'Owner', get: o => o.owner.value ?? nv },
  { label: 'Launch year', get: o => (o.launchYear.value ? String(o.launchYear.value) : nv) },
  { label: 'Verticals', get: o => (o.verticals.value ? o.verticals.value.map(v => verticalLabels[v]).join(', ') : nv) },
  { label: 'Regulatory penalties', get: o => penaltySummary(o) },
  { label: 'Payment methods', get: o => (o.paymentMethods.value ? o.paymentMethods.value.join('; ') : nv) },
  { label: 'Welcome bonus', get: o => (o.welcomeBonus.value ? o.welcomeBonus.value : 'Not listed') },
  { label: 'Last checked', get: o => o.lastChecked },
]

const faq = [
  {
    q: 'Which of these operators are licensed in Great Britain?',
    a: `${sorted.filter(o => o.gbStatus === 'licensed').map(o => o.name).join(', ')} hold an active UK Gambling Commission licence on ${CHECKED}. ${sorted.filter(o => o.gbStatus !== 'licensed').map(o => o.name).join(', ')} do not.`,
  },
  {
    q: 'How do I check a UK gambling licence?',
    a: 'Search the UK Gambling Commission public register by account number or company name, then confirm the licence is active and the site domain is listed. Every profile links to the register entry.',
  },
]

useSeoMeta({
  title: 'Compare gambling operators: licence, owner and penalties side by side',
  description: `One table comparing ${operators.length} gambling operators: GB licence status, licence holder, owner, launch year, regulatory penalties. Sourced, last checked ${CHECKED}.`,
  ogTitle: 'Compare gambling operators',
  ogDescription: 'Facts only: licence, owner, penalties and payment methods in one table.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com/compare' }] })
useSchemaOrg([
  defineWebPage({ name: 'Compare gambling operators' }),
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://1baraban.com/compare' },
    ],
  },
  {
    '@type': 'ItemList',
    itemListElement: sorted.map((o, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://1baraban.com/reviews/${o.slug}`, name: o.name })),
  },
  {
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
])
</script>

<template>
  <article class="container-page cmp">
    <h1>Compare gambling operators</h1>
    <p class="lead">
      Facts only, from regulator registers and operator pages. The order is licence status, not quality: GB-licensed operators come first. No scores.
      Each column links to a full <NuxtLink to="/reviews">profile</NuxtLink> with sources and check dates. See <NuxtLink to="/methodology">methodology</NuxtLink>.
    </p>

    <div class="scroll" tabindex="0" role="region" aria-label="Operator comparison table">
      <table>
        <caption class="sr">Operator comparison, last checked {{ CHECKED }}</caption>
        <thead>
          <tr>
            <th scope="col">Fact</th>
            <th v-for="o in sorted" :key="o.slug" scope="col">
              <NuxtLink :to="`/reviews/${o.slug}`">{{ o.name }}</NuxtLink>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.label">
            <th scope="row">{{ r.label }}</th>
            <td v-for="o in sorted" :key="o.slug" :class="{ off: r.label === 'Great Britain status' && o.gbStatus !== 'licensed' }">{{ r.get(o) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="note">Operators not licensed in Great Britain are not available to GB players and are shown for information only. Penalty totals add up the amounts listed on each profile, in the currency stated by the regulator.</p>

    <section>
      <h2>Questions</h2>
      <div v-for="f in faq" :key="f.q">
        <h3>{{ f.q }}</h3>
        <p>{{ f.a }}</p>
      </div>
      <p><NuxtLink to="/responsible-gambling">Responsible gambling help</NuxtLink> · <NuxtLink to="/affiliate-disclosure">Affiliate disclosure</NuxtLink></p>
    </section>
  </article>
</template>

<style scoped>
.cmp { padding-top: 48px; padding-bottom: 64px; }
h1 { font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 16px; letter-spacing: -0.02em; }
h2 { font-size: 24px; margin: 40px 0 8px; }
h3 { font-size: 17px; margin: 20px 0 4px; }
.lead { font-size: 17px; line-height: 1.65; color: var(--text-secondary); max-width: 760px; }
a { color: var(--accent-primary); text-decoration: underline; }
.scroll { overflow-x: auto; max-width: 100%; border: 1px solid var(--border); border-radius: 4px; background: var(--bg-secondary); margin-top: 24px; }
table { border-collapse: collapse; min-width: 980px; width: 100%; }
th, td { text-align: left; vertical-align: top; padding: 12px 14px; border-top: 1px solid var(--border); font-size: 14px; line-height: 1.5; min-width: 170px; }
thead th { border-top: 0; background: var(--bg-tertiary); font-size: 15px; }
tbody th { background: var(--bg-tertiary); font-weight: 600; min-width: 150px; position: sticky; left: 0; }
thead th:first-child { position: sticky; left: 0; }
td.off { color: var(--accent-danger); font-weight: 600; }
.note { font-size: 13px; color: var(--text-tertiary); max-width: 760px; }
.sr { position: absolute; left: -9999px; }
</style>
