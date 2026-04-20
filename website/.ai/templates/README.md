# templates

Canonical markdown templates for every artifact type in `.ai/`. These are the single source of truth — new artifacts must be seeded from here so structure stays deterministic.

## Available templates

| File | Used for | Destination |
| --- | --- | --- |
| [`task.template.md`](task.template.md) | Generic task | `.ai/tasks/backlog/` |
| [`workflow.template.md`](workflow.template.md) | New workflow | `.ai/workflows/<name>/workflow.md` |
| [`skill.template.md`](skill.template.md) | New skill | `.ai/skills/<name>/SKILL.md` |
| [`decision-record.template.md`](decision-record.template.md) | Architecture Decision Record | `.ai/memory/decisions/` |
| [`prompt.template.md`](prompt.template.md) | Reusable prompt fragment | `.ai/agents/<name>/prompts.md` |
| [`checklist.template.md`](checklist.template.md) | Gate/checklist | `.ai/checklists/` |
| [`agent-instructions.template.md`](agent-instructions.template.md) | New agent role | `.ai/agents/<name>/instructions.md` |

## Conventions

- All templates use YAML frontmatter for metadata and markdown body for content.
- Placeholder syntax: `<angle-brackets>` for required fields, `[square-brackets]` for optional hints.
- Date fields use ISO-8601 (`YYYY-MM-DD`).
- Never remove a heading from a template when copying — leave it empty or mark `n/a` so structure is uniform.
