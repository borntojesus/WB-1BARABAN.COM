<script setup lang="ts">
import type { Source } from '~/data/operators'
defineProps<{ sources: Source[]; checked: string }>()
</script>

<template>
  <p class="src">
    <template v-if="sources.length">
      <span class="src-label">Source:</span>
      <template v-for="(s, i) in sources" :key="s.url">
        <FactsSourceLink :source="s" /><span v-if="i < sources.length - 1">; </span>
      </template>
      <span class="src-sep"> · </span>
    </template>
    <span v-else class="src-label">No source. </span>
    <span class="src-date">Checked {{ checked }}</span>
  </p>
</template>

<style scoped>
.src { margin: 4px 0 0; font-size: 12px; line-height: 1.5; color: var(--text-tertiary); }
.src a { color: var(--accent-primary); text-decoration: underline; word-break: break-word; }
</style>
