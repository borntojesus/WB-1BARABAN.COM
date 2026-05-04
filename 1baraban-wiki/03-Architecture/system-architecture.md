---
title: System Architecture & Implementation Plan
date: 2026-05-01
type: architecture
status: draft
---

# 1baraban.com — System Architecture & Implementation Plan

> Founding architecture for an AI-native iGaming review/affiliate platform. Solo founder + 1-2 contractors. 12-week MVP target. Stack: Strapi v5 + Nuxt 3 + Vercel Fluid + Neon Postgres + Vercel AI Gateway. This document is the buildable plan, not an essay — every decision points at a file, an env var, or a week on the calendar.

---

## 1. High-level architecture

### 1.1 System diagram

```mermaid
flowchart TB
    subgraph User["End User (browser)"]
        BR[Nuxt SPA shell + chat widget]
    end

    subgraph VercelEdge["Vercel Edge — Routing Middleware (Node runtime)"]
        MW[geo-detect, geo-block,<br/>cookie-consent gate,<br/>A/B variant assign]
    end

    subgraph VercelFluid["Vercel Fluid Compute (Node 22 runtime)"]
        SSR[Nuxt 3 SSR/ISR handler]
        GO[/go/[slug] redirect Function/]
        CHAT[/api/chat (AI SDK)/]
        WEBHOOK[/api/revalidate webhook/]
        POSTBACK[/api/postback (S2S)/]
    end

    subgraph VercelEdgeData["Edge Data"]
        EDGECFG[(Edge Config:<br/>geo rules,<br/>feature flags)]
        BLOB[(Vercel Blob:<br/>logos, screenshots,<br/>PDFs)]
        KV[(Vercel KV:<br/>chat sessions,<br/>rate limits,<br/>consent state)]
    end

    subgraph Strapi["Strapi v5 (self-host: Railway / Hetzner)"]
        ADMIN[Admin panel]
        REST[REST + GraphQL API]
        QUEUE[Lifecycle hooks → webhook out]
    end

    subgraph Neon["Neon Postgres (Vercel Marketplace)"]
        PG[(Strapi tables<br/>+ pgvector embeddings<br/>+ click_events<br/>+ chat_logs)]
    end

    subgraph AI["Vercel AI Gateway"]
        HAIKU[Claude Haiku 4.5 - default]
        GPT[GPT-4o-mini - fallback]
        GEM[Gemini 2.5 Flash - secondary]
        EMB[OpenAI text-embedding-3-small]
    end

    subgraph Operators["Affiliate operator endpoints"]
        OP[Operator landing pages<br/>+ S2S postback]
    end

    BR -->|HTTPS| MW
    MW -->|allowed| SSR
    MW -->|blocked| ERR[HTTP 451 page]
    SSR -->|REST/GraphQL| REST
    REST --> PG
    SSR --> EDGECFG
    BR -->|chat msg| CHAT
    CHAT --> KV
    CHAT --> AI
    CHAT -->|RAG retrieval| PG
    CHAT -->|tool: search_operators| REST
    BR -->|click CTA| GO
    GO --> KV
    GO --> PG
    GO -->|302 + UTM| OP
    OP -->|S2S conversion| POSTBACK
    POSTBACK --> PG
    ADMIN --> PG
    ADMIN --> BLOB
    QUEUE -->|publish event| WEBHOOK
    WEBHOOK -->|on-demand revalidate| SSR
```

### 1.2 Key architectural decisions

- **Vercel Fluid Compute, not Edge Functions.** Per CLAUDE.md and stack lock: Fluid gives us Node 22, longer execution, AI SDK streaming with backpressure, and proper Strapi SDK compatibility. Edge Functions are reserved for Routing Middleware only (geo-detect, cookie gate). Fluid solves the cold-start tax that traditional serverless has on Strapi-fronted ISR.
- **Strapi self-hosted, not Strapi Cloud.** Strapi Cloud doesn't support pgvector and is 3-5x cost. We host on Hetzner (€8/mo) or Railway (€20/mo) in `eu-central-1` adjacent to Neon's EU region. Admin panel sits behind Cloudflare Access.
- **Neon as both Strapi DB and vector store.** Single source of truth. pgvector extension enabled on the same database. No second vector DB to operate.
- **Two writers, one reader pattern.** Strapi owns _content_ writes. Vercel Functions own _event_ writes (`click_events`, `chat_logs`, `postback_events`) into separate tables Strapi never touches. This keeps Strapi migrations and event-write paths decoupled.
- **All AI traffic through Vercel AI Gateway.** Single API key in env, gateway handles routing/failover/cost tracking. Direct provider keys are not permitted in code.

---

## 2. Strapi v5 content-type model

Notation: `[i18n]` = i18n-enabled; `req` = required; `unique` = unique constraint. Strapi v5 uses `documentId` as primary external identifier.

### 2.1 Collection types

#### 2.1.1 `api::operator.operator`

Core entity. Everything else attaches.

