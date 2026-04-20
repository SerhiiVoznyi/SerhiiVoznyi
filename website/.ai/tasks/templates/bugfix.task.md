---
id: <bug-slug>
title: <short description of the bug>
type: bugfix
status: backlog
owner: <agent or human>
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
workflow: bugfix
related: []
tags: [bug]
severity: low | medium | high | critical
---

# <short description of the bug>

## Report

Original report, including environment and steps. Quote verbatim if possible.

## Reproduction

Minimal deterministic steps to reproduce.

Expected: <expected behavior>
Actual: <actual behavior>

## Hypothesis

Ranked hypotheses and the experiment to falsify each.

## Root cause

Filled in once confirmed by evidence.

## Fix plan

1. Confirm repro on current code.
2. Apply minimal fix at the root cause.
3. Verify per [`../../rules/testing.md`](../../rules/testing.md) (lint, type-check, manual steps).

## Acceptance criteria

- [ ] Repro documented and confirmed before fix.
- [ ] Fix is minimal and at the root cause.
- [ ] Verification documented; lint/type-check pass.

## Notes & decisions

(append as work progresses)

## Artifacts

- PR: <link>
- Verification notes: <summary or link>
- Session log: `.ai/logs/sessions/<date>-<slug>.md`
