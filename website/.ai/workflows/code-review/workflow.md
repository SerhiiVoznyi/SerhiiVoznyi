---
id: code-review
name: Code review
version: 0.1.0
purpose: Review a PR against rules and acceptance criteria.
triggers:
  - A PR is opened or updated and marked ready for review
preconditions:
  - CI is passing or failing for documented reasons
  - The task file exists and is linked from the PR
inputs:
  - name: pr
    description: Pull request URL or diff
  - name: task
    description: Linked task file in .ai/tasks/
outputs:
  - name: review
    description: Findings with severity, plus final verdict
skills:
  - code-review
  - security
  - testing
agents:
  - reviewer
related_rules:
  - rules/code-style.md
  - rules/testing.md
  - rules/engineering.md
---

# Code review

## Summary

Standard review path. Structured findings. Consistent severity. Actionable feedback.

## Preconditions

- PR is linked to a task with acceptance criteria.
- CI result is visible.

## Steps

1. **Read the task** — understand the intended outcome and non-goals.
2. **Skim the diff** — shape and scope check.
3. **Deep read** — top-down, file by file. Skill: [code-review](../../skills/code-review/SKILL.md).
4. **Apply checklist** — [`../../checklists/pull-request.md`](../../checklists/pull-request.md).
5. **Security & verification** — Skills: [security](../../skills/security/SKILL.md), [testing](../../skills/testing/SKILL.md) (lint/type-check/manual per policy).
6. **Write findings** — each with severity, location, issue, expected, rule citation.
7. **Verdict** — approve or request-changes, with rationale.

## Human gates

- Final merge decision remains with the PR author and maintainer, not the reviewer alone.

## Failure modes

- Scope mismatch with task -> request re-plan, not rewrite.
- Missing verification for a risky change -> blocker (see [`rules/testing.md`](../../rules/testing.md)).
- Drive-by style comments covered by formatter -> remove; they are noise.

## Definition of done

- [ ] Every blocker cites a rule or criterion.
- [ ] Verification expectations and docs were checked, not only code.
- [ ] Verdict is explicit.
