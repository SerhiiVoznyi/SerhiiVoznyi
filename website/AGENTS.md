# AGENTS.md

Entry point for AI coding agents. Substantive guidance lives under [`.ai/`](.ai/README.md) — this file is a map, not policy. Do not duplicate `.ai/` content here.

## Start here

Read in this order before substantive work:

1. [`.ai/context/index.md`](.ai/context/index.md) — stack, key paths, scripts
2. [`.ai/agents/shared/baseline.md`](.ai/agents/shared/baseline.md) — behavior every agent shares
3. [`.ai/agents/default/instructions.md`](.ai/agents/default/instructions.md) — default coding role (use another `.ai/agents/<role>/instructions.md` when assigned)

## Map

| Need                                                 | Go to                                       |
| ---------------------------------------------------- | ------------------------------------------- |
| Engineering conventions                              | [`.ai/rules/`](.ai/rules/engineering.md)    |
| Agent roles                                          | [`.ai/agents/`](.ai/agents/)                |
| Skills (`sass`, `react-typescript`, `html-semantic`) | [`.ai/skills/`](.ai/skills/README.md)       |
| Multi-step playbooks                                 | [`.ai/workflows/`](.ai/workflows/README.md) |
| New skills, agents, rules                            | [`.ai/templates/`](.ai/templates/)          |

## Precedence

- Explicit user instructions win, then `.ai/rules/` and the active role's `instructions.md`.
- [`.cursor/rules/`](.cursor/rules/ai-os-pointer.mdc) stays a thin Cursor pointer into `.ai/`; do not grow it into a parallel rule set.
- To change agent behavior, edit `.ai/` — not this file.
