---
id: <prompt-slug>
name: <human-readable name>
intent: <what this prompt accomplishes>
inputs:
  - name: <variable-name>
    description: <what it is>
outputs: <what the agent returns>
related_skills:
  - <skill-slug>
---

# <human-readable name>

## System

<system-level instructions, persona, constraints>

## Variables

- `{{variable-name}}` — <description>

## Template

```text
<the actual prompt body, with {{variables}} inlined>
```

## Example

```text
<filled-in example>
```

## Notes

When to prefer this prompt over alternatives. Known failure modes.
