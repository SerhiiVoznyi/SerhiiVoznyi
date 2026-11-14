# Engineering conventions

- Prefer TypeScript; match existing `src/` patterns and naming (kebab-case for files and folders, PascalCase component identifiers).
- Follow the repo ESLint and Prettier configs; do not fight the linter. `npm run lint` must pass with zero warnings.
- Keep changes small and focused; avoid drive-by refactors unrelated to the task.
- Colocate styles with components (`thing.tsx` ↔ `thing.sass`) and import the `.sass` from the component.
- Prefer libraries already in `package.json` (Mantine, React Router, `marked`) over new dependencies. Motion stays dependency-free: CSS keyframes and transitions plus `src/lib/spread-transition/`.
- Import across top-level folders with the `@/` alias (`@/components`, `@/lib/reader`); use relative paths inside a folder.
- Layering: `lib/` holds engines and state with no knowledge of pages; `components/` is shared UI; `pages/` composes both. Lower layers never import upward.
- Do not export `ReaderShell` from the `components` barrel — pages import the barrel, and the shell renders the router, so that would create an import cycle.
- Context modules are split so React Fast Refresh stays happy: `*-context.ts` (context object and types), `*-provider.tsx` (component), `use-*.ts` (hook).
- Satisfy `eslint-plugin-react-hooks` v7: no synchronous `setState` in effect bodies (derive during render, or set from timers or event callbacks), and no reading `ref.current` during render.
- When using a new Mantine component, add its stylesheet to the per-component imports in `src/main.tsx` (for example `@mantine/core/styles/Modal.css`). Do not import the full `styles.css`.

## Examples

```ts
// Prefer
import { DisplayTitle } from '@/components'
import { useReader } from '@/lib/reader'

// Avoid
import { DisplayTitle } from '../../components/display-title/display-title'
import '@mantine/core/styles.css'
```
