<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type SubScore = {
  label: string
  score: number
  weight: number
  count?: number
  href?: string
}

type ReviewerInfo = {
  name: string
  initials: string
  credentials: string
  href: string
}

type Props = {
  score: number
  scoreOutOf?: number
  scorePrev?: number
  methodology?: { version: string; href: string }
  verifiedDate: string
  nextReviewDate?: string
  reviewer: ReviewerInfo
  subScores: SubScore[]
  vertical?: 'casino' | 'sportsbook' | 'poker' | 'slot'
  changelogHref?: string
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  scoreOutOf: 10,
  methodology: () => ({ version: 'v2.4', href: '/methodology' }),
  changelogHref: '#changelog',
  compact: false,
  vertical: 'casino',
})

const mounted = ref(false)
const expanded = ref(!props.compact)
const isNarrow = ref(false)
const prefersReducedMotion = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(max-width: 480px)')
    isNarrow.value = mq.matches
    mq.addEventListener('change', (e) => (isNarrow.value = e.matches))
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = rm.matches
    rm.addEventListener('change', (e) => (prefersReducedMotion.value = e.matches))
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      mounted.value = true
    })
  })
})

const isChip = computed(() => props.compact && isNarrow.value && !expanded.value)

function bandColor(score: number): string {
  if (score < 4) return 'var(--accent-danger)'
  if (score < 6) return 'var(--accent-warn)'
  if (score < 7.5) return 'var(--text-secondary)'
  if (score < 9) return 'var(--accent-success)'
  return 'var(--accent-gold)'
}

function subBarColor(score: number): string {
  return score >= 9 ? 'var(--accent-gold)' : 'var(--accent-primary)'
}

const masterColor = computed(() => bandColor(props.score))
const masterPct = computed(() => Math.max(0, Math.min(100, (props.score / props.scoreOutOf) * 100)))

const masterFillWidth = computed(() => {
  if (prefersReducedMotion.value) return `${masterPct.value}%`
  return mounted.value ? `${masterPct.value}%` : '0%'
})

function subFillWidth(score: number): string {
  const pct = Math.max(0, Math.min(100, (score / 10) * 100))
  if (prefersReducedMotion.value) return `${pct}%`
  return mounted.value ? `${pct}%` : '0%'
}

const delta = computed(() => {
  if (props.scorePrev === undefined || props.scorePrev === null) return null
  return +(props.score - props.scorePrev).toFixed(1)
})

const deltaPositive = computed(() => (delta.value ?? 0) >= 0)

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toISOString().slice(0, 10)
  } catch {
    return iso
  }
}

function fmtScore(n: number): string {
  return n.toFixed(1)
}

function toggleExpanded() {
  expanded.value = !expanded.value
}
</script>

