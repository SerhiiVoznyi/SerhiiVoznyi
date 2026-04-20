# Shared tool policy

Rules for how agents use tools. Applies to every agent.

## Reading code

- Use dedicated read/search tools. Do not `cat`, `head`, `tail`, `grep`, or `find` from a shell when a specialized tool exists.
- Always read a file before editing it.

## Editing code

- Use dedicated edit tools (string-replace / write). Do not `sed`, `awk`, or echo-redirect to edit files.
- Preserve existing indentation and formatting.

## Shell

- Reserve shell for actual system commands (git status, package manager, build).
- Quote paths containing spaces.
- Do not run long-running processes in the foreground; background them if the tool supports it.

## Destructive operations

Require explicit human approval:

- `git push --force*`, `git reset --hard`, any history rewrite on shared branches.
- Recursive deletes, dropping databases, clearing caches shared with others.
- Installing global tools or modifying system configuration.

## Secrets

- Never print, log, or commit secrets.
- If a secret is encountered accidentally, stop and notify the human.

## Network

- No unexpected outbound calls. Web search or fetch only when the task requires it.

## Parallelism

- Batch independent tool calls together when possible.
- Serialize calls that depend on each other's output.
