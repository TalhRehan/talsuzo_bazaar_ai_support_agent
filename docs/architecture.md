# TalSuzo Bazaar Architecture

TalSuzo Bazaar is being organized as a full-stack ecommerce and AI customer support system.

## High-Level Flow

```text
Customer
  -> Next.js frontend
  -> FastAPI backend
  -> AI agent workflow
  -> policy engine
  -> synthetic customer/order data
  -> decision log
  -> frontend response/admin dashboard
```

## Frontend

The existing Next.js app remains the customer-facing ecommerce shop.

Responsibilities:

- Product browsing
- Cart and wishlist UI
- Checkout UI
- Authentication screens
- Refund support chat page
- Admin refund dashboard
- Calls to FastAPI backend

## Backend

The FastAPI backend lives in `apps/api`.

Responsibilities:

- API endpoints
- Request validation
- Customer lookup
- Order lookup
- Refund policy enforcement
- AI agent orchestration
- Decision log storage

## Agent Layer

The agent layer lives inside `apps/api/app/agent`.

Responsibilities:

- Run the refund workflow
- Detect prompt injection attempts
- Use tools for customer/order/policy lookup
- Generate customer-friendly reasoning summaries
- Never override deterministic policy rules

## Data Layer

The data layer starts as local synthetic JSON data.

Responsibilities:

- Synthetic CRM customers
- Synthetic order histories
- Refund policy document
- Saved refund decision logs

## Shared Contracts

The `packages/shared` folder is reserved for shared API contracts. It will help frontend and backend developers keep request/response shapes aligned.

## Docker Runtime

The complete project is runnable with one command:

```bash
docker compose up --build
```

Services:

```text
frontend: http://localhost:3000
backend:  http://localhost:4000
docs:     http://localhost:4000/docs
```

The frontend service is built from the root `Dockerfile`. It runs the existing Next.js ecommerce app.

The backend service is built from `apps/api/Dockerfile`. It runs FastAPI, serves refund support endpoints, loads synthetic JSON data, and exposes generated API documentation through Swagger UI.
