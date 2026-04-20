# Engineering rules

Baseline engineering principles that apply to all code in this repo.

## Principles

- **Small, reversible changes.** Prefer many small PRs over one large one.
- **Read before writing.** Use `Read`/`Grep` to understand code before editing. Never edit a file you have not read.
- **No speculative abstraction.** Build the simplest thing that satisfies today's requirement. Abstract on the second duplication, not the first.
- **Deterministic structure.** When adding artifacts under `.ai/`, copy from `.ai/templates/` rather than hand-rolling.
- **Follow the type system.** Do not weaken types (`any`, untyped casts) to silence errors. Fix the root cause.
- **Explicit over implicit.** Named parameters, explicit returns, documented side effects.

## Workflow expectations

- Run lint/type-check locally (or state clearly that you could not) before declaring a task done.
- Every substantive change is verified per [`testing.md`](testing.md) (lint, type-check, build, manual checks as appropriate); there is no automated test suite.
- Long-lived decisions get an ADR under `.ai/memory/decisions/`.

## Forbidden without explicit approval

- Editing git config.
- Force-pushing to `main`/`master`.
- Committing secrets or `.env` files.
- Skipping git hooks (`--no-verify`).
- Bulk formatting changes mixed into feature PRs.

## Escalation

If a rule blocks the task, stop and ask the human. Do not silently violate.
