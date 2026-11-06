<script setup lang="ts">
import type { Fact } from '~/data/operators'
defineProps<{ label: string; fact: Fact<any>; formatter?: (v: any) => string }>()
</script>

<template>
  <tr class="fact-row">
    <th scope="row">{{ label }}</th>
    <td>
      <template v-if="fact.value !== null && fact.value !== undefined">
        <ul v-if="Array.isArray(fact.value) && !formatter" class="fact-list">
          <li v-for="v in fact.value" :key="v">{{ v }}</li>
        </ul>
        <span v-else>{{ formatter ? formatter(fact.value) : fact.value }}</span>
        <p v-if="fact.note" class="fact-note">{{ fact.note }}</p>
      </template>
      <template v-else>
        <p class="fact-nv"><strong>Not verified.</strong> <span v-if="fact.note">{{ fact.note }}</span></p>
      </template>
      <FactsSourceList :sources="fact.sources" :checked="fact.checked" />
    </td>
  </tr>
</template>

<style scoped>
.fact-row th { text-align: left; vertical-align: top; width: 28%; min-width: 120px; padding: 12px 16px 12px 0; font-weight: 600; font-size: 14px; color: var(--text-secondary); border-top: 1px solid var(--border); }
.fact-row td { padding: 12px 0; border-top: 1px solid var(--border); font-size: 15px; line-height: 1.55; }
.fact-list { margin: 0; padding-left: 18px; }
.fact-note, .fact-nv { margin: 4px 0 0; font-size: 14px; color: var(--text-secondary); }
.fact-nv { margin-top: 0; }
@media (max-width: 640px) {
  .fact-row th, .fact-row td { display: block; width: 100%; }
  .fact-row th { padding: 12px 0 0; border-top: 1px solid var(--border); }
  .fact-row td { border-top: 0; padding-top: 4px; }
}
</style>