```ts
{
  name: 'operator',
  attributes: {
    name:            { type: 'string', required: true },                // [i18n: false] brand name
    slug:            { type: 'uid', targetField: 'name', required: true, unique: true },
    legal_name:      { type: 'string' },
    founded_year:    { type: 'integer', min: 1990, max: 2030 },
    parent_company:  { type: 'string' },
    website_url:     { type: 'string', regex: '^https://' },
    affiliate_url:   { type: 'string', required: true },                 // tracking URL template
    logo:            { type: 'media', allowedTypes: ['images'], required: true },
    hero_image:      { type: 'media', allowedTypes: ['images'] },
    screenshots:     { type: 'media', multiple: true },
    description:     { type: 'text', maxLength: 280 },                   // [i18n] meta description
    short_pitch:     { type: 'text', maxLength: 600 },                   // [i18n] LLM TL;DR
    editorial_score: { type: 'decimal', min: 0, max: 10 },               // 1 decimal, e.g. 8.4
    score_breakdown: { type: 'component', component: 'scoring.breakdown', repeatable: false },
    verticals:       { type: 'relation', relation: 'manyToMany', target: 'api::vertical.vertical' },
    licenses:        { type: 'relation', relation: 'manyToMany', target: 'api::license.license' },
    accepted_countries: { type: 'relation', relation: 'manyToMany', target: 'api::country.country' },
    restricted_countries: { type: 'relation', relation: 'manyToMany', target: 'api::country.country' },
    payment_methods: { type: 'relation', relation: 'manyToMany', target: 'api::payment-method.payment-method' },
    game_providers:  { type: 'relation', relation: 'manyToMany', target: 'api::slot-provider.slot-provider' },
    bonuses:         { type: 'relation', relation: 'oneToMany', target: 'api::bonus.bonus', mappedBy: 'operator' },
    review:          { type: 'relation', relation: 'oneToOne', target: 'api::operator-review.operator-review' },
    payout_speed_hours: { type: 'integer' },                              // tested median
    min_deposit_eur: { type: 'decimal' },
    kyc_level:       { type: 'enumeration', enum: ['none','soft','full'] },
    crypto_supported:{ type: 'boolean', default: false },
    live_chat_24_7:  { type: 'boolean', default: false },
    mobile_app:      { type: 'enumeration', enum: ['none','ios','android','both'] },
    operator_type:   { type: 'enumeration', enum: ['casino','sportsbook','poker','hybrid'], required: true },
    status:          { type: 'enumeration', enum: ['active','delisted','blacklisted'], default: 'active' },
    delist_reason:   { type: 'text' },
    last_verified:   { type: 'datetime', required: true },                // editorial freshness stamp
    embedding:       { type: 'json' },                                    // pgvector: written by lifecycle hook
    seo:             { type: 'component', component: 'shared.seo', repeatable: false },
    key_facts:       { type: 'component', component: 'shared.key-fact', repeatable: true },
    tags:            { type: 'relation', relation: 'manyToMany', target: 'api::tag.tag' },
  },
  options: { draftAndPublish: true },
  pluginOptions: { i18n: { localized: false } } // operators are global; localize the review, not the entity
}
```

#### 2.1.2 `api::operator-review.operator-review` `[i18n]`

Long-form review content, separate from the operator entity so we can have many locales.

```ts
{
  name: 'operator-review',
  attributes: {
    title:           { type: 'string', required: true },
    slug:            { type: 'uid', targetField: 'title', required: true, unique: true },
    operator:        { type: 'relation', relation: 'oneToOne', target: 'api::operator.operator', inversedBy: 'review' },
    tldr:            { type: 'text', required: true, maxLength: 600 },     // 60-90 word definitional intro
    body:            { type: 'blocks' },                                   // Strapi v5 blocks editor
    pros:            { type: 'component', component: 'shared.pros-cons', repeatable: true },
    cons:            { type: 'component', component: 'shared.pros-cons', repeatable: true },
    faqs:            { type: 'component', component: 'shared.faq', repeatable: true },     // 6-12 items
    methodology:     { type: 'relation', relation: 'manyToOne', target: 'api::methodology.methodology' },
    author:          { type: 'relation', relation: 'manyToOne', target: 'api::author.author' },
    reviewer:        { type: 'relation', relation: 'manyToOne', target: 'api::author.author' },
    published_at:    { type: 'datetime' },
    last_reviewed:   { type: 'datetime', required: true },
    next_review_due: { type: 'datetime' },
    seo:             { type: 'component', component: 'shared.seo' },
    target_keyword:  { type: 'string', required: true },                   // cannibalization-prevention
    cluster_role:    { type: 'enumeration', enum: ['pillar','hub','spoke','guide','review'], default: 'review' },
    embedding:       { type: 'json' },                                     // pgvector
  },
  pluginOptions: { i18n: { localized: true } }
}
```

#### 2.1.3 `api::bonus.bonus` `[i18n]`

Split from operator review per SEO playbook (different URL, different intent).

