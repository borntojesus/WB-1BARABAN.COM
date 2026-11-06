<script setup lang="ts">
useSeoMeta({
  title: 'Privacy',
  description: 'Privacy notice for 1baraban: a static site with no analytics, no cookies set by us, and one local 18+ confirmation.',
})
useSchemaOrg([
  defineWebPage({ name: 'Privacy', description: 'Privacy notice for 1baraban.' }),
])
</script>

<template>
  <ComplianceProsePage eyebrow="Privacy" title="Privacy notice" lead="1baraban is a static website. We run no analytics and set no cookies.">
    <h2>What stays in your browser</h2>
    <p>When you confirm you are 18+, your browser stores a single local value (localStorage) so we do not ask again. It never leaves your device and we cannot read it. Clear your site data to remove it.</p>

    <h2>What we do not do</h2>
    <ul>
      <li>No analytics, no tracking pixels, no advertising cookies.</li>
      <li>No accounts, forms or newsletters.</li>
      <li>No ads or AdSense.</li>
    </ul>

    <h2>Hosting logs</h2>
    <p>The site is hosted on Netlify. Like any host, Netlify processes technical data such as IP address and requested page in server logs. See the <a href="https://www.netlify.com/privacy/" rel="noopener" target="_blank">Netlify privacy policy</a>.</p>

    <h2>Links to other sites</h2>
    <p>Operator and regulator sites you reach by clicking a link have their own cookies and privacy policies, which we do not control.</p>

    <h2>Your rights</h2>
    <p>Under UK GDPR you can ask what personal data we hold, and ask for correction or deletion. We hold none beyond what you send us by email. Email <a href="mailto:editorial@1baraban.com">editorial@1baraban.com</a>. You can also complain to the <a href="https://ico.org.uk/" rel="noopener" target="_blank">Information Commissioner's Office</a>.</p>
  </ComplianceProsePage>
</template>
