<script setup lang="ts">
import type { Vertical, Operator } from '~/data/operators'

type Props = {
  vertical: Vertical
  title: string
  tagline: string
  intro: string
  operators: Operator[]
  heroImage?: string
  facts?: { label: string; value: string }[]
}
defineProps<Props>()
</script>

<template>
  <article class="vertical-hub">
    <section class="vh-hero hero-gradient">
      <div class="container-page vh-hero-inner">
        <p class="vh-eyebrow mono">{{ vertical }}</p>
        <h1 class="vh-title">{{ title }}</h1>
        <p class="vh-tagline">{{ tagline }}</p>
      </div>
      <div v-if="heroImage" class="vh-hero-bg" :style="{ backgroundImage: `url(${heroImage})` }" />
    </section>

    <section class="container-page vh-facts" v-if="facts?.length">
      <div v-for="f in facts" :key="f.label" class="vh-fact">
        <p class="vh-fact-label mono">{{ f.label }}</p>
        <p class="vh-fact-value">{{ f.value }}</p>
      </div>
    </section>

    <section class="container-page vh-intro">
      <p>{{ intro }}</p>
    </section>

    <section class="container-page vh-list">
      <div class="vh-list-head">
        <h2 class="vh-list-title">Top {{ vertical }} operators by Trust Index</h2>
        <p class="vh-list-sub mono">methodology v2.4 · sorted by editorial score</p>
      </div>
      <div class="vh-grid">
        <OperatorCard v-for="op in operators" :key="op.slug" :operator="op" />
      </div>
    </section>

    <section class="container-page vh-rg">
      <ResponsibleGamblingBlock variant="compact" />
    </section>
  </article>
</template>

<style scoped>
.vh-hero {
  position: relative;
  padding: var(--space-20) 0 var(--space-16);
  overflow: hidden;
}
.vh-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.35;
  mix-blend-mode: screen;
  z-index: 0;
}
.vh-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 720px;
}
.vh-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-3);
}
.vh-title {
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: var(--space-4);
}
.vh-tagline {
  color: var(--text-secondary);
  font-size: var(--text-xl);
  line-height: 1.55;
  max-width: 560px;
}
.vh-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--space-2);
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--border);
}
.vh-fact {
  padding: var(--space-3);
}
.vh-fact-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  margin: 0 0 4px;
}
.vh-fact-value {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.vh-intro {
  padding-top: var(--space-12);
  padding-bottom: var(--space-8);
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.7;
}
.vh-list { padding-bottom: var(--space-16); }
.vh-list-head {
  margin-bottom: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.vh-list-title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  letter-spacing: -0.025em;
}
.vh-list-sub {
  font-size: 12px;
  color: var(--text-tertiary);
}
.vh-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}
@media (min-width: 768px) {
  .vh-grid { grid-template-columns: repeat(2, 1fr); }
}
.vh-rg { padding-bottom: var(--space-16); }
</style>
