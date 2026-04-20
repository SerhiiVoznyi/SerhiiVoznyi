# Git

Branching, commit, and PR conventions.

## Branches

- `main` is always releasable.
- Feature branches: `feat/<short-slug>`; fixes: `fix/<short-slug>`; chores: `chore/<short-slug>`.
- Branch from `main`; rebase (not merge) to keep history linear, unless the project settles on merge commits elsewhere.

## Commits

- Conventional Commits style: `type(scope): subject`.
  - `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`.
- Subject is imperative mood, lowercase, no trailing period, <=72 chars.
- Body explains the *why* and any non-obvious trade-offs. Wrap at 100 cols.
- One logical change per commit. Refactors separate from behavior changes.

## Pull requests

- Title matches the primary commit's subject.
- Description includes: context, change summary, test plan, screenshots (for UI), risk.
- Link related task file in `.ai/tasks/` and any ADRs.
- CI must be green before merge.

## Agent-specific

- Agents NEVER:
  - Run `git push --force` to `main`/`master`.
  - Use `--no-verify` to skip hooks.
  - Amend or rebase pushed commits without explicit human approval.
  - Commit unrelated changes in the same commit.
- Agents only commit when the human asks. Unclear? Ask first.
