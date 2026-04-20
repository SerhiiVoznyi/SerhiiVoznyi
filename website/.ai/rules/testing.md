# Testing

This project does **not** maintain an automated unit or integration test suite. Rely on static checks, build verification, and manual QA instead.

## Verification expectations

- Run **lint** and **type-check** (`npm run lint`; `tsc` via `npm run build` or standalone) before declaring work done.
- For UI changes, exercise the affected flows in the browser and note what you checked in the task or PR.
- For bug fixes, document **reproduction steps** and **how you verified** the fix; optional: add a short note on how recurrence could be caught in the future (process or tooling), without implying a code test suite.

## What this replaces

- There is no `npm test` and no test runner in `package.json`. Do not add Vitest/Jest/RTL unless the team explicitly decides to reintroduce automated tests project-wide.