```ts
{
  attributes: {
    title:                 { type: 'string', required: true },              // "100% up to €500 + 200 FS"
    slug:                  { type: 'uid', targetField: 'title', unique: true, required: true },
    operator:              { type: 'relation', relation: 'manyToOne', target: 'api::operator.operator', inversedBy: 'bonuses' },
    bonus_type:            { type: 'enumeration', enum: ['welcome','reload','no_deposit','free_spins','cashback','rakeback','free_bet'], required: true },
    deposit_match_pct:     { type: 'integer', min: 0, max: 1000 },
    max_bonus_eur:         { type: 'decimal' },
    min_deposit_eur:       { type: 'decimal' },
    free_spins_count:      { type: 'integer' },
    free_spins_game:       { type: 'relation', relation: 'manyToOne', target: 'api::slot.slot' },
    wagering_requirement:  { type: 'integer' },                              // e.g. 35 for 35x
    wagering_applies_to:   { type: 'enumeration', enum: ['bonus','deposit_plus_bonus'] },
    max_bet_during_wager_eur: { type: 'decimal' },
    expiry_days:           { type: 'integer' },
    game_weighting:        { type: 'json' },                                  // { slots: 100, live: 10, table: 0 }
    promo_code:            { type: 'string' },
    terms_url:             { type: 'string', required: true },
    terms_last_checked:    { type: 'datetime', required: true },
    effective_value_eur:   { type: 'decimal' },                               // computed by hook
    eligible_countries:    { type: 'relation', relation: 'manyToMany', target: 'api::country.country' },
    is_active:             { type: 'boolean', default: true },
    starts_at:             { type: 'datetime' },
    ends_at:               { type: 'datetime' },
    seo:                   { type: 'component', component: 'shared.seo' },
  },
  pluginOptions: { i18n: { localized: true } }
}
```

#### 2.1.4 `api::slot.slot` (programmatic SEO scale unit)

```ts
{
  attributes: {
    title:           { type: 'string', required: true },
    slug:            { type: 'uid', targetField: 'title', unique: true, required: true },
    provider:        { type: 'relation', relation: 'manyToOne', target: 'api::slot-provider.slot-provider', inversedBy: 'slots' },
    rtp:             { type: 'decimal', min: 80, max: 100 },                 // 96.4
    volatility:      { type: 'enumeration', enum: ['low','low_med','medium','med_high','high'] },
    max_win_x:       { type: 'integer' },                                    // 5000x
    paylines:        { type: 'integer' },
    reels:           { type: 'integer' },
    rows:            { type: 'integer' },
    release_date:    { type: 'date' },
    theme:           { type: 'string' },
    features:        { type: 'json' },
    bonus_buy:       { type: 'boolean', default: false },
    bonus_buy_cost_x:{ type: 'decimal' },
    demo_url:        { type: 'string' },
    screenshot:      { type: 'media', allowedTypes: ['images'] },
    description:     { type: 'text', maxLength: 600 },
    embedding:       { type: 'json' },
    seo:             { type: 'component', component: 'shared.seo' },
  },
  pluginOptions: { i18n: { localized: false } }
}
```

#### 2.1.5–2.1.15 Other content types

`api::slot-provider.slot-provider`, `api::sportsbook.sportsbook` (Q3), `api::poker-room.poker-room` (Q3), `api::author.author`, `api::methodology.methodology` `[i18n]`, `api::vertical.vertical`, `api::country.country`, `api::license.license`, `api::payment-method.payment-method`, `api::game.game`, `api::tag.tag`, `api::comparison.comparison`, `api::guide.guide` `[i18n]`, `api::news.news` `[i18n]`. Detailed schemas — see in implementation; standard relational fields, regulator URLs on licenses, ISO codes on countries, RG resources JSON per country.

### 2.2 Components

- `shared.seo` — metaTitle/Description/Keywords, ogImage, canonicalURL, noIndex, structuredData override
- `shared.faq` — question + answer (FAQPage)
- `shared.pros-cons` — point + detail
- `shared.key-fact` — label + value + lucide icon name
- `scoring.breakdown` — trust/bonuses/game_library/payout_speed/support/mobile/rg_tools decimals + notes
- `methodology.criterion` — name, weight_pct, description, data_source

### 2.3 Cannibalization-prevention validators (Strapi lifecycle hooks)

`./src/api/operator-review/content-types/operator-review/lifecycles.ts`:

```ts
export default {
  async beforeCreate(event) {
    await assertUniqueTargetKeyword(event, strapi);
  },
  async beforeUpdate(event) {
    await assertUniqueTargetKeyword(event, strapi);
  },
  async afterCreate(event) {
    await reembed(event.result, strapi);
    await pingRevalidate(event.result, "review");
  },
  async afterUpdate(event) {
    await reembed(event.result, strapi);
    await pingRevalidate(event.result, "review");
  },
};
```

Enforces SEO playbook §9 rule 1. `reembed` writes pgvector embedding (see §5.3). `pingRevalidate` POSTs to `/api/revalidate` on Vercel.

---

## 3. Nuxt 3 routing structure

### 3.1 File tree (`pages/`)

