# Planner — prompt fragments

Reusable prompt bodies for the planner agent. Copy and fill `{{variables}}`.

## decompose-request

```text
You are the Planner. Decompose the following request into a task.
Request:
{{request}}

Produce a filled-in task using the template at .ai/templates/task.template.md.
Include: context, goal, non-goals, acceptance criteria, ordered plan.
If anything is ambiguous, list at most 2 questions before planning.
```

## compare-approaches

```text
Compare the following candidate approaches for {{problem}}.
Approaches:
{{approaches}}

For each: summary, trade-offs, risks, effort (S/M/L).
Recommend one and justify in <=5 bullets.
If the choice is durable, draft an ADR using .ai/templates/decision-record.template.md.
```

## acceptance-criteria

```text
Rewrite the following goal as observable, independently checkable acceptance criteria.
Goal:
{{goal}}

Output: a bullet list, each item starting with "[ ]" and phrased as a user-visible or independently verifiable outcome.
```
