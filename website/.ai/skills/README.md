# skills

Reusable, self-contained capability modules. Skills are verbs — one focused thing the agent knows how to do. Each skill lives in its own folder with a single canonical `SKILL.md`.

## Registered skills

| Skill | Summary |
| --- | --- |
| [code-review](code-review/SKILL.md) | Review a diff against rules and a task's acceptance criteria |
| [architecture](architecture/SKILL.md) | Shape system boundaries and component contracts |
| [debugging](debugging/SKILL.md) | Isolate root cause with evidence and a reproduction |
| [testing](testing/SKILL.md) | Verify changes (lint, build, manual) without an automated test suite |
| [documentation](documentation/SKILL.md) | Produce small, high-signal docs co-located with code |
| [refactoring](refactoring/SKILL.md) | Improve structure without changing behavior |
| [security](security/SKILL.md) | Apply baseline security checks to code and dependencies |
| [performance](performance/SKILL.md) | Measure, then optimize the bottleneck |
| [devops](devops/SKILL.md) | CI, build, deploy, and environment concerns |

See [`_shared/`](_shared/) for cross-skill conventions and glossary.

## Adding a skill

1. Copy [`../templates/skill.template.md`](../templates/skill.template.md) to `skills/<slug>/SKILL.md`.
2. Keep the skill single-purpose. If it needs sub-capabilities, prefer splitting.
3. Register the skill in the table above.