```
pages/
├── index.vue                                   # /  (SSG)
├── about.vue                                   # /about/  (SSG)
├── methodology.vue                             # /methodology/  (SSG)
├── editorial-policy.vue
├── affiliate-disclosure.vue
├── responsible-gambling/
│   ├── index.vue
│   └── self-exclusion.vue
├── authors/
│   ├── index.vue
│   └── [slug].vue
├── online-casinos/
│   ├── index.vue
│   └── best.vue
├── crypto-casinos/index.vue
├── live-casino/index.vue
├── casino-bonuses/
│   ├── index.vue
│   ├── free-spins.vue
│   ├── no-deposit.vue
│   └── welcome-bonus.vue
├── reviews/[slug].vue                          # /reviews/[casino]/  (ISR 1h)
├── bonus/[slug].vue                            # /bonus/[casino]/  (ISR 15m)
├── compare/[a]-vs-[b].vue
├── slots/
│   ├── index.vue
│   ├── best-online-slots.vue
│   ├── highest-rtp.vue
│   ├── providers/
│   │   ├── index.vue
│   │   └── [slug].vue
│   └── reviews/[slug].vue                      # ISR 24h
├── sports-betting/                             # Q3
├── poker/
├── guides/[slug].vue
├── news/[year]/[month]/[slug].vue
├── tools/
│   ├── bonus-calculator.vue
│   └── rtp-calculator.vue
├── search.vue                                  # SSR, noindex
├── go/[slug].server.ts                         # server route, see §6
└── [country]/                                  # geo subdirectory (UK, DE, NL, IE)
```

### 3.2 `routeRules` mapping

```ts
export default defineNuxtConfig({
  experimental: { asyncContext: true, payloadExtraction: true },
  nitro: {
    preset: "vercel",
    vercel: { config: { version: 3, regions: ["fra1"] } },
  },
  routeRules: {
    "/": { prerender: true },
    "/about/": { prerender: true },
    "/methodology/": { prerender: true },
    "/editorial-policy/": { prerender: true },
    "/affiliate-disclosure/": { prerender: true },
    "/responsible-gambling/**": { prerender: true },
    "/authors/**": { prerender: true },
    "/guides/**": { prerender: true },
    "/tools/**": { prerender: true },

    "/online-casinos/**": { isr: 300 },
    "/crypto-casinos/": { isr: 300 },
    "/live-casino/": { isr: 300 },
    "/casino-bonuses/**": { isr: 600 },
    "/sports-betting/**": { isr: 600 },
    "/poker/**": { isr: 600 },
    "/slots/": { isr: 600 },
    "/slots/best-online-slots/": { isr: 600 },
    "/slots/highest-rtp/": { isr: 600 },
    "/slots/providers/**": { isr: 3600 },

    "/reviews/**": { isr: 3600 },
    "/bonus/**": { isr: 900 },
    "/compare/**": { isr: 3600 },
    "/slots/reviews/**": { isr: 86400 },
    "/news/**": { isr: 300 },

    "/uk/**": { isr: 600 },
    "/de/**": { isr: 600 },
    "/nl/**": { isr: 600 },
    "/ie/**": { isr: 600 },

    "/search": { ssr: true, headers: { "X-Robots-Tag": "noindex, nofollow" } },
    "/go/**": { ssr: true, headers: { "X-Robots-Tag": "noindex" } },
    "/api/**": { cors: false },
  },
  modules: [
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-strapi",
  ],
  site: { url: "https://1baraban.com", name: "1baraban", defaultLocale: "en" },
  i18n: {
    locales: [
      { code: "en", iso: "en-US" },
      { code: "uk", iso: "en-GB" },
      { code: "de", iso: "de-DE" },
      { code: "nl", iso: "nl-NL" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
  },
  app: { pageTransition: false },
});
```

### 3.3 Why these TTLs

- 5 min on pillars: ranking changes when an operator score or bonus refreshes.
- 1 h on reviews: editor edits land within an hour; webhook still fires immediate invalidation for big changes.
- 15 min on bonus pages: T&C changes are the highest-trust risk per PRD risk #9.
- 24 h on slot reviews: 5K+ pages, low edit frequency.

---

## 4. API & data flow

### 4.1 REST vs GraphQL

**Decision: REST with typed client (`openapi-fetch`) for build-time, GraphQL for chat retrieval.**

- **REST + `openapi-fetch`** for SSG/ISR fetches. Strapi v5 emits OpenAPI schemas. Generate types via `npx openapi-typescript http://strapi.local:1337/documentation/v1.0.0.json -o types/strapi.ts`. Cacheable, simple, predictable.
- **GraphQL** for chat tool calls and the comparison page (multi-entity, deep `populate`). Single-round-trip, keeps tool latency under 200ms.
- **Avoid `nuxt-strapi` v2 default** — too leaky on relations. Wrap our own `useStrapi()` around `openapi-fetch`.

### 4.2 Build-time vs runtime fetch pattern

```ts
// composables/useStrapi.ts
import createClient from "openapi-fetch";
import type { paths } from "~/types/strapi";

export const useStrapi = () => {
  const config = useRuntimeConfig();
  return createClient<paths>({
    baseUrl: config.strapiUrl,
    headers: { Authorization: `Bearer ${config.strapiToken}` },
  });
};
```

