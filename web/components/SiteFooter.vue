<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container-page footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <BrandMark size="md" />
          <p class="footer-tagline">Sourced and dated facts about online gambling operators. No ads. Independent.</p>
          <p class="footer-rg-tagline mono">18+ only. Gambling can be addictive, please play responsibly.</p>
          <p class="footer-rg-tagline mono">
            <a href="https://www.begambleaware.org/" rel="noopener" target="_blank">BeGambleAware.org</a>
            ·
            <a href="https://www.gamstop.co.uk/" rel="noopener" target="_blank">GAMSTOP</a>
          </p>
        </div>

        <div class="footer-col">
          <h3 class="col-title">Browse</h3>
          <NuxtLink to="/reviews" class="footer-link">Reviews</NuxtLink>
          <NuxtLink to="/compare" class="footer-link">Compare</NuxtLink>
          <NuxtLink to="/online-casinos" class="footer-link">Online casinos</NuxtLink>
          <NuxtLink to="/sports-betting" class="footer-link">Sports betting</NuxtLink>
          <NuxtLink to="/poker" class="footer-link">Poker</NuxtLink>
          <NuxtLink to="/slots" class="footer-link">Slots</NuxtLink>
        </div>

        <div class="footer-col">
          <h3 class="col-title">Trust</h3>
          <NuxtLink to="/methodology" class="footer-link">Methodology</NuxtLink>
          <NuxtLink to="/authors/editorial-team" class="footer-link">Editorial team</NuxtLink>
          <NuxtLink to="/about" class="footer-link">About</NuxtLink>
          <NuxtLink to="/affiliate-disclosure" class="footer-link">Affiliate disclosure</NuxtLink>
          <NuxtLink to="/responsible-gambling" class="footer-link">Responsible gambling</NuxtLink>
          <NuxtLink to="/privacy" class="footer-link">Privacy</NuxtLink>
        </div>

        <div class="footer-col">
          <h3 class="col-title">Help</h3>
          <a href="https://www.begambleaware.org/" rel="noopener" target="_blank" class="footer-link">BeGambleAware</a>
          <a href="https://www.gamstop.co.uk/" rel="noopener" target="_blank" class="footer-link">GAMSTOP</a>
          <a href="https://www.gamcare.org.uk/" rel="noopener" target="_blank" class="footer-link">GamCare</a>
          <a href="https://www.gamblingcommission.gov.uk/" rel="noopener" target="_blank" class="footer-link">UK Gambling Commission</a>
        </div>
      </div>

      <ComplianceResponsibleGamblingBlock />

      <div class="footer-bottom">
        <span class="footer-copy mono">© {{ year }} 1baraban</span>
        <span class="footer-meta mono">1baraban Editorial Team · editorial@1baraban.com</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: var(--space-16) 0 var(--space-8);
  margin-top: var(--space-24);
}
.footer-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
}
@media (min-width: 768px) {
  .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--space-8); }
}
.footer-brand { max-width: 360px; }
.footer-tagline {
  margin-top: var(--space-4);
  color: var(--text-secondary);
  line-height: 1.55;
  font-size: var(--text-sm);
}
.footer-rg-tagline {
  margin-top: var(--space-3);
  color: var(--text-tertiary);
  font-size: 12px;
  letter-spacing: 0.02em;
}
.footer-rg-tagline a { text-decoration: underline; }
.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.col-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-tertiary);
  margin-bottom: var(--space-2);
}
.footer-link {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding: 4px 0;
  transition: color var(--duration-fast) var(--ease-out);
}
.footer-link:hover { color: var(--accent-primary); }
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border);
  padding-top: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-3);
}
.footer-copy, .footer-meta {
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
