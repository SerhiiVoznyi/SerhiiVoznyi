# tasks

Task lifecycle. Units of work flow `backlog/ -> active/ -> done/`. Each task is a single markdown file seeded from a template.

## Lifecycle

```text
templates/*.task.md --> backlog/<slug>.md --> active/<slug>.md --> done/<slug>.md
```

- **backlog/** — defined but not yet started.
- **active/** — currently being worked on. Keep this folder small (WIP limit is a human choice).
- **done/** — finished. Do not delete; history is signal for `memory/learnings/`.
- **templates/** — starting points for new tasks by type.

## Naming

- Filename: kebab-case slug matching the `id` field, with `.md` extension.
- Example: `add-dark-mode-toggle.md`.

## Creating a task

Preferred: use `scripts/ai/new-task` which stamps the current date and drops the file in `backlog/`.

Manual:

1. Copy the appropriate template from `templates/`.
2. Fill the frontmatter (`id`, `title`, `type`, `created`).
3. Place in `backlog/`.

## Moving a task

Use `scripts/ai/move-task` or move the file by hand. Always update the `status` and `updated` fields in the frontmatter when moving.
