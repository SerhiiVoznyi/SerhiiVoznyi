# rules

Engineering conventions and policy. These are the "law" agents must follow. Rules are short, prescriptive, and organized by topic so agents can load only what is relevant.

## Topics

- [`engineering.md`](engineering.md) — baseline engineering principles
- [`code-style.md`](code-style.md) — formatting, naming, and language-specific style
- [`testing.md`](testing.md) — verification without an automated test suite
- [`security.md`](security.md) — handling secrets, inputs, dependencies
- [`git.md`](git.md) — branching, commits, PRs
- [`documentation.md`](documentation.md) — what must be documented and where

## How agents read rules

1. Always read `engineering.md` before substantive changes.
2. Read topic files relevant to the task (e.g. `testing.md` before finishing work that needs verification).
3. If a rule conflicts with a task, stop and surface the conflict instead of silently violating the rule.
