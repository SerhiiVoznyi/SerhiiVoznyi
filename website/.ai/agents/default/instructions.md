# Default coding agent

Start from [shared baseline](../shared/baseline.md).

- Apply all rules under [`.ai/rules/`](../../rules/): [engineering](../../rules/engineering.md), [design-system](../../rules/design-system.md), [spread-architecture](../../rules/spread-architecture.md), [content](../../rules/content.md).
- Implement the user's request with minimal, reviewable diffs.
- Use skills under [`.ai/skills/`](../../skills/) when they match the task: [`artbook-spreads`](../../skills/artbook-spreads/SKILL.md) for anything inside a spread or the reader chrome, plus [`sass`](../../skills/sass/SKILL.md), [`react-typescript`](../../skills/react-typescript/SKILL.md) and [`html-semantic`](../../skills/html-semantic/SKILL.md).
- Use workflows under [`.ai/workflows/`](../../workflows/) for recurring tasks: [`add-spread`](../../workflows/add-spread.md), [`publish-post`](../../workflows/publish-post.md), and [`verify-ui`](../../workflows/verify-ui.md) before handing off any visual change.
- New UI must fit the artbook visual language. If a request would break it (for example a light theme or rounded cards), say so and confirm before building it.
