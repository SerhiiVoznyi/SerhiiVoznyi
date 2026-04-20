# Security

Baseline security rules. Applies to every change unless explicitly waived.

## Secrets

- Never commit secrets, tokens, keys, or credentials. Reject PRs that do.
- Never log secrets, even at debug level.
- Configuration loaded from environment variables; `.env` files are gitignored.

## Input handling

- Treat all external input (HTTP, user, file, env) as untrusted.
- Validate at the boundary with an explicit schema; reject invalid input with a clear error.
- Never concatenate untrusted input into SQL, shell, or HTML. Use parameterized APIs.

## Dependencies

- Prefer well-maintained packages with recent releases and high usage.
- Run vulnerability scans before adding a dependency.
- Pin direct dependencies; use a lockfile.

## Browser / client

- Do not render untrusted HTML. If you must, sanitize via a vetted library.
- Avoid `dangerouslySetInnerHTML` unless the content is provably trusted and sanitized.
- CSP, SameSite cookies, and HTTPS are defaults — do not weaken without an ADR.

## Data

- Minimize what is stored; delete what you no longer need.
- PII is logged only when necessary and always redacted.

## Escalation

If an agent discovers a security issue, it stops and reports to the human before continuing.
