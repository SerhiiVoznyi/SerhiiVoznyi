---
id: refactoring
name: Refactoring
version: 0.2.0
summary: Improve code structure without changing observable behavior, in small reversible steps.
when_to_use:
  - Code is about to change and current shape makes the change risky
  - Duplication has appeared for the second or third time
  - Structure obscures behavior and makes review harder
inputs:
  - Target code
  - Baseline behavior (manual checks or described scenarios)
outputs:
  - A sequence of small diffs, each verified with lint/type-check and targeted manual checks
tools:
  - read
  - search
  - edit
  - shell_read
related_skills:
  - testing
  - architecture
related_rules:
  - rules/engineering.md
  - rules/code-style.md
---

# Refactoring

## Purpose

Make future changes cheaper without changing behavior today.

## When to use

- Before adding a feature in a tangled area — refactor to make the feature easy to add.
- After the second duplication (not the first).
- When structure makes review or reasoning risky.

## Procedure

1. Note the behaviors or routes affected (no automated suite — rely on [`../../rules/testing.md`](../../rules/testing.md)).
2. Make one small, mechanical change. Run lint and type-check; manually spot-check the affected flows.
3. Commit (or stage). Repeat.
4. Separate refactor commits from feature commits.
5. If behavior must change, stop refactoring and start a new task.

## Quality bar

- [ ] Lint and type-check stay green at every step (or failures are explained).
- [ ] Observable behavior is unchanged (manual checks where applicable).
- [ ] No feature changes mixed into the refactor.
- [ ] Diff is reviewable — one small idea per commit.

## Anti-patterns

- Speculative abstraction for a single use site.
- Renaming across the codebase mixed with behavior changes.
- Large "big-bang" rewrites without incremental verification.

## References

- [`../../rules/engineering.md`](../../rules/engineering.md)
