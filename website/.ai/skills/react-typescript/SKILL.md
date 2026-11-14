---
name: react-typescript
description: Build and edit React 19 + TypeScript UI in this Vite app (components, hooks, routing, Mantine, reader and sheet-stack contexts). Use when working on .tsx/.ts under src/, adding pages or components, or wiring routing, state or Mantine.
---

# React with TypeScript

## Conventions

- **Kebab-case** file names; PascalCase component identifiers; named exports everywhere except the default-exported app root in `app.tsx`.
- Function components only. Type props explicitly; no `any`.
- Providers live in `src/app.tsx` (`MantineProvider` → `BrowserRouter` → `ReaderProvider` → `AudioProvider` → `ReaderShell`).
- Routes live in `src/router.tsx` as `AppRouter({ location })`. `ReaderShell` receives it as `renderSpread`, and `SpreadTransition` decides which location is rendered. Do not add a second router or read `useLocation()` to decide what a page shows outside the routed tree.
- Reach reader-wide state through hooks: `useReader()` (view mode, zoom, FX), `useSpreadNavigation()` (index, prev/next, map), `useSoundtrack()`, `useSheetStack()` / `useSheetState(id)`.
- Use Mantine for accessible primitives (`Tooltip`, `VisuallyHidden`) and `@mantine/hooks` (`useLocalStorage`, `useMediaQuery`, `useReducedMotion`, `useHotkeys`) before writing your own. Register any new Mantine component's CSS in `main.tsx`.
- CSS custom properties in `style` props use the `CSSVars` type from `@/lib/cx`; class lists use `cx(...)`.
- Colocate `.sass` imports; follow the [sass](../sass/SKILL.md) skill.
- Build markup semantically; follow [html-semantic](../html-semantic/SKILL.md).

## Hooks rules that bite here

- `react-hooks` v7 rejects synchronous `setState` in an effect body. Use the "adjust state during render" pattern (see `use-spread-transition.ts`) or set state from timers, promises and event callbacks.
- Do not read `ref.current` during render; read it in effects and handlers.
- High-frequency input (pointer, wheel, drag) writes CSS variables on a DOM node inside `requestAnimationFrame` or the handler, never React state.

## Structure

- New context: `name-context.ts` (context + types), `name-provider.tsx` (provider), `use-name.ts` (hook), re-exported from the folder's `index.ts`.
- Barrels (`components/index.ts`, `pages/index.ts`, `lib/*/index.ts`) list `export *` lines alphabetically (`simple-import-sort/exports`).
- Never export the reader shell from the `components` barrel (import cycle through the router).

## Checklist

1. Read `app.tsx`, `router.tsx`, the target page, and [spread-architecture](../../rules/spread-architecture.md) before changing structure.
2. Add routes in `router.tsx` and register navigable spreads in `src/content/spreads.ts`.
3. Run `npm run lint` (zero warnings) and `npm run build`.
