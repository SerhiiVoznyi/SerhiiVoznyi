# agents

Per-agent behavioral contracts. Each agent is a folder containing:

- `instructions.md` — the behavioral contract (mission, boundaries, default behavior).
- `prompts.md` — reusable prompt fragments this agent uses.
- `config.yaml` — model, tools, defaults.

All agents inherit from [`_shared/`](_shared/). Shared files are canonical — do not duplicate their content in a specific agent's file; link or reference instead.

## Registered agents

| Agent | Role | Folder |
| --- | --- | --- |
| planner | Breaks work down, designs approaches, produces tasks | [`planner/`](planner/instructions.md) |
| implementer | Writes the code | [`implementer/`](implementer/instructions.md) |
| reviewer | Reviews diffs, enforces rules | [`reviewer/`](reviewer/instructions.md) |
| debugger | Isolates and fixes bugs | [`debugger/`](debugger/instructions.md) |

## Adding a new agent

1. Copy [`../templates/agent-instructions.template.md`](../templates/agent-instructions.template.md) to `agents/<slug>/instructions.md`.
2. Create `prompts.md` and `config.yaml` alongside it.
3. Register the agent in this README's table.
