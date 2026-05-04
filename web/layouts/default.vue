<script setup lang="ts">
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main id="main" class="main">
      <slot />
    </main>
    <SiteFooter />
    <BottomNav />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  color: var(--text-primary);
}
.main {
  flex: 1;
  padding-top: var(--header-height);
  padding-bottom: var(--bottom-nav-height);
}
@media (min-width: 768px) {
  .main { padding-bottom: 0; }
}
</style>
