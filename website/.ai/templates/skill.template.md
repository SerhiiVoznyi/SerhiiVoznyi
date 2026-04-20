---
id: <skill-slug>
name: <human-readable name>
version: 0.1.0
summary: <one sentence describing the capability>
when_to_use:
  - <trigger situation>
inputs:
  - <what this skill expects>
outputs:
  - <what this skill produces>
tools:
  - <tool name or n/a>
related_skills:
  - <skill-slug>
related_rules:
  - <path under .ai/rules/>
---

# <human-readable name>

## Purpose

One paragraph describing the capability and its boundaries. Skills are verbs — a single, composable thing the agent knows how to do.

## When to use

Bullet list of trigger conditions.

## Procedure

Ordered, concrete steps. Keep it short; link out for depth.

1. ...
2. ...

## Quality bar

What "good" looks like. Checklist the agent verifies before declaring done.

- [ ] ...
- [ ] ...

## Anti-patterns

Things this skill explicitly does not do, or common mistakes to avoid.

## References

- <link to rule, doc, or external resource>
