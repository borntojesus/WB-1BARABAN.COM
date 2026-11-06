<script setup lang="ts">
import type { Operator } from '~/data/operators'

const props = defineProps<{
  eyebrow: string
  title: string
  intro: string
  operators: Operator[]
  emptyText?: string
}>()
const licensed = computed(() => props.operators.filter(o => o.gbStatus === 'licensed'))
const other = computed(() => props.operators.filter(o => o.gbStatus !== 'licensed'))
</script>

<template>
  <article class="vh">
    <header class="container-page vh-head">
      <p class="vh-eyebrow mono">{{ eyebrow }}</p>
      <h1 class="vh-title">{{ title }}</h1>
      <p class="vh-intro">{{ intro }}</p>
      <slot />
    </header>

    <section v-if="operators.length === 0" class="container-page vh-sec">
      <p class="vh-empty">{{ emptyText }}</p>
      <p><NuxtLink to="/reviews">See all operator profiles</NuxtLink></p>
    </section>

    <section v-if="licensed.length" class="container-page vh-sec">
      <h2>Licensed in Great Britain</h2>
      <div class="vh-grid"><OperatorCard v-for="o in licensed" :key="o.slug" :operator="o" /></div>
    </section>

    <section v-if="other.length" class="container-page vh-sec">
      <h2>Not available in Great Britain</h2>
      <p class="vh-sub">Information only. These operators are not licensed for GB players and we do not link to them.</p>
      <div class="vh-grid"><OperatorCard v-for="o in other" :key="o.slug" :operator="o" /></div>
    </section>

    <section class="container-page vh-sec vh-links">
      <p>
        <NuxtLink to="/compare">Compare all operators</NuxtLink> ·
        <NuxtLink to="/reviews">All profiles</NuxtLink> ·
        <NuxtLink to="/methodology">How we check facts</NuxtLink> ·
        <NuxtLink to="/responsible-gambling">Responsible gambling</NuxtLink>
      </p>
    </section>
  </article>
</template>

<style scoped>
.vh-head { padding-top: 48px; padding-bottom: 16px; max-width: 800px; }
.vh-eyebrow { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-primary); margin: 0 0 8px; }
.vh-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 16px; }
.vh-intro { font-size: 18px; line-height: 1.65; color: var(--text-secondary); margin: 0; }
.vh-sec { padding-top: 24px; padding-bottom: 24px; }
.vh-sec h2 { font-size: 24px; margin: 0 0 8px; }
.vh-sub { color: var(--text-secondary); margin: 0 0 16px; }
.vh-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 16px; margin-top: 16px; }
.vh-empty { font-size: 17px; }
.vh-links a { text-decoration: underline; color: var(--accent-primary); }
.vh-links { padding-bottom: 64px; }
</style>
