# How to add a workflow

A workflow orchestrates multiple skills with human gates. Create a new workflow when a recurring multi-step path deserves a canonical definition.

## Steps

1. **Pick a slug.** Lowercase kebab-case, usually noun or noun phrase: `dependency-upgrade`, `data-migration`.
2. **Create the folder.** `.ai/workflows/<slug>/`.
3. **Copy the template.** Use [`../../.ai/templates/workflow.template.md`](../../.ai/templates/workflow.template.md); save as `.ai/workflows/<slug>/workflow.md`.
4. **Create `steps/`** with a `.gitkeep`. Use only if a step needs long-form documentation beyond `workflow.md`.
5. **Fill the frontmatter.** Include `id`, `name`, `version`, `purpose`, `triggers`, `preconditions`, `inputs`, `outputs`, `skills`, `agents`, `related_rules`.
6. **Write the body:** Summary, Preconditions, Steps (ordered, each referencing a skill), Human gates, Failure modes, Definition of done.
7. **Register it.** Add a row to the table in [`../../.ai/workflows/README.md`](../../.ai/workflows/README.md).

## Sanity checks

- [ ] Every step references a skill or a gate.
- [ ] Human gates are explicit and minimal.
- [ ] Failure modes have recovery paths.
- [ ] Definition of done is a checklist.

## Anti-patterns

- A workflow that is really a skill (no gates, no orchestration, single action).
- Duplicating skill content inline — link instead.
- Gates without criteria for passing them.
