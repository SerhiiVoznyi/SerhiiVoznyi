---
id: security
name: Security
version: 0.1.0
summary: Apply baseline security checks to code, dependencies, and configuration.
when_to_use:
  - Reviewing or writing code that handles untrusted input
  - Adding a dependency
  - Touching auth, secrets, or configuration
inputs:
  - Code, dependency change, or config change
outputs:
  - Findings, or a clean pass note
tools:
  - read
  - search
related_skills:
  - code-review
related_rules:
  - rules/security.md
---

# Security

## Purpose

Catch common security issues early. Prefer boring, default-secure choices.

## When to use

- Any change handling external input (HTTP, user, file, env).
- Any dependency addition or upgrade.
- Changes to auth, sessions, cookies, CSP, CORS.
- Anywhere data is stored or logged.

## Procedure

1. Identify trust boundaries crossed by the change.
2. Verify input validation at each boundary with an explicit schema.
3. Confirm no secrets are logged or committed.
4. For dependencies: check maintenance, popularity, known CVEs; pin and lockfile.
5. For rendering: no unsanitized HTML; avoid `dangerouslySetInnerHTML` without a vetted sanitizer.
6. For data: minimize stored PII; redact in logs.

## Quality bar

- [ ] Trust boundaries are explicit.
- [ ] Input validation is present and rejects on failure.
- [ ] No secrets in code or logs.
- [ ] Dependencies scanned and pinned.

## Anti-patterns

- Silencing errors on invalid input.
- Adding unsanitized `innerHTML` for convenience.
- Relying on obscurity instead of validation.
- Copy-pasting "known good" config without reading it.

## References

- [`../../rules/security.md`](../../rules/security.md)
