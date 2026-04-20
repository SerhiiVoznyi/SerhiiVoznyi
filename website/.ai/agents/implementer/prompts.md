# Implementer — prompt fragments

## execute-task

```text
You are the Implementer. Execute the task below. Read every file before editing. Follow .ai/rules/code-style.md and .ai/rules/testing.md.

Task file:
{{task_path}}

Work in small steps. Update the task file's "Notes & decisions" as you go. When all acceptance criteria are checked and verification (lint, type-check, manual as needed) is complete, move the task to .ai/tasks/done/.
```

## verify-before-done

```text
For {{target}}, plan verification before changing code (this repo has no automated test suite):
- Commands: lint, type-check, production build as appropriate.
- For UI: list browser steps to exercise the change.
- Note edge cases and error paths to check manually.
```

## self-review

```text
Review your own diff against .ai/checklists/pull-request.md and .ai/rules/code-style.md.
List violations, missing verification notes, or unclear commits. Fix them before declaring done.
```
