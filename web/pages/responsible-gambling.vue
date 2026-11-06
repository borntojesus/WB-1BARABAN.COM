<script setup lang="ts">
useSeoMeta({
  title: 'Responsible gambling',
  description: 'Free, confidential help for gambling harm in Great Britain, Ireland and Malta, plus tools and warning signs. 18+ only.',
})

const faqs = [
  { q: 'Who can I call for free help in Great Britain?', a: 'The National Gambling Helpline, run by GamCare, is free on 0808 8020 133 and open 24 hours a day.' },
  { q: 'How do I block myself from UK gambling sites?', a: 'Register with GAMSTOP at gamstop.co.uk. It is a free self-exclusion service covering UK-licensed operators.' },
  { q: 'Is there a helpline in Ireland?', a: 'GamblingCare.ie lists a national helpline on 1800 936 725, open 24 hours a day.' },
  { q: 'Is there a helpline in Malta?', a: 'The Responsible Gaming Foundation lists Supportline 1777 (and 179), both free and anonymous.' },
]
useSchemaOrg([defineWebPage({ name: 'Responsible gambling' })])
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }),
  }],
})
</script>

<template>
  <ComplianceProsePage eyebrow="Responsible gambling" title="Get help, stay in control" lead="Gambling is for people aged 18 and over. Gambling can be addictive, please play responsibly. If it stops being fun, help is free and confidential.">
    <h2>Great Britain</h2>
    <div class="pp-grid">
      <div class="pp-card">
        <h3>National Gambling Helpline</h3>
        <p><strong><a href="tel:08088020133">0808 8020 133</a></strong>, free, 24 hours. Run by GamCare, also web chat.</p>
        <p class="pp-meta">Source: <a href="https://www.gamcare.org.uk/talk-to-us/" rel="noopener" target="_blank">gamcare.org.uk</a></p>
      </div>
      <div class="pp-card">
        <h3>BeGambleAware</h3>
        <p>Information, tools and a service finder.</p>
        <p class="pp-meta"><a href="https://www.begambleaware.org/" rel="noopener" target="_blank">begambleaware.org</a></p>
      </div>
      <div class="pp-card">
        <h3>GAMSTOP</h3>
        <p>Free self-exclusion from all UK-licensed online operators.</p>
        <p class="pp-meta"><a href="https://www.gamstop.co.uk/" rel="noopener" target="_blank">gamstop.co.uk</a></p>
      </div>
      <div class="pp-card">
        <h3>Gamblers Anonymous UK</h3>
        <p><a href="tel:03300940322">0330 094 0322</a>, peer support meetings.</p>
        <p class="pp-meta"><a href="https://www.gamblersanonymous.org.uk/" rel="noopener" target="_blank">gamblersanonymous.org.uk</a></p>
      </div>
    </div>

    <h2>Ireland</h2>
    <div class="pp-grid">
      <div class="pp-card">
        <h3>GamblingCare.ie national helpline</h3>
        <p><strong><a href="tel:1800936725">1800 936 725</a></strong>, open 24 hours a day. Funded and administered by the Gambling Awareness Trust.</p>
        <p class="pp-meta">Source: <a href="https://gamblingcare.ie/" rel="noopener" target="_blank">gamblingcare.ie</a></p>
      </div>
    </div>

    <h2>Malta</h2>
    <div class="pp-grid">
      <div class="pp-card">
        <h3>Responsible Gaming Foundation</h3>
        <p>Supportline <strong>1777</strong> (or 179), free and anonymous.</p>
        <p class="pp-meta">Source: <a href="https://www.rgf.org.mt/" rel="noopener" target="_blank">rgf.org.mt</a></p>
      </div>
    </div>

    <h2>Tools that help</h2>
    <ul>
      <li>Deposit, loss and time limits, set before you play.</li>
      <li>Time-outs and cool-off periods.</li>
      <li>Self-exclusion: GAMSTOP in Great Britain, or the operator's own tool.</li>
      <li>Reality checks and account history to see what you have spent.</li>
    </ul>

    <h2>Warning signs</h2>
    <ul>
      <li>Spending more money or time than you planned.</li>
      <li>Chasing losses or hiding gambling from others.</li>
      <li>Borrowing money or missing bills to gamble.</li>
      <li>Feeling anxious, irritable or low when not gambling.</li>
    </ul>

    <h2>Questions</h2>
    <div v-for="f in faqs" :key="f.q">
      <h3>{{ f.q }}</h3>
      <p>{{ f.a }}</p>
    </div>
    <p class="pp-meta">Numbers checked 2026-11-07. If one has changed, please tell us at <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a>.</p>
  </ComplianceProsePage>
</template>
