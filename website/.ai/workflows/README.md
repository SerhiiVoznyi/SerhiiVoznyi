# workflows

Multi-step orchestrations that sequence skills and human gates. Each workflow is a folder with:

- `workflow.md` — entry point (metadata, preconditions, steps, gates, failure modes).
- `steps/` — optional per-step deep dives for long content.

## Registered workflows

| Workflow | Summary |
| --- | --- |
| [feature-delivery](feature-delivery/workflow.md) | Ship a new feature end-to-end |
| [bugfix](bugfix/workflow.md) | Reproduce, root-cause, verify, fix |
| [incident-response](incident-response/workflow.md) | Stabilize an ongoing production issue |
| [code-review](code-review/workflow.md) | Review a PR against rules and acceptance criteria |
| [release](release/workflow.md) | Cut a release from `main` |
| [spike](spike/workflow.md) | Time-boxed learning to reduce uncertainty |

## Adding a workflow

1. Copy [`../templates/workflow.template.md`](../templates/workflow.template.md) to `workflows/<slug>/workflow.md`.
2. Create an empty `steps/` folder with a `.gitkeep`.
3. Register the workflow in the table above.
