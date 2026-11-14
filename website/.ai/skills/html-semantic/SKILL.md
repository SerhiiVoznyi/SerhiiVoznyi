---
name: html-semantic
description: Build pages with correct HTML semantics and document structure. Use when editing index.html, the reader shell chrome, spread or sheet markup, landmarks, headings, live regions, or accessibility-related markup.
---

# HTML semantic

Pages must be built **semantically**. `index.html` owns the document; the reader shell owns the app landmarks; spreads and sheets own headings and sections.

**Enforce semantic elements.** Do **not** fake structure with non-semantic wrappers such as `<div id="nav">`, `<div class="header">`, or `<div id="footer">`. Use the matching HTML5 element instead.

## Required semantic elements

| Element                     | Use for                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| `<article>`                 | Self-contained composition (post card, independent block)              |
| `<aside>`                   | Tangentially related content (sidebar, callout, related links)         |
| `<details>` / `<summary>`   | Expand/collapse disclosure; `<summary>` is the visible label           |
| `<figure>` / `<figcaption>` | Illustration, diagram, or media with an optional caption               |
| `<footer>`                  | Footer for a page or section (toolbar, meta, secondary links)          |
| `<header>`                  | Introductory content for a page or section (branding, sheet title row) |
| `<main>`                    | Dominant unique content of the document (one per view)                 |
| `<mark>`                    | Text highlighted for reference or relevance                            |
| `<nav>`                     | Major navigation blocks (label each one)                               |
| `<section>`                 | Thematic grouping of content with a heading — every sheet              |
| `<time>`                    | Dates/times with a machine-readable `dateTime`                         |

Keep `div` for styling and layout hooks with **no** structural meaning: `#root`, layers, plates, stage wrappers.

## Document shell (`index.html`)

- Valid HTML5 shell with `lang`, charset, viewport, descriptive `<title>`, `meta[name=description]`, Open Graph tags, and the font and icon stylesheets.
- Mount the app in a single `<div id="root">`. No `<header>`, `<main>`, `<nav>` or `<footer>` in `index.html`.
- The small inline script that restores deep links from `public/404.html` must stay before the Vite entry script.

## App landmarks (`src/components/reader-shell/`)

The reader shell renders the only landmark tree:

```tsx
<a href="#main">Skip to spread</a>
<header className="top-bar">…</header>
<main id="main" tabIndex={-1}>…stage and spread…</main>
<footer className="bottom-toolbar">
  <nav aria-label="Spread pagination">…</nav>
</footer>
<VisuallyHidden role="status" aria-live="polite">Spread 3 of 8: Experience</VisuallyHidden>
```

- Exactly **one** `<main>`, owned by the shell. Pages never render `<main>`, `<header>` for the site, or site `<footer>`.
- Label every `nav` (`Website map chapters`, `Spread pagination`). Groups of related controls use `role="group"` with `aria-label`.

## Spreads and sheets

- One `h1` per spread, focusable for the post-turn focus move (`DisplayTitle spreadHeading`).
- Each `Sheet` is a `<section aria-labelledby>` whose `h2` is the sheet title. A stacked sheet keeps its `h2` (visually hidden) and exposes one native `<button>` spine to bring it forward. Never make a `div` clickable.
- Markdown in a sheet starts at `h3`; keep heading levels in order.
- Use native elements: `button` for actions, `a`/`Link` for navigation, `ul`/`ol` for lists, `dl` for label/value rows, `time` for dates.
- External links open in a new tab with `rel="noreferrer"` and announce it (visually hidden "(opens in a new tab)").
- Decorative layers, icons, decals and effect copies are `aria-hidden`; decorative images use `alt=""`.

## Checklist

1. `index.html` stays a thin shell with `#root`.
2. Landmarks exist only in the reader shell; one `<main>`.
3. One focusable `h1` per spread; sheets are labelled sections with `h2`.
4. Interactive things are native `button`s or links with accessible names.
5. Cross-check with [react-typescript](../react-typescript/SKILL.md) and [sass](../sass/SKILL.md).
