---
id: spike
name: Spike
version: 0.1.0
purpose: Time-boxed learning to reduce uncertainty before committing to an approach.
triggers:
  - A planned task has unknowns that block planning
  - New technology or integration under evaluation
preconditions:
  - A specific question the spike will answer
  - A fixed time box
inputs:
  - name: question
    description: The uncertainty to resolve
  - name: time-box
    description: Hard limit on effort (e.g. 4h, 1d)
outputs:
  - name: findings
    description: A short write-up answering the question, with a recommendation
  - name: adr
    description: Optional ADR if the spike produces a durable decision
skills:
  - architecture
  - documentation
agents:
  - planner
related_rules:
  - rules/engineering.md
---

# Spike

## Summary

Short, disposable learning exercise. The deliverable is knowledge, not code shipped to users.

## Preconditions

- The question is sharp enough to be answerable.
- The time box is explicit and accepted.

## Steps

1. **State the question and box** — in a task file under `tasks/active/`.
2. **Explore** — code experiments, references, small prototypes. Keep them in a branch, not main.
3. **Stop at the box** — report whatever you have, even if incomplete.
4. **Write findings** — answer the question, list unknowns remaining. Skill: [documentation](../../skills/documentation/SKILL.md).
5. **Recommend** — one path forward, with rationale.
6. **Optional ADR** — if the decision is durable. Skill: [architecture](../../skills/architecture/SKILL.md).
7. **Delete or archive** — prototype code is not shipped unless a follow-up task promotes it.

## Human gates

- Approving the recommendation before opening the follow-up task.

## Failure modes

- Spike drifts into production code -> stop; convert to `feature-delivery`.
- Box exceeded without findings -> report anyway; extend explicitly only if justified.

## Definition of done

- [ ] Question answered or explicitly deferred with reasons.
- [ ] Recommendation written.
- [ ] Prototype archived or deleted.
- [ ] Task moved to `tasks/done/`.
