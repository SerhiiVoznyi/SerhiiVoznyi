# memory

Long-lived project memory an agent should recall across sessions.

## Layout

- [`decisions/`](decisions/) — Architecture Decision Records (ADRs). One file per decision, naming: `NNNN-short-slug.md` (zero-padded number, kebab-case slug). Seed from [`../templates/decision-record.template.md`](../templates/decision-record.template.md).
- [`learnings/`](learnings/) — Post-mortems, retros, and durable observations. Naming: `YYYY-MM-DD-short-slug.md`.

## When to write here

- **decisions/** — anytime a choice is likely to constrain future work (tech choice, interface shape, policy).
- **learnings/** — after an incident, a large feature, or a spike with non-obvious findings.

## When NOT to write here

- Routine implementation details — those belong in the code or task file.
- Personal notes or scratch work.

## Agent behavior

- Before architectural work, read relevant ADRs.
- Before revisiting an area, scan recent learnings.
- Mark superseded ADRs with `status: superseded` and link the replacement.