<template>
  <section v-if="isChip" class="tig-chip" :aria-label="`Trust Index ${fmtScore(score)} out of ${scoreOutOf}, click to expand`">
    <button class="tig-chip-btn" type="button" @click="toggleExpanded" :aria-expanded="expanded">
      <span class="tig-chip-star" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.6l-3.9 2 .8-4.4L1.7 6.1l4.4-.6L8 1.5z" :fill="masterColor" />
        </svg>
      </span>
      <span class="tig-chip-score" :style="{ color: masterColor }">{{ fmtScore(score) }}</span>
      <span class="tig-chip-label">Trust Index</span>
      <span class="tig-chip-caret" aria-hidden="true">
        <svg viewBox="0 0 12 12" width="12" height="12">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>
  </section>

  <section v-else class="tig-card" aria-labelledby="tig-title">
    <header class="tig-header">
      <div class="tig-master">
        <div class="tig-numeral" :style="{ color: masterColor }">
          <span class="tig-numeral-value">{{ fmtScore(score) }}</span>
          <span class="tig-numeral-denom">/{{ scoreOutOf }}</span>
        </div>
      </div>
      <div class="tig-master-meta">
        <div class="tig-title-row">
          <h2 id="tig-title" class="tig-title">1baraban Trust Index</h2>
          <a class="tig-method" :href="methodology.href">
            {{ methodology.version }} <span class="tig-dot">·</span> methodology
          </a>
        </div>
        <div class="tig-bar tig-bar-master" role="meter" :aria-valuenow="Math.round(score * 10)" aria-valuemin="0" aria-valuemax="100" aria-label="Trust Index score">
          <span class="tig-bar-track" aria-hidden="true">
            <span class="tig-bar-fill tig-bar-fill-master" :style="{ width: masterFillWidth, background: masterColor }" />
          </span>
          <span class="tig-bar-value" :style="{ color: masterColor }">{{ Math.round(masterPct) }}/100</span>
        </div>
        <div class="tig-meta-line">
          <span class="tig-verified" aria-hidden="true">
            <svg viewBox="0 0 12 12" width="12" height="12">
              <path d="M2.5 6.2l2.4 2.3L9.5 3.8" stroke="var(--accent-success)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span>Verified · {{ fmtDate(verifiedDate) }} by</span>
          <a :href="reviewer.href" class="tig-reviewer-link">{{ reviewer.name }}</a>
        </div>
        <div v-if="nextReviewDate" class="tig-meta-line tig-meta-muted">
          Next review: {{ fmtDate(nextReviewDate) }}
        </div>
      </div>
    </header>

    <hr class="tig-divider" />

    <div class="tig-sub-section">
      <div class="tig-sub-header">
        <span class="tig-sub-title">Sub-scores</span>
        <span v-if="vertical" class="tig-sub-vertical">({{ vertical }} vertical)</span>
      </div>
      <dl class="tig-sub-list">
        <div v-for="(sub, idx) in subScores" :key="sub.label" class="tig-sub-row">
          <dt class="tig-sub-label">
            {{ sub.label }}<span v-if="sub.count !== undefined" class="tig-sub-count"> (n={{ sub.count }})</span>
          </dt>
          <dd class="tig-sub-bar-cell">
            <span class="tig-bar tig-bar-sub" aria-hidden="true">
              <span class="tig-bar-track">
                <span class="tig-bar-fill" :style="{
                  width: subFillWidth(sub.score),
                  background: subBarColor(sub.score),
                  transitionDelay: prefersReducedMotion ? '0s' : `${0.1 * idx + 0.2}s`,
                }" />
              </span>
            </span>
          </dd>
          <dd class="tig-sub-score" :style="{ color: subBarColor(sub.score) }">
            {{ fmtScore(sub.score) }}
          </dd>
          <dd class="tig-sub-info-cell">
            <a v-if="sub.href" :href="sub.href" class="tig-info" :aria-label="`${sub.label} methodology, weight ${sub.weight}%`">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none" />
                <circle cx="8" cy="5" r="0.9" fill="currentColor" />
                <path d="M8 7.5v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
            </a>
            <button v-else type="button" class="tig-info" :aria-label="`${sub.label} weighting ${sub.weight}%`">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" fill="none" />
                <circle cx="8" cy="5" r="0.9" fill="currentColor" />
                <path d="M8 7.5v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
            </button>
          </dd>
        </div>
      </dl>
    </div>

    <hr class="tig-divider" />

    <footer class="tig-footer">
      <div v-if="delta !== null" class="tig-delta">
        <span class="tig-delta-pill" :class="deltaPositive ? 'tig-delta-up' : 'tig-delta-down'">
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path v-if="deltaPositive" d="M6 2l4 5H2l4-5z" fill="currentColor" />
            <path v-else d="M6 10L2 5h8l-4 5z" fill="currentColor" />
          </svg>
          Δ {{ deltaPositive ? '+' : '' }}{{ delta }}
        </span>
        <span class="tig-delta-label">since last review</span>
        <span class="tig-dot">·</span>
        <a :href="changelogHref" class="tig-changelog-link">
          changelog
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
      <div class="tig-reviewer">
        <a :href="reviewer.href" class="tig-avatar" :aria-label="`Reviewed by ${reviewer.name}`">
          <span aria-hidden="true">{{ reviewer.initials }}</span>
        </a>
        <div class="tig-reviewer-meta">
          <span>Reviewed by </span>
          <a :href="reviewer.href" class="tig-reviewer-link">{{ reviewer.name }}</a>
          <span class="tig-reviewer-creds"> ({{ reviewer.credentials }})</span>
        </div>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.tig-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-8);
  box-shadow: var(--shadow-md);
  font-family: var(--font-sans);
  color: var(--text-primary);
  width: 100%;
  max-width: 760px;
  box-sizing: border-box;
}
.tig-header { display: grid; grid-template-columns: auto 1fr; gap: var(--space-5); align-items: center; padding: var(--space-2) 0 var(--space-5); }
.tig-master { display: flex; align-items: center; justify-content: center; }
.tig-numeral { display: inline-flex; align-items: baseline; font-family: var(--font-mono); font-weight: 600; line-height: 1; padding: var(--space-3) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-md); background: var(--bg-primary); min-width: 110px; justify-content: center; }
.tig-numeral-value { font-size: 56px; letter-spacing: -0.02em; }
.tig-numeral-denom { font-size: 18px; color: var(--text-tertiary); margin-left: 2px; }
.tig-master-meta { display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
.tig-title-row { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-3); flex-wrap: wrap; }
.tig-title { font-size: 14px; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; margin: 0; color: var(--text-primary); }
.tig-method { font-size: 12px; color: var(--text-tertiary); text-decoration: none; font-family: var(--font-mono); }
.tig-method:hover { color: var(--accent-primary); }
.tig-dot { margin: 0 4px; color: var(--text-tertiary); }
.tig-bar { display: flex; align-items: center; gap: var(--space-3); width: 100%; }
.tig-bar-track { flex: 1; height: 10px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden; position: relative; }
.tig-bar-fill { display: block; height: 100%; width: 0%; border-radius: 4px; transition: width 1.2s cubic-bezier(0.2, 0.6, 0.2, 1); }
.tig-bar-master .tig-bar-track { height: 12px; }
.tig-bar-value { font-family: var(--font-mono); font-size: 13px; font-weight: 600; white-space: nowrap; min-width: 56px; text-align: right; }
.tig-meta-line { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); flex-wrap: wrap; }
.tig-meta-muted { color: var(--text-tertiary); }
.tig-verified { display: inline-flex; align-items: center; }
.tig-reviewer-link { color: var(--text-primary); text-decoration: none; border-bottom: 1px dotted var(--border); }
.tig-reviewer-link:hover { color: var(--accent-primary); border-bottom-color: var(--accent-primary); }
.tig-divider { border: 0; border-top: 1px solid var(--border); margin: 0; }
.tig-sub-section { padding: var(--space-5) 0; }
.tig-sub-header { display: flex; align-items: baseline; gap: var(--space-2); margin-bottom: var(--space-3); font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em; }
.tig-sub-vertical { font-weight: 400; text-transform: none; letter-spacing: 0; color: var(--text-tertiary); }
.tig-sub-list { margin: 0; display: flex; flex-direction: column; gap: var(--space-2); }
.tig-sub-row { display: grid; grid-template-columns: minmax(140px, 1fr) 220px auto auto; align-items: center; gap: var(--space-3); padding: 4px 0; }
.tig-sub-label { font-size: 14px; color: var(--text-primary); margin: 0; }
.tig-sub-count { color: var(--text-tertiary); font-size: 13px; }
.tig-sub-bar-cell { margin: 0; }
.tig-bar-sub .tig-bar-track { height: 8px; }
.tig-sub-score { font-family: var(--font-mono); font-size: 14px; font-weight: 600; margin: 0; min-width: 36px; text-align: right; }
.tig-sub-info-cell { margin: 0; display: flex; align-items: center; }
.tig-info { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 4px; border: 0; background: transparent; color: var(--text-tertiary); cursor: pointer; text-decoration: none; transition: box-shadow 0.18s ease, color 0.18s ease, background 0.18s ease; }
.tig-info:hover, .tig-info:focus-visible { color: var(--accent-primary); background: var(--bg-tertiary); box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.18); outline: none; }
.tig-footer { display: flex; flex-direction: column; gap: var(--space-3); padding: var(--space-5) 0 var(--space-2); font-size: 13px; color: var(--text-secondary); }
.tig-delta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.tig-delta-pill { display: inline-flex; align-items: center; gap: 4px; font-family: var(--font-mono); font-weight: 600; font-size: 12px; padding: 2px 8px; border-radius: 4px; }
.tig-delta-up { color: var(--accent-success); background: var(--accent-success-soft); }
.tig-delta-down { color: var(--accent-danger); background: var(--accent-danger-soft); }
.tig-delta-label { color: var(--text-tertiary); }
.tig-changelog-link { display: inline-flex; align-items: center; gap: 3px; color: var(--accent-primary); text-decoration: none; transition: filter 0.18s ease; }
.tig-changelog-link:hover { filter: brightness(1.2); }
.tig-reviewer { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }
.tig-avatar { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 4px; background: linear-gradient(135deg, var(--accent-primary), #4F8AFF); color: #fff; font-family: var(--font-mono); font-size: 12px; font-weight: 600; text-decoration: none; flex-shrink: 0; }
.tig-reviewer-meta { font-size: 13px; color: var(--text-secondary); }
.tig-reviewer-creds { color: var(--text-tertiary); }
.tig-chip { display: inline-block; width: 100%; max-width: 360px; }
.tig-chip-btn { display: flex; align-items: center; gap: var(--space-2); width: 100%; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 8px 12px; font-family: var(--font-sans); cursor: pointer; box-shadow: var(--shadow-sm); color: var(--text-primary); transition: border-color 0.18s ease; }
.tig-chip-btn:hover { border-color: var(--accent-primary); }
.tig-chip-star { display: inline-flex; }
.tig-chip-score { font-family: var(--font-mono); font-weight: 600; font-size: 16px; }
.tig-chip-label { font-size: 13px; color: var(--text-secondary); flex: 1; text-align: left; }
.tig-chip-caret { display: inline-flex; color: var(--text-tertiary); }
@media (max-width: 640px) {
  .tig-card { padding: var(--space-5); }
  .tig-header { grid-template-columns: 1fr; gap: var(--space-3); }
  .tig-master { justify-content: flex-start; }
  .tig-numeral-value { font-size: 44px; }
  .tig-sub-row { grid-template-columns: 1fr auto auto; grid-template-areas: 'label score info' 'bar bar bar'; row-gap: 4px; }
  .tig-sub-label { grid-area: label; }
  .tig-sub-bar-cell { grid-area: bar; }
  .tig-sub-score { grid-area: score; }
  .tig-sub-info-cell { grid-area: info; }
}
</style>
