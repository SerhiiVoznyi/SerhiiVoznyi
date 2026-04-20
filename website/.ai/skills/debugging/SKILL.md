---
id: debugging
name: Debugging
version: 0.2.0
summary: Isolate root cause with evidence, produce a reproduction, and verify fixes without relying on an automated test suite.
when_to_use:
  - A bug is reported or suspected
  - Flaky or inconsistent behavior in dev or production
  - Behavior diverges from the task's plan
inputs:
  - Bug report
  - Relevant logs, stack traces, recent diffs
outputs:
  - Minimal deterministic reproduction
  - Named root cause
  - Documented verification (lint, manual steps)
  - Minimal fix
tools:
  - read
  - search
  - shell_read
  - shell_write
related_skills:
  - testing
  - performance
related_rules:
  - rules/engineering.md
  - rules/testing.md
---

# Debugging

## Purpose

Find root cause using evidence, not guesses. Prevent recurrence by documenting repro and verification per [`../../rules/testing.md`](../../rules/testing.md).

## When to use

- Any reported bug before attempting a fix.
- Intermittent behavior (treat flakiness as a signal to narrow repro).
- Performance regression or unexpected output.

## Procedure

1. Reproduce deterministically. If you cannot reproduce, stop and document the missing information.
2. Capture the minimal steps, environment, expected vs actual.
3. State 2-3 hypotheses ranked by likelihood. Pick the cheapest experiment to falsify each.
4. Bisect when history matters (`git bisect` or equivalent).
5. Confirm the root cause with evidence. Do not guess.
6. Implement the smallest fix at the root cause.
7. Verify: lint, type-check, build as appropriate; manual steps for UI or integrations.
8. Log the session under [`../../logs/sessions/`](../../logs/sessions/).

## Quality bar

- [ ] Reproduction is documented and minimal.
- [ ] Root cause is named, not speculated.
- [ ] Verification is documented (commands + manual checks).
- [ ] Fix is scoped to the cause, not the symptom.

## Anti-patterns

- Patching the symptom (e.g. swallowing an error) without understanding cause.
- Changing multiple things at once, obscuring which change resolved the bug.
- Skipping the reproduction step.

## References

- [`../../rules/testing.md`](../../rules/testing.md)
- [`../../workflows/bugfix/workflow.md`](../../workflows/bugfix/workflow.md)
