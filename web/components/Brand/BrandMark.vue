<script setup lang="ts">
type Props = {
  size?: 'sm' | 'md' | 'lg'
  withWordmark?: boolean
}
withDefaults(defineProps<Props>(), { size: 'md', withWordmark: true })
</script>

<template>
  <NuxtLink to="/" class="brand-mark" :class="`size-${size}`" aria-label="1baraban home">
    <template v-if="withWordmark">
      <img class="logo logo-on-dark" src="/brand/logo-on-dark.png" alt="1baraban" width="571" height="144" />
      <img class="logo logo-on-light" src="/brand/logo-on-light.png" alt="1baraban" width="571" height="144" />
    </template>
    <img v-else class="mark" src="/brand/mark.png" alt="" width="256" height="256" />
  </NuxtLink>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.brand-mark:hover { opacity: 0.85; }
.logo { display: block; width: auto; }
.size-sm .logo { height: 24px; }
.size-md .logo { height: 32px; }
.size-lg .logo { height: 44px; }
.mark { display: block; }
.size-sm .mark { width: 22px; height: 22px; }
.size-md .mark { width: 28px; height: 28px; }
.size-lg .mark { width: 40px; height: 40px; }
.logo-on-light { display: none; }
:global(html[data-theme="light"]) .logo-on-dark { display: none; }
:global(html[data-theme="light"]) .logo-on-light { display: block; }
</style>
