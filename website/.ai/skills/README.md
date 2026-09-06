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

| Skill | When to use |
|-------|-------------|
| [`sass`](sass/SKILL.md) | `.sass` styles, tokens, visual layout |
| [`react-typescript`](react-typescript/SKILL.md) | React/TS components, routing, Mantine |
| [`html-semantic`](html-semantic/SKILL.md) | Semantic HTML, landmarks, `index.html` + `app.tsx` layout |
