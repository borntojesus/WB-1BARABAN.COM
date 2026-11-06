<script setup lang="ts">
import { findOperator, operators, gbStatusLabel, verticalLabels } from '~/data/operators'

const route = useRoute()
const op = findOperator(String(route.params.slug))
if (!op) {
  throw createError({ statusCode: 404, statusMessage: 'Operator profile not found', fatal: true })
}

const licensed = op.gbStatus === 'licensed'
const url = `https://1baraban.com/reviews/${op.slug}`
const verticalsFmt = (v: string[]) => v.map(x => (verticalLabels as Record<string, string>)[x] || x).join(', ')

useSeoMeta({
  title: `${op.name} fact profile: licence, owner, checked ${op.lastChecked}`,
  description: `${op.name} (${op.domain}): ${gbStatusLabel[op.gbStatus].toLowerCase()}. Licence, owner, regulatory actions and what we could not verify, each with a source and check date.`,
  ogTitle: `${op.name} fact profile`,
  ogDescription: op.summary.slice(0, 200),
  ogType: 'article',
})
useHead({ link: [{ rel: 'canonical', href: url }] })

const org: Record<string, any> = { '@type': 'Organization', '@id': `${url}#operator`, name: op.name }
if (op.legalName.value) org.legalName = op.legalName.value
if (op.launchYear.value) org.foundingDate = String(op.launchYear.value)
if (licensed) org.url = op.goTarget || `https://${op.domain}`

useSchemaOrg([
  defineWebPage({ name: `${op.name} fact profile`, description: op.summary, about: { '@id': `${url}#operator` } }),
  org,
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1baraban.com/' },
      { '@type': 'ListItem', position: 2, name: 'Profiles', item: 'https://1baraban.com/reviews' },
      { '@type': 'ListItem', position: 3, name: op.name, item: url },
    ],
  },
])
</script>

<template>
  <article class="container-page rv">
    <nav class="crumbs" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink> / <NuxtLink to="/reviews">Profiles</NuxtLink> / {{ op.name }}
    </nav>

    <header>
      <p class="eyebrow mono">Fact profile, not a tested review</p>
      <h1>{{ op.name }}</h1>
      <p class="domain mono">{{ op.domain }} <span class="status">{{ gbStatusLabel[op.gbStatus] }}</span></p>
      <p class="byline">
        By <NuxtLink to="/authors/editorial-team">1baraban Editorial Team</NuxtLink> · Checked {{ op.lastChecked }}
      </p>
    </header>

    <FactsGbStatusNotice :operator="op" />

    <section>
      <h2>Summary</h2>
      <p class="lead">{{ op.summary }}</p>
      <h2>Verdict</h2>
      <p>{{ op.verdict }}</p>
      <div v-if="licensed" class="cta-wrap">
        <AffiliateCTA :operator-name="op.name" :slug="op.slug" />
      </div>
    </section>

    <section>
      <h2>Key facts</h2>
      <div class="tbl">
        <table>
          <tbody>
            <FactsFactRow label="Legal name" :fact="op.legalName" />
            <FactsFactRow label="Registration" :fact="op.registration" />
            <FactsFactRow label="Owner" :fact="op.owner" />
            <FactsFactRow label="Launch year" :fact="op.launchYear" />
            <FactsFactRow label="Verticals" :fact="op.verticals" :formatter="verticalsFmt" />
            <FactsFactRow label="Payment methods" :fact="op.paymentMethods" />
            <FactsFactRow label="Welcome bonus" :fact="op.welcomeBonus" />
            <FactsFactRow label="Restrictions" :fact="op.restrictions" />
            <FactsFactRow label="Safer gambling tools" :fact="op.safer" />
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2>Licences</h2>
      <div class="tbl">
        <table class="lic">
          <thead><tr><th>Regulator</th><th>Number</th><th>Holder</th><th>Status</th><th>Verify</th></tr></thead>
          <tbody>
            <tr v-for="l in op.licences" :key="l.regulator + l.number">
              <td>{{ l.regulator }}</td>
              <td>{{ l.number || 'Not verified' }}</td>
              <td>{{ l.holder || 'Not verified' }}</td>
              <td>{{ l.status }}
                <p class="src"><FactsSourceLink :source="l.source" /> · Checked {{ op.lastChecked }}</p>
              </td>
              <td>
                <a v-if="l.verifyUrl" :href="l.verifyUrl" rel="nofollow noopener" target="_blank">Verify on register</a>
                <span v-else>No register link</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2>Regulatory actions</h2>
      <ul v-if="op.regulatoryActions.length" class="plain">
        <li v-for="a in op.regulatoryActions" :key="a.date + a.amount">
          <strong>{{ a.date }}, {{ a.regulator }}, {{ a.amount }}.</strong> {{ a.summary }}
          <p class="src"><FactsSourceLink :source="a.source" /> · Checked {{ op.lastChecked }}</p>
        </li>
      </ul>
      <p v-else>None listed in the sources we checked on {{ op.lastChecked }}.</p>
    </section>

    <section v-if="op.otherFacts.length">
      <h2>Other facts</h2>
      <ul class="plain">
        <li v-for="f in op.otherFacts" :key="f.text">
          {{ f.text }}
          <p class="src"><FactsSourceLink :source="f.source" /> · Checked {{ op.lastChecked }}</p>
        </li>
      </ul>
    </section>

    <section class="nv">
      <h2>What we could not verify</h2>
      <ul>
        <li v-for="n in op.notVerified" :key="n">{{ n }}</li>
      </ul>
      <p>We have not made deposits, requested withdrawals or contacted support at {{ op.name }}. See <NuxtLink to="/methodology">how we check facts</NuxtLink>.</p>
    </section>

    <section v-if="licensed" class="cta-wrap">
      <AffiliateCTA :operator-name="op.name" :slug="op.slug" />
    </section>

    <footer class="foot">
      <p>Last checked {{ op.lastChecked }} by the <NuxtLink to="/authors/editorial-team">1baraban Editorial Team</NuxtLink>.</p>
      <p>
        <NuxtLink to="/compare">Compare all operators</NuxtLink> ·
        <NuxtLink to="/reviews">All profiles</NuxtLink> ·
        <NuxtLink to="/responsible-gambling">Responsible gambling</NuxtLink> ·
        <NuxtLink to="/affiliate-disclosure">Affiliate disclosure</NuxtLink>
      </p>
      <p class="rg">18+. Gambling can be addictive. <a href="https://www.begambleaware.org" rel="nofollow noopener" target="_blank">BeGambleAware.org</a></p>
    </footer>
  </article>
