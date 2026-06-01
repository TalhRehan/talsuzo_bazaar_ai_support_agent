# API Ownership

This document explains which frontend API calls are owned by TalSuzo Bazaar and which ones still use the external RouteMisr ecommerce API for demo speed.

## Project-Owned API

Project-owned endpoints are served by the FastAPI backend in `apps/api`.

Base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Frontend helper:

```ts
import { apiUrl } from "@/lib/api-client"

fetch(apiUrl("/refunds/request"))
```

Current project-owned frontend integrations:

- `src/features/support/api.ts`
- `src/features/admin/refunds/api.ts`

Current project-owned backend endpoints:

- `GET /api/health`
- `POST /api/refunds/request`
- `GET /api/refunds/{request_id}`
- `GET /api/admin/refunds`
- `GET /api/admin/refunds/{request_id}/logs`

These endpoints are part of the final AI customer support and refund decision system.

## External Demo API

The storefront still uses the RouteMisr ecommerce API for product browsing and existing ecommerce demo flows.

This is intentional for now because it keeps the shop functional while the custom backend focuses on the assignment's core requirement: AI refund support.

Current external API areas:

- `src/api/services/product.service.ts`
- `src/actions/auth.action.ts`
- `src/actions/cart.actions.ts`
- `src/actions/checkout.action.ts`
- `src/actions/wishlist.actions.ts`
- `src/actions/review.actions.ts`
- `src/actions/address.actions.ts`
- `src/next-auth/authOptions.ts`
- `src/app/_components/SliderShowProduct/SliderShowProduct.tsx`

## Migration Strategy

Do not replace all storefront APIs at once. Use this order:

1. Keep product/category/brand reads on RouteMisr until custom product data exists.
2. Keep cart and checkout on RouteMisr while refund support is being evaluated.
3. Use FastAPI for all refund support and admin review features immediately.
4. Move auth, cart, orders, and products into FastAPI only after the custom ecommerce backend/data model is ready.

## Rule For New Features

New AI support features must use the project-owned FastAPI backend.

Storefront-only demo features may continue using RouteMisr until they are explicitly migrated.
