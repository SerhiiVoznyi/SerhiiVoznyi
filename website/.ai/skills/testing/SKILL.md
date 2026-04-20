---
id: testing
name: Testing
version: 0.2.0
summary: Verify changes without an automated test suite — lint, type-check, build, and manual checks.
when_to_use:
  - Before declaring a task or PR done
  - After a bug fix or UI change
  - When reviewing whether a change was adequately checked
inputs:
  - The change surface (UI, API client, routing, etc.)
  - rules/testing.md
outputs:
  - A short verification record (commands run, manual steps)
tools:
  - read
  - search
  - edit
  - shell_read
related_skills:
  - debugging
related_rules:
  - rules/testing.md
---

# Testing (verification)

## Purpose

This repo has **no** automated unit or integration tests. This skill is about **verification**: static checks, build, and manual exercise of behavior.

## When to use

- Before marking work complete or opening a PR.
- After fixing a bug (document repro and how you confirmed the fix).
- When implementing anything user-visible (list browser steps you performed).

## Procedure

1. Run **lint** and **type-check** (see [`../../context/stack.md`](../../context/stack.md) for commands).
2. Run a **production build** when the change touches bundling, env, or types that `tsc` alone might miss.
3. For **UI**, walk the affected routes or components in the dev server; note edge cases (empty state, errors).
4. Record what you ran and what you checked in the task file or PR.

## Quality bar

- [ ] Lint and type-check succeed (or failures are explained and tracked).
- [ ] Manual steps for UI or risky flows are stated, not assumed.
- [ ] No reliance on a non-existent `npm test`.

## Anti-patterns

- Declaring done without any verification record.
- Skipping manual checks for visible regressions because there is no test suite.

## References

- [`../../rules/testing.md`](../../rules/testing.md)
