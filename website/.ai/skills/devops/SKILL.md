---
id: devops
name: DevOps
version: 0.1.0
summary: Keep build, CI, and environments reproducible and predictable.
when_to_use:
  - Changing build scripts, CI, or deployment configuration
  - Adding a tool that runs in CI
  - Debugging environment-specific failures
inputs:
  - CI config, build scripts, environment description
outputs:
  - A green pipeline with deterministic behavior across environments
tools:
  - read
  - search
  - edit
  - shell_read
  - shell_write
related_skills:
  - security
related_rules:
  - rules/engineering.md
  - rules/security.md
---

# DevOps

## Purpose

Ensure what works locally works in CI and production. Reduce environment surprises.

## When to use

- Modifying build or CI configuration.
- Adding a tool that must run in CI.
- Diagnosing "works on my machine" issues.

## Procedure

1. Pin versions (runtime, tooling) and commit lockfiles.
2. Keep CI and local commands aligned; prefer one script entrypoint per task (`npm run build`, etc.).
3. Treat CI as source of truth — reproduce failures locally by matching its env.
4. Cache wisely: cache what is expensive and deterministic, not what changes often.
5. Fail loudly: non-zero exit codes, clear logs, no silent skipping.

## Quality bar

- [ ] Build and lint commands behave the same locally and in CI.
- [ ] Versions are pinned; lockfile committed.
- [ ] CI logs are readable and actionable on failure.
- [ ] No secrets in CI config; use the platform's secret store.

## Anti-patterns

- Diverging local/CI commands.
- Silently continuing on lint or build failure.
- Unpinned tool versions causing drift.
- Over-caching to the point of masking bugs.

## References

- [`../../rules/security.md`](../../rules/security.md)
- [`../../rules/engineering.md`](../../rules/engineering.md)
