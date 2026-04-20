# Code style

Project-wide formatting and naming rules. Tool config (ESLint, Prettier, tsconfig) is the machine-readable source of truth; this file captures intent and anything not expressible in a config.

## Formatting

- Prettier is the formatter. Do not hand-format.
- Trailing newline at end of every file.
- No trailing whitespace.

## Naming

- **Files & folders:** kebab-case for source (`user-card.tsx`), except canonical uppercase files (`README.md`, `SKILL.md`).
- **React components:** PascalCase identifiers, kebab-case filenames (`UserCard` inside `user-card.tsx`).
- **Variables/functions:** camelCase. Avoid abbreviations unless standard (`id`, `url`, `api`).
- **Constants:** SCREAMING_SNAKE_CASE only for true module-level constants.
- **Types & interfaces:** PascalCase. No `I` prefix on interfaces.

## TypeScript

- `strict` mode on. No `any` without a comment explaining why.
- Prefer `type` for unions/aliases, `interface` for object shapes that may be extended.
- No implicit `any` returns — annotate exported functions.
- Avoid non-null assertions (`!`) unless the invariant is obvious and commented.

## React

- Functional components only. Hooks for state/effects.
- Co-locate component and styles in the same folder.
- Prop types are explicit interfaces; no inline anonymous prop types on exported components.

## Imports

- Absolute imports (alias) for cross-area references; relative for within-folder.
- Order: node builtins, external, internal alias, relative. One blank line between groups.

## Comments

- Explain why, not what. Do not narrate code.
- No commented-out code in commits.
- TODO comments include an owner and link: `// TODO(name): <link>`.
