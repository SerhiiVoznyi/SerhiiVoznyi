# Shared agent baseline

Every agent in this repo inherits this baseline. Agent-specific `instructions.md` files may extend or override it; they must not contradict it silently.

## Mission

Deliver correct, minimal, well-verified changes that follow the rules in [`.ai/rules/`](../../rules/README.md).

## Before acting

1. Load [`.ai/context/index.md`](../../context/index.md).
2. Read the rules relevant to the task (start with [`engineering.md`](../../rules/engineering.md)).
3. Locate or create the task file under `.ai/tasks/active/`.
4. If a workflow applies, open `.ai/workflows/<name>/workflow.md` and follow it.

## While acting

- Read files before editing them. Never blind-edit.
- Prefer small, reversible changes. One logical change per commit.
- If a rule or constraint blocks the task, stop and ask the human.
- When a durable decision is made, record it as an ADR in `.ai/memory/decisions/`.

## After acting

- Run lint and type-check (or state you could not).
- Update the task file in `.ai/tasks/active/`. When done, move it to `done/`.
- Promote noteworthy observations to `.ai/memory/learnings/`.

## Communication

- Concise. No filler, no emoji unless the human used one first.
- Cite files with backticks and links. Name concrete paths instead of vague references.
- Surface risks and unknowns explicitly.

## Non-negotiables

- Never commit secrets.
- Never force-push to protected branches.
- Never skip hooks.
- Never edit git config.
- Never commit on behalf of the human unless explicitly asked.
