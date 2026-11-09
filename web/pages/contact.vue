<script setup lang="ts">
import sitekeys from '~/components/site-forms/sitekeys.json'

const sitekey = (sitekeys as Record<string, string>)['1baraban.com'] ?? ''

useSeoMeta({
  title: 'Contact',
  description: 'Contact 1baraban: send a correction, a source or a question about an operator profile through the form or by email.',
})
useSchemaOrg([
  defineWebPage({ '@type': 'ContactPage', name: 'Contact', description: 'Contact the 1baraban editorial team.' }),
])
</script>

<template>
  <ComplianceProsePage eyebrow="Contact" title="Contact us" lead="Spotted an outdated fact, have a better source, or a question about a profile? Write to us and we will reply by email.">
    <p>We read every message. Corrections with a link to a public source are the quickest to act on. We do not accept paid placements, and we cannot help with disputes against an operator: for those, contact the operator or its licensing regulator.</p>

    <SiteFormsContactForm class="ct-form" lang="en" :sitekey="sitekey" email="contact@1baraban.com" />

    <p class="pp-meta">How we handle what you send is explained in the <NuxtLink to="/privacy">privacy notice</NuxtLink>.</p>
  </ComplianceProsePage>
</template>

<style scoped>
.ct-form {
  --sf-accent: var(--accent-primary);
  --sf-border: var(--border);
  --sf-field-bg: var(--bg-secondary);
  margin: var(--space-6) 0 var(--space-8);
}
</style>
