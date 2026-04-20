# How to add an agent

An agent is a behavioral profile — a role with a mission, boundaries, preferred skills, and a tool policy. Add a new agent only when an existing one does not fit; otherwise extend behavior on the existing agent.

## Steps

1. **Pick a slug.** Lowercase kebab-case, single role noun: `release-manager`, `data-analyst`.
2. **Create the folder.** `.ai/agents/<slug>/`.
3. **Copy the instructions template.** Use [`../../.ai/templates/agent-instructions.template.md`](../../.ai/templates/agent-instructions.template.md); save as `.ai/agents/<slug>/instructions.md`.
4. **Create `prompts.md`.** Start with two or three prompt fragments this role will reuse.
5. **Create `config.yaml`.** Declare `id`, `name`, `version`, `model` (or `n/a`), `tools.allow`/`tools.deny`, `defaults`, `inherits`.
6. **Always inherit `_shared/`.** Do not duplicate baseline behavior or tool policy; extend it.
7. **Register it.** Add a row to the table in [`../../.ai/agents/README.md`](../../.ai/agents/README.md).

## Sanity checks

- [ ] Mission is one paragraph; boundaries list what the agent does and does not do.
- [ ] Preferred skills and workflows are listed.
- [ ] Hand-offs to other agents are explicit.
- [ ] `tools.deny` covers destructive ops that do not belong to this role.

## Anti-patterns

- Creating agents for capabilities rather than roles (capabilities are skills).
- Overriding baseline rules silently instead of linking and extending.
- A role that is never actually routed to in any workflow.
