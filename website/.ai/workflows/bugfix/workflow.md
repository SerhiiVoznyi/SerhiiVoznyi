---
id: bugfix
name: Bugfix
version: 0.1.0
purpose: Reproduce, root-cause, verify, and fix a bug.
triggers:
  - Bug report (user, monitoring, teammate)
  - Regressed behavior not attributable to a recent feature PR
preconditions:
  - Enough information exists to attempt a reproduction
inputs:
  - name: report
    description: Bug description with environment and steps
outputs:
  - name: fix-pr
    description: PR with minimal fix and documented verification
skills:
  - debugging
  - testing
  - code-review
agents:
  - debugger
  - reviewer
related_rules:
  - rules/engineering.md
  - rules/testing.md
---

# Bugfix

## Summary

Standard path for fixing a reported bug. Evidence-driven. Verification is manual and via lint/type-check/build per [`rules/testing.md`](../../rules/testing.md).

## Preconditions

- Report has enough detail to attempt reproduction. If not, ask for more.

## Steps

1. **Reproduce** — Debugger produces minimal, deterministic repro. Skill: [debugging](../../skills/debugging/SKILL.md).
2. **File task** — create a task in `tasks/active/` from [`../../templates/task.template.md`](../../templates/task.template.md) with the repro.
3. **Hypothesize** — list 2-3 hypotheses, pick cheapest experiments to falsify.
4. **Confirm root cause** — evidence first, guesses never.
5. **Apply minimal fix** — at the root cause.
6. **Verify** — document steps; run lint and type-check; use manual checks for UI. Skill: [testing](../../skills/testing/SKILL.md) (verification policy).
7. **Review** — Reviewer applies [code-review](../../skills/code-review/SKILL.md).
8. **Merge + close** — move task to `tasks/done/`; log findings to `memory/learnings/` if non-obvious.

## Human gates

- Merge approval.

## Failure modes

- Cannot reproduce -> document missing info, pause.
- Fix requires architectural change -> switch to `feature-delivery` after an ADR.

## Definition of done

- [ ] Repro documented.
- [ ] Root cause named.
- [ ] Verification documented; lint/type-check pass.
- [ ] Fix merged.
- [ ] Task in `tasks/done/`.
