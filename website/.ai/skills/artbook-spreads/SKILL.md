---
name: artbook-spreads
description: Compose and modify spreads with the sheet-stack layer engine (SheetScene, SheetStack, Sheet, Plate, decals, display titles) and the page-turn transition. Use when adding or redesigning a spread, adding sheets, changing depth, parallax, promotion or scroll-depth behavior, or touching the reader chrome.
---

# Artbook spreads

Read [spread-architecture](../../rules/spread-architecture.md) and [design-system](../../rules/design-system.md) first; this skill is the how-to on top of those rules.

## Anatomy of a spread

```tsx
<SheetScene
  kind="split"
  className="experience"
  overlay={<BackToMap className="spread-back" />}>
  <SheetStackProvider initialOrder={['about', 'focus', 'stack']}>
    <Plate
      src="/assets/art/server-hall.webp"
      depth={2}
      region="right"
      glitch
      magnify
      caption="…"
    />
    <Decal
      src="/assets/art/decal-serpent.webp"
      className="experience__decal"
    />
    <div
      className="experience__title layer"
      style={{ '--layer-depth': 1 } as CSSVars}>
      <DisplayTitle
        lines={['Experience']}
        size="lg"
        spreadHeading
      />
    </div>
    <SheetStack
      label="Experience sheets"
      region="left">
      <Sheet
        id="about"
        index={1}
        title="About"
        teaser="…"
        edge="torn">
        …
      </Sheet>
      <Sheet
        id="focus"
        index={2}
        title="What I do"
        teaser="…">
        …
      </Sheet>
    </SheetStack>
  </SheetStackProvider>
</SheetScene>
```

- `kind` matches the registry entry: `map`, `art`, `paper` or `split`.
- `initialOrder` lists sheet ids front to back.
- `SheetStack` regions: `full`, `left`, `right`, `map`, or `full` plus a page class with a custom `inset`.
- `Plate` props: `depth` (positive is farther), `region` (`full` / `left` / `right` / `figure`), `tone` (`color` / `mono` / `dim`), `glitch` (RGB-split fringe), `magnify` (zoom affordance), `caption`, `focus` (crop).
- `Decal` defaults to depth `-1`, in front of the front sheet.

## Depth scale

| Depth | Typical layer                              |
| ----- | ------------------------------------------ |
| -1    | Decals, stickers                           |
| 0     | Front sheet (stacked sheets take 1, 2, 3…) |
| 1     | Display title block                        |
| 2     | Side art plate in split spreads            |
| 3     | Full-bleed background plate                |

Near layers drift with the pointer and far ones drift against it, so keep text on depth 0–1 and art on 2–3.

## Making layout respond to the stack

- Read `useSheetStack()` inside the provider to react to the front sheet: for example, the map highlights the marker whose chapter sheet is in front.
- Call `promote(id)` for hover or scroll-driven promotion, and `promote(id, { focus: true })` when the control that triggered it disappears (spines, filters).
- Content that should change with depth goes inside the `Sheet` children; stacked sheets only show the spine.

## Sizing checklist

- Check at 1280×720 (spread view), at a near-square window (forced single view), and at 360×740 (phone).
- Front sheet text must fit or scroll inside `.sheet__body`; do not let headers wrap. Hide `aside` readouts on phones.
- Overlay pills sit at the top-left of the stage; keep titles and captions clear of them in both view modes.

## Debugging tips

- Click not registering on a spine or marker? Check `document.elementFromPoint` at that spot: a `preserve-3d` container without `pointer-events: none` is the usual culprit.
- Layer jumps at the end of a page turn? A rule is setting `translate` or a fixed keyframe `opacity` on that layer.
- Turn timeline: sample `.spread-transition[data-phase]` per animation frame; expect `exiting` for about 280ms, then `entering` for about 420ms, then `idle`.
