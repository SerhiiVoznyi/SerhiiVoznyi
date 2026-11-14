# Spread architecture

Invariants of the reader, the sheet stack and the page turn. Breaking one of these usually fails silently (wrong click target, jumpy animation, stale counter), so treat them as hard rules.

## Registry and routing

- Every navigable spread has an entry in `SPREADS` in `src/content/spreads.ts`; that order defines the counter, prev/next, arrow keys, turn direction and the website map route. Posts are appended automatically from the posts service.
- The website map is exact: `MAP_ROUTE` is derived from `SPREADS`, one stop per spread. Connections appear only on hover or focus, between a stop and its reading-order neighbours. Never draw decorative stops or lines that are not pages.
- Routes live in `src/router.tsx` and render with the `location` passed in by `SpreadTransition`, never the live router location, so the outgoing spread can finish turning.
- Each route element is remounted per pathname by the transition; do not rely on page state surviving navigation.

## Layers and geometry

- A spread is `SheetScene` → optional `SheetStackProvider` → `Plate`s, ad-hoc `.layer` elements, and one `SheetStack` of `Sheet`s. Flat UI (such as `BackToMap`) goes in the scene's `overlay` prop.
- Geometry is derived in CSS from a single `--layer-depth` per layer. Never compute layer positions or depth styles in JavaScript.
- Promotion rotates the order (the old front sheet cycles to the back); do not reimplement it as a swap.
- Pointer parallax writes `--parallax-x` / `--parallax-y` on the scene root in `requestAnimationFrame`. Never put pointer position into React state.
- 3D containers (`.sheet-scene__rig`, `.sheet-stack`) have `pointer-events: none` because their plane sits in front of layers pushed back in Z; layers re-enable pointer events. Any new `preserve-3d` wrapper must follow the same rule or it will swallow clicks.
- `.layer` owns `transform`; the entering animation drives the individual `translate` property and `opacity`. Position layers with `top` / `left` / `inset` / `margin`, never with `translate`, and do not end keyframes on hard-coded opacity.
- Map markers and other elements that must stay pinned to artwork are children of that `Plate`, not separate layers.
- Plates carry no zoom or magnify buttons. Do not add a per-artwork zoom control to `Plate` or any page; reader zoom lives only in the reader chrome.

## Sheets

- A sheet's front state renders its full content; stacked sheets render only the spine button (index, title, teaser). Keep teasers short — they are vertical one-liners.
- Promotions that unmount the focused control must call `promote(id, { focus: true })` so focus moves to the new front heading. Hover and scroll promotions must not move focus.
- A stack needs room: each stacked sheet costs one `--sheet-peek` of width. With four or more sheets, reduce the peek for that region rather than shrinking the front sheet's text column.
- Scroll depth advances at most one sheet per wheel gesture, and only once the sheet's own scroll has hit its end.

## Headings and focus

- Each spread has exactly one `h1`, marked as the turn's focus target with `DisplayTitle spreadHeading` (or `tabIndex={-1}` plus `data-spread-heading`).
- Sheet titles are `h2`; markdown inside sheets starts at `h3` (the renderer shifts levels).

## View modes

- `spread` (2.4:1 stage) and `single` (one page) are both first-class. Single mode is forced below 900px wide or under a 5:4 aspect ratio. Every spread must have single-view overrides via `.page-root[data-view='single']` and the `--single-stack-top` variable.
