# Overview

This repo includes a repo-local operating system for AI agents, rooted at [`.ai/`](../../.ai/README.md). It is designed so that an agent opening the repo can answer three questions quickly:

1. **What are the rules?** -> [`.ai/rules/`](../../.ai/rules/README.md)
2. **What can I do?** -> [`.ai/skills/`](../../.ai/skills/README.md) and [`.ai/workflows/`](../../.ai/workflows/README.md)
3. **What should I do right now?** -> [`.ai/tasks/active/`](../../.ai/tasks/README.md)

## Design goals

- **Repo-local.** Everything lives in-repo. No external services required.
- **Deterministic structure.** New artifacts are seeded from [`.ai/templates/`](../../.ai/templates/README.md) so shape stays uniform.
- **Human-readable.** Markdown + YAML frontmatter + small YAML configs. No binary blobs.
- **Composable.** Skills are small verbs; workflows sequence them; agents pick the right tool for the job.
- **Future-proof automation.** The structure is regular enough that scripts can operate on it without bespoke parsing.

## Mental model

```text
Rules + Context (the "law" and the "lay of the land")
      │
      ▼
Agents (who acts)  ──► Workflows (how they act)  ──► Skills (what they do)
                                                          │
                                                          ▼
                                                     Tasks (the work)
                                                          │
                                                          ▼
                                           Memory + Logs (what we learned)
```

## Non-goals

- A framework — there is no runtime. Files are the interface.
- Replacing the team's docs — AI-specific content lives under `.ai/`; broader docs stay in `docs/`.
- Dictating a specific AI model or tool; `agents/*/config.yaml` is intentionally agnostic.

## Where to start

- New contributor: read this file, then [`conventions.md`](conventions.md).
- Adding a skill: [`how-to-add-skill.md`](how-to-add-skill.md).
- Adding a workflow: [`how-to-add-workflow.md`](how-to-add-workflow.md).
- Adding an agent: [`how-to-add-agent.md`](how-to-add-agent.md).
