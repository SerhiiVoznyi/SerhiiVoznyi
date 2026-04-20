---
id: pull-request
name: Pull request
applies_to: Every PR
owner: author (pre-open) and reviewer (during review)
---

# Pull request

> Run through this before opening a PR and again during review.

## Pre-flight (author)

- [ ] Linked to a task in `.ai/tasks/active/` or `.ai/tasks/done/`.
- [ ] Acceptance criteria from the task are satisfied and checked.
- [ ] Lint and type-check pass.
- [ ] Lint, type-check, and build succeed; manual checks done for UI or risky paths (per [`../rules/testing.md`](../rules/testing.md)).
- [ ] Docs updated in the same PR when behavior or public API changes.

## Execution (author and reviewer)

- [ ] Diff is focused — no unrelated refactors or formatting.
- [ ] Naming is clear; no abbreviations outside the allow-list.
- [ ] No `any`, no suppressions without a comment explaining why.
- [ ] Error paths handled, not swallowed.
- [ ] PR describes what was verified (commands run, manual steps for UI if applicable).
- [ ] Security items in [`../rules/security.md`](../rules/security.md) reviewed for changes crossing trust boundaries.
- [ ] No secrets in diff or logs.

## Sign-off

- [ ] PR description includes: context, change summary, test plan, risk, screenshots (for UI).
- [ ] CI is green.
- [ ] Reviewer verdict: approve or request-changes with rule-cited blockers.

## References

- [`../rules/engineering.md`](../rules/engineering.md)
- [`../rules/code-style.md`](../rules/code-style.md)
- [`../rules/testing.md`](../rules/testing.md)
- [`../rules/security.md`](../rules/security.md)
