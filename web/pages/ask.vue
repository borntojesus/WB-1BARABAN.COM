<script setup lang="ts">
const route = useRoute()
const { messages, isStreaming, send, reset } = useChat()
const input = ref('')
const scroller = ref<HTMLDivElement | null>(null)

const initialQuery = computed(() => {
  const q = route.query.q
  return Array.isArray(q) ? q[0] : q ?? ''
})

const starters = [
  'Best slot sites in EU with low wagering',
  'Crypto casinos with sub-1-hour BTC withdrawals',
  'Sportsbooks with cash-out and bet builder, EU-licensed',
  'Casinos that accept Trustly with same-day payouts',
  'Soft KYC operators for under €5k volume',
  'Tier-1 licensed casinos for UK players',
]

async function handleSend() {
  const q = input.value.trim()
  if (!q || isStreaming.value) return
  input.value = ''
  await send(q)
  await scrollToBottom()
}

async function handleStarter(text: string) {
  if (isStreaming.value) return
  await send(text)
  await scrollToBottom()
}

async function scrollToBottom() {
  await nextTick()
  const el = scroller.value
  if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
}

onMounted(async () => {
  if (initialQuery.value && !messages.value.length) {
    await send(initialQuery.value)
    await scrollToBottom()
  }
})

watch(messages, () => scrollToBottom(), { deep: true })

useSeoMeta({
  title: 'Concierge — ask anything about online gambling',
  description: 'AI concierge that searches our reviewed-operators database. Ask in plain English, get matched operators with citations.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="ask">
    <section class="ask-hero hero-gradient">
      <div class="container-narrow ask-hero-inner">
        <p class="ask-eyebrow mono">1baraban concierge</p>
        <h1 class="ask-title">Ask anything about online gambling.</h1>
        <p class="ask-tagline">
          Plain-English search across our reviewed operators. Every recommendation
          comes from our database — never invented, never inflated.
        </p>
      </div>
    </section>

    <section class="container-narrow ask-shell">
      <div ref="scroller" class="ask-scroll">
        <div v-if="!messages.length" class="ask-empty">
          <p class="ask-empty-title">Try one of these to start</p>
          <div class="ask-starters">
            <button
              v-for="s in starters"
              :key="s"
              type="button"
              class="ask-starter"
              :disabled="isStreaming"
              @click="handleStarter(s)"
            >
              {{ s }}
            </button>
          </div>
          <p class="ask-empty-foot mono">
            stub backend · responses come from the local mock dataset until the Strapi + AI Gateway pipeline ships
          </p>
        </div>

        <div v-else class="ask-thread">
          <AIAIChatMessage v-for="(m, i) in messages" :key="i" :message="m" />
          <div v-if="isStreaming" class="ask-thinking" aria-live="polite">
            <span class="dot" /><span class="dot" /><span class="dot" />
          </div>
        </div>
      </div>

      <form class="ask-form" @submit.prevent="handleSend">
        <input
          v-model="input"
          type="text"
          class="ask-input"
          placeholder="Ask the concierge…"
          aria-label="Ask the concierge"
          autocomplete="off"
          :disabled="isStreaming"
        />
        <button
          v-if="messages.length"
          type="button"
          class="ask-reset mono"
          :disabled="isStreaming"
          @click="reset()"
        >
          new chat
        </button>
        <button type="submit" class="ask-send" :disabled="!input.trim() || isStreaming" aria-label="Send">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8h10m0 0L9 4m4 4l-4 4" />
          </svg>
          <span>Send</span>
        </button>
      </form>

      <p class="ask-disclaimer mono">
        AI may be inaccurate. Verify operator T&Cs at the source. 18+. Gamble responsibly —
        <a href="https://www.begambleaware.org/" rel="noopener" target="_blank">BeGambleAware</a>.
      </p>
    </section>
  </div>
</template>

<style scoped>
.ask {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--header-height) - var(--bottom-nav-height));
}
@media (min-width: 768px) {
  .ask { min-height: calc(100vh - var(--header-height)); }
}

.ask-hero { padding: var(--space-12) 0 var(--space-8); }
.ask-hero-inner { text-align: center; }
.ask-eyebrow {
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-primary);
  margin: 0 0 var(--space-3);
}
.ask-title {
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.035em;
  line-height: 1.1;
  margin-bottom: var(--space-4);
}
.ask-tagline {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.55;
}

.ask-shell {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-6) var(--space-6) var(--space-12);
  gap: var(--space-4);
}

.ask-scroll {
  flex: 1;
  min-height: 320px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  overflow-y: auto;
}

.ask-empty {
  padding: var(--space-8) var(--space-3);
  text-align: center;
}
.ask-empty-title {
  font-size: var(--text-base);
  color: var(--text-secondary);
  margin: 0 0 var(--space-5);
}
.ask-starters {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
  max-width: 540px;
  margin: 0 auto var(--space-8);
}
@media (min-width: 640px) { .ask-starters { grid-template-columns: 1fr 1fr; } }
.ask-starter {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.ask-starter:hover:not(:disabled) {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--accent-primary-soft);
}
.ask-starter:disabled { opacity: 0.5; cursor: not-allowed; }
.ask-empty-foot {
  font-size: 11px;
  color: var(--text-quaternary);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.55;
}

.ask-thread { display: flex; flex-direction: column; }
.ask-thinking {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: var(--space-3) 0;
}
.ask-thinking .dot {
  width: 6px;
  height: 6px;
  border-radius: 4px;
  background: var(--text-tertiary);
  animation: dot-pulse 1.2s var(--ease-in-out) infinite;
}
.ask-thinking .dot:nth-child(2) { animation-delay: 0.15s; }
.ask-thinking .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes dot-pulse {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
}

.ask-form {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
.ask-form:focus-within {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-primary-soft);
}
.ask-input {
  flex: 1;
  height: 44px;
  padding: 0 var(--space-3);
  background: transparent;
  border: 0;
  outline: 0;
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--text-primary);
  min-width: 0;
}
.ask-reset {
  font-size: 11px;
  color: var(--text-tertiary);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  cursor: pointer;
  transition: color var(--duration-fast), border-color var(--duration-fast);
}
.ask-reset:hover { color: var(--text-primary); border-color: var(--border-strong); }
.ask-reset:disabled { opacity: 0.5; cursor: not-allowed; }
.ask-send {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 44px;
  padding: 0 var(--space-4);
  background: var(--accent-primary);
  color: #fff;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 14px;
  transition: background var(--duration-fast);
}
.ask-send:hover:not(:disabled) { background: var(--accent-primary-hover); }
.ask-send:disabled { opacity: 0.5; cursor: not-allowed; }

.ask-disclaimer {
  font-size: 11px;
  color: var(--text-quaternary);
  text-align: center;
  margin: 0;
}
.ask-disclaimer a { color: var(--text-tertiary); border-bottom: 1px dotted var(--text-tertiary); }
.ask-disclaimer a:hover { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }
</style>
