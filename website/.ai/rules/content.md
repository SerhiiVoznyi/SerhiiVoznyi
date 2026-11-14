# Content and assets

## Copy

- Profile facts (name, role, location, experience, focus, stack, links) come only from `src/content/profile.ts`. Do not invent biography, employers, metrics or quotes; if copy needs a fact that is not there, ask.
- Blog posts are written in Serhii's voice and are his to approve. Agents may draft posts on request but must say they are drafts.

## Blog posts

- One file per post in `src/content/posts/`, kebab-case name, frontmatter with `title`, `date` (ISO), `summary`, `tags` (lowercase), optional `slug`, `cover`, `draft`.
- Start sections at `##`; the renderer shifts post headings below the sheet's `h2`.
- Post HTML is rendered without sanitizing because posts are first-party repository content. Never route user-supplied or remote markdown through `renderMarkdown`.
- Use `draft: true` for unfinished posts; drafts are hidden in production builds.

## Art

- Plates and textures go in `public/assets/art/` as WebP, roughly 1280px wide and about 200 KB or less. Decorative images use `alt=""` and `aria-hidden`.
- Reference artwork through `Plate src`, `Decal src`, or the `--app-art-*` CSS variables so it can be swapped without touching layout.
- `profile-figure.webp` is a placeholder illustration with a hidden face; replace it rather than generating a likeness of a real person.

## Audio

- Soundtrack files live in `public/assets/audio/` and are git-ignored on purpose: the current tracks are licensed game music. Never commit MP3s or remove that ignore rule.
- The playlist is `src/content/soundtrack.ts`. Missing files are detected at runtime, and the player starts muted and paused; keep both behaviors.
