# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Discord server owners and moderators who want to add small, focused fun/utility
bots to their community without configuration overhead. They arrive from
Discord, top.gg, GitHub, or word of mouth, usually evaluating quickly: "does
this do the one thing I want, and can I trust it to stay online?" A secondary
audience is community members who already play with a bot and come to discover
the rest of the family.

## Product Purpose

Yugen Stack is a collection of small, single-purpose Discord bots. Each bot does
one thing well — a word game, a counting game, a starboard, an anti-spam
honeypot, a color utility — with no dashboards to configure and minimal setup.
The site's job is to present the family, explain what each bot does, prove the
bots are alive and used, and get the visitor to invite one (or vote / support).
Success = an invite click (and secondarily a Discord join, GitHub visit, or Ko-fi
support).

## Positioning

Beautifully simple, focused bots — the opposite of the bloated
everything-bot with a configuration dashboard. Each bot is intentionally scoped
to a single job, and the whole set reads as one crafted, coherent family
(shared Japanese naming: 言 Koto, 鎖 Kusari, 数 Kazu, 星 Hoshi, 蜂蜜 Hachimitsu,
色 Iro). The differentiator is craft and simplicity, not feature count.

## Operating Context

- Distribution and trust signals live off-site: top.gg vote pages, GitHub
  (open source), Discord support server, Ko-fi.
- Bots are invited via per-bot invite URLs (`invite-<id>.yugen.bot`).
- The site pulls **live metrics per bot** (online status, guild/server count)
  at view time — these are real, load asynchronously, and can be
  loading/online/offline or unavailable.
- Bot content is Markdown (name, tagline, how-to-play / commands), plus a logo
  (animated GIF) and an optional screenshot.

## Capabilities and Constraints

- **Stack:** TanStack Start (SSR) + React 19, TanStack Router (file routes),
  Tailwind CSS 4 with `@theme` design tokens, deployed on Cloudflare Workers.
- **Data:** bot catalog is static (`src/lib/bots.ts`); metrics and owner info
  come from hooks (`use-bot-metrics`, `use-owner`) via TanStack Query.
- Live metrics and owner credit are async: every design must handle
  loading / present / absent states without layout shift.
- Bot count is currently 6 and grows over time — layout must not assume a fixed
  count. Realistic range: ~4–12.
- Owner attribution ("With ❤️ by …", links to jurien.dev) is a durable element.
- Theme: light/dark with an explicit toggle plus `prefers-color-scheme`.

## Brand Commitments

- **Name:** Yugen Stack (幽玄, _yūgen_ — a Japanese aesthetic of subtle, profound
  grace). Individual bots keep their Japanese names and kanji glosses.
- **Voice:** friendly, playful, unpretentious; short and direct. "fun and
  simplistic."
- **Assets:** per-bot animated GIF logos and accent colors already defined
  (Koto #B9AD6C, Kusari #81BA6C, Kazu #5C80ED, Hoshi #ECE15C,
  Hachimitsu #f5A623, Iro #DC3563); Yugen mark at `/yugen.gif`.
- Owner credit and support (Ko-fi) links are kept.
- Indie / open-source project — not a corporate SaaS.

## Evidence on Hand

- Real bot catalog with taglines and how-to-play copy (`src/lib/bots.ts`).
- Real per-bot accent colors and animated GIF logos.
- Live per-bot online status and guild counts (via `use-bot-metrics`).
- Real external links: top.gg vote pages, GitHub repo, Discord support, Ko-fi.
- Optional per-bot screenshots (`/<id>-example.png`) — not all present; "coming
  soon" fallback exists. Do not fabricate screenshots or invent metrics,
  testimonials, or user counts.

## Product Principles

1. **One bot, one job.** Simplicity is the product; never present the bots as a
   configurable platform.
2. **Show it's alive.** Real, live status and usage build trust — surface them
   honestly, including offline/unknown states.
3. **One coherent family.** The set should read as a crafted suite, unified by
   the Japanese naming and shared identity, while each bot keeps its own accent.
4. **Low friction to invite.** The primary action (invite) is always close at
   hand; supporting actions (vote, support, source) never crowd it.
5. **Honest and indie.** Open source, personally made; no fake social proof.

## Accessibility & Inclusion

Light and dark themes must both be first-class. Live-updating status must not
rely on color alone (pair with text/label). Respect reduced-motion for the
animated logos and any added motion.
