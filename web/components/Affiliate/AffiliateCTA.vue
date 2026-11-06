<script setup lang="ts">
// Outbound commercial link. Only rendered for GB-licensed operators.
defineProps<{ operatorName: string; slug: string; size?: 'sm' | 'md' }>()
</script>

<template>
  <div class="cta" :class="`cta-${size || 'md'}`">
    <a :href="`/go/${slug}`" rel="sponsored nofollow noopener" target="_blank" class="cta-btn">Visit {{ operatorName }} (18+)</a>
    <p class="cta-label">
      Ad. We may be paid if you sign up. 18+. Please gamble responsibly.
      <a href="https://www.begambleaware.org" rel="nofollow noopener" target="_blank">BeGambleAware.org</a>
    </p>
  </div>
</template>

<style scoped>
.cta { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
.cta-btn { display: inline-block; padding: 10px 18px; background: var(--text-primary); color: #fff; border-radius: 4px; font-weight: 600; font-size: 15px; text-decoration: none; }
.cta-sm .cta-btn { padding: 8px 14px; font-size: 14px; }
.cta-btn:hover { background: #27272a; }
.cta-label { margin: 0; font-size: 12px; line-height: 1.45; color: var(--text-secondary); max-width: 46ch; }
.cta-label a { text-decoration: underline; color: inherit; }
</style>
