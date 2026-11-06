<script setup lang="ts">
import { CHECKED } from '~/data/operators'

useSeoMeta({
  title: 'Methodology',
  description: 'How 1baraban builds operator profiles: desk research from regulator registers and operator pages, each fact sourced and dated. No hands-on testing yet, so no scores or rankings.',
})
useSchemaOrg([
  defineWebPage({ '@type': 'AboutPage', name: 'Methodology', description: 'How 1baraban researches and publishes operator facts.' }),
])
</script>

<template>
  <ComplianceProsePage
    eyebrow="Methodology"
    title="How we research operators"
    lead="Every operator profile is desk research: facts taken from regulators' public registers and from operators' own pages, each one sourced and dated."
  >
    <p class="pp-meta">Methodology, first published {{ CHECKED }}. First data check: {{ CHECKED }}.</p>

    <div class="pp-note">
      <p><strong>No hands-on testing yet.</strong> We have not made deposits, withdrawals or support requests at any operator. That is why this site shows no scores, no ratings and no rankings.</p>
    </div>

    <h2>What we check</h2>
    <ul>
      <li><strong>Licence:</strong> whether the operator holds a licence on the regulator's public register, the licence number, status and permitted activities.</li>
      <li><strong>Licence holder:</strong> the legal entity named on the register.</li>
      <li><strong>Owner and launch year:</strong> where a source states them.</li>
      <li><strong>Great Britain availability:</strong> which domains the register lists for GB customers.</li>
      <li><strong>Regulatory actions:</strong> fines, warnings and enforcement published by the regulator.</li>
      <li><strong>Payment methods and bonus terms:</strong> only as the operator publishes them, with the date we looked.</li>
      <li><strong>Safer gambling tools:</strong> deposit limits, time-outs and self-exclusion, as the operator describes them.</li>
    </ul>

    <h2>Where the facts come from</h2>
    <p>Each fact lists its sources. A source is labelled <strong>primary</strong> when it is a regulator register or the operator's own page, and secondary otherwise (for example an encyclopedia entry or a news report). Where only a secondary source exists, the profile says so next to the fact. Our baseline is the UK Gambling Commission public register. Ireland and Malta are secondary readers, and we do not treat a licence from one jurisdiction as permission to serve another.</p>

    <h2>How dates work</h2>
    <p>Every profile shows the date its facts were last checked. The first check was on {{ CHECKED }}. We plan to re-check every profile each quarter and after any regulatory news about an operator, but that is a plan, not a record: the check date on the profile is what counts.</p>

    <h2>What "Not verified" means</h2>
    <p>If we could not confirm a fact from a source on the check date, the profile says <strong>Not verified</strong> instead of filling the gap. It does not mean the fact is bad or good. It means we have not confirmed it.</p>

    <h2>What we do not do yet</h2>
    <ul>
      <li>We do not deposit, play, withdraw or contact support, so we publish no payout speeds and no support ratings.</li>
      <li>We publish no scores, star ratings or "best of" rankings. Without testing they would be invented.</li>
      <li>We do not use player reviews or testimonials.</li>
    </ul>
    <p>If this changes, this page will be updated with a new version and the date of the change.</p>

    <h2>Why offshore operators get no links</h2>
    <p>Operators that do not hold a UK Gambling Commission licence may not offer gambling to people in Great Britain. We profile some of them for information only, with a notice at the top, and we never link to them, show their bonuses or explain how to sign up. See the <NuxtLink to="/affiliate-disclosure">affiliate disclosure</NuxtLink> for how links work.</p>

    <h2>Independence</h2>
    <p>Operators cannot pay for placement, wording or removal. See the <NuxtLink to="/authors/editorial-team">editorial team page</NuxtLink> for our corrections policy.</p>

    <h2>Report an error</h2>
    <p>If you see a fact that is wrong or out of date, email <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a> with the page and, if possible, a source. We correct confirmed errors and note the date of the correction on the page.</p>
  </ComplianceProsePage>
</template>
