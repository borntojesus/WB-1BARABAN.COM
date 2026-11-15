<script setup lang="ts">
type Props = {
  date: string
  reviewerInitials?: string
}
defineProps<Props>()
</script>

<template>
  <span class="verified-stamp" :title="`Verified by 1baraban on ${date}`">
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="var(--accent-gold)" opacity="0.18" />
      <path d="M5 8.2l2.2 2.2L11 6.5" stroke="var(--accent-gold)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="vs-text">Verified · <span class="mono">{{ date }}</span><span v-if="reviewerInitials"> · {{ reviewerInitials }}</span></span>
  </span>
</template>

<style scoped>
.verified-stamp {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(226, 183, 112, 0.35);
  background: rgba(226, 183, 112, 0.06);
  color: var(--accent-gold);
}
.vs-text { font-weight: 500; }
</style>
