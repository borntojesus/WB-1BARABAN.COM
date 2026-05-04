<script setup lang="ts">
const open = ref(false)

onMounted(() => {
  if (typeof window === 'undefined') return
  const consent = localStorage.getItem('1b-consent')
  if (!consent) {
    setTimeout(() => { open.value = true }, 1200)
  }
})

function setConsent(value: 'all' | 'essential') {
  if (typeof window !== 'undefined') {
    localStorage.setItem('1b-consent', value)
  }
  open.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="banner">
      <div v-if="open" class="cookie-banner" role="region" aria-label="Cookie consent">
        <div class="cb-inner">
          <div class="cb-text">
            <p class="cb-title">Cookies, but make it boring</p>
            <p class="cb-body">
              We use first-party cookies for theme + age confirmation, and privacy-first analytics (Plausible, no PII). No ad-tech, no third-party trackers.
              <NuxtLink to="/privacy" class="cb-link">Privacy policy →</NuxtLink>
            </p>
          </div>
          <div class="cb-actions">
            <button class="cb-btn cb-essential" type="button" @click="setConsent('essential')">Essential only</button>
            <button class="cb-btn cb-all" type="button" @click="setConsent('all')">Accept all</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom) + 16px);
  left: 16px;
  right: 16px;
  z-index: 60;
  max-width: 720px;
  margin: 0 auto;
}
.cb-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
.cb-text { flex: 1; }
.cb-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
}
.cb-body {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}
.cb-link {
  color: var(--accent-primary);
  margin-left: 4px;
}
.cb-actions {
  display: flex;
  gap: var(--space-2);
  align-self: flex-end;
}
.cb-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.cb-essential {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
.cb-essential:hover { color: var(--text-primary); border-color: var(--border-strong); }
.cb-all {
  background: var(--accent-primary);
  color: #fff;
}
.cb-all:hover { background: var(--accent-primary-hover); }

@media (min-width: 768px) {
  .cookie-banner { bottom: 16px; }
  .cb-inner { flex-direction: row; align-items: center; }
  .cb-actions { align-self: center; }
}
.banner-enter-active, .banner-leave-active {
  transition: opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
}
.banner-enter-from, .banner-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
