<script setup lang="ts">
useSeoMeta({
  title: 'About 1baraban',
  description: 'Independent iGaming review platform — founded on the premise that gambling reviews should serve the player, not the operator.',
  ogTitle: 'About 1baraban',
  ogDescription: 'Independent reviews. Public methodology. AI concierge that won\'t recommend operators we haven\'t reviewed.',
})

useSchemaOrg([
  defineWebPage({ name: 'About 1baraban' }),
  defineOrganization({
    name: '1baraban',
    url: 'https://1baraban.com',
    description: 'Independent iGaming review platform serving EU and global English-speaking players.',
  }),
])
</script>

<template>
  <article class="about">
    <section class="about-hero hero-gradient">
      <div class="container-narrow about-hero-inner">
        <p class="about-eyebrow mono">about</p>
        <h1 class="about-title">Reviews that serve players.<br/><span class="gradient-text-violet">Not operators.</span></h1>
        <p class="about-tagline">
          1baraban is an independent review platform for online casinos,
          sportsbooks, poker rooms, and slot sites. We exist because the
          incumbent review sites largely don&rsquo;t — they sell their rankings.
        </p>
      </div>
    </section>

    <section class="container-narrow about-body">
      <section class="about-section">
        <h2 class="about-h2">Why we exist</h2>
        <p>
          Most large iGaming review sites operate a pay-to-rank model in
          everything but name. Operators pay six-figure sums and ascend
          rankings; operators stop paying and disappear. The reader has no way
          to know.
        </p>
        <p>
          We took a different bet: that there&rsquo;s a sustainable readership
          who will trust a site that publishes its scoring rubric, refuses to
          accept payment for placement, and discloses every commercial
          relationship in plain English. Affiliate revenue funds the operation.
          Editorial independence runs the rankings.
        </p>
      </section>

      <section class="about-section">
        <h2 class="about-h2">What makes us different</h2>
        <ul class="about-list">
          <li>
            <p class="about-list-head">Public methodology, versioned</p>
            <p>
              Every score on this site is the output of a published 6-pillar
              rubric. The rubric is versioned (currently
              <NuxtLink to="/methodology">v2.4</NuxtLink>) and changes are
              logged. You can audit our reasoning end-to-end.
            </p>
          </li>
          <li>
            <p class="about-list-head">Quarterly re-verification</p>
            <p>
              Operators change. Banking rails break, licences get suspended, support
              degrades after a corporate sale. Every operator on the site is
              re-verified quarterly — license-against-register, fresh
              withdrawal test, complaint scrape, UX walkthrough.
            </p>
          </li>
          <li>
            <p class="about-list-head">AI concierge that doesn&rsquo;t hallucinate</p>
            <p>
              Our <NuxtLink to="/ask">/ask concierge</NuxtLink> only recommends
              operators we&rsquo;ve reviewed. If your query has no match in our
              database, it says so — instead of inventing a recommendation.
            </p>
          </li>
          <li>
            <p class="about-list-head">Honest affiliate disclosure</p>
            <p>
              We earn from affiliate links. We never earn from positive coverage.
              The
              <NuxtLink to="/affiliate-disclosure">affiliate disclosure</NuxtLink>
              explains exactly how the model works and where the boundary is.
            </p>
          </li>
        </ul>
      </section>

      <section class="about-section">
        <h2 class="about-h2">Editorial standards</h2>
        <p>
          Every review carries a byline. Reviewers are independent contractors
          with verifiable iGaming-industry backgrounds — compliance officers,
          industry analysts, former platform engineers. Their credentials are
          published with their bylines.
        </p>
        <p>
          We do not accept gifts, comped accounts, or revenue-share
          arrangements tied to specific operator rankings. We do test deposits
          and withdrawals at our own expense as part of every review.
        </p>
      </section>

      <section class="about-section">
        <h2 class="about-h2">Who we serve</h2>
        <p>
          We write primarily for EU and global English-speaking players who
          want to make informed decisions in a market that is structurally
          designed to confuse them. Our coverage is geared to readers who care
          about licensing tier, banking reality, and bonus terms — not just
          headline numbers.
        </p>
        <p>
          18+ only. If gambling is causing you harm,
          <a href="https://www.begambleaware.org/" rel="noopener" target="_blank">BeGambleAware</a>,
          <a href="https://www.gamcare.org.uk/" rel="noopener" target="_blank">GamCare</a>, and
          <a href="https://www.gamblingtherapy.org/" rel="noopener" target="_blank">Gambling Therapy</a>
          provide free, confidential support.
        </p>
      </section>

      <section class="about-section">
        <h2 class="about-h2">Get in touch</h2>
        <p>
          Editorial: <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a><br/>
          Tip line (anonymous welcome): <a href="mailto:tips@1baraban.com">tips@1baraban.com</a><br/>
          Operator press / partnerships: <a href="mailto:partnerships@1baraban.com">partnerships@1baraban.com</a>
        </p>
      </section>
    </section>
  </article>
</template>

<style scoped>
.about-hero { padding: var(--space-16) 0; text-align: center; }
.about-hero-inner { max-width: 720px; }
.about-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-4);
}
.about-title {
  font-size: clamp(2.25rem, 6vw, 4rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: var(--space-5);
}
.about-tagline {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.55;
}
.about-body { padding: var(--space-12) var(--space-6) var(--space-16); }
.about-section { margin-bottom: var(--space-12); }
.about-h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  letter-spacing: -0.025em;
  margin-bottom: var(--space-5);
}
.about-section p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}
.about-section :deep(a) {
  color: var(--accent-primary);
  border-bottom: 1px dotted var(--accent-primary);
}
.about-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-6); }
.about-list li {
  padding-left: var(--space-5);
  border-left: 2px solid var(--accent-primary);
}
.about-list-head {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2) !important;
  font-size: var(--text-lg);
}
</style>
