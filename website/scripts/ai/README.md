# scripts/ai

Small cross-platform helpers for operating on the [`.ai/`](../../.ai/README.md) layout. Each helper is provided as a PowerShell (`.ps1`) and Bash (`.sh`) pair with identical behavior.

## Scripts

| Script | Purpose |
| --- | --- |
| `new-task` | Create a task file in `.ai/tasks/backlog/` from a template, stamped with today's date |
| `move-task` | Move a task between lifecycle folders (`backlog` / `active` / `done`) and update its `status` |
| `validate-structure` | Check that the `.ai/` layout meets baseline invariants (required folders, READMEs, canonical files) |

## Usage

### PowerShell (Windows)

```powershell
./scripts/ai/new-task.ps1 -Type feature -Slug add-dark-mode-toggle -Title "Add dark mode toggle"
./scripts/ai/move-task.ps1 -Slug add-dark-mode-toggle -To active
./scripts/ai/validate-structure.ps1
```

### Bash (macOS/Linux)

```bash
./scripts/ai/new-task.sh --type feature --slug add-dark-mode-toggle --title "Add dark mode toggle"
./scripts/ai/move-task.sh --slug add-dark-mode-toggle --to active
./scripts/ai/validate-structure.sh
```

## Conventions

- Scripts are side-effect-minimal. They only touch `.ai/tasks/` (new-task, move-task) or print reports (validate-structure).
- Scripts exit non-zero on any error so they are safe to chain in CI.
- Scripts read templates from `.ai/tasks/templates/` and never hardcode structure.
- All scripts resolve paths relative to the repo root (the parent of `scripts/`).
