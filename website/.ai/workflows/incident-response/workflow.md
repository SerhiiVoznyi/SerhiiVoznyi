---
id: incident-response
name: Incident response
version: 0.1.0
purpose: Stabilize an ongoing production issue, then follow up with a durable fix and post-mortem.
triggers:
  - Production outage or severe degradation
  - Security incident
preconditions:
  - Incident is declared and an owner is assigned
inputs:
  - name: incident-signal
    description: Alert, report, or observed degradation
outputs:
  - name: mitigation
    description: Stabilized system
  - name: post-mortem
    description: Learning captured in memory/learnings/
skills:
  - debugging
  - devops
  - security
agents:
  - debugger
related_rules:
  - rules/security.md
  - rules/engineering.md
---

# Incident response

## Summary

Mitigate first, understand second. Communicate constantly. Fix durably after stabilization.

## Preconditions

- Incident declared. Owner named. Communication channel open.

## Steps

1. **Acknowledge and communicate** — post status; set expectations.
2. **Stabilize** — apply fastest safe mitigation (rollback, feature flag, scale, block traffic). Skill: [devops](../../skills/devops/SKILL.md).
3. **Capture evidence** — logs, metrics, timestamps. Save under [`../../logs/sessions/`](../../logs/sessions/).
4. **Verify mitigation** — metrics back to baseline.
5. **Communicate resolution** — close incident.
6. **Root cause analysis** — Skill: [debugging](../../skills/debugging/SKILL.md). No guessing.
7. **Durable fix** — file a `bugfix` task with repro and verification plan.
8. **Post-mortem** — blameless note in [`../../memory/learnings/`](../../memory/learnings/); action items tracked.

## Human gates

- Decision to rollback or apply emergency change.
- Closing the incident.

## Failure modes

- Speculative fixes extend the outage -> prefer rollback.
- No logs captured -> post-mortem is weaker; improve observability as an action item.

## Definition of done

- [ ] Incident closed; metrics recovered.
- [ ] Evidence saved in `logs/sessions/`.
- [ ] Root cause documented.
- [ ] Durable fix task created.
- [ ] Post-mortem in `memory/learnings/` with tracked actions.
