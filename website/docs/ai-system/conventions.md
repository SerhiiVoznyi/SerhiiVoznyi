# Conventions

Authoring conventions for everything under [`.ai/`](../../.ai/README.md). Follow these so new artifacts compose with old ones.

## Naming

- **Folders and files:** lowercase kebab-case. Example: `incident-response/workflow.md`.
- **Canonical uppercase files:** keep uppercase where they are conventional: `README.md`, `SKILL.md`.
- **Task files:** `<slug>.md` matching the task's `id` field.
- **ADRs:** `NNNN-short-slug.md` with a zero-padded number.
- **Log/learning files:** `YYYY-MM-DD-short-slug.md`.

## File shape

- Every artifact has YAML frontmatter with at least: `id`, `name` (or `title`), `version` where applicable.
- Frontmatter is the machine-readable part. Body is for humans.
- Placeholders in templates use `<angle-brackets>`. Do not leave a placeholder unfilled in a real artifact.
- Date fields use ISO-8601 (`YYYY-MM-DD`).

## Structure

- Each top-level `.ai/` folder has a `README.md` that lists its contents.
- Leaf folders (`agents/<name>/`, `skills/<name>/`, `workflows/<name>/`) use their canonical file (`instructions.md`, `SKILL.md`, `workflow.md`) instead of a README.
- `_shared/` folders hold cross-artifact conventions that siblings inherit.

## Linking

- Prefer relative links within `.ai/`. Example: `[rule](../../rules/engineering.md)`.
- From `docs/` back into `.ai/`, use the relative path through the repo root (`../../.ai/...`).
- Never duplicate content. Link to the canonical source.

## Writing style

- Short paragraphs, active voice, concrete examples.
- No emojis unless the human requested them.
- Do not narrate the obvious (e.g., "This section is about X.").
- One idea per heading.

## Change hygiene

- Update docs in the same PR as the code they describe.
- Bump `version` in frontmatter when changing the contract of a skill/workflow/agent.
- Superseded ADRs are not deleted — mark `status: superseded` and link the replacement.
