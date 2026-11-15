<script setup lang="ts">
type Props = {
  hours: number
  sample?: number
}
const props = defineProps<Props>()

const label = computed(() => {
  if (props.hours <= 1) return '~1h avg'
  if (props.hours < 24) return `~${props.hours}h avg`
  const d = Math.round(props.hours / 24)
  return `~${d}d avg`
})
const tone = computed(() => {
  if (props.hours <= 4) return 'fast'
  if (props.hours <= 24) return 'ok'
  return 'slow'
})
</script>

<template>
  <span class="ps-badge" :class="`tone-${tone}`" :title="sample ? `Tested on n=${sample} payouts` : 'Median tested withdrawal speed'">
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none" />
      <path d="M8 4v4l2.5 1.5" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="ps-label mono">{{ label }}</span>
  </span>
</template>

<style scoped>
.ps-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}
.tone-fast { color: var(--accent-success); border-color: rgba(52, 211, 153, 0.25); }
.tone-ok { color: var(--text-secondary); }
.tone-slow { color: var(--accent-warn); border-color: rgba(245, 158, 11, 0.25); }
.ps-label { font-size: 11px; }
</style>
