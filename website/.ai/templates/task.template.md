---
id: <task-slug>
title: <short human-readable title>
type: feature | bugfix | spike | chore
status: backlog | active | done
owner: <agent or human>
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
workflow: <workflow-name or n/a>
related:
  - <path or link>
tags: []
---

# <short human-readable title>

## Context

Why this task exists. Link to the triggering issue, user request, or decision.

## Goal

One to three bullet points describing the outcome. Observable, not implementation.

## Non-goals

Explicitly out of scope.

## Acceptance criteria

- [ ] <checkable criterion>
- [ ] <checkable criterion>

## Plan

Ordered steps the agent will follow. Reference skills (`.ai/skills/...`) and rules (`.ai/rules/...`) when relevant.

1. ...
2. ...

## Notes & decisions

Chronological log of noteworthy choices made while executing. Promote durable ones to `.ai/memory/decisions/`.

## Artifacts

Files produced or touched, PR link, logs in `.ai/logs/` when applicable.
