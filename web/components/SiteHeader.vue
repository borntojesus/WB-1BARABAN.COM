<script setup lang="ts">
const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

if (import.meta.client) {
  onMounted(() => {
    const onScroll = () => {
      scrolled.value = window.scrollY > 12
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', onScroll))
  })
}

const verticals = [
  { name: 'Casino', href: '/online-casinos' },
  { name: 'Sports', href: '/sports-betting' },
  { name: 'Poker', href: '/poker' },
  { name: 'Slots', href: '/slots' },
]

watch(() => route.path, () => {
  mobileOpen.value = false
})
</script>

<template>
  <header class="site-header" :class="{ scrolled, 'mobile-open': mobileOpen }">
    <div class="container-page header-inner">
      <BrandBrandMark size="md" />

      <nav class="primary-nav" aria-label="Primary">
        <NuxtLink
          v-for="v in verticals"
          :key="v.href"
          :to="v.href"
          class="nav-link"
          active-class="nav-link-active"
        >
          {{ v.name }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <NuxtLink to="/methodology" class="header-link mono">methodology</NuxtLink>
        <button
          class="mobile-menu-btn"
          type="button"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <nav v-if="mobileOpen" class="mobile-nav" aria-label="Mobile">
        <div class="container-page">
          <NuxtLink v-for="v in verticals" :key="v.href" :to="v.href" class="mobile-link">
            {{ v.name }}
          </NuxtLink>
          <hr class="mobile-divider" />
          <NuxtLink to="/methodology" class="mobile-link mono">Methodology</NuxtLink>
          <NuxtLink to="/about" class="mobile-link mono">About</NuxtLink>
          <NuxtLink to="/responsible-gambling" class="mobile-link mono">Responsible gambling</NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--header-height);
  background: color-mix(in srgb, var(--bg-primary) 75%, transparent);
  backdrop-filter: saturate(140%) blur(14px);
  -webkit-backdrop-filter: saturate(140%) blur(14px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--duration-base) var(--ease-out), background var(--duration-base) var(--ease-out);
}
.site-header.scrolled {
  border-bottom-color: var(--border);
  background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
}
.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-6);
}
.primary-nav {
  display: none;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
  margin-left: var(--space-8);
}
.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out);
}
.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}
.nav-link-active {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}
.header-link {
  display: none;
  padding: 6px 10px;
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  border-radius: var(--radius-sm);
  transition: color var(--duration-fast) var(--ease-out);
}
.header-link:hover { color: var(--text-secondary); }
.mobile-menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
}
.mobile-menu-btn:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}
.mobile-nav {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  padding: var(--space-4) 0 var(--space-6);
}
.mobile-nav .container-page {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-link {
  padding: 14px 16px;
  font-size: var(--text-lg);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-weight: 500;
}
.mobile-link:hover {
  background: var(--bg-tertiary);
  color: var(--accent-primary);
}
.mobile-divider {
  border: 0;
  border-top: 1px solid var(--border);
  margin: var(--space-3) 0;
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: opacity var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out);
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .primary-nav { display: flex; }
  .header-link { display: inline-flex; }
  .mobile-menu-btn { display: none; }
  .mobile-nav { display: none; }
}
</style>
