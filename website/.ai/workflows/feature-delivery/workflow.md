---
id: feature-delivery
name: Feature delivery
version: 0.1.0
purpose: Ship a new user-visible feature end-to-end.
triggers:
  - A product request describing a new capability
preconditions:
  - The request has a clear outcome
  - Any constraints (deadline, dependencies) are known
inputs:
  - name: request
    description: Description of the feature and its desired outcome
outputs:
  - name: merged-pr
    description: Code + docs delivering the feature, verified per testing rules
  - name: task-file
    description: Task file moved to tasks/done/
skills:
  - architecture
  - testing
  - documentation
  - code-review
agents:
  - planner
  - implementer
  - reviewer
related_rules:
  - rules/engineering.md
  - rules/testing.md
  - rules/code-style.md
---

# Feature delivery

## Summary

Default workflow for building a new feature. Goes from ambiguous request to merged PR.

## Preconditions

- Request has a clear outcome.
- No blocking unknown — if there is, run the `spike` workflow first.

## Steps

1. **Plan** — Planner produces a task in `tasks/backlog/` using [`../../templates/task.template.md`](../../templates/task.template.md). Skill: [architecture](../../skills/architecture/SKILL.md).
2. **Gate: human approval of plan** — human confirms scope and non-goals.
3. **Activate** — move the task to `tasks/active/`.
4. **Implement** — Implementer executes the plan. Verifies per [`rules/testing.md`](../../rules/testing.md). Skills: [testing](../../skills/testing/SKILL.md), [documentation](../../skills/documentation/SKILL.md).
5. **Self-review** — Implementer checks against [`../../checklists/pull-request.md`](../../checklists/pull-request.md).
6. **Open PR** — with the task link in the description.
7. **Review** — Reviewer performs [code-review](../../skills/code-review/SKILL.md).
8. **Gate: CI green + reviewer approve** (when CI exists).
9. **Merge** — squash or rebase per [`../../rules/git.md`](../../rules/git.md).
10. **Close out** — move task to `tasks/done/`; promote learnings to `memory/learnings/`.

## Human gates

- Plan approval (after step 1).
- Merge approval (after step 8).

## Failure modes

- Scope creep mid-implementation -> stop, update plan, re-approve.
- CI failure -> fix forward; do not disable failing checks.
- Unknown surfaces post-plan -> branch to `spike` workflow.

## Definition of done

- [ ] Acceptance criteria satisfied.
- [ ] Verification complete per [`rules/testing.md`](../../rules/testing.md).
- [ ] Docs updated.
- [ ] PR merged.
- [ ] Task file in `tasks/done/`.
