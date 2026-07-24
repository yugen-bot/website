---
name: Yugen Stack
description: A family of small Discord bots, presented as ink on water.
colors:
  paper: '#ECEAE3'
  paper-deep: '#E1DED5'
  sumi: '#141C28'
  ink-current: '#3C4A5A'
  ink-dilute: '#6C7788'
  mist: 'rgba(20,28,40,0.12)'
  indigo: '#38597E'
  accent-koto: '#B9AD6C'
  accent-kusari: '#81BA6C'
  accent-kazu: '#5C80ED'
  accent-hoshi: '#C9BE3F'
  accent-hachimitsu: '#F5A623'
  accent-iro: '#DC3563'
typography:
  display:
    fontFamily: 'Zen Old Mincho, Yu Mincho, Georgia, serif'
    fontSize: 'clamp(2.75rem, 1.5rem + 5vw, 5.25rem)'
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: '-0.02em'
  headline:
    fontFamily: 'Zen Old Mincho, Yu Mincho, Georgia, serif'
    fontSize: 'clamp(1.9rem, 1.2rem + 2.4vw, 2.9rem)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Zen Kaku Gothic New, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)'
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: '0'
  label:
    fontFamily: 'Zen Kaku Gothic New, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: '0.01em'
rounded:
  pill: '999px'
  panel: '1.75rem'
spacing:
  gutter: '1.5rem'
  section: 'clamp(6rem, 4rem + 10vw, 12rem)'
components:
  button-primary:
    backgroundColor: '{colors.sumi}'
    textColor: '{colors.paper}'
    rounded: '{rounded.pill}'
    padding: '0.9rem 1.6rem'
  button-invite:
    backgroundColor: '{colors.sumi}'
    textColor: '{colors.paper}'
    rounded: '{rounded.pill}'
    padding: '0.9rem 1.8rem'
  button-ghost:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.sumi}'
    rounded: '{rounded.pill}'
    padding: '0.9rem 1.6rem'
---

# Design System: Yugen Stack

## Overview

**Creative North Star: "Ink on water"**

Yugen Stack is 幽玄 — a Japanese word for subtle, profound grace — made into an
interface. The surface is a still basin of sumi ink floating on paper-white
water. Nothing is boxed; content rests in open space (_ma_, 間) and is separated
by breathing room and hairline mist, never by cards. The whole page is
near-monochrome indigo-and-carbon ink; the only saturated color anywhere is the
single bloom reserved for whichever bot you are looking at. Motion is the
material: online bots' ink drifts and breathes, offline ink settles to still
gray. The signature is a real, pointer-reactive suminagashi field behind the
opening — the page is a liquid you can disturb.

This is the deliberate opposite of the Discord-bot landing convention. There is
no blurple hero, no bot avatar in a glowing ring, no feature-card grid, no
stat-bar. Restraint is the argument: these bots each do exactly one thing, and
the surface proves it by doing exactly one thing beautifully.

**Key Characteristics:**

- Ink-monochrome ground; accent color is rare and always earned.
- Open, card-free composition organized by space and mist hairlines.
- Japanese type (Mincho display + Kaku Gothic body) that also sets the kanji.
- Live status expressed as motion, never as color alone.
- One authored generative moment (the ink), not scattered effects.

## Colors

A near-monochrome ink palette on warm-cool paper, with six reserved bot accents.

### Primary

- **Sumi Ink** (`#141C28`): the ink itself — display type, body headings, primary
  button fills, the darkest strokes. In dark mode it inverts to near-white
  (`#E9ECF1`), so `ink`-filled controls read as light-on-dark automatically.

### Secondary

- **Deep Indigo** (`#38597E`): links and focus rings; the color ink takes when
  diluted into water. Lightens to `#7FA8CE` in dark mode.

### Tertiary — Bot Accents (the reserved blooms)

- **Koto** (`#B9AD6C`), **Kusari** (`#81BA6C`), **Kazu** (`#5C80ED`),
  **Hoshi** (`#C9BE3F`), **Hachimitsu** (`#F5A623`), **Iro** (`#DC3563`).
  Each appears only inside its own bot's ink current and its Invite affordance.

### Neutral

- **Paper** (`#ECEAE3` light / `#0B121C` dark): the water/ground.
- **Paper Deep** (`#E1DED5` / `#060B13`): recessed water beneath floating content.
- **Ink Current** (`#3C4A5A` / `#AEB9C6`): secondary text.
- **Ink Dilute** (`#6C7788` / `#7C8998`): muted labels, captions.
- **Mist** (`rgba(20,28,40,0.12)` / `rgba(174,185,201,0.16)`): hairline dividers.

### Named Rules

**The One Bloom Rule.** Only one saturated color is present per region — that
region's bot accent — used on ≤10% of it. Everything else is ink. Two accents
never share a viewport band except in the family constellation, where each dot
owns its own.
**The No-Blurple Rule.** Discord purple (`#5865F2`/`#7c3aed`) never appears. The
Discord icon is drawn in current ink, not brand color.

## Typography

