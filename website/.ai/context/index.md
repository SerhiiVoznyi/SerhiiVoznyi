# Project context

Read this first before substantive changes.

## What this site is

Serhii Voznyi's personal brand site and blog, built as an interactive **artbook reader** in a Cyberpunk 2077 comic style. Every route is a _spread_: a stack of drawn paper sheets at different depths inside a persistent HUD frame. Sheets drift with the pointer, reorder when clicked, and the whole spread turns like a comic page on navigation. The project [`README.md`](../../README.md) has the user-facing overview.

## Stack

- Vite 8 + React 19 + TypeScript (strict)
- Mantine 9 (`@mantine/core`, `@mantine/hooks`) — primitives and hooks only; styles are imported per component
- React Router 7
- `marked` — markdown rendering for blog posts
- ESLint + Prettier + Sass (indented `.sass`)
- No animation library: motion is CSS plus the hand-rolled state machine in `src/lib/spread-transition/`

## Key paths

| Path                           | What lives there                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `src/main.tsx`                 | Entry; per-component Mantine CSS imports                                                              |
| `src/app.tsx`                  | Providers (Mantine, router, reader, audio) and global style import order                              |
| `src/router.tsx`               | Routes, rendered with the transition's held-back `location`                                           |
| `src/components/reader-shell/` | Persistent chrome: top bar, stage, bottom toolbar, hotkeys, live announcer                            |
| `src/components/`              | Shared UI kit (display title, HUD button, cyan pill, plate card, decal, …)                            |
| `src/lib/sheet-stack/`         | Layer engine: `SheetScene`, `SheetStack`, `Sheet`, `Plate`, parallax, scroll depth                    |
| `src/lib/spread-transition/`   | Page-turn phase machine (`exiting` → `entering` → `idle`)                                             |
| `src/lib/reader/`              | Reader state: view mode, zoom, effects preference, spread navigation                                  |
| `src/lib/audio/`               | Soundtrack player context                                                                             |
| `src/content/spreads.ts`       | Spread registry — drives the counter, prev/next, map route and turn direction                         |
| `src/content/profile.ts`       | All profile copy and links                                                                            |
| `src/content/posts/*.md`       | Blog posts (frontmatter + markdown)                                                                   |
| `src/content/soundtrack.ts`    | Playlist                                                                                              |
| `src/services/posts/`          | Post loading, frontmatter parsing, markdown rendering                                                 |
| `src/pages/<spread>/`          | One folder per spread: `map`, `profile`, `experience`, `journal`, `article`, `contact`, `signal-lost` |
| `src/styles/`                  | `variables.sass` tokens, `_mixins.sass`, `base.sass`, `content.sass`                                  |
| `public/assets/art/`           | WebP art plates, textures, decal, OG image                                                            |
| `public/assets/fonts/`         | Self-hosted Chakra Petch, Share Tech Mono, Source Sans 3, Line Awesome                                |
| `public/assets/audio/`         | Soundtrack MP3s — **git-ignored**, deployed separately                                                |
| `public/404.html`              | Deep-link fallback for static hosts                                                                   |

Routes: `/` Map, `/profile`, `/experience`, `/blog` (Journal), `/blog/:slug` (Article), `/contact`, `*` Signal Lost. `/home` redirects to `/`; the legacy `/identity`, `/dossier` and `/uplink` redirect to their new paths.

## Scripts

`npm start`, `npm run build` (tsc + Vite), `npm run lint` (zero warnings allowed), `npm run preview`.

## Environment notes

- Git uses `core.autocrlf=true` here, so working-tree files are CRLF while the repo stores LF. Check formatting with `npx prettier --check --end-of-line auto …`; a plain `--check` flags every file.
- Import alias `@/` maps to `src/` (tsconfig `paths` + Vite `resolve.tsconfigPaths`).

## Rules and skills to read for this codebase

- [`rules/engineering.md`](../rules/engineering.md) — general conventions
- [`rules/design-system.md`](../rules/design-system.md) — visual language, tokens, effects, accessibility of effects
- [`rules/spread-architecture.md`](../rules/spread-architecture.md) — layer engine invariants and pitfalls
- [`rules/content.md`](../rules/content.md) — posts, copy, art and audio assets
- Skills: [`artbook-spreads`](../skills/artbook-spreads/SKILL.md), [`sass`](../skills/sass/SKILL.md), [`react-typescript`](../skills/react-typescript/SKILL.md), [`html-semantic`](../skills/html-semantic/SKILL.md)
- Workflows: [`add-spread`](../workflows/add-spread.md), [`publish-post`](../workflows/publish-post.md), [`verify-ui`](../workflows/verify-ui.md)

## AI OS

- Cross-tool entry: [`AGENTS.md`](../../AGENTS.md) (pointer into `.ai/`)
- Rules: [`.ai/rules/`](../rules/)
- Agents: [`.ai/agents/`](../agents/)
- Skills / workflows / templates: sibling folders under [`.ai/`](../)
