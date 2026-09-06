---
name: html-semantic
description: Build pages with correct HTML semantics and document structure. Use when editing index.html, layout in app.tsx, adding page chrome (header/nav/main/footer), landmarks, headings, or accessibility-related markup.
---

# HTML semantic

Pages must be built **semantically**. Document shell and React layout work together: `index.html` owns the document; `src/app.tsx` owns app landmarks.

**Enforce semantic elements.** Do **not** fake structure with non-semantic wrappers such as `<div id="nav">`, `<div class="header">`, or `<div id="footer">`. Use the matching HTML5 element instead.

## Required semantic elements

Use these elements when the content matches their meaning:

| Element | Use for |
|---------|---------|
| `<article>` | Self-contained composition (post, card, independent block) |
| `<aside>` | Tangentially related content (sidebar, callout, related links) |
| `<details>` / `<summary>` | Expand/collapse disclosure; `<summary>` is the visible label |
| `<figure>` / `<figcaption>` | Illustration, diagram, or media with an optional caption |
| `<footer>` | Footer for a page or section (meta, copyright, secondary links) |
| `<header>` | Introductory content for a page or section (branding, title, toolbar) |
| `<main>` | Dominant unique content of the document (one per view) |
| `<mark>` | Text highlighted for reference or relevance |
| `<nav>` | Major navigation blocks |
| `<section>` | Thematic grouping of content, typically with a heading |
| `<time>` | Dates/times; include a machine-readable `dateTime` when useful |

If a `div`/`span` exists only to mean “nav / header / footer / main / section / article / aside”, replace it with the semantic element. Keep `div` for styling/layout hooks with **no** structural meaning (including `#root` in `index.html`).

## Document shell (`index.html`)

- Keep a valid HTML5 shell: `<!doctype html>`, `<html lang="…">`, charset, viewport, descriptive `<title>` and `meta[name=description]`.
- Mount the app in a single non-semantic container: `<div id="root">`. Do **not** put `<header>`, `<main>`, `<nav>`, or `<footer>` in `index.html` — those belong in React.
- Leave fonts/CSS links and the Vite entry script in `<head>` / end of `<body>` as they are; do not wrap `#root` in extra decorative wrappers.

## App landmarks (`src/app.tsx`)

Current pattern: one page landmark wraps routed content:

```tsx
<main className="app-page">
  <AppRouter />
</main>
```

When adding chrome:

- Prefer a clear landmark tree, e.g. `<header>` → optional `<nav>` → `<main>` → `<footer>`.
- Keep **one** `<main>` per view (the primary content). Do not nest `<main>` inside route pages.
- Put site-wide header/footer **around** `<AppRouter />` in `app.tsx` (or a layout component), not inside every page.
- Page bodies use `<section>`, `<article>`, `<aside>` by meaning — not for styling alone. Prefer real headings (`h1`–`h6`) in order; one visible `h1` per page.
- Use `<nav>` only for primary or secondary navigation groups; label multiple navs (e.g. `aria-label`).
- Prefer native elements (`button`, `a`, `ul`/`ol`, `label` + control) over clickable `div`s.
- Decorative icons: mark decorative with `aria-hidden` when text already conveys meaning.

## Checklist

1. Confirm `index.html` stays a thin shell + `#root`.
2. Confirm landmarks live under React, with a single `<main>` for primary content (as in `app.tsx`).
3. Reject `<div id="nav">` / `class="header"` / `id="footer"`-style stand-ins; use semantic elements from the table above.
4. Choose elements by role/meaning first; apply classes (e.g. `app-page`) for style second.
5. Cross-check with [react-typescript](../react-typescript/SKILL.md) and [sass](../sass/SKILL.md) when changing layout markup or styles.