**Display Font:** Zen Old Mincho (with Yu Mincho, Georgia, serif)
**Body Font:** Zen Kaku Gothic New (with system sans fallback)

**Character:** A calligraphic Mincho serif with real brush contrast pairs with a
quiet, even humanist gothic. Both render Japanese natively, so kanji glosses
(言 数 星 …) sit in the same voice as Latin text — the naming _is_ the typography.

### Hierarchy

- **Display** (700, `clamp(2.75rem, 1.5rem + 5vw, 5.25rem)`, 1.02): the wordmark
  and the one hero line only.
- **Headline** (600, `clamp(1.9rem, 1.2rem + 2.4vw, 2.9rem)`, 1.1): bot names.
- **Body** (400, `clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)`, 1.7): descriptions,
  measure held to 60–70ch.
- **Label** (500, `0.8125rem`, +0.01em): status pills, meta, captions.

### Named Rules

**The Kanji-First Rule.** A bot's kanji is set large in Mincho beside its name,
never as a decorative watermark. It is content, at reading contrast.
**The No-Uppercase-Eyebrow Rule.** No tracked uppercase eyebrows over sections.
Section identity comes from the bot name and its accent, not a kicker.

## Layout

Single-column, generously centered (max ~64rem content, ~72rem for split bot
rows). No grid of equal cells. The hero centers on the ink drop; bot rows
alternate content/current left–right down the page like currents crossing a
basin. Vertical rhythm is large and deliberate — `section` spacing of
`clamp(6rem, 4rem + 10vw, 12rem)` between bots — and always more space above a
heading than below it. On phones, split rows collapse to a single column with
the current above the content; the family constellation reflows to a wrap.

## Elevation & Depth

Flat by intent. Depth comes from ink, not boxes: the fluid basin sits behind
content, mist hairlines divide, and floating panels (screenshots) are separated
by space and a 1px mist stroke — not drop shadows. The one permitted shadow is a
soft, offset lift on interactive elements at hover.

### Shadow Vocabulary

- **Hover lift** (`box-shadow: 0 10px 30px -12px rgba(20,28,40,0.35)`): appears
  only on buttons/links at `:hover`, paired with a 1–2px upward translate.

### Named Rules

**The Flat-Basin Rule.** Surfaces are flat at rest. No resting drop shadows, no
colored zero-offset halos. Elevation is a response to pointer state only.

## Shapes

Two radii: full **pills** (`999px`) for every action, and soft **panels**
(`1.75rem`) for the rare bounded surface (screenshot frame, status pill is a
smaller pill). No sharp rectangles, no nested containers. Ink blooms are
organic, edge-feathered SVG shapes — never circles with a border.

## Components

### Buttons

- **Shape:** full pill (`999px`).
- **Primary / Invite:** Sumi ink fill, paper text (`bg-ink text-surface`),
  padding `0.9rem 1.6–1.8rem`. Invite variant tints its fill toward the bot
  accent on hover.
- **Ghost / Secondary:** paper fill, ink text, 1px mist border. Used for Vote,
  GitHub, Ko-fi.
- **Hover / Focus:** −2px translate + hover-lift shadow; focus-visible shows a
  2px deep-indigo ring with 2px offset. Never remove focus outline.

### Status Pill (signature)

- A small pill carrying a state dot **and a text label** (Checking… / Online /
  Offline). Online: accent dot with a slow breathing ring; offline: still gray
  dot; loading: dim pulsing dot. Never color-only — the word is always present.

### Ink Current / Bloom (signature)

- Per-bot marbled ink field tinted with the bot accent, rendered as feathered
  SVG turbulence. Drifts slowly when the bot is online; holds still and
  desaturates when offline or when `prefers-reduced-motion` is set.

### Ink Basin (signature)

- Full-width pointer-reactive suminagashi field behind the hero (WebGL fragment
  shader, flow-noise marbling). Its veins are drawn in diluted **indigo**
  (`--color-indigo`) — the color sumi takes when it spreads in water — over the
  paper ground, not full-strength sumi. Renders one still frame under reduced-motion;
  degrades to a static CSS marbled ground if WebGL is unavailable. Always
  behind content and `aria-hidden`; never blocks pointer events on controls.

## Do's and Don'ts

### Do

- **Do** keep the ground ink-monochrome and let exactly one bot accent bloom per
  region (The One Bloom Rule).
- **Do** set kanji as reading-contrast content in Zen Old Mincho beside names.
- **Do** pair every live-status color with a text label.
- **Do** give the page one authored motion (the ink) and let everything else be
  still; respect `prefers-reduced-motion`.
- **Do** separate content with space and 1px mist, not cards.

### Don't

- **Don't** use Discord blurple or any purple accent anywhere.
- **Don't** box content in cards, nested containers, or resting drop shadows.
- **Don't** use gradient text, tracked uppercase eyebrows, or hero-metric stat
  bars.
- **Don't** let the ink obscure the wordmark, the one-liner, or any action.
- **Don't** reintroduce Fraunces/Manrope or a centered generic-hero composition.
