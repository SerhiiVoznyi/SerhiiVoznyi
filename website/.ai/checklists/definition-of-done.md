---
id: definition-of-done
name: Definition of Done
applies_to: Every task, any type
owner: task owner
---

# Definition of Done

> Baseline DoD. Workflows may add stricter criteria; none may remove these.

## Execution

- [ ] Acceptance criteria in the task file are all checked.
- [ ] Relevant rules in `.ai/rules/` followed (no silent violations).
- [ ] Tests added or updated; full suite passes.
- [ ] Lint and type-check pass.
- [ ] Docs updated where behavior or public API changed.
- [ ] No secrets or debug output left behind.

## Sign-off

- [ ] Task file has a final `Notes & decisions` entry summarizing the outcome.
- [ ] Durable decisions captured as ADRs in `.ai/memory/decisions/`.
- [ ] Notable learnings promoted to `.ai/memory/learnings/`.
- [ ] Task file moved to `.ai/tasks/done/`.

## References

- [`../rules/engineering.md`](../rules/engineering.md)
- [`pull-request.md`](pull-request.md)
