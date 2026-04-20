# Architecture — one-page snapshot

> Keep this page short. If it grows past two screens, split into focused pages and link from here.

## Shape

A client-side React single-page application built with Vite. No backend in this repo.

```text
Browser
  └─ index.html
       └─ src/main.tsx  (React root)
             └─ src/**  (components, hooks, styles)
```

## Runtime

- Vite dev server for local development (HMR).
- Production build outputs static assets served from any static host.

## Data flow

- Purely client-side. External data, if any, is fetched at runtime from third-party APIs.

## Deployment

- Static build output. Hosting target is documented in the root `README.md` or deployment-specific docs.

## Non-goals

- No server-side rendering.
- No backend services in this repo.

## Change log

Record notable architecture changes here with a date and ADR link.

- <YYYY-MM-DD> — <change> ([`adr-id`](../memory/decisions/))
