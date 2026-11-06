<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const handleError = () => clearError({ redirect: '/' })

const code = computed(() => props.error?.statusCode ?? 500)
const message = computed(() => {
  if (code.value === 404) return 'We can\'t find this page.'
  if (code.value >= 500) return 'Something broke on our side.'
  return props.error?.message || 'Unexpected error.'
})
</script>

<template>
  <div class="error-page hero-gradient">
    <div class="container-narrow error-inner">
      <p class="error-code mono">{{ code }}</p>
      <h1 class="error-title">{{ message }}</h1>
      <p class="error-sub">The signal got lost somewhere. Try the homepage or browse the reviews.</p>
      <div class="error-actions">
        <button @click="handleError" class="btn-primary">Back to home</button>
        <NuxtLink to="/reviews" class="btn-secondary">Browse reviews</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: var(--space-12) var(--space-6);
}
.error-inner { text-align: center; }
.error-code {
  font-size: 14px;
  color: var(--accent-primary);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: var(--space-4);
}
.error-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: var(--space-4);
  letter-spacing: -0.03em;
}
.error-sub {
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto var(--space-8);
  font-size: var(--text-lg);
  line-height: 1.6;
}
.error-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary {
  background: var(--accent-primary);
  color: #fff;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: background var(--duration-fast) var(--ease-out);
}
.btn-primary:hover { background: var(--accent-primary-hover); }
.btn-secondary {
  color: var(--text-secondary);
  padding: 12px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out);
}
.btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
</style>
