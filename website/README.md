# Serhii Voznyi — personal site

A personal brand site and blog built as an interactive artbook reader in a Cyberpunk 2077 comic style. Every route is a _spread_: a stack of drawn paper sheets at different depths that drift with the pointer, reorder when you click them, and turn like a comic page when you navigate.

## Scripts

| Command           | What it does                       |
| ----------------- | ---------------------------------- |
| `npm start`       | Vite dev server                    |
| `npm run build`   | Type-check, then production build  |
| `npm run lint`    | ESLint with zero warnings allowed  |
| `npm run preview` | Serve the production build locally |

Stack: Vite, React 19, TypeScript, Mantine, React Router, indented Sass, and `marked` for post rendering.

## How it fits together

- **Reader shell** (`src/components/reader-shell/`) — the persistent HUD: wordmark, handle chip, spread counter, view-mode toggle, soundtrack transport and zoom. It never re-mounts on navigation.
- **Spread transition** (`src/lib/spread-transition/`) — holds the rendered route back while the current spread turns away in 3D, then lets the next one settle in. Direction follows the spread registry, so paging back turns the other way.
- **Sheet stack** (`src/lib/sheet-stack/`) — `SheetScene` is the perspective and parallax root, `SheetStack` the positioned region, `Sheet` a promotable page and `Plate` a fixed art layer. All geometry is derived in CSS from a single `--layer-depth` value per layer.
- **Spread registry** (`src/content/spreads.ts`) — the ordered list of spreads behind the counter, prev/next, the map and turn direction. Each blog post is added as its own spread automatically.
- **Pages** (`src/pages/`) — Map (`/`), Profile, Experience, Journal (`/blog`), Article (`/blog/:slug`), Contact, and the Signal Lost 404.

Keyboard: arrow keys page between spreads, `M` mutes, `+` / `-` zoom, `Escape` resets zoom or returns to the map.

## Writing a post

Add a markdown file to `src/content/posts/`:

```markdown
---
title: A title
slug: a-title
date: 2026-11-14
summary: One or two sentences for cards and the map.
tags: [architecture, aws]
cover: /assets/art/server-hall.webp
altCover: /assets/art/journal/a-title/cover.gif
draft: false
---

Body in GitHub-flavoured markdown. Start sections at `##`.
```

`title` and a valid `date` are required; `slug` defaults to the file name. Drafts are hidden in production builds. Post HTML is rendered without sanitizing because posts are first-party content from this repository — do not feed it untrusted markdown.

## Artwork and audio

- Art plates, textures and the decal live in `public/assets/art/`. The hero figure is a placeholder illustration; swap `profile-figure.webp` for a real portrait whenever you like.
- The soundtrack playlist is defined in `src/content/soundtrack.ts` and plays files from `public/assets/audio/`. It starts muted and paused; tracks whose files are missing are detected and skipped.
- Self-hosted fonts: Chakra Petch (display), Share Tech Mono (HUD), Source Sans 3 (body) and Line Awesome icons, under `public/assets/fonts/`.

## Hosting

`public/404.html` plus a small script in `index.html` restore deep links on static hosts such as GitHub Pages, which otherwise 404 on routes like `/blog/some-post`.

## AI agent OS

This repository includes a repo-local AI operating system (context, rules, agents, skills, workflows, templates). See [`.ai/README.md`](.ai/README.md).
