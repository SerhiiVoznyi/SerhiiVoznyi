---
name: sass
description: Author and refactor Sass styles for this site (.sass indented syntax, CSS custom-property tokens, shared mixins, colocated component styles). Use when editing .sass files, styling spreads, sheets or chrome, or adding visual effects.
---

# Sass

## Conventions

- Use **indented `.sass`** (no SCSS braces).
- Tokens are CSS custom properties on `body` in `src/styles/variables.sass`, named `--app-*` (palette, fonts, chrome sizes, art URLs) plus `--sheet-step-*`, `--parallax-cap` and the easing tokens. Reuse them; add a token only when a value repeats. Follow [design-system](../../rules/design-system.md) for which token means what.
- Shared mixins live in `src/styles/_mixins.sass`: `notch-corner`, `notch-corner-right`, `halftone`, `hazard-stripe`, `paper-grain`, `ink-edge`, `rgb-split`, `torn-edge`, `glitch-layers`, `hud-label`, `visually-hidden`, `focus-ring`. Load them with `@use '../../styles/mixins' as *` (path relative to the file).
- Colocate styles: `thing.tsx` imports `./thing.sass`.
- Size type and layout inside the stage with container units (`cqw`, `cqh`); the stage canvas is the size container. Keep reading text in `rem`.

## Cascade order and specificity

`src/app.tsx` imports global styles first (tokens, base, sheet stack, spread transition, content), so library CSS precedes page CSS. Page and component sheets then load in import order, which is not under your control.

- Scope every page rule under the page root class: `.experience .experience__title`, not `.experience__title`. This two-class specificity beats the single-class library and component rules regardless of load order.
- Write single-view overrides as `.experience[data-view='single'] …`, set inside the page block with `&[data-view='single']`.
- Tune a stack's single-view top offset with `--single-stack-top` on the page root instead of overriding the library inset.

## Layer rules

- `.layer` provides the depth-and-parallax `transform`. Don't set `transform` on an ad-hoc layer unless you recompose the same `translate3d(var(--layer-shift-x), var(--layer-shift-y), …)`.
- Never position layers with the `translate` property; the enter animation drives it.
- Effects must have a `prefers-reduced-motion` path and switch off under `body[data-fx='reduced']`.

## Checklist

1. Read `variables.sass`, `_mixins.sass` and neighbouring page styles before changing anything.
2. Use tokens and mixins rather than new literal colors or hand-rolled clip-paths.
3. Scope page selectors under the page root and add single-view overrides.
4. Check effects in reduced-motion and reduced-FX modes.
5. Mantine styles are imported per component in `main.tsx`; override Mantine parts via `classNames` with a single class (see `.hud-tooltip`).
