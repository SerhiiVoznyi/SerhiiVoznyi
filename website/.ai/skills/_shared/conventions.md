# Skill conventions

Rules every skill follows so composition stays predictable.

## Shape

- One folder per skill. One `SKILL.md` inside. No nested skills.
- Frontmatter is mandatory (id, name, version, summary, when_to_use, inputs, outputs).
- Single-purpose. If you cannot write the summary in one sentence, split the skill.

## Body structure

In this order:

1. Purpose
2. When to use
3. Procedure (ordered steps)
4. Quality bar (checklist)
5. Anti-patterns
6. References

## Reuse

- Reference other skills by path (`skills/<slug>/SKILL.md`), never inline their content.
- Reference rules in `.ai/rules/` instead of restating them.

## Versioning

- `version` in frontmatter follows semver: bump minor for additive clarifications, major for behavior changes in the procedure.
