<script setup lang="ts">
const { verified, init, confirm } = useAgeGate()
const open = ref(false)

onMounted(() => {
  init()
  if (!verified.value) {
    setTimeout(() => { open.value = true }, 300)
  }
})

function handleConfirm() {
  confirm()
  open.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="age-modal">
      <div v-if="open" class="age-overlay" role="dialog" aria-modal="true" aria-labelledby="age-title">
        <div class="age-card">
          <div class="age-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="24" cy="24" r="20" />
              <path d="M16 22h4v12M28 22c0-2 1-3 3-3s4 1 4 3-2 3-4 4-3 3-3 5h7" />
            </svg>
          </div>
          <h2 id="age-title" class="age-title">Please confirm you are 18+</h2>
          <p class="age-desc">
            This site is for adults only. By continuing you confirm you are 18 or over. Your browser stores this choice locally; nothing is sent to us.
            Need help? See <NuxtLink to="/responsible-gambling" @click="open = false">responsible gambling</NuxtLink>.
          </p>
          <div class="age-actions">
            <button class="age-btn age-confirm" type="button" @click="handleConfirm">
              I confirm I am 18+
            </button>
            <a class="age-btn age-leave" href="https://www.begambleaware.org/" rel="noopener">
              Leave site
            </a>
          </div>
          <p class="age-foot mono">Gambling can be addictive, please play responsibly. BeGambleAware.org</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.age-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: color-mix(in srgb, var(--bg-primary) 80%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.age-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  max-width: 460px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
}
.age-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--accent-primary-soft);
  border-radius: 4px;
  margin: 0 auto var(--space-5);
}
.age-title {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-3);
  letter-spacing: -0.02em;
}
.age-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-6);
}
.age-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}
.age-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: var(--text-sm);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.age-confirm {
  background: var(--accent-primary);
  color: #fff;
}
.age-confirm:hover { background: var(--accent-primary-hover); }
.age-leave {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
.age-leave:hover { color: var(--text-primary); border-color: var(--border-strong); }
.age-foot {
  font-size: 11px;
  color: var(--text-tertiary);
  letter-spacing: 0.04em;
}

.age-modal-enter-active, .age-modal-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}
.age-modal-enter-active .age-card, .age-modal-leave-active .age-card {
  transition: transform var(--duration-base) var(--ease-out);
}
.age-modal-enter-from, .age-modal-leave-to { opacity: 0; }
.age-modal-enter-from .age-card { transform: scale(0.96); }
.age-modal-leave-to .age-card { transform: scale(0.96); }
</style>