</template>

<style scoped>
.rv { padding-top: 32px; padding-bottom: 64px; max-width: 900px; }
.crumbs { font-size: 13px; color: var(--text-tertiary); margin-bottom: 16px; }
.crumbs a, .rv a { color: var(--accent-primary); }
.eyebrow { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-tertiary); margin: 0 0 8px; }
h1 { font-size: clamp(2rem, 5vw, 2.75rem); margin: 0 0 8px; letter-spacing: -0.02em; }
h2 { font-size: 22px; margin: 32px 0 12px; }
.domain { margin: 0 0 8px; color: var(--text-secondary); }
.status { margin-left: 8px; font-size: 12px; font-weight: 600; padding: 2px 8px; border: 1px solid var(--border-strong); border-radius: 2px; }
.byline { font-size: 14px; color: var(--text-secondary); margin: 0; }
.lead { font-size: 17px; line-height: 1.65; }
p { line-height: 1.65; }
.cta-wrap { margin: 24px 0; }
.tbl { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
.lic th, .lic td { text-align: left; vertical-align: top; padding: 10px 12px 10px 0; border-top: 1px solid var(--border); font-size: 14px; }
.lic th { font-size: 13px; color: var(--text-secondary); }
.lic { min-width: 640px; }
.src { margin: 4px 0 0; font-size: 12px; color: var(--text-tertiary); }
.src a { text-decoration: underline; }
.plain { list-style: none; padding: 0; margin: 0; }
.plain li { padding: 10px 0; border-top: 1px solid var(--border); }
.nv { border: 1px solid var(--border-strong); background: var(--bg-tertiary); border-radius: 4px; padding: 4px 20px 12px; margin-top: 32px; }
.foot { margin-top: 40px; padding-top: 16px; border-top: 1px solid var(--border); font-size: 14px; color: var(--text-secondary); }
.foot a { text-decoration: underline; }
</style>
