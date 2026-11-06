<script setup lang="ts">
type Props = {
  size?: 'sm' | 'md' | 'lg'
  withWordmark?: boolean
}
withDefaults(defineProps<Props>(), { size: 'md', withWordmark: true })
</script>

<template>
  <NuxtLink to="/" class="brand-mark" :class="`size-${size}`" aria-label="1baraban home">
    <span class="glyph" aria-hidden="true">
      <!-- abstract reel-arc glyph -->
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bm-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#7C5CFF" />
            <stop offset="100%" stop-color="#34D399" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" stroke="url(#bm-grad)" stroke-width="2" />
        <path d="M10 16h12M16 10v12" stroke="url(#bm-grad)" stroke-width="2" stroke-linecap="round" />
      </svg>
    </span>
    <span v-if="withWordmark" class="wordmark">
      <span class="num">1</span><span class="word">baraban</span>
    </span>
  </NuxtLink>
</template>

<style scoped>
.brand-mark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
  transition: opacity var(--duration-fast) var(--ease-out);
}
.brand-mark:hover { opacity: 0.85; }
.glyph {
  display: inline-flex;
  flex-shrink: 0;
}
.size-sm .glyph svg { width: 22px; height: 22px; }
.size-md .glyph svg { width: 28px; height: 28px; }
.size-lg .glyph svg { width: 40px; height: 40px; }
.wordmark {
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.02em;
  display: inline-flex;
  align-items: baseline;
}
.size-sm .wordmark { font-size: 16px; }
.size-md .wordmark { font-size: 18px; }
.size-lg .wordmark { font-size: 24px; }
.num {
  font-family: var(--font-mono);
  background: linear-gradient(135deg, #7C5CFF 0%, #34D399 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-right: 1px;
}
.word { color: var(--text-primary); }
</style>
