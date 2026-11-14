# Skills

Reusable capability modules for agents.

## Layout

```text
.ai/skills/
  example-skill/
    SKILL.md          # required entry point
    reference.md      # optional
```

Canonical skills live here (not under `.cursor/skills/`). Seed new skills from [`.ai/templates/skill.md`](../templates/skill.md). Use kebab-case folder names.

## Available skills

| Skill                                           | When to use                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`artbook-spreads`](artbook-spreads/SKILL.md)   | Composing spreads, sheets, plates and depth; promotion, parallax, page turn, reader chrome |
| [`sass`](sass/SKILL.md)                         | `.sass` styles, tokens, mixins, cascade scoping, effects                                   |
| [`react-typescript`](react-typescript/SKILL.md) | React/TS components, hooks, routing, contexts, Mantine                                     |
| [`html-semantic`](html-semantic/SKILL.md)       | Semantic HTML, landmarks, headings, sheets as sections, `index.html`                       |
