---
title: Freepik Mystic Image Prompts
date: 2026-05-03
type: design-asset
status: ready-to-generate
---

# Freepik Mystic Prompts — 1baraban Brand Image Set

8 production-ready prompts engineered for Freepik Mystic. Direction C aesthetic (Linear / Stripe / Anthropic). Fully compliant with iGaming YMYL constraints (no athletes, no minors, no casino-cliché imagery, no money/winning iconography).

---

## 1. Hero — Homepage (16:9, 2400×1350)

Editorial abstract render of a slow-flowing data ribbon suspended in deep dark space, rendered as continuous translucent silk-like geometry with internal volumetric light. The ribbon curls from lower-right toward upper-mid frame, leaving a clean empty void on the left two-thirds for headline copy. Surface catches a soft violet rim light at hex `#7C5CFF` fading into deep navy `#0A0A0B` background, with faint particulate haze and subtle iridescent edge highlights. Cinematic studio softbox lighting, gentle falloff, micro-grain. Octane render, subsurface scattering, 32-bit color depth, ultra-fine micro-detail. Composition: rule of thirds, anchor mass right, generous negative space top-left. Mood: trustworthy, AI-native, quiet, institutional. Style references: Linear marketing site, Anthropic Claude landing, Stripe Sessions keyframe art. 16:9 cinematic frame, no text.

**Negative:** dice, cards, chips, coins, money, slot reels, roulette, neon signs, casino interior, people, faces, athletes, logos, watermarks, busy background, rainbow colors, lens flare clutter

## 2. Casino vertical hero (16:9)

Minimalist architectural render of a monolithic geometric structure floating in dark void — brutalist temple reduced to pure form: stacked rectangular volumes, sharp orthogonal edges, matte obsidian surfaces with faint micro-texture. Single violet rim light at `#7C5CFF` traces the right-hand silhouette, leaving the left face in deep shadow at `#0A0A0B`. Subtle ambient occlusion in seams, faint atmospheric haze suggesting scale. Camera: low three-quarter angle, slight wide-lens distortion at 24mm equivalent, deep focus throughout. Render: Redshift, physically based materials, 16-bit depth. Composition: subject right of center, vast negative space upper-left.

**Negative:** slot machines, dice, cards, chips, casino interior, neon, gambling, gold coins, money, roulette, people, signage, text, logos, baroque ornament

## 3. Sports betting vertical hero (16:9)

Abstract data-flow visualization: dozens of fine luminous lines streaking horizontally across a deep `#0A0A0B` field, each line varying subtly in length, opacity, and slight vertical offset to suggest probability movement and live odds shifts. Lines emit a soft violet `#7C5CFF` core glow with cooler deep-blue `#1E3A8A` falloff, leaving faint motion-trail residue. A single brighter line cuts diagonally across, implying a key signal. Background contains gentle gradient noise and atmospheric depth, no horizon. Render: Houdini procedural with volumetric pass.

**Negative:** athletes, players, jerseys, balls, stadiums, scoreboards, sports equipment, faces, people, betting slips, money, odds numbers, text, logos

## 4. Poker vertical hero (16:9)

Abstract topological probability cloud rendered as a continuous 3D height-field — topographic contour map elevated into volumetric space, with thousands of fine concentric isolines describing soft hills and valleys of a probability density function. Surface material: matte translucent grey-violet with subtle subsurface glow. Lit from upper-left by cool violet `#7C5CFF` key light, with deep `#0A0A0B` shadows and faint `#34D399` accent highlight on a single peak suggesting an emergent decision point.

**Negative:** playing cards, poker chips, felt table, dice, money, hands holding cards, casino, faces, people, suits

## 5. Slots vertical hero (16:9)

Premium abstract tessellation: a precise geometric tiling pattern of interlocking hexagonal and rhombic cells covering the lower two-thirds of frame, each cell rendered with subtle depth variation and faint iridescent fill. Pattern fades upward into deep `#0A0A0B` void via soft atmospheric gradient. Cells carry micro-rhythm — alternating matte and slightly glossy facets. Accent cells glow softly in violet `#7C5CFF` and warm gold `#E2B770`, distributed sparsely.

**Negative:** slot reels, fruit symbols, cherries, lemons, bells, sevens, 777, jackpot, casino, coins, money, neon, flashing lights, gambling iconography

## 6. Methodology illustration (1:1, 1200×1200)

Editorial composition of layered translucent gauge forms stacked in shallow 3D space — concentric arcs of varying radius and opacity, each layer representing a scoring dimension. Top layer is a partial radial arc filling roughly 78%, in soft violet `#7C5CFF` with subsurface glow. Beneath it, three more semi-transparent arcs in graphite, deep blue, and faint `#34D399`. Background: deep `#0A0A0B`. Faint axis ticks and ultra-thin guideline geometry.

**Negative:** percentage numbers, currency symbols, dollar signs, casino imagery, dice, chips, business stock photo, hands, people, text labels, logos

## 7. AI Concierge background (16:9, /ask page)

Ultra-subtle ambient field for UI background: extremely soft volumetric particle haze drifting across a deep `#0A0A0B` to `#111114` gradient canvas. Tiny luminous specks distributed organically with depth parallax, lit faintly from off-frame upper-right by cool violet `#7C5CFF` at very low intensity. A single barely-visible curved gradient sweep arcs across mid-frame. Generative perlin noise layer adds analog texture and prevents banding.

**Negative:** sharp focal subject, text, logos, faces, people, casino imagery, busy patterns, high contrast elements

## 8. 404 / error page (16:9)

Minimal editorial composition of a single thin luminous line that begins crisp at left frame, travels gently rightward, then dissolves into soft particulate scatter and fades into deep `#0A0A0B` void around two-thirds across — a "lost signal" metaphor. Line glow in soft violet `#7C5CFF` with warm `#E2B770` micro-accent at the dissolution point.

**Negative:** cartoon characters, mascots, broken robot, sad faces, jokes, memes, casino imagery, text, numbers, error icons

---

## Generation strategy

Use `mcp__freepik__text_to_image_mystic_sync` for the most important hero (homepage). Use `mcp__freepik__create_image_mystic` async for the rest, then poll with `get_mystic_task_status`. Save outputs to `web/public/images/hero-{n}.webp` (1baraban-wiki vault is not accessible to web frontend).

## Iteration tips

- If output drifts off-brand: tighten negative list, reduce color refs to one accent only, add "editorial" or "institutional" as mood anchors.
- Avoid adding more positive descriptors — increases entropy.
- Render-engine name-drops (Octane, Redshift, Houdini) reliably bias Mystic toward physically-based output.
