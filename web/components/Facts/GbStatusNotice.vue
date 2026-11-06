<script setup lang="ts">
import type { Operator } from '~/data/operators'
const props = defineProps<{ operator: Operator }>()
const surrenderLicence = computed(() => props.operator.licences.find(l => /surrender/i.test(l.status)))
</script>

<template>
  <div v-if="operator.gbStatus !== 'licensed'" class="gbn" role="note">
    <p class="gbn-title">Not licensed in Great Britain. Not available to GB players. Information only.</p>
    <p v-if="operator.gbStatus === 'surrendered'" class="gbn-body">
      The UK Gambling Commission licence for this brand was surrendered.
      <template v-if="surrenderLicence"> {{ surrenderLicence.status }}</template>
      See the licence table below for the date and the register entry.
    </p>
    <p v-else class="gbn-body">
      {{ operator.name }} does not hold a UK Gambling Commission licence. We publish this profile for information and do not link to the operator.
    </p>
  </div>
</template>

<style scoped>
.gbn { border: 2px solid var(--accent-danger); background: var(--accent-danger-soft); border-radius: 4px; padding: 16px 20px; margin: 24px 0; }
.gbn-title { margin: 0 0 6px; font-weight: 700; font-size: 17px; color: var(--accent-danger); }
.gbn-body { margin: 0; font-size: 15px; color: var(--text-primary); line-height: 1.55; }
</style>