- **Prerender:** `useAsyncData` server-side. Resolves once at build.
- **ISR runtime:** identical code; Nitro memoizes rendered HTML, not the fetch. Strapi requests happen once per TTL window per page per region.
- **Client runtime:** never fetch from Strapi directly from browser. All through `/api/*` Nitro proxies.

### 4.3 ISR cache invalidation

```
Strapi lifecycle.afterUpdate(operator-review)
   ↓
  POST https://1baraban.com/api/revalidate
       Body: { type: 'review', slug: '...', locale: 'en' }
       Header: X-Webhook-Secret: <env REVALIDATE_SECRET>
   ↓
  Vercel Function /api/revalidate.post.ts
     ├── verifies HMAC
     ├── computes affected paths (review, pillar, comparison)
     └── purges via Vercel revalidate API
```

### 4.4 N+1 prevention

Pre-built `populate` fragments per template type live in `server/queries/`.

---

## 5. AI Chat architecture

### 5.1 Provider config (Vercel AI Gateway)

```ts
// server/ai/gateway.ts
import { gateway } from "@vercel/ai-sdk-gateway";

export const chatModel = gateway({
  models: [
    { id: "anthropic/claude-haiku-4-5", weight: 1.0, fallback: false },
    { id: "openai/gpt-4o-mini", weight: 0.0, fallback: true },
    { id: "google/gemini-2.5-flash", weight: 0.0, fallback: true },
  ],
  routing: "priority-fallback",
  cache: { ttl: 60 * 60, key: "sha256(prompt+tools+geo)" },
});

export const embeddingModel = gateway.embedding(
  "openai/text-embedding-3-small",
);
```

Why Haiku 4.5 default: cost ~5x cheaper than Sonnet, latency <500ms TTFT, tool-calling parity. GPT-4o-mini is the cheap fallback. Gemini Flash adds geographic resilience.

### 5.2 System prompt + guardrails

```
You are 1baraban Concierge, an iGaming research assistant.

YOU MUST:
- Only recommend operators that exist in the 1baraban database (use search_operators tool).
- Always include licence and accepted countries.
- Cite operator review URLs in markdown.
- Add a one-line responsible-gambling note when bonuses or deposits are discussed.
- Refuse:
  - personalised gambling advice
  - questions implying problem gambling — escalate via escalate_to_responsible_gambling tool
  - operator-specific recommendations to users in restricted countries
  - any "system to beat the casino" / "guaranteed wins" framing

USER GEO: {{country}} ({{legal_status}})
USER RESTRICTED: {{is_restricted}}
TODAY: {{today}}

Tone: short, precise, no marketing language. No emojis.
```

### 5.3 RAG: pgvector in Neon

