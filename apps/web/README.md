# Web App

The customer-facing Next.js ecommerce shop currently lives at the project root.

This folder marks the planned final home for the frontend when the repository is converted into a full monorepo layout.

## Folder Structure

```text
apps/web/
  src/
    app/
    components/
    features/
    lib/
    types/
```

## Current Frontend Location

```text
src/
public/
package.json
next.config.ts
tsconfig.json
```

## Frontend Responsibilities

- Ecommerce browsing experience
- Product, category, and brand pages
- Cart and wishlist UI
- Checkout UI
- Customer refund support chat page
- Admin refund review dashboard
- API integration with the FastAPI backend

## Environment Variables

Use `.env.example` as the frontend template.

```env
NEXTAUTH_SECRET=replace-with-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

The active frontend currently runs from the project root, so the root `.env.example` also contains the same frontend variables.
