<script setup lang="ts">
type Props = {
  authority: string
  number?: string
  registerUrl: string
  tier?: 'tier1' | 'tier2' | 'offshore'
}
withDefaults(defineProps<Props>(), { tier: 'tier2' })

const short = (s: string) => {
  if (s.includes('UK')) return 'UKGC'
  if (s.includes('Malta')) return 'MGA'
  if (s.includes('Curaçao')) return 'Curaçao'
  if (s.includes('Spelinspektionen')) return 'Spelins.'
  if (s.includes('Kansspel')) return 'KSA'
  if (s.includes('Gibraltar')) return 'GBGA'
  return s.split(' ').slice(0, 2).join(' ')
}
</script>

<template>
  <a :href="registerUrl" rel="nofollow noopener" target="_blank" class="lic-badge" :class="`tier-${tier}`" :title="`${authority}${number ? ' #' + number : ''}`">
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path d="M8 1l5 2.5v4.7c0 3-2 5.5-5 6.8-3-1.3-5-3.8-5-6.8V3.5L8 1z" stroke="currentColor" stroke-width="1.2" fill="none" />
      <path d="M5.5 8.2L7 9.5l3.5-3.5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="lic-name">{{ short(authority) }}</span>
    <span v-if="number" class="lic-num mono">#{{ number.slice(0, 6) }}</span>
  </a>
</template>

<style scoped>
.lic-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  text-decoration: none;
  transition: border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}
.lic-badge:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
.tier-tier1 { color: var(--accent-success); border-color: rgba(52, 211, 153, 0.3); }
.tier-tier1:hover { color: var(--accent-success); border-color: var(--accent-success); }
.tier-offshore { color: var(--text-tertiary); }
.lic-num { font-size: 11px; opacity: 0.7; }
</style>
