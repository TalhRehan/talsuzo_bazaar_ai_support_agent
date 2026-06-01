# Web App

This folder contains the customer-facing Next.js ecommerce shop for TalSuzo Bazaar.

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

## Local Commands

```bash
npm install
npm run dev
npm run lint
npm run build
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

The root `.env.example` also contains these variables for Docker Compose.
