<script setup lang="ts">
type Props = {
  operatorName: string
  href: string
  score?: number
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
}
const props = withDefaults(defineProps<Props>(), { size: 'md', fullWidth: false, variant: 'primary' })
const showTooltip = ref(false)
</script>

<template>
  <span class="aff-wrap" :class="{ 'full-width': fullWidth }">
    <a
      :href="href"
      target="_blank"
      rel="sponsored nofollow noopener"
      class="aff-btn"
      :class="[`size-${size}`, `variant-${variant}`]"
      :aria-label="`Visit ${operatorName} (affiliate link)`"
    >
      <span>Visit {{ operatorName }}</span>
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </a>
    <button
      type="button"
      class="aff-info"
      :aria-label="`Affiliate disclosure for ${operatorName}`"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @focus="showTooltip = true"
      @blur="showTooltip = false"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none" />
        <circle cx="8" cy="5" r="0.9" fill="currentColor" />
        <path d="M8 7.5v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
    </button>
    <Transition name="tip">
      <span v-if="showTooltip" class="aff-tooltip" role="tooltip">
        1baraban may earn a commission if you sign up.
        <template v-if="score">We rated this {{ score.toFixed(1) }}/10 against our public methodology before any commercial relationship.</template>
        <NuxtLink to="/affiliate-disclosure" class="aff-tooltip-link">See full disclosure →</NuxtLink>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.aff-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.full-width { display: flex; width: 100%; }
.full-width .aff-btn { flex: 1; }
.aff-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out);
}
.size-sm { padding: 8px 14px; font-size: 13px; }
.size-md { padding: 12px 20px; font-size: 14px; }
.size-lg { padding: 14px 28px; font-size: 16px; }
.variant-primary {
  background: var(--accent-primary);
  color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 0 0 1px rgba(124, 92, 255, 0.4) inset;
}
.variant-primary:hover {
  background: var(--accent-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(124, 92, 255, 0.35), 0 0 0 1px rgba(124, 92, 255, 0.6) inset;
}
.variant-secondary {
  background: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--border);
}
.variant-secondary:hover {
  border-color: var(--accent-primary);
  background: var(--accent-primary-soft);
}
.aff-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  color: var(--text-tertiary);
  background: transparent;
  cursor: help;
  transition: color var(--duration-fast), background var(--duration-fast);
}
.aff-info:hover { color: var(--accent-primary); background: var(--bg-tertiary); }
.aff-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-secondary);
  box-shadow: var(--shadow-md);
  width: 260px;
  z-index: 30;
  pointer-events: none;
}
.aff-tooltip-link {
  display: block;
  margin-top: 8px;
  color: var(--accent-primary);
  font-weight: 500;
  pointer-events: auto;
}
.tip-enter-active, .tip-leave-active {
  transition: opacity 0.15s var(--ease-out), transform 0.15s var(--ease-out);
}
.tip-enter-from, .tip-leave-to {
  opacity: 0;
  transform: translate(-50%, 4px);
}
</style>