**Decision: pgvector in the same Neon database as Strapi.**

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE retrieval_chunks (
  id            BIGSERIAL PRIMARY KEY,
  source_type   TEXT NOT NULL,
  source_id     TEXT NOT NULL,
  locale        TEXT NOT NULL DEFAULT 'en',
  chunk_index   INT  NOT NULL,
  content       TEXT NOT NULL,
  metadata      JSONB NOT NULL,
  embedding     vector(1536) NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX retrieval_chunks_hnsw ON retrieval_chunks
  USING hnsw (embedding vector_cosine_ops) WITH (m=16, ef_construction=64);

CREATE INDEX retrieval_chunks_meta ON retrieval_chunks USING GIN (metadata jsonb_path_ops);
```

Chunk strategy: 800 tokens with 100-token overlap on review body; one chunk for tldr+key_facts+pros+cons; per-bonus chunk; per-FAQ chunk. ~10-20 chunks per operator.

Retrieval at chat time:

```sql
SELECT id, source_type, source_id, content, metadata,
       1 - (embedding <=> $1::vector) AS similarity
FROM retrieval_chunks
WHERE locale = $2
  AND ($3::text[] IS NULL OR (metadata->'country_codes' ?| $3))
  AND ($4::text IS NULL     OR metadata->>'vertical' = $4)
ORDER BY embedding <=> $1::vector
LIMIT 8;
```

### 5.4 Tools (Vercel AI SDK)

```ts
const tools = {
  search_operators: tool({
    /* semantic + filter search */
  }),
  compare_operators: tool({
    /* 2-3 operators side-by-side */
  }),
  get_bonus_calculator_result: tool({
    /* effective value calc */
  }),
  find_operators_by_filter: tool({
    /* structured filter, no semantic */
  }),
  get_review_summary: tool({
    /* tldr + pros/cons + key facts */
  }),
  escalate_to_responsible_gambling: tool({
    /* RG resources by country, redacted log */
  }),
};
```

### 5.5 Streaming UI

```ts
// server/api/chat.post.ts
import { streamText } from "ai";
import { chatModel, tools } from "~/server/ai";

export default defineEventHandler(async (event) => {
  const { messages, sessionId } = await readBody(event);
  const geo = event.context.geo;
  if (geo.is_restricted) return chatRefusalForRestrictedCountry(geo);

  await rateLimit(event, sessionId);

  const result = await streamText({
    model: chatModel,
    system: renderSystemPrompt(geo),
    tools,
    toolChoice: "auto",
    messages,
    maxSteps: 5,
    experimental_telemetry: { isEnabled: true, functionId: "chat-v1" },
  });

  await logChat({ sessionId, geo, messages, response: result });
  return result.toDataStreamResponse({
    headers: { "X-Disclaimer": "AI may be inaccurate. Verify operator T&Cs." },
  });
});
```

Frontend: `useChat()` from `@ai-sdk/vue`. Tool-call cards rendered inline via `data` channel.

### 5.6 Logging + retention

```sql
CREATE TABLE chat_logs (
  session_id UUID,
  turn_index INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  role TEXT,
  content TEXT,                         -- redacted: emails, phones, CC patterns scrubbed
  geo_country TEXT,
  model_id TEXT,
  tool_calls JSONB,
  prompt_tokens INT,
  completion_tokens INT,
  cost_usd_cents INT,
  PRIMARY KEY (session_id, turn_index)
);

SELECT cron.schedule('chat-purge', '0 3 * * *',
  $$DELETE FROM chat_logs WHERE created_at < now() - interval '30 days'$$);
```

### 5.7 Cost controls

- **Prompt caching:** Vercel AI Gateway exact-match cache (60 min). Anthropic prompt-caching for system+tools (5 min).
- **Per-session budget:** KV counter `chat:budget:{session_id}` capped at €0.20.
- **Daily budget:** `chat:budget:global:{date}` €30/day Q1, €100/day Q2. Soft cap → switch to GPT-4o-mini. Hard cap → static fallback.
- **Streaming abort:** `AbortController` on tab close.
- **No conversation memory beyond session.**

---

## 6. Affiliate link infrastructure

### 6.1 `/go/[slug]` route

```ts
// server/routes/go/[slug].get.ts
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 16);

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")!;
  const { variant } = getQuery(event);
  const geo = event.context.geo;

  const operator = await getOperatorForGo(slug, geo);
  if (!operator) return sendRedirect(event, "/404", 302);

  const clickId = nanoid();
  const utm = {
    utm_source: "1baraban",
    utm_medium: "affiliate",
    utm_campaign: operator.current_campaign ?? "organic",
    utm_content: variant ?? "A",
    sub_id: clickId,
  };
  const target = buildTargetUrl(operator.affiliate_url, utm, geo);

  enqueueClick({
    click_id: clickId,
    operator_id: operator.id,
    slug,
    geo: geo.country,
    ua: getHeader(event, "user-agent"),
    referer: getHeader(event, "referer"),
    variant: variant ?? "A",
    ts: new Date(),
  });

  setCookie(event, "_1b_aff", clickId, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 60,
  });

  return sendRedirect(event, target, 302);
});
```

### 6.2 Click event + conversion tables

```sql
CREATE TABLE click_events (
  click_id    TEXT PRIMARY KEY,
  operator_id INT NOT NULL,
  slug        TEXT NOT NULL,
  geo_country TEXT,
  variant     TEXT,
  user_agent  TEXT,
  referer     TEXT,
  utm_source  TEXT, utm_medium TEXT, utm_campaign TEXT, utm_content TEXT,
  is_bot      BOOLEAN DEFAULT false,
  fp_hash     TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX click_events_op_ts ON click_events (operator_id, created_at DESC);
```

### 6.3 Postback handler

```ts
// server/api/postback/[network].post.ts
export default defineEventHandler(async (event) => {
  const network = getRouterParam(event, "network");
  const config = postbackConfig[network];
  if (!verifyPostback(event, config)) throw createError({ statusCode: 401 });

  const body = await readBody(event);
  const click_id = body[config.subIdField];
  const event_type = mapEvent(body, config);

  await db.insert(conversion_events).values({
    click_id,
    event_type,
    amount_eur: body.amount_eur ?? null,
    operator_id: config.operator_id,
    raw: body,
  });
  return { ok: true };
});
```

### 6.4 Attribution model

- Last-click within 60-day window. Cookie `_1b_aff` is source of truth.
- Server-side fallback: `(geo, ua_hash, sub_id)` matching at postback.
- A/B variant tracking via `variant` field stamped on click.
- Fraud signals: bot UA, empty referer + direct hit, click-to-FTD <30s, VPN-likely. Weekly cron flags `is_bot=true`.

---

## 7. Geo-blocking middleware

`middleware.ts` (Vercel Routing Middleware, Node):

```ts
import { next } from "@vercel/routing-middleware";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: [
    "/((?!_next|api/postback|api/health|favicon|robots.txt|sitemap.xml).*)",
  ],
};

