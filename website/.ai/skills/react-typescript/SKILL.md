---
name: react-typescript
description: Build and edit React 19 + TypeScript UI in this Vite app (components, hooks, routing, Mantine). Use when working on .tsx/.ts under src/, adding pages/components, or wiring React Router or Mantine.
---

# React with TypeScript

## Conventions

- **Kebab-case** file names (`app.tsx`, `router.tsx`); export components with PascalCase identifiers.
- Prefer **function components** and named exports for routers/sections; default-export the app root when matching `app.tsx`.
- Use **React Router** (`BrowserRouter` in `app.tsx`, routes in `router.tsx`) for navigation — do not add a second router library.
- Use **Mantine** (`MantineProvider`, `@mantine/core` / `@mantine/hooks`) for UI primitives before custom one-offs.
- Keep TypeScript strict and explicit for props; avoid `any`.
- Colocate styles via `.sass` imports; follow the [sass](../sass/SKILL.md) skill for styling.
- Build markup **semantically**; follow the [html-semantic](../html-semantic/SKILL.md) skill for `index.html` and landmarks in `app.tsx`.
- Match existing import style and ESLint rules (including import sorting).

## Checklist

1. Read `src/app.tsx`, `src/router.tsx`, and nearby components before changing structure.
2. Add routes in `router.tsx`; keep providers in `app.tsx`.
3. Prefer Mantine props/theme over duplicating layout CSS unless the design needs custom Sass.
4. Run `npm run lint` mentally against new files (unused vars, hooks rules, import order).
