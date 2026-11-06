<script setup lang="ts">
import { operators, gbLicensed, notInGb, CHECKED } from '~/data/operators'

useSeoMeta({
  title: '1baraban: independent gambling operator fact profiles, GB first',
  description: 'Sourced, dated facts about gambling operators: UK licence status, owner, regulatory actions. No paid rankings, no scores until we test.',
  ogTitle: '1baraban: gambling operator fact profiles',
  ogDescription: 'Every fact has a source and a check date. GB first.',
})
useHead({ link: [{ rel: 'canonical', href: 'https://1baraban.com' }] })
useSchemaOrg([defineWebPage({ name: '1baraban home' })])

const hubs = [
  { to: '/online-casinos', label: 'Online casinos', text: 'Casino operators, GB-licensed first.' },
  { to: '/sports-betting', label: 'Sports betting', text: 'Operators with a betting licence.' },
  { to: '/slots', label: 'Slots', text: 'Casino operators that offer slots.' },
  { to: '/poker', label: 'Poker', text: 'No poker profiles yet.' },
]
</script>

<template>
  <div class="container-page home">
    <section class="hero">
      <p class="eyebrow mono">Independent, GB first</p>
      <h1>Facts about gambling operators, with sources.</h1>
      <p class="lead">
        1baraban publishes fact profiles of gambling operators. Every fact shows where it came from and the date we checked it. We take no paid rankings and publish no scores, because we have not tested any operator yet.
      </p>
      <p class="actions">
        <NuxtLink to="/reviews" class="btn">Browse {{ operators.length }} profiles</NuxtLink>
        <NuxtLink to="/compare" class="btn ghost">Compare operators</NuxtLink>
      </p>
      <p class="meta">{{ gbLicensed.length }} licensed in Great Britain, {{ notInGb.length }} not available to GB players. Last checked {{ CHECKED }}.</p>
    </section>

    <section>
      <h2>Browse by category</h2>
      <div class="hubs">
        <NuxtLink v-for="h in hubs" :key="h.to" :to="h.to" class="hub">
          <strong>{{ h.label }}</strong>
          <span>{{ h.text }}</span>
        </NuxtLink>
      </div>
    </section>

    <section>
      <h2>How this site works</h2>
      <ul class="how">
        <li>Facts come from the UK Gambling Commission register and the operator's own pages. See the <NuxtLink to="/methodology">methodology</NuxtLink>.</li>
        <li>Where we could not verify something, the profile says so.</li>
        <li>Links to operators exist only for operators licensed in Great Britain, and are marked as ads. See the <NuxtLink to="/affiliate-disclosure">affiliate disclosure</NuxtLink>.</li>
        <li>Read about <NuxtLink to="/responsible-gambling">responsible gambling</NuxtLink> and <NuxtLink to="/about">who runs this site</NuxtLink>.</li>
      </ul>
    </section>

    <section>
      <h2>Licensed in Great Britain</h2>
      <div class="grid"><OperatorCard v-for="o in gbLicensed" :key="o.slug" :operator="o" /></div>
    </section>
    <p class="rg">18+. Gambling can be addictive. <a href="https://www.begambleaware.org" rel="nofollow noopener" target="_blank">BeGambleAware.org</a></p>
  </div>
</template>

<style scoped>
.home { padding-top: 56px; padding-bottom: 64px; }
.hero { max-width: 800px; }
.eyebrow { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-primary); margin: 0 0 8px; }
h1 { font-size: clamp(2.2rem, 6vw, 3.5rem); line-height: 1.08; letter-spacing: -0.025em; margin: 0 0 16px; }
h2 { font-size: 24px; margin: 48px 0 12px; }
.lead { font-size: 19px; line-height: 1.65; color: var(--text-secondary); }
.actions { display: flex; gap: 12px; flex-wrap: wrap; margin: 24px 0 12px; }
.btn { padding: 10px 18px; background: var(--text-primary); color: #fff; border-radius: 4px; font-weight: 600; text-decoration: none; }
.btn.ghost { background: transparent; color: var(--text-primary); border: 1px solid var(--border-strong); }
.meta { font-size: 14px; color: var(--text-tertiary); }
.hubs { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 12px; }
.hub { display: flex; flex-direction: column; gap: 4px; padding: 16px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg-secondary); text-decoration: none; color: inherit; }
.hub span { font-size: 14px; color: var(--text-secondary); }
.how { line-height: 1.7; padding-left: 20px; max-width: 760px; }
.how a, .rg a { color: var(--accent-primary); text-decoration: underline; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 16px; }
.rg { margin-top: 40px; font-size: 13px; color: var(--text-secondary); }
</style>
