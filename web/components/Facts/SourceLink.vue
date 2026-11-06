<script setup lang="ts">
import { isNoLinkUrl, type Source } from '~/data/operators'
const props = defineProps<{ source: Source }>()
// Pages of operators not licensed in GB are cited as plain text, never linked.
const plain = isNoLinkUrl(props.source.url)
const shown = props.source.url.replace(/^https?:\/\//, '')
</script>

<template>
  <span v-if="plain" class="src-plain">{{ source.label }} ({{ shown }}, not linked)</span>
  <a v-else :href="source.url" rel="nofollow noopener" target="_blank">{{ source.label }}</a>
</template>