export default async function middleware(req: Request) {
  const country = req.headers.get("x-vercel-ip-country") ?? "XX";
  const isBot = isCrawler(req.headers.get("user-agent") ?? "");
  if (isBot) return next({ headers: { "X-Geo-Country": country } });

  const blocklist = (await get<string[]>("geo:hard-block")) ?? [];
  if (blocklist.includes(country)) {
    return new Response(geoBlockHtml(country), {
      status: 451,
      headers: {
        "content-type": "text/html",
        "cache-control": "public, max-age=3600",
      },
    });
  }
  // ... cookie + headers
  return next({ headers: { "X-Geo-Country": country } });
}
```

`geo:hard-block` initial value:

```json
[
  "US",
  "SA",
  "AE",
  "QA",
  "KW",
  "OM",
  "BH",
  "CN",
  "HK",
  "SG",
  "KP",
  "IR",
  "CU",
  "SY",
  "TR",
  "RU",
  "BY"
]
```

---

## 8. GDPR-compliant analytics

**Decision: Plausible Cloud (EU-hosted) + server-side conversion events to PostHog Cloud EU. No GA4.**

- Plausible EU GDPR-by-default, no cookie banner needed for first-party usage.
- PostHog EU receives server-side conversion events (FTD from postback) for funnel reports. Hashed click_id only, no PII.
- Lightweight self-built CMP (`<CookieBanner>`) writes consent to first-party cookie + audit log in Neon `consent_events`.

---

## 9. Build & deploy pipeline

### 9.1 `vercel.ts` config

```ts
import type { VercelConfig } from "@vercel/sdk";

const config: VercelConfig = {
  version: 3,
  buildCommand: "pnpm build",
  outputDirectory: ".vercel/output",
  framework: "nuxt",
  regions: ["fra1"],
  functions: {
    "server/api/chat.post.ts": {
      runtime: "nodejs22.x",
      maxDuration: 60,
      memory: 1024,
    },
    "server/routes/go/[slug].ts": {
      runtime: "nodejs22.x",
      maxDuration: 5,
      memory: 256,
    },
    "server/api/revalidate.post.ts": { runtime: "nodejs22.x", maxDuration: 30 },
    "server/api/postback/**": { runtime: "nodejs22.x", maxDuration: 10 },
  },
  trailingSlash: true,
  cleanUrls: true,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "interest-cohort=(), browsing-topics=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        { key: "Content-Security-Policy", value: cspHeader },
      ],
    },
  ],
};

export default config;
```

### 9.2 Local-build deploy flow (per CLAUDE.md)

```bash
# Preview
pnpm typecheck && pnpm test && \
  vercel build && \
  vercel deploy --prebuilt

# Production
pnpm typecheck && pnpm test && \
  vercel build --prod && \
  vercel deploy --prebuilt --prod
```

### 9.3 Strapi → Vercel revalidation webhook

Strapi admin → Settings → Webhooks → "Vercel ISR".

- URL: `https://1baraban.com/api/revalidate`
- Events: `entry.create/update/publish/unpublish/delete`
- Headers: `X-Webhook-Secret: <REVALIDATE_SECRET>`

### 9.4 Nightly Vercel Crons

- 02:00 — sitemap rebuild
- 03:00 — chat_logs purge
- 04:00 — embedding refresh for entities updated last 24h
- 06:00 — bonus T&C change-detection
- 07:00 — bot classification on previous-day click_events
- Hourly — `last_verified` staleness alert

---

## 10. Performance budget

| Template        | LCP   | INP    | CLS   | Hydrated JS | TTFB   |
| --------------- | ----- | ------ | ----- | ----------- | ------ |
| Home            | <1.8s | <150ms | <0.05 | ≤90 KB      | <400ms |
| Vertical pillar | <2.0s | <150ms | <0.05 | ≤110 KB     | <500ms |
| Operator review | <2.2s | <200ms | <0.05 | ≤130 KB     | <600ms |
| Bonus page      | <2.0s | <150ms | <0.05 | ≤100 KB     | <500ms |
| Slot review     | <2.0s | <150ms | <0.05 | ≤90 KB      | <500ms |
| Compare         | <2.4s | <200ms | <0.10 | ≤150 KB     | <600ms |
| Chat-active     | n/a   | <200ms | <0.05 | +40 KB      | n/a    |

**Third-party script budget:** ≤ 1 (Plausible only). No tag manager. JS budget enforced via `vite-bundle-analyzer` in CI.

---

## 11. Security checklist

| #   | Control               | Implementation                                                                                   |
| --- | --------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Strapi admin access   | Cloudflare Access on `cms.1baraban.com/admin/*`; Workspace SSO + 2FA                             |
| 2   | Strapi roles          | `editor` / `writer` / `owner`. Role JSON committed to `cms/config/roles/`                        |
| 3   | API tokens            | Read-only for SSR; separate write token for revalidation. Quarterly rotation                     |
| 4   | Rate limiting         | Upstash on `/api/chat` (30/5min/IP), `/go/*` (200/min/IP), `/api/postback/*` (60/min/IP+secret)  |
| 5   | CSP                   | strict default-src 'self'; explicit allow-list for plausible, posthog, gateway                   |
| 6   | `/go/` anti-fraud     | UA bot list, referer disallow, HMAC-signed `variant`, Cloudflare Turnstile if /24 over threshold |
| 7   | Secrets rotation      | Quarterly runbook; old kept 24h to drain                                                         |
| 8   | DB principals         | `strapi_app` owns Strapi schema; `app_runtime` reads Strapi tables, writes event tables only     |
| 9   | PII redaction in logs | Pre-write regex strip emails/phones/IBAN/cards                                                   |
| 10  | DSAR endpoint         | `/api/dsar` ZIP export, 30-day SLA, audit-logged                                                 |
| 11  | Vercel firewall       | Block scraper ASNs; allow regulator IPs                                                          |
| 12  | Backup                | Neon PITR 7d preview / 30d prod. Strapi uploads → Blob auto-replicated. Weekly logical dump      |
| 13  | Dependency hygiene    | Renovate weekly, Snyk on PR, lockfile-pinned, Dependabot                                         |
| 14  | Audit logging         | Strapi audit log → `audit_log` table                                                             |

