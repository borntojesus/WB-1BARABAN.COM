<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; lead?: string }>()
</script>

<template>
  <div class="prose-page">
    <div class="container-narrow">
      <p v-if="eyebrow" class="pp-eyebrow mono">{{ eyebrow }}</p>
      <h1 class="pp-title">{{ title }}</h1>
      <p v-if="lead" class="pp-lead">{{ lead }}</p>
      <div class="pp-body"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.prose-page { padding: var(--space-12) 0 var(--space-8); }
.pp-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-primary); margin-bottom: var(--space-3); }
.pp-title { font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -0.03em; line-height: 1.12; margin-bottom: var(--space-4); }
.pp-lead { font-size: var(--text-lg); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-8); }
.pp-body :deep(h2) { font-size: var(--text-2xl); margin: var(--space-10) 0 var(--space-3); letter-spacing: -0.02em; }
.pp-body :deep(h3) { font-size: var(--text-lg); margin: var(--space-6) 0 var(--space-2); }
.pp-body :deep(p), .pp-body :deep(li) { color: var(--text-secondary); line-height: 1.65; }
.pp-body :deep(p) { margin: 0 0 var(--space-4); }
.pp-body :deep(ul), .pp-body :deep(ol) { margin: 0 0 var(--space-4); padding-left: var(--space-6); }
.pp-body :deep(li) { margin-bottom: var(--space-2); }
.pp-body :deep(a) { color: var(--accent-primary); border-bottom: 1px solid var(--accent-primary-soft); }
.pp-body :deep(a:hover) { border-bottom-color: var(--accent-primary); }
.pp-body :deep(strong) { color: var(--text-primary); }
.pp-body :deep(.pp-note) { padding: var(--space-4); background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: var(--radius-md); margin: 0 0 var(--space-6); }
.pp-body :deep(.pp-note p) { margin: 0; }
.pp-body :deep(.pp-grid) { display: grid; gap: var(--space-4); grid-template-columns: 1fr; margin-bottom: var(--space-6); }
@media (min-width: 640px) { .pp-body :deep(.pp-grid) { grid-template-columns: 1fr 1fr; } }
.pp-body :deep(.pp-card) { padding: var(--space-4); background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); }
.pp-body :deep(.pp-card h3) { margin-top: 0; }
.pp-body :deep(.pp-card p) { margin-bottom: var(--space-2); }
.pp-body :deep(.pp-meta) { font-size: 12px; color: var(--text-tertiary); }
</style>
