# How to add a skill

A skill is a single, reusable capability — a verb the agent knows how to do. Keep skills small, composable, and single-purpose.

## Steps

1. **Pick a slug.** Lowercase kebab-case, a single verb or noun-verb: `dependency-upgrade`, `log-analysis`.
2. **Create the folder.** `.ai/skills/<slug>/`.
3. **Copy the template.** Use [`../../.ai/templates/skill.template.md`](../../.ai/templates/skill.template.md); save as `.ai/skills/<slug>/SKILL.md`.
4. **Fill the frontmatter.** `id`, `name`, `version: 0.1.0`, `summary` (one sentence), `when_to_use`, `inputs`, `outputs`, `tools`, `related_skills`, `related_rules`.
5. **Write the body** in this order: Purpose, When to use, Procedure, Quality bar, Anti-patterns, References.
6. **Register it.** Add a row to the table in [`../../.ai/skills/README.md`](../../.ai/skills/README.md).

## Sanity checks

- [ ] Summary fits in one sentence.
- [ ] Procedure is ordered and concrete.
- [ ] Quality bar is a checklist, not prose.
- [ ] No duplication of rules or other skills — link instead.

## Anti-patterns

- A "skill" that contains a workflow's responsibilities (multiple steps across multiple artifacts with gates).
- A skill without inputs/outputs — it cannot be composed.
- A skill that exists only as future-proofing.
