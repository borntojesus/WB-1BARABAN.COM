<script setup lang="ts">
const route = useRoute()

const items = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Casino', href: '/online-casinos', icon: 'casino' },
  { label: 'Slots', href: '/slots', icon: 'slots' },
  { label: 'Compare', href: '/compare', icon: 'compare' },
  { label: 'Ask', href: '/ask', icon: 'ai' },
]

const isActive = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}
</script>

<template>
  <nav class="bottom-nav" aria-label="Bottom navigation">
    <NuxtLink
      v-for="item in items"
      :key="item.href"
      :to="item.href"
      class="bn-item"
      :class="{ 'bn-active': isActive(item.href) }"
    >
      <span class="bn-icon" aria-hidden="true">
        <svg v-if="item.icon === 'home'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12L12 3l9 9M5 10v10h14V10" />
        </svg>
        <svg v-else-if="item.icon === 'casino'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7 8v8M12 8v8M17 8v8" />
        </svg>
        <svg v-else-if="item.icon === 'slots'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <svg v-else-if="item.icon === 'compare'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 3v18M15 3v18M3 9h6M3 15h6M15 9h6M15 15h6" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      </span>
      <span class="bn-label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
  backdrop-filter: saturate(140%) blur(14px);
  -webkit-backdrop-filter: saturate(140%) blur(14px);
  border-top: 1px solid var(--border);
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom));
}
.bn-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--text-tertiary);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 6px 0;
  transition: color var(--duration-fast) var(--ease-out);
}
.bn-item:hover { color: var(--text-secondary); }
.bn-active { color: var(--accent-primary); }
.bn-icon { display: inline-flex; }
.bn-label { font-size: 10px; }

@media (min-width: 768px) {
  .bottom-nav { display: none; }
}
</style>
