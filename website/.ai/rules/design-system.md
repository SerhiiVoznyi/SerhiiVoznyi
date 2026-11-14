# Design system

The site is a Cyberpunk 2077 artbook reader drawn as a comic: dark-first, hard-edged, inked paper over neon city art. New UI must read as part of that book, not as a generic web app.

## Visual language

- **Palette** — use tokens from `src/styles/variables.sass` only: void `--app-color-void`, signature yellow `--app-color-yellow`, HUD cyan `--app-color-cyan`, alert red `--app-color-red`, paper `--app-color-paper`, ink `--app-color-ink`. Give each hue one job: yellow for display type and primary emphasis, cyan for HUD chrome and focus, red for errors.
- **Type** — `--app-font-display` (Chakra Petch) for headings, labels and buttons, uppercase; `--app-font-mono` (Share Tech Mono) for HUD readouts and metadata via the `hud-label` mixin; `--app-font-body` (Source Sans 3) for reading text on sheets. Big spread titles use `DisplayTitle`, which applies the stencil cut.
- **Shapes** — hard corners only (`defaultRadius: 0`). Use `notch-corner` / `notch-corner-right` for chopped corners, `hazard-stripe` for rules, `ink-edge` or drop-shadow offsets for lifted sheets. No rounded cards or soft gradient "glass" surfaces.
- **Sheet treatments** — `paper` (bone stock, ink text), `ink` (dark HUD panel, cyan hairline), `yellow` (yellow stock, ink text). Edges: `clean`, `torn`, `notched`.
- **Art** — full-bleed plates sit at the back of a spread; text placed over art needs a dark backing panel (`rgba(10, 10, 11, 0.8)` plus a yellow edge rule) to keep contrast.
- **No light theme.** The aesthetic is dark by design; do not add a color-scheme toggle.
- **Labels** — navigation uses plain, self-explanatory names (Map, Profile, Experience, Journal, Contact, Signal Lost; sections are "chapters"). Thematic flavor lives in kickers and copy, never in the names people navigate by. URLs stay conventional (`/blog`).

## Effects and motion

- Every animation or transition must respect both `prefers-reduced-motion: reduce` and `body[data-fx='reduced']` (the power-button toggle). Glitch, grain, halftone and blur switch off under `data-fx='reduced'`; motion collapses under reduced motion.
- Effect layers (grain, scanlines, glitch copies, halftone, decals, hazard rules) are always `aria-hidden` and `pointer-events: none`.
- Glitch text goes through the `GlitchText` component / `glitch-layers` mixin, which keeps duplicated glyph layers silent for screen readers.
- Keep effects subtle: grain and halftone overlays stay at low opacity, so text on sheets must never lose legibility.
- Use `will-change` only while a transition is running, never permanently.

## Accessibility floor

- Yellow, cyan and paper-on-ink combinations are chosen for contrast; do not place yellow text directly on light or yellow art.
- Every icon-only control uses `HudButton` (accessible name + tooltip on hover and focus). Toggles use `pressed` with a constant label.
- Visible focus is the cyan outline from `base.sass`; do not remove it except on programmatically focused headings.
