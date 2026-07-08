# 1baraban.com — personal brand website

> Fleet: **OURS** · Lane — n/a (Nuxt 3, not Astro/Next+Payload/Docusaurus) · part of the ~/github fleet.
> Golden path: pnpm + Node 22 + flat ESLint. See /Users/dmytro/github/ARCHITECTURE-PLAN.md and KARPATHY-METHOD.md.

## What this is

Personal brand website for 1baraban.com. The app lives in `web/`; a companion `1baraban-wiki/` Obsidian-style vault sits alongside it at the repo root.

## Stack

- Framework/runtime: Nuxt 3 (`nuxt ^3.14`), Vue 3, vue-router
- Modules: `@nuxt/icon`, `@nuxt/image`, `@nuxtjs/tailwindcss`, `@nuxtjs/seo`, `@vueuse/nuxt`; motion-v, lucide-vue-next
- Styling: Tailwind 3 + CSS tokens (`~/assets/css/tokens.css`)
- Package manager: pnpm@10.33.2 (golden path: pnpm)
- Deploy: unknown — TODO DEPLOY.md

## Run

```sh
cd web && pnpm install && pnpm dev   # port 1121 (per fleet port registry)
```

## Notes

- Monorepo-ish layout: `web/` (the Nuxt app) + `1baraban-wiki/` (content/notes vault) at the root.
- `compatibilityDate: "2025-12-01"`; dark/light theme via `theme-color` media queries.
