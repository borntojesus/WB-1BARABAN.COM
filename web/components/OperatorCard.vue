<script setup lang="ts">
import { gbStatusLabel, verticalLabels, type Operator } from '~/data/operators'

const props = defineProps<{ operator: Operator }>()
const licence = computed(() => props.operator.licences[0])
const verticals = computed(() => (props.operator.verticals.value || []).map(v => verticalLabels[v]).join(', '))
</script>

<template>
  <article class="op-card" :class="{ 'op-off': operator.gbStatus !== 'licensed' }">
    <div class="op-head">
      <h3 class="op-name">{{ operator.name }}</h3>
      <span class="op-badge" :class="`b-${operator.gbStatus}`">{{ gbStatusLabel[operator.gbStatus] }}</span>
    </div>
    <p class="op-domain">{{ operator.domain }}</p>
    <dl class="op-facts">
      <div v-if="licence"><dt>Licence</dt><dd>{{ licence.regulator }}<template v-if="licence.number">, {{ licence.number }}</template></dd></div>
      <div><dt>Launched</dt><dd>{{ operator.launchYear.value ?? 'Not verified' }}</dd></div>
      <div><dt>Verticals</dt><dd>{{ verticals || 'Not verified' }}</dd></div>
      <div><dt>Checked</dt><dd>{{ operator.lastChecked }}</dd></div>
    </dl>
    <p v-if="operator.gbStatus !== 'licensed'" class="op-warn">Not available to GB players. Information only.</p>
    <div class="op-actions">
      <NuxtLink :to="`/reviews/${operator.slug}`" class="op-link">Read profile</NuxtLink>
      <AffiliateCTA v-if="operator.gbStatus === 'licensed'" :operator-name="operator.name" :slug="operator.slug" size="sm" />
    </div>
  </article>
</template>

<style scoped>
.op-card { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 4px; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
.op-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; flex-wrap: wrap; }
.op-name { margin: 0; font-size: 20px; font-weight: 600; }
.op-badge { font-size: 12px; font-weight: 600; padding: 3px 8px; border-radius: 2px; border: 1px solid var(--border-strong); white-space: nowrap; }
.b-licensed { color: var(--accent-success); border-color: var(--accent-success); }
.b-surrendered, .b-not-licensed { color: var(--accent-danger); border-color: var(--accent-danger); background: var(--accent-danger-soft); }
.op-domain { margin: 0; font-family: var(--font-mono); font-size: 13px; color: var(--text-tertiary); }
.op-facts { margin: 0; display: grid; gap: 4px; font-size: 14px; }
.op-facts div { display: flex; gap: 8px; }
.op-facts dt { color: var(--text-tertiary); min-width: 76px; }
.op-facts dd { margin: 0; }
.op-warn { margin: 0; font-size: 13px; font-weight: 600; color: var(--accent-danger); }
.op-actions { margin-top: auto; padding-top: 8px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.op-link { font-weight: 600; color: var(--accent-primary); text-decoration: underline; }
</style>
