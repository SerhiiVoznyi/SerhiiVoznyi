# Documentation

What must be documented, where it lives, and how it is structured.

## What to document

- **Public APIs.** Every exported function/component has a one-line summary of purpose, inputs, outputs, and side effects.
- **Non-obvious decisions.** Captured as ADRs under `.ai/memory/decisions/`.
- **How to run things.** Setup, scripts, and dev/prod differences live in the root `README.md`.
- **Project-wide conventions.** Live under `.ai/rules/`.

## What NOT to document

- Code that is self-evident from naming and types.
- Internal helpers with no public consumers.
- Things already captured by the type system.

## Where it lives

| Kind | Location |
| --- | --- |
| User-facing project docs | `README.md`, `docs/` |
| AI-system docs | `docs/ai-system/` |
| Engineering rules | `.ai/rules/` |
| Architecture decisions | `.ai/memory/decisions/` |
| Skills and workflows | `.ai/skills/`, `.ai/workflows/` |

## Style

- Short paragraphs, active voice, concrete examples.
- Link instead of duplicating. One canonical place per topic.
- Update docs in the same PR as the code change they describe.
