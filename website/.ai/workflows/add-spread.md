# Add a spread

Use when adding a new top-level page to the artbook. Read the [`artbook-spreads`](../skills/artbook-spreads/SKILL.md) skill first.

1. **Pick the archetype.** `art` (full-bleed art plus a small stack), `split` (paper stack on the left, art on the right), `paper` (wide paper stack), or `map`. Pick a thematic label and a conventional URL.
2. **Register it.** Add a `SpreadMeta` entry to `SPREADS` in `src/content/spreads.ts` at the position it should take in the reading order. The website map draws `MAP_ROUTE` (`src/pages/map/map-nodes.ts`), one stop per spread in that order, so the new page appears on it automatically: each stop gets a seeded, deterministic spot in the open top-left of the plate (change `SHUFFLE` to reshuffle), and links to its reading-order neighbours are drawn only on hover or focus. If it is a chapter with its own briefing sheet, also add its id to `CHAPTERS` and give it a memory zone in `PLACES`. Posts need no map edit. Stop labels stay hidden until the stop is hovered, focused or its briefing sheet is in front.
3. **Create the page.** Add `src/pages/<name>/<name>.tsx` and `<name>.sass`, and export the page from `src/pages/index.ts` (keep the exports alphabetical).
4. **Compose layers.** Wrap the page in a `SheetScene` with `BackToMap` in `overlay`. Add a back plate, a title layer with one `DisplayTitle spreadHeading`, and a `SheetStack` of two to four `Sheet`s with short teasers. Use profile copy from `src/content/profile.ts` only.
5. **Route it.** Add a `<Route>` in `src/router.tsx`.
6. **Style it.** Scope every rule under the page root class, add `&[data-view='single']` overrides, and set `--single-stack-top`.
7. **Verify.** Run the [`verify-ui`](verify-ui.md) workflow, paying particular attention to the counter total, turn direction from both neighbours, and promotion of every sheet.