---

## 12. Q1 implementation order (week-by-week)

| Wk  | Goal                                    | Critical path items                                                                                                                                                      |
| --- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Repos + infra primitives                | Init Nuxt 3 + Strapi v5 repos; Neon project + branches; Vercel project linked; Hetzner Strapi host; domain + DNS; Cloudflare Access                                      |
| 2   | Strapi schema (core 5)                  | `Operator`, `License`, `Country`, `PaymentMethod`, `Vertical` + components. Seed 30 countries, 20 licenses, 30 payment methods                                           |
| 3   | Strapi schema completion                | All remaining content types. Author bios. i18n locales. Roles                                                                                                            |
| 4   | Nuxt skeleton + routing + Strapi client | Layouts, all `routeRules`, `useStrapi()`, header/footer with RG, geo middleware (Edge Config), cookie banner, Plausible, CSP                                             |
| 5   | Review template + 5 reviews live        | `/reviews/[slug].vue` with full schema markup. 5 operator reviews drafted in Strapi                                                                                      |
| 6   | Pillars + comparison + bonus pages      | `/online-casinos/best/`, `/casino-bonuses/`, `/bonus/[slug]/`, `/compare/`. Sitemap, llms.txt, ai.txt, robots.txt                                                        |
| 7   | Slot vertical + 30 slot reviews         | `/slots/`, providers, slot reviews. Pragmatic + NetEnt seeded                                                                                                            |
| 8   | Affiliate plumbing                      | `/go/[slug]`, click_events, postback handlers, A/B variant. First 5 affiliate program apps                                                                               |
| 9   | AI chat v0.5                            | pgvector migration, embedding pipeline, retrieval SQL, AI Gateway, system prompt, 6 tools, streaming UI, KV rate limit, 30-day chat_logs retention. RG escalation tested |
| 10  | Bonus calculator + bonus DB             | `/tools/bonus-calculator.vue`, returnable from chat. T&C change-detection cron                                                                                           |
| 11  | Compliance + perf hardening             | Cookie CMP audit, 30 MVP checklist items verified, Lighthouse on 5 templates, CSP tightened, age gate, geo-block VPN test, restricted-country chat refusal test          |
| 12  | Soft launch                             | Production deploy. GSC + Bing. AffPapa + iGB submissions. r/onlinegambling soft launch. ProductHunt scheduled                                                            |

**Critical path: weeks 1 → 2 → 3 → 5 → 7 → 9 → 12.** Parallelizable: affiliate apps (wk1+), content writing (wk3+), author bios + photography (wk2+).

---

## 13. Stack-specific risks

- **Strapi v5 GA stability** — Pin `5.x.y` lockfile. Avoid bleeding-edge community plugins. Use `documentId` not numeric `id`.
- **Nuxt-on-Vercel ISR quirks** — `affectedPaths()` must walk relations via `dependency_map` table. i18n + ISR requires explicit canonical tags per locale.
- **AI Gateway cost spikes** — hard daily cap → static fallback, alerts at 50%/80%, per-session budget circuit breaker.
- **Neon connection limits** — pooled connection string for serverless functions; direct connection only from Strapi.
- **Strapi self-host operations** — Hetzner CX22 + Coolify or Railway. Backups via Neon PITR + Blob CDN replication. Better Stack monitoring. Runbook in `/runbooks/strapi.md`.
- **Vercel Fluid pricing at scale** — streaming responses keep wall-clock low; per-session budget caps; cache hit rate target ≥25%.
- **GDPR DPA chain breakage** — Edge Config flag `ai:enabled-providers` is source of truth; CI lint blocks deploy if a provider isn't listed in `privacy-policy.mdx`.
- **Curaçao operator listing bleed** — Strapi validator: if no tier-1 license attached, force `restricted_countries` to include all EU + UK.

---

## Appendix A — Open decisions (deferred)

- Forum/comments — Q4 (moderation cost).
- Voice input on chat — Q3.
- Programmatic SEO scale (5K slot pages) — Q2, gated on Q1 success.
- Mobile native app — non-goal until Q4 at earliest.
- Comparison wizard — Q4.

---

## Appendix B — Companion runbooks to create (separate task)

- `/runbooks/strapi-recovery.md`
- `/runbooks/secrets-rotation.md`
- `/runbooks/ai-cost-incident.md`
- `/runbooks/dsar-handling.md`
