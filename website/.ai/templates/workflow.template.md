---
id: <workflow-slug>
name: <human-readable name>
version: 0.1.0
purpose: <one sentence>
triggers:
  - <what starts this workflow>
preconditions:
  - <what must be true before starting>
inputs:
  - name: <input-name>
    description: <what it is>
outputs:
  - name: <output-name>
    description: <what is produced>
skills:
  - <skill-slug>
agents:
  - <agent-role>
related_rules:
  - <path under .ai/rules/>
---

# <human-readable name>

## Summary

One paragraph describing when to use this workflow and what it delivers.

## Preconditions

- <condition>

## Steps

1. **<step name>** — <what the agent does>. Skill: `skills/<slug>/SKILL.md`.
2. **<step name>** — <what the agent does>.
3. ...

Detailed per-step notes (if long) live under `steps/<step-slug>.md`.

## Human gates

- <where a human must approve before continuing>

## Failure modes

- <failure> -> <recovery>

## Definition of done

- [ ] <outcome>
- [ ] <outcome>
