<script setup lang="ts">
import type { ChatMessage } from '~/composables/useChat'

const props = defineProps<{ message: ChatMessage }>()

// Trivial markdown — just bold via **text**
const html = computed(() => {
  return props.message.content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
})
</script>

<template>
  <div class="msg" :class="`role-${message.role}`">
    <div v-if="message.role === 'assistant'" class="msg-avatar" aria-hidden="true">
      <BrandMark size="sm" :with-wordmark="false" />
    </div>
    <div class="msg-bubble">
      <p class="msg-content"><span v-html="html" /></p>
      <div v-if="message.citations?.length" class="msg-citations">
        <span class="msg-cite-label mono">sources:</span>
        <NuxtLink v-for="(c, i) in message.citations" :key="c.href" :to="c.href" class="msg-cite">
          [{{ i + 1 }}] {{ c.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4) 0;
}
.role-user { flex-direction: row-reverse; }
.msg-avatar {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}
.msg-bubble {
  max-width: 85%;
  font-size: 14px;
  line-height: 1.6;
}
.role-user .msg-bubble {
  background: var(--accent-primary);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 10px 14px;
}
.role-assistant .msg-bubble {
  color: var(--text-primary);
}
.msg-content { margin: 0; }
.msg-content :deep(strong) { color: var(--accent-primary); font-weight: 600; }
.role-user .msg-content :deep(strong) { color: #fff; }
.msg-citations {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-3);
  padding-top: var(--space-2);
  border-top: 1px dashed var(--border);
  font-size: 12px;
}
.msg-cite-label {
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 11px;
}
.msg-cite {
  color: var(--accent-primary);
  border-bottom: 1px dotted var(--accent-primary);
}
.msg-cite:hover { border-bottom-style: solid; }
</style>
