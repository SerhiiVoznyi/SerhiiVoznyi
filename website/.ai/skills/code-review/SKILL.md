---
id: code-review
name: Code review
version: 0.1.0
summary: Review a diff against rules and a task's acceptance criteria, producing actionable findings.
when_to_use:
  - A PR or diff is ready for review
  - Self-review before declaring a task done
inputs:
  - A diff or PR
  - The task file with acceptance criteria
outputs:
  - Findings with severity (blocker, should-fix, nit), each citing a location and rule
  - Final verdict: approve or request-changes
tools:
  - read
  - search
related_skills:
  - security
  - testing
  - architecture
related_rules:
  - rules/engineering.md
  - rules/code-style.md
  - rules/testing.md
---

# Code review

## Purpose

Raise the quality bar before code lands. Detect violations of rules, inadequate verification, unclear naming, and design risks with concrete, actionable feedback.

## When to use

- A diff or PR is open for review.
- Before declaring a task done (self-review).
- During pair work, when the agent wants a second opinion on a change.

## Procedure

1. Read the task file's acceptance criteria.
2. Read the diff in full. Do not rely on summaries.
3. Check against [`../../checklists/pull-request.md`](../../checklists/pull-request.md).
4. For each finding, record: severity, location (`file:line`), issue, expected outcome, rule citation.
5. Note good choices — not just problems.
6. Summarize: approve or request-changes, with rationale.

## Quality bar

- [ ] Every blocker cites a specific rule or acceptance criterion.
- [ ] Findings describe the expected outcome, not just the problem.
- [ ] Severity is assigned consistently: blocker | should-fix | nit.
- [ ] Verification expectations and docs were checked, not only code.

## Anti-patterns

- Rewriting the author's code in comments instead of describing the desired state.
- Bikeshedding style issues covered by the formatter.
- Marking preferences as blockers.
- Approving without checking verification notes for risky changes.

## References

- [`../../checklists/pull-request.md`](../../checklists/pull-request.md)
- [`../../rules/code-style.md`](../../rules/code-style.md)
