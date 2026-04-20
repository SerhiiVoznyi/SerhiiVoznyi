# Stack

Languages, frameworks, tools, and their roles. Pinned versions live in `package.json` / lockfile; this page describes intent.

## Language

- **TypeScript** — strict mode, used for all application code.

## Framework

- **React** — functional components + hooks.

## Build & dev

- **Vite** — dev server (HMR) and production bundler.
- Entry: [`index.html`](../../index.html) -> [`src/main.tsx`](../../src/main.tsx).

## Quality

- **ESLint** — configured in [`.eslintrc.cjs`](../../.eslintrc.cjs).
- **Prettier** — configured in [`.prettierrc`](../../.prettierrc); the formatter — do not hand-format.
- **TypeScript compiler** — `tsc --noEmit` for type-checking.

## Package manager

- **npm** — lockfile committed (`package-lock.json`). Do not introduce a second package manager.

## Testing

- **None** — no automated unit or integration tests. Verification is lint, type-check, production build, and manual checks. Policy: [`.ai/rules/testing.md`](../rules/testing.md).

## Runtime targets

- Modern evergreen browsers. No IE support.
