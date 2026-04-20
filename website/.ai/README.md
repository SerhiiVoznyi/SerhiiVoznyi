# .ai — Repo-local AI operating system

This directory is the repo-local operating system for AI-assisted development. It is the single, authoritative place where agents look for rules, context, skills, workflows, tasks, and templates.

## Map

| Folder | What lives here | Entrypoint |
| --- | --- | --- |
| [`agents/`](agents/README.md) | Per-agent behavioral contracts (`planner`, `implementer`, `reviewer`, `debugger`) with shared baseline | `agents/<name>/instructions.md` |
| [`skills/`](skills/README.md) | Reusable capability modules (verbs: review, test, refactor, secure, ...) | `skills/<name>/SKILL.md` |
| [`workflows/`](workflows/README.md) | Multi-step orchestrations that compose skills with human gates | `workflows/<name>/workflow.md` |
| [`tasks/`](tasks/README.md) | Task lifecycle: `backlog/ -> active/ -> done/` | `tasks/templates/*.task.md` |
| [`templates/`](templates/README.md) | Canonical markdown templates for every artifact type | `templates/*.template.md` |
| [`memory/`](memory/README.md) | Long-lived project memory (ADRs, learnings) | `memory/decisions/`, `memory/learnings/` |
| [`context/`](context/README.md) | Curated, high-signal pointers agents read first | `context/index.md` |
| [`rules/`](rules/README.md) | Engineering conventions and policy the agent must follow | `rules/engineering.md` |
| [`logs/`](logs/README.md) | Append-only session/run logs for traceability | `logs/sessions/`, `logs/runs/` |
| [`checklists/`](checklists/README.md) | Runnable gates (pre-commit, PR, release, incident, DoD) | `checklists/*.md` |

Human-facing docs about this system live in [`../docs/ai-system/`](../docs/ai-system/README.md). Helper scripts live in [`../scripts/ai/`](../scripts/ai/README.md).

## How an agent should use this directory

1. Load `context/index.md` for high-signal project pointers.
2. Read relevant files in `rules/` — these are the law.
3. Load the agent profile from `agents/<role>/instructions.md` (inherits `agents/_shared/baseline.md`).
4. If a workflow applies, follow `workflows/<name>/workflow.md`; it will reference specific skills.
5. Individual capabilities come from `skills/<name>/SKILL.md`.
6. Work is tracked under `tasks/active/<task>.md` (spawned from `tasks/templates/`).
7. Durable decisions go to `memory/decisions/` as ADRs; observations go to `memory/learnings/`.

## Conventions

- Lowercase kebab-case for folders and files, except the canonical uppercase filenames (`README.md`, `SKILL.md`).
- Every top-level folder in `.ai/` contains a `README.md`. Leaf folders rely on their canonical file (`instructions.md`, `SKILL.md`, `workflow.md`) instead.
- Prefer markdown, yaml, and json. Keep each file small and single-purpose.
- New artifacts are seeded from `templates/` — do not hand-roll structure.

## Quickstart

- Create a task: `scripts/ai/new-task.ps1 -Type feature -Slug "my-task"` (or the `.sh` equivalent).
- Move a task: `scripts/ai/move-task.ps1 -Slug "my-task" -To active`.
- Validate layout: `scripts/ai/validate-structure.ps1`.
