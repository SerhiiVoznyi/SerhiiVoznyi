---
name: sass
description: Author and refactor Sass styles for this site (.sass indented syntax, CSS custom properties, colocated component styles). Use when editing .sass/.scss files, styling UI, or adding visual polish.
---

# Sass

## Conventions

- Prefer **indented `.sass`** (not SCSS braces) to match `src/app.sass` and `src/styles/variables.sass`.
- Put shared tokens in `src/styles/variables.sass` as **CSS custom properties** on a stable root (e.g. `body`): `--app-*` naming.
- Colocate page/component styles next to the component (`app.tsx` ↔ `app.sass`). Import the `.sass` file from the component.
- Reuse existing tokens (`--app-color-main`, `--app-text-color-main`) before inventing new colors.
- Keep selectors flat and purposeful; avoid deep nesting and one-off utility classes unless they clarify layout.
- Do not fight global layout already defined on `#root`, `html`/`body`, and `.app-page`.

## Checklist

1. Read nearby `.sass` files and `variables.sass` before changing styles.
2. Add or extend tokens in `variables.sass` when a value will be reused.
3. Prefer flex/grid layout patterns already used in `app.sass`.
4. Verify styles still work with Mantine’s imported CSS (`@mantine/core/styles.css` in `app.tsx`).
