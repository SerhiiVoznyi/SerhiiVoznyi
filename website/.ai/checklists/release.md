---
id: release
name: Release
applies_to: Every release cut from main
owner: release lead
---

# Release

> Use together with [`../workflows/release/workflow.md`](../workflows/release/workflow.md).

## Pre-flight

- [ ] `main` is green.
- [ ] No open issues tagged as blockers for this version.
- [ ] Version decided (semver) and agreed.
- [ ] Changelog or release notes drafted from user-visible changes.

## Execution

- [ ] Version bumped in `package.json` and committed.
- [ ] Build succeeds locally and in CI.
- [ ] Artifact size / bundle size compared to last release; unexpected growth investigated.
- [ ] Tag created: `v<version>`; pushed.
- [ ] Release notes published.

## Sign-off

- [ ] Deployed artifact smoke-checked.
- [ ] Stakeholders notified if applicable.
- [ ] Rollback plan known and documented.
- [ ] Release task moved to `tasks/done/`.

## References

- [`../workflows/release/workflow.md`](../workflows/release/workflow.md)
- [`../rules/git.md`](../rules/git.md)
