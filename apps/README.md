# Apps Workspace

This folder contains application-level workspaces for the final TalSuzo Bazaar monorepo.

## Current State

The existing Next.js ecommerce frontend currently remains at the project root so the customer-facing shop keeps running without import/path breakage.

## Target State

```text
apps/
  web/   Next.js ecommerce frontend
  api/   FastAPI backend and AI support agent
```

The backend can be developed in `apps/api` immediately. The frontend can be moved into `apps/web` later when the project is ready for a larger structural migration.
