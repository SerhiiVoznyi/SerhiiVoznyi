---
id: incident
name: Incident
applies_to: Any declared incident
owner: incident commander
---

# Incident

> First-actions checklist. Use with [`../workflows/incident-response/workflow.md`](../workflows/incident-response/workflow.md).

## Pre-flight

- [ ] Incident declared; owner (commander) named.
- [ ] Communication channel open and pinned.
- [ ] Severity assessed (SEV-1/2/3 or equivalent).

## Execution

- [ ] Current user impact described in one sentence.
- [ ] Fastest safe mitigation applied (rollback, feature flag, scale, block traffic).
- [ ] Evidence captured in `.ai/logs/sessions/<date>-<slug>.md` (timestamps, logs, metrics).
- [ ] Status updates posted at a predictable cadence.
- [ ] Metrics confirmed back to baseline before declaring resolved.

## Sign-off

- [ ] Incident closed; resolution communicated.
- [ ] Durable fix task filed (`.ai/tasks/backlog/` via `bugfix` workflow).
- [ ] Post-mortem in `.ai/memory/learnings/<date>-<slug>.md` scheduled and tracked.
- [ ] Action items have owners and due dates.

## References

- [`../workflows/incident-response/workflow.md`](../workflows/incident-response/workflow.md)
- [`../rules/security.md`](../rules/security.md)
