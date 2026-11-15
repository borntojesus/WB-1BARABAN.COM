<script setup lang="ts">
import { mockOperators } from '~/data/operators'
import { GraduationCap, ClipboardCheck, Scale, FileText } from 'lucide-vue-next'

const route = useRoute()
const slug = String(route.params.slug)
const reviews = mockOperators.filter((o) => o.reviewer.href === `/authors/${slug}`)
const author = reviews[0]?.reviewer

if (!author) {
  throw createError({ statusCode: 404, statusMessage: 'Author not found', fatal: true })
}

useSeoMeta({
  title: `${author.name}, reviewer`,
  description: `${author.name} (${author.credentials}) reviews online gambling operators for 1baraban.`,
})

useSchemaOrg([
  definePerson({
    name: author.name,
    jobTitle: author.credentials,
    url: `https://1baraban.com/authors/${slug}`,
  }),
])
</script>

<template>
  <div v-if="author" class="au">
    <section class="au-hero hero-gradient">
      <div class="container-page">
        <nav class="au-crumbs mono" aria-label="Breadcrumb">
          <NuxtLink to="/">1baraban</NuxtLink>
          <span aria-hidden="true"> / </span>
          <span>authors</span>
        </nav>
        <div class="au-head">
          <span class="au-avatar mono" aria-hidden="true">{{ author.initials }}</span>
          <div>
            <h1 class="au-name">{{ author.name }}</h1>
            <p class="au-cred"><GraduationCap :size="16" aria-hidden="true" />{{ author.credentials }}</p>
          </div>
        </div>
        <p class="au-lead">
          <ClipboardCheck class="au-lead-icon" :size="18" aria-hidden="true" />
          Reviews operators against the <NuxtLink to="/methodology">1baraban methodology</NuxtLink>: licence check,
          real withdrawal tests and bonus wagering math. Operators cannot pay for a score.
        </p>
      </div>
    </section>

    <section class="container-page au-body">
      <h2 class="au-h2"><FileText :size="20" aria-hidden="true" />Reviews by {{ author.name }} ({{ reviews.length }})</h2>
      <div class="au-grid">
        <OperatorCard v-for="o in reviews" :key="o.slug" :operator="o" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.au-hero { padding: var(--space-12) 0 var(--space-8); }
.au-crumbs { font-size: 12px; color: var(--text-tertiary); margin-bottom: var(--space-6); }
.au-crumbs a { color: var(--text-tertiary); text-decoration: none; }
.au-head { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-5); }
.au-avatar { width: 64px; height: 64px; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--accent-primary), #4f8aff); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 20px; flex-shrink: 0; }
.au-name { font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.03em; margin: 0; }
.au-cred { display: flex; align-items: center; gap: 6px; color: var(--text-secondary); margin: 4px 0 0; }
.au-lead-icon { color: var(--accent-primary); vertical-align: -3px; margin-right: 6px; }
.au-lead { color: var(--text-secondary); max-width: 62ch; margin: 0; }
.au-lead a { color: var(--accent-primary); }
.au-body { padding-bottom: var(--space-16); }
.au-h2 { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xl, 22px); margin: 0 0 var(--space-5); }
.au-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: var(--space-4); }
</style>
