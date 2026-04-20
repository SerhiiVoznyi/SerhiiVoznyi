---
id: pre-commit
name: Pre-commit
applies_to: Every commit
owner: author
---

# Pre-commit

> Fast local checks before running `git commit`. If any fails, do not commit until resolved.

## Pre-flight

- [ ] Diff contains only intended changes (no stray files, no debug code).
- [ ] No secrets, tokens, or local paths in the diff.
- [ ] `console.log` / `debugger` / TODOs without owner removed.

## Execution

- [ ] Formatter applied (Prettier).
- [ ] Lint passes (`npm run lint`, if available).
- [ ] Type-check passes (`tsc --noEmit`).
- [ ] Tests affected by the change pass locally.

## Sign-off

- [ ] Commit message follows Conventional Commits (see [`../rules/git.md`](../rules/git.md)).
- [ ] One logical change per commit.

## References

- [`../rules/git.md`](../rules/git.md)
- [`../rules/code-style.md`](../rules/code-style.md)
