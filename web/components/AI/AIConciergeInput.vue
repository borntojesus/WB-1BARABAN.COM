<script setup lang="ts">
type Props = {
  size?: 'md' | 'lg'
  showStarters?: boolean
}
withDefaults(defineProps<Props>(), { size: 'lg', showStarters: true })

const router = useRouter()
const input = ref('')
const placeholderIdx = ref(0)
const placeholders = [
  'Crypto casino with sub-1-hour BTC payouts and low wagering…',
  'Best UK-licensed slot site for high-RTP Pragmatic games…',
  'Casinos that accept Trustly with 24-hour withdrawals…',
  'Sportsbook with cash-out and bet builder, EU-licensed…',
  'Crypto casino with no KYC under €5k…',
]
const starters = [
  'Best slots casinos in EU',
  'Fastest crypto withdrawals',
  'Casinos with low wagering bonuses',
  'Soft KYC operators',
]

let interval: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  interval = setInterval(() => {
    placeholderIdx.value = (placeholderIdx.value + 1) % placeholders.length
  }, 3500)
})
onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

function submit() {
  const q = input.value.trim()
  if (!q) return
  router.push(`/ask?q=${encodeURIComponent(q)}`)
}

function startWith(text: string) {
  input.value = text
  submit()
}
</script>

<template>
  <div class="ai-input-wrap" :class="`size-${size}`">
    <form class="ai-input" @submit.prevent="submit">
      <span class="ai-glyph" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </span>
      <Transition name="placeholder" mode="out-in">
        <span v-if="!input" :key="placeholderIdx" class="ai-placeholder">{{ placeholders[placeholderIdx] }}</span>
      </Transition>
      <input
        v-model="input"
        type="text"
        class="ai-field"
        aria-label="Ask the 1baraban concierge"
        autocomplete="off"
        spellcheck="false"
      />
      <button type="submit" class="ai-send" :aria-label="input ? 'Send query' : 'Ask the concierge'" :disabled="!input.trim()">
        <span class="ai-send-label">Ask</span>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </form>
    <div v-if="showStarters" class="ai-starters">
      <button
        v-for="s in starters"
        :key="s"
        type="button"
        class="ai-starter mono"
        @click="startWith(s)"
      >
        {{ s }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.ai-input-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}
.ai-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 0 6px 0 var(--space-5);
  transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.ai-input:focus-within {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-primary-soft), var(--shadow-glow);
}
.size-md .ai-input { height: 52px; }
.size-lg .ai-input { height: 64px; }
.ai-glyph { color: var(--accent-primary); display: inline-flex; flex-shrink: 0; }
.ai-field {
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--text-primary);
  min-width: 0;
}
.size-lg .ai-field { font-size: var(--text-lg); }
.ai-placeholder {
  position: absolute;
  left: calc(var(--space-5) + 22px + var(--space-3));
  right: 100px;
  color: var(--text-tertiary);
  font-size: var(--text-base);
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.size-lg .ai-placeholder { font-size: var(--text-lg); }
.ai-send {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: var(--accent-primary);
  color: #fff;
  border-radius: var(--radius-lg);
  font-weight: 500;
  font-size: 14px;
  flex-shrink: 0;
  transition: background var(--duration-fast) var(--ease-out), opacity var(--duration-fast);
}
.ai-send:hover:not(:disabled) { background: var(--accent-primary-hover); }
.ai-send:disabled { opacity: 0.6; cursor: not-allowed; }
.size-lg .ai-send { padding: 12px 22px; }
.ai-starters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--space-2);
}
.ai-starter {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  background: transparent;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.ai-starter:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--accent-primary-soft);
}

.placeholder-enter-active, .placeholder-leave-active {
  transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}
.placeholder-enter-from { opacity: 0; transform: translateY(4px); }
.placeholder-leave-to { opacity: 0; transform: translateY(-4px); }

@media (max-width: 640px) {
  .size-lg .ai-input { height: 56px; }
  .size-lg .ai-field, .size-lg .ai-placeholder { font-size: 15px; }
  .ai-send-label { display: none; }
  .ai-send { padding: 10px 14px; }
}
</style>
