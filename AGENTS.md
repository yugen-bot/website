<!-- intent-skills:start -->
## Skill Loading

Before substantial work:
- Skill check: run `yarn dlx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `yarn dlx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# Yugen Website — Agent Context

Durable context for agents working on this repo. Update when stack, integrations, env vars, deploy targets, or architectural decisions change.

## Scaffold Provenance

Created by the TanStack CLI on 2026-06-11. Exact command:

```bash
npx @tanstack/cli@latest create yugen-website --agent --deployment cloudflare --add-ons clerk,sentry
```

CLI version installed at scaffold time: `@tanstack/cli@0.69.3`.

Post-scaffold normalization performed in-place:

- Moved scaffolded files from `yugen-website/` up into project root.
- Removed `package-lock.json` and reinstalled with **yarn** (`yarn install`).
- Added TanStack Query / Form / Store: `yarn add @tanstack/react-query @tanstack/react-form @tanstack/react-store`.
- Added ESLint toolchain: `yarn add -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks @tanstack/eslint-plugin-router @tanstack/eslint-plugin-query`.
- Ran TanStack Intent: `npx @tanstack/intent@latest install` and `npx @tanstack/intent@latest list`.
- Removed the dead `cp instrument.server.mjs .output/server` step from `build` (Cloudflare Workers outputs to `dist/`, not `.output/`).
- Renamed wrangler app `name` to `yugen-website`.

## Stack

- **Framework**: TanStack Start (SSR) on React 19
- **Router**: TanStack Router with file-based routes under `src/routes`
- **Server runtime / deploy**: Cloudflare Workers via `@cloudflare/vite-plugin` + Wrangler
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite`)
- **Auth**: Clerk (`@clerk/clerk-react`) — wrapped at `src/integrations/clerk/provider.tsx`
- **Error monitoring**: Sentry (`@sentry/tanstackstart-react`) — Node-runtime `instrument.server.mjs` shipped by scaffold, see gotchas
- **Data fetching**: TanStack Query 5 + `@tanstack/react-router-ssr-query` (`setupRouterSsrQueryIntegration` wired in `src/router.tsx`)
- **Forms**: TanStack Form 1.x (`@tanstack/react-form`)
- **Client state**: TanStack Store (`@tanstack/react-store`) — example at `src/lib/counterStore.ts`
- **Devtools**: `@tanstack/react-devtools` + `@tanstack/react-router-devtools` in `__root.tsx`
- **Test**: Vitest + jsdom + `@testing-library/react`

## TanStack Library Demonstrations

Route `/demo/tanstack` (`src/routes/demo/tanstack.tsx`) exercises Query, Form, and Store together so each library is represented in the running app, not just `package.json`.

Other route demos shipped by the scaffold:
- `/demo/clerk` — Clerk sign-in/out
- `/demo/sentry/testing` — Sentry error/perf triggers

## Package Management

**Yarn 1.22 (classic)**. Do not introduce `package-lock.json` or `pnpm-lock.yaml`. Lockfile is `yarn.lock`.

Common commands:

```bash
yarn dev          # vite dev on :3000 (loads .env.local via dotenv-cli)
yarn build        # vite build → dist/
yarn preview      # vite preview
yarn test         # vitest run
yarn lint         # eslint .
yarn lint:fix     # eslint . --fix
yarn typecheck    # tsc --noEmit
yarn generate-routes  # tsr generate (regenerate src/routeTree.gen.ts)
yarn deploy       # yarn build && wrangler deploy
```

## Toolchain — ESLint

Flat config at `eslint.config.js`. Composes:

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `@tanstack/eslint-plugin-router` (flat/recommended)
- `@tanstack/eslint-plugin-query` (flat/recommended)
- `eslint-plugin-react-hooks` recommended

Notes:
- `eslint-plugin-react@7` is **not compatible with ESLint 10** (`react/display-name` crash). Removed; rely on `react-hooks` plugin + typescript-eslint for React 19.
- `react-hooks/set-state-in-effect` and `react-hooks/rules-of-hooks` are set to `warn` (not `error`) because the scaffolded Sentry demo (`src/routes/demo/sentry.testing.tsx`) and `ThemeToggle.tsx` ship code that the new React 19 rules flag. Tighten back to `error` and refactor those files when they're no longer demo cruft.
- Ignores: `node_modules/`, `.output/`, `.tanstack/`, `dist/`, `src/routeTree.gen.ts`.

## Environment Variables

Both `.env.example` (template) and `.env.local` (real values, gitignored) exist.

Required for full functionality:

| Variable | Where used | Required for |
|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | `src/integrations/clerk/provider.tsx` | Clerk auth UI |
| `VITE_SENTRY_DSN` | Sentry browser SDK | Error monitoring (client) |
| `VITE_SENTRY_ORG` | Sentry source-map upload at build | Sentry release tracking |
| `VITE_SENTRY_PROJECT` | Sentry source-map upload at build | Sentry release tracking |
| `SENTRY_AUTH_TOKEN` | Sentry source-map upload at build | Sentry release tracking (server-only — do **not** prefix with `VITE_`) |

`yarn dev` loads `.env.local` via `dotenv-cli`. Cloudflare deploy reads secrets from Wrangler — set via `wrangler secret put NAME` or in the CF dashboard.

## Deployment — Cloudflare Workers

- `wrangler.jsonc` declares the app name (`yugen-website`), `compatibility_date` `2025-09-02`, and `nodejs_compat`.
- Entry: `@tanstack/react-start/server-entry` (re-exported by the start plugin).
- Build output lives in `dist/` (client) and `dist/server/` (worker bundle).
- Deploy: `yarn deploy` (runs `yarn build` then `wrangler deploy`).
- First-time deploy requires `wrangler login` and setting non-public secrets via `wrangler secret put`.
- Loading skill for deploy specifics: `yarn dlx @tanstack/intent@latest load @tanstack/start-client-core#start-core/deployment`.

