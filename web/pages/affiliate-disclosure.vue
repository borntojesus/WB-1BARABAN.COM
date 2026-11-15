<script setup lang="ts">
useSeoMeta({
  title: 'Affiliate disclosure',
  description: 'How 1baraban earns money. Affiliate revenue funds the operation. Editorial scoring is independent and never for sale. Full transparency on the commercial model.',
  ogTitle: '1baraban affiliate disclosure',
  ogDescription: 'How affiliate revenue works on 1baraban — and what it doesn\'t buy.',
})

useSchemaOrg([
  defineWebPage({
    name: 'Affiliate disclosure',
    description: 'Full disclosure of how 1baraban\'s affiliate revenue model works.',
  }),
])
</script>

<template>
  <article class="aff">
    <section class="aff-hero">
      <div class="container-narrow aff-hero-inner">
        <p class="aff-eyebrow mono">disclosure</p>
        <h1 class="aff-title">How we make money.</h1>
        <p class="aff-tagline">
          Affiliate revenue funds the operation. Editorial scoring is
          independent. Both statements are true at the same time, and the
          structural reasons are below.
        </p>
      </div>
    </section>

    <section class="container-narrow aff-body">
      <section class="aff-section">
        <h2 class="aff-h2">The short version</h2>
        <ul class="aff-bullets">
          <li>We earn a commission when readers click an affiliate link and sign up at an operator.</li>
          <li>We do not earn anything when readers visit our site, read a review, or use the AI concierge.</li>
          <li>Our editorial score does not depend on whether an operator pays us. Some of the highest-scored operators on this site pay us nothing.</li>
          <li>We never accept payment in exchange for a higher score, a featured slot, or favourable language.</li>
          <li>Every outbound link to an operator is marked <code>rel="sponsored nofollow noopener"</code> and tagged with our affiliate ID where one exists.</li>
        </ul>
      </section>

      <section class="aff-section">
        <h2 class="aff-h2">How affiliate revenue actually works</h2>
        <p>
          When you click "Visit [Operator]" on a review and proceed to deposit,
          the operator pays us a commission. Three structures are common in
          iGaming affiliate marketing:
        </p>
        <ul class="aff-bullets">
          <li><strong>RevShare</strong> — a recurring percentage of the operator&rsquo;s net gaming revenue from referred players, typically 25–45% for the lifetime of the player&rsquo;s account.</li>
          <li><strong>CPA (cost per acquisition)</strong> — a one-time payment per qualifying deposit, typically €100–€400.</li>
          <li><strong>Hybrid</strong> — a smaller CPA up-front plus a smaller RevShare ongoing.</li>
        </ul>
        <p>
          We tell operators which structure we want; they don&rsquo;t tell us. The
          structure has no effect on editorial score. It does, however, affect
          our preference at the negotiation table — RevShare aligns our
          incentives with the player&rsquo;s long-term experience (we earn when
          they keep playing, which they only do if the operator is good),
          which is why we default to it.
        </p>
      </section>

      <section class="aff-section">
        <h2 class="aff-h2">What affiliate revenue does NOT buy</h2>
        <ul class="aff-bullets">
          <li><strong>Higher scores.</strong> The Trust Index is the output of our public <NuxtLink to="/methodology">methodology</NuxtLink>. We score, then we approach for affiliate. Not the other way around.</li>
          <li><strong>Featured placement.</strong> Hub-page rankings sort by Trust Index. There is no paid "Top Pick" badge.</li>
          <li><strong>Editorial language softening.</strong> If an operator has a Curaçao license and slow withdrawals, we say so — even if they&rsquo;re a top-paying affiliate.</li>
          <li><strong>Removal of negative coverage.</strong> Operators occasionally request edits to remove listed cons. We don&rsquo;t.</li>
          <li><strong>Pre-publication review.</strong> Operators do not see reviews before they publish.</li>
        </ul>
      </section>

      <section class="aff-section">
        <h2 class="aff-h2">Operators with no commercial relationship</h2>
        <p>
          Some operators on this site pay us nothing. Either we haven&rsquo;t been
          accepted into their affiliate programme yet, or they don&rsquo;t run one,
          or the deal terms didn&rsquo;t make economic sense. They are still rated.
          They are still rankable. The "Visit [Operator]" button still goes to
          their site — it just doesn&rsquo;t carry our tracking ID.
        </p>
        <p>
          This is also true in the reverse: if a high-paying affiliate
          relationship would distort our coverage of the broader market — for
          example, by giving us a financial reason to over-cover one
          operator&rsquo;s vertical — we will turn it down or constrain it.
        </p>
      </section>

      <section class="aff-section">
        <h2 class="aff-h2">Where to escalate</h2>
        <p>
          If you believe a review on this site has been influenced by
          commercial considerations, please email
          <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a>
          with the operator name and the specific claim. We re-open reviews
          when readers surface verifiable concerns.
        </p>
      </section>
    </section>
  </article>
</template>

<style scoped>
.aff-hero { padding: var(--space-16) 0; text-align: center; border-bottom: 1px solid var(--border); }
.aff-hero-inner { max-width: 640px; }
.aff-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-4);
}
.aff-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: var(--space-4);
}
.aff-tagline {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.55;
}
.aff-body { padding: var(--space-12) var(--space-6) var(--space-16); }
.aff-section { margin-bottom: var(--space-10); }
.aff-h2 {
  font-size: clamp(1.5rem, 2.5vw, 1.75rem);
  letter-spacing: -0.025em;
  margin-bottom: var(--space-5);
}
.aff-section p {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}
.aff-bullets { padding-left: var(--space-5); display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4); }
.aff-bullets li {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
}
.aff-bullets li :deep(strong),
.aff-section :deep(strong) { color: var(--text-primary); font-weight: 600; }
.aff-section :deep(a) { color: var(--accent-primary); border-bottom: 1px dotted var(--accent-primary); }
code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  padding: 1px 6px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  color: var(--accent-primary);
}
</style>
