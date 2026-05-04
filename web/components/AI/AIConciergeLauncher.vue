<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const { messages, isStreaming, send } = useChat()
const input = ref('')
const sheet = ref<HTMLDivElement | null>(null)

// Hide on /ask page (full chat is there)
const hidden = computed(() => route.path === '/ask')

watch(open, (v) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = v ? 'hidden' : ''
  }
})

async function handleSend() {
  const text = input.value
  if (!text.trim()) return
  input.value = ''
  await send(text)
  scrollToBottom()
}

async function scrollToBottom() {
  await nextTick()
  const el = sheet.value
  if (el) el.scrollTop = el.scrollHeight
}

watch(messages, () => scrollToBottom(), { deep: true })

function close() {
  open.value = false
}

onMounted(() => {
  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') close()
  }
  window.addEventListener('keydown', onEscape)
  onUnmounted(() => window.removeEventListener('keydown', onEscape))
})
</script>

<template>
  <div v-if="!hidden">
    <button
      class="ai-launcher"
      type="button"
      :class="{ 'ai-open': open }"
      :aria-label="open ? 'Close concierge' : 'Open AI concierge'"
      :aria-expanded="open"
      @click="open = !open"
    >
      <svg v-if="!open" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12h8M12 8v8" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>

    <Teleport to="body">
      <Transition name="sheet">
        <div v-if="open" class="ai-sheet-overlay" @click.self="close">
          <div class="ai-sheet" role="dialog" aria-modal="true" aria-label="1baraban concierge">
            <header class="ai-sheet-head">
              <div class="ai-sheet-title">
                <BrandBrandMark size="sm" :with-wordmark="false" />
                <div>
                  <p class="ai-sheet-name">1baraban Concierge</p>
                  <p class="ai-sheet-sub mono">stub · backend ships next</p>
                </div>
              </div>
              <button class="ai-sheet-close" type="button" aria-label="Close" @click="close">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
                  <path d="M4 4l8 8M12 4L4 12" />
                </svg>
              </button>
            </header>

            <div ref="sheet" class="ai-sheet-body">
              <div v-if="!messages.length" class="ai-sheet-empty">
                <p class="ai-empty-title">Ask anything about online gambling.</p>
                <p class="ai-empty-sub">I search 5 vetted operators in our database and never recommend anything we haven't reviewed.</p>
              </div>
              <AIChatMessage v-for="(m, i) in messages" :key="i" :message="m" />
              <div v-if="isStreaming" class="ai-thinking">
                <span class="dot" /><span class="dot" /><span class="dot" />
              </div>
            </div>

            <form class="ai-sheet-foot" @submit.prevent="handleSend">
              <input
                v-model="input"
                type="text"
                placeholder="Ask the concierge…"
                aria-label="Ask the concierge"
                class="ai-sheet-input"
                autocomplete="off"
              />
              <button type="submit" class="ai-sheet-send" :disabled="!input.trim() || isStreaming" aria-label="Send">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 8h10m0 0L9 4m4 4l-4 4" />
                </svg>
              </button>
            </form>

            <div class="ai-sheet-disclaimer mono">
              AI may be inaccurate. Verify operator T&Cs. 18+. Gamble responsibly.
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.ai-launcher {
  position: fixed;
  bottom: calc(var(--bottom-nav-height) + env(safe-area-inset-bottom) + 16px);
  right: 16px;
  z-index: 70;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent-primary) 0%, #4F8AFF 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(124, 92, 255, 0.4), 0 1px 2px rgba(0,0,0,0.4);
  transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.ai-launcher:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 32px rgba(124, 92, 255, 0.55), 0 1px 2px rgba(0,0,0,0.4);
}
.ai-launcher.ai-open {
  transform: rotate(90deg);
}
@media (min-width: 768px) {
  .ai-launcher { bottom: 24px; right: 24px; }
}

.ai-sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: color-mix(in srgb, var(--bg-primary) 70%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
@media (min-width: 768px) {
  .ai-sheet-overlay { align-items: stretch; justify-content: flex-end; }
}
.ai-sheet {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-height: 80svh;
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .ai-sheet {
    width: 480px;
    max-height: none;
    border-radius: var(--radius-xl) 0 0 var(--radius-xl);
    border-right: 0;
  }
}
.ai-sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
}
.ai-sheet-title { display: flex; align-items: center; gap: var(--space-3); }
.ai-sheet-name { font-size: 14px; font-weight: 600; margin: 0; }
.ai-sheet-sub { font-size: 11px; color: var(--text-tertiary); margin: 2px 0 0; }
.ai-sheet-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
}
.ai-sheet-close:hover { background: var(--bg-tertiary); color: var(--text-primary); }
.ai-sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-5);
}
.ai-sheet-empty {
  text-align: center;
  padding: var(--space-12) 0;
  color: var(--text-secondary);
}
.ai-empty-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--space-2);
}
.ai-empty-sub {
  font-size: 13px;
  margin: 0;
  max-width: 320px;
  margin: 0 auto;
  line-height: 1.6;
}
.ai-thinking {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 14px 0;
}
.ai-thinking .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--text-tertiary);
  animation: dot-pulse 1.2s var(--ease-in-out) infinite;
}
.ai-thinking .dot:nth-child(2) { animation-delay: 0.15s; }
.ai-thinking .dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes dot-pulse {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-2px); }
}
.ai-sheet-foot {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--border);
}
.ai-sheet-input {
  flex: 1;
  height: 44px;
  padding: 0 var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 14px;
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out);
}
.ai-sheet-input:focus { border-color: var(--accent-primary); }
.ai-sheet-send {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--accent-primary);
  color: #fff;
  transition: background var(--duration-fast);
}
.ai-sheet-send:hover:not(:disabled) { background: var(--accent-primary-hover); }
.ai-sheet-send:disabled { opacity: 0.5; cursor: not-allowed; }
.ai-sheet-disclaimer {
  padding: var(--space-2) var(--space-5);
  font-size: 10px;
  color: var(--text-quaternary);
  border-top: 1px solid var(--border);
  text-align: center;
}

.sheet-enter-active, .sheet-leave-active { transition: opacity var(--duration-base) var(--ease-out); }
.sheet-enter-active .ai-sheet, .sheet-leave-active .ai-sheet {
  transition: transform var(--duration-base) var(--ease-out);
}
.sheet-enter-from { opacity: 0; }
.sheet-leave-to { opacity: 0; }
.sheet-enter-from .ai-sheet { transform: translateY(20px); }
.sheet-leave-to .ai-sheet { transform: translateY(20px); }
@media (min-width: 768px) {
  .sheet-enter-from .ai-sheet { transform: translateX(20px); }
  .sheet-leave-to .ai-sheet { transform: translateX(20px); }
}
</style>
