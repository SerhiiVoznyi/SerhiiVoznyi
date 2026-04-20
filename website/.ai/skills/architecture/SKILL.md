---
id: architecture
name: Architecture
version: 0.1.0
summary: Shape system boundaries, component contracts, and cross-cutting choices with explicit trade-offs.
when_to_use:
  - A change crosses module boundaries
  - Multiple valid designs exist with meaningful trade-offs
  - A durable decision is likely (warranting an ADR)
inputs:
  - The problem statement or task
  - Current architecture snapshot (context/architecture.md)
outputs:
  - A chosen approach with named non-goals and alternatives rejected
  - An ADR under memory/decisions/ when the choice is durable
tools:
  - read
  - search
related_skills:
  - documentation
  - security
  - performance
related_rules:
  - rules/engineering.md
---

# Architecture

## Purpose

Decide where boundaries go and what flows across them, before code is written. Document the why.

## When to use

- Designing a new subsystem, integration, or data shape.
- Two or more candidate designs have significant trade-offs.
- Change affects more than one module or long-term maintainability.

## Procedure

1. State the problem in one paragraph. List constraints and non-functional requirements.
2. Enumerate candidate approaches. For each: summary, trade-offs, risks, effort (S/M/L).
3. Check precedent in [`../../memory/decisions/`](../../memory/decisions/).
4. Recommend one approach; justify in <=5 bullets.
5. If the choice is durable, draft an ADR from [`../../templates/decision-record.template.md`](../../templates/decision-record.template.md).
6. Update [`../../context/architecture.md`](../../context/architecture.md) if the snapshot changes.

## Quality bar

- [ ] Non-goals are stated.
- [ ] At least one rejected alternative is documented with reasoning.
- [ ] Consequences (positive and negative) are acknowledged.
- [ ] ADR exists when the decision is durable.

## Anti-patterns

- Picking the first design that comes to mind without listing alternatives.
- Speculative abstractions for needs that are not yet real.
- Using "flexibility" as justification without a concrete use case.

## References

- [`../../context/architecture.md`](../../context/architecture.md)
- [`../../memory/decisions/`](../../memory/decisions/)
