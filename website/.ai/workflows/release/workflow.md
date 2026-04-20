---
id: release
name: Release
version: 0.1.0
purpose: Cut a release from main with a verifiable artifact.
triggers:
  - Scheduled release cadence
  - Accumulated changes warrant a release
preconditions:
  - main is green
  - Release checklist exists
inputs:
  - name: version
    description: Semver for the release
outputs:
  - name: tagged-release
    description: Git tag + release notes + deployed artifact if applicable
skills:
  - devops
  - documentation
agents:
  - implementer
related_rules:
  - rules/git.md
  - rules/documentation.md
---

# Release

## Summary

Predictable release path. Small, verifiable steps. Rollback plan ready.

## Preconditions

- `main` is green.
- No open blocker issues for the target version.

## Steps

1. **Open release task** — from [`../../templates/task.template.md`](../../templates/task.template.md).
2. **Bump version** — update `package.json` version per semver.
3. **Run checklist** — [`../../checklists/release.md`](../../checklists/release.md).
4. **Build artifact** — Skill: [devops](../../skills/devops/SKILL.md). Reproduce locally if possible.
5. **Draft release notes** — Skill: [documentation](../../skills/documentation/SKILL.md). User-facing, not a commit dump.
6. **Tag and publish** — per [`../../rules/git.md`](../../rules/git.md).
7. **Verify** — smoke check deployed artifact.
8. **Announce** — where appropriate.
9. **Close out** — move task to `tasks/done/`; log any issues in `memory/learnings/`.

## Human gates

- Version decision.
- Final publish approval.

## Failure modes

- Smoke check fails -> rollback; treat as incident.
- Release notes omit a user-visible change -> patch notes rather than skip.

## Definition of done

- [ ] Tag created on `main`.
- [ ] Release notes published.
- [ ] Artifact verified.
- [ ] Task in `tasks/done/`.
