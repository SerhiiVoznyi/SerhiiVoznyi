# AGENTS.md

Entry point for AI coding agents. Substantive guidance lives under [`.ai/`](.ai/README.md) — this file is a map, not policy. Do not duplicate `.ai/` content here.

This repo is Serhii Voznyi's personal site: a Cyberpunk 2077 comic-style artbook reader where every route is a stack of layered paper sheets that page-turn between spreads.

## Perspective

Handle every prompt, command and request as a **Principal Software Engineer with AI and UX/UI expertise**. This applies to every agent role; what it means in practice is defined in [`.ai/agents/shared/baseline.md`](.ai/agents/shared/baseline.md#role-and-perspective).

## Start here

Read in this order before substantive work:

1. [`.ai/context/index.md`](.ai/context/index.md) — what the site is, stack, key paths, scripts
2. [`.ai/agents/shared/baseline.md`](.ai/agents/shared/baseline.md) — behavior every agent shares
3. [`.ai/agents/default/instructions.md`](.ai/agents/default/instructions.md) — default coding role (use another `.ai/agents/<role>/instructions.md` when assigned)

## Map

| Need                                                                    | Go to                                                                  |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Engineering conventions                                                 | [`.ai/rules/engineering.md`](.ai/rules/engineering.md)                 |
| Visual language, tokens, effects                                        | [`.ai/rules/design-system.md`](.ai/rules/design-system.md)             |
| Reader, sheet stack and page-turn invariants                            | [`.ai/rules/spread-architecture.md`](.ai/rules/spread-architecture.md) |
| Posts, copy, art and audio assets                                       | [`.ai/rules/content.md`](.ai/rules/content.md)                         |
| Agent roles                                                             | [`.ai/agents/`](.ai/agents/)                                           |
| Skills (`artbook-spreads`, `sass`, `react-typescript`, `html-semantic`) | [`.ai/skills/`](.ai/skills/README.md)                                  |
| Playbooks (`add-spread`, `publish-post`, `verify-ui`)                   | [`.ai/workflows/`](.ai/workflows/README.md)                            |
| New skills, agents, rules                                               | [`.ai/templates/`](.ai/templates/)                                     |

## Precedence

- Explicit user instructions win, then `.ai/rules/` and the active role's `instructions.md`.
- [`.cursor/rules/`](.cursor/rules/ai-os-pointer.mdc) stays a thin Cursor pointer into `.ai/`; do not grow it into a parallel rule set.
- To change agent behavior, edit `.ai/` — not this file.