## Architectural Decisions

1. **SSR Query integration** — `src/router.tsx` creates a `QueryClient` and calls `setupRouterSsrQueryIntegration` so the QueryClientProvider is injected via the router's `Wrap`. Router context exposes `{ queryClient }` (typed via `createRootRouteWithContext`).
2. **Single QueryClient per request** — instantiated inside `getRouter()` so server requests don't share cache.
3. **Stores live under `src/lib/`** — not under `src/integrations/` (reserved for vendor wiring like Clerk).
4. **Demo routes stay under `src/routes/demo/`** — easy to delete in one directory drop when going to prod.
5. **Tailwind v4 + custom CSS variables** — design tokens live in `src/styles.css` under `@theme`. Components use generated Tailwind utilities (`bg-surface`, `text-ink`, `border-brand-600`, etc.) — never `var(--color-*)` inline. Dark mode tokens are overridden in `:root[data-theme="dark"]` and the `prefers-color-scheme` media block; dark-mode color changes require no `dark:` prefixes.
6. **No arbitrary Tailwind values** — do not use `w-[128px]`, `blur-[80px]`, etc. Use the standard Tailwind scale (`w-32`, `blur-2xl`) or extend `@theme` in `src/styles.css` with a named token (`--blur-4xl`, `--spacing-*`). When a value genuinely has no standard equivalent, use rem/em (`w-[8rem]`), never px.

## Gotchas

- **Sentry server instrument is Node-only**. `instrument.server.mjs` and the `start` script use Node's `--import` flag, which doesn't apply to Cloudflare Workers. On Workers, Sentry runs from the worker SDK only. Either remove the Node bits if you're committed to CF Workers, or add a Node deploy target if you want server-side Sentry.
- **`@clerk/clerk-react` is the legacy package**. The install emits a deprecation warning pointing to `@clerk/react`. Migrate when convenient using the Clerk upgrade guide.
- **`@tanstack/react-router-ssr-query` peer warnings** — installing it caused yarn to warn about `@tanstack/query-core` and `@tanstack/react-query` peers. Both are now installed and resolve correctly; the warnings only appear before the Query packages were added.
- **ESLint 10 + `eslint-plugin-react@7`** is broken. Do not reintroduce the package.
- **`src/routeTree.gen.ts` is generated** — never edit by hand; run `yarn generate-routes` (or let the Vite router plugin handle it during `yarn dev`).
- **Tsr ignores most lint rules** — `routeTree.gen.ts` is in the ignore list.
- **`.cta.json` and `.cursorrules`** are scaffold artifacts; safe to keep or delete.

## Next Steps

- Fill `.env.local` with real Clerk + Sentry credentials before first `yarn dev` that exercises auth or error reporting.
- Decide whether to keep the Node-style Sentry server instrumentation or strip it for a pure-Workers deploy (see gotchas).
- Migrate from `@clerk/clerk-react` to `@clerk/react` per Clerk's upgrade guide.
- Delete the scaffolded `/demo/*` routes once their patterns have been internalized.
- Wire CI: `yarn lint && yarn typecheck && yarn test && yarn build`.
- Set Cloudflare secrets via `wrangler secret put` before first deploy.
