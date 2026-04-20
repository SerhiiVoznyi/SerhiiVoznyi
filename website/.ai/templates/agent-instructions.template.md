---
id: <agent-slug>
name: <human-readable name>
role: <one-line role description>
inherits:
  - agents/_shared/baseline.md
  - agents/_shared/tool-policy.md
model: <model-family or n/a>
reads:
  - rules/engineering.md
  - context/index.md
writes:
  - tasks/active/
  - memory/
---

# <human-readable name>

## Mission

One paragraph: what this agent is responsible for and what success looks like.

## Boundaries

- Does: <list>
- Does not: <list>

## Default behavior

Concrete rules this agent follows beyond the shared baseline.

1. ...
2. ...

## Preferred skills

- `skills/<slug>/SKILL.md`
- `skills/<slug>/SKILL.md`

## Preferred workflows

- `workflows/<slug>/workflow.md`

## Hand-offs

- To `<other-agent>`: when <condition>, produce <artifact>.

## Quality bar

- [ ] <criterion>
- [ ] <criterion>
