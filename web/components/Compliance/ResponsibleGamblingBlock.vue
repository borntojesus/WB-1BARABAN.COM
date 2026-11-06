<script setup lang="ts">
type Props = {
  variant?: 'compact' | 'full'
}
withDefaults(defineProps<Props>(), { variant: 'compact' })
</script>

<template>
  <aside class="rg-block" :class="`variant-${variant}`" role="complementary" aria-label="Responsible gambling">
    <div class="rg-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    </div>
    <div class="rg-body">
      <p v-if="variant === 'full'" class="rg-title">Gamble responsibly</p>
      <p class="rg-text">
        18+ only. Gambling can be addictive, please play responsibly.
        Free, confidential help:
        <a href="https://www.begambleaware.org/" rel="noopener" target="_blank">BeGambleAware.org</a>,
        <a href="https://www.gamstop.co.uk/" rel="noopener" target="_blank">GAMSTOP</a>,
        <NuxtLink to="/responsible-gambling">more help</NuxtLink>.
      </p>
    </div>
  </aside>
</template>

<style scoped>
.rg-block {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}
.rg-icon {
  flex-shrink: 0;
  color: var(--accent-success);
}
.rg-body { flex: 1; }
.rg-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 4px;
}
.rg-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0;
}
.rg-text a {
  color: var(--accent-primary);
  border-bottom: 1px dotted var(--accent-primary);
  transition: border-bottom-style var(--duration-fast);
}
.rg-text a:hover { border-bottom-style: solid; }
.variant-full {
  flex-direction: column;
  text-align: center;
  padding: var(--space-6);
}
.variant-full .rg-icon { margin: 0 auto; }
</style>
