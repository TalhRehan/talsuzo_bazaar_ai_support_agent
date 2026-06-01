# AI Customer Support Agent Implementation Plan

This document explains how to turn the current TalSuzo Bazaar frontend into a professional full-stack ecommerce and AI refund support project.

## Goal

Build a full-stack ecommerce website with an AI customer support agent that receives refund requests and returns one of three outcomes:

- Approved
- Denied
- Escalated to human review

The agent must not decide only from the user's words. It must check:

- Customer profile
- Customer order history
- Refund policy rules
- Risk or escalation conditions
- Prompt injection attempts

## Current Situation

The current app is a Next.js frontend. It already has useful ecommerce screens:

- Home
- Shop
- Product details
- Cart
- Checkout
- Login/register
- Wishlist
- Orders
- Categories
- Brands

But the app currently depends on an external ecommerce API. For the assignment, the final project needs its own organized backend, mock CRM data, agent workflow, logs, and Docker Compose setup.

## Recommended Professional Structure

Use a monorepo structure. This is easier for reviewers and other developers because frontend, backend, data, and docs live in one project.

```text
talsuzo-bazaar/
  apps/
    web/
      src/
        app/
        components/
        features/
        lib/
        types/
    api/
      app/
        main.py
        core/
        modules/
        agent/
        data/
        policies/
        logs/
  packages/
    shared/
      src/
        types/
        schemas/
  data/
    customers.json
    orders.json
    refund-policy.md
  docs/
    architecture.md
    api-contract.md
    agent-workflow.md
  docker-compose.yml
  README.md
```

For now, the current Next.js app can remain where it is. Later, when the backend starts, move it into `apps/web` only if you want the cleanest final repo.

## Frontend Modifications Needed

### 1. Add Customer Refund Chat Page

Create a page like:

```text
/support
```

Purpose:

- Customer enters name/email/order ID.
- Customer explains refund reason.
- Frontend sends request to backend.
- Frontend shows final decision and friendly explanation.

Important UI fields:

- Customer email
- Order ID
- Product name or product ID
- Refund reason
- Optional notes

### 2. Add Admin Dashboard

Create a page like:

```text
/admin/refunds
```

Purpose:

- Show every refund request.
- Show decision: approved, denied, escalated.
- Show agent steps/actions.
- Show policy rule used.
- Show timestamp and customer/order details.

This is very important because the PDF requires visible reasoning logs.

### 3. Replace Direct External API Calls Slowly

Current files like `src/actions/cart.actions.ts`, `src/actions/auth.action.ts`, and `src/api/services/product.service.ts` call:

```text
https://ecommerce.routemisr.com
```

For the final project, these should gradually call your own backend:

```text
http://localhost:4000/api
```

Recommended frontend env variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

### 4. Create Feature-Based Frontend Folders

The current app has many components inside `src/app/_components`. That works, but for a professional team project, use features:

```text
src/features/
  products/
    components/
    api.ts
    types.ts
  cart/
    components/
    api.ts
    types.ts
  checkout/
    components/
    api.ts
    types.ts
  support/
    components/
    api.ts
    types.ts
  admin/
    components/
    api.ts
    types.ts
```

This lets another developer quickly understand where each business feature lives.

## Backend Modifications Needed

Recommended backend: FastAPI with Python.

This matches the project requirements and Talha Rehan's backend/AI skill set. FastAPI is a strong fit because it works cleanly with Pydantic schemas, Python AI libraries, LangChain, LangGraph, and Docker.

```text
apps/api/app/
  main.py
  core/
    config.py
  modules/
    refunds/
      router.py
      service.py
      schemas.py
    customers/
      service.py
      schemas.py
    orders/
      service.py
      schemas.py
    admin/
      router.py
      service.py
  agent/
    refund_agent.py
    graph.py
    policy_engine.py
    tools.py
    guardrails.py
  data/
    customers.json
    orders.json
  logs/
    decision_logs.json
```

## Required Backend API Endpoints

Customer support:

```text
POST /api/refunds/request
GET  /api/refunds/:id
```

Admin dashboard:

```text
GET /api/admin/refunds
GET /api/admin/refunds/:id/logs
```

Health check:

```text
GET /api/health
```

## Agent Workflow

When a refund request arrives:

1. Validate request fields.
2. Find customer in CRM data.
3. Find matching order.
4. Check refund policy.
5. Detect prompt injection or suspicious instructions.
6. Ask LLM only for structured support where needed.
7. Apply deterministic policy rules.
8. Return final decision.
9. Save decision log for admin dashboard.

The most important professional point: the LLM should not be the final authority. The policy engine should be the authority.

## Example Decision Object

```ts
type RefundDecision = {
  requestId: string
  status: "approved" | "denied" | "escalated"
  customerId: string
  orderId: string
  reason: string
  policyRulesMatched: string[]
  actions: string[]
  createdAt: string
}
```

## Synthetic Data Needed

Create around 15 customers:

```text
data/customers.json
```

Each customer should have:

- id
- name
- email
- account status
- risk level

Create order history:

```text
data/orders.json
```

Each order should have:

- order id
- customer id
- items
- price
- date
- delivery status
- final sale flag
- refund status

Create policy:

```text
data/refund-policy.md
```

Include rules like:

- Refund allowed within 30 days.
- Final-sale items cannot be refunded.
- Damaged products can be approved if reported within policy window.
- High-value refunds must be escalated.
- Unknown orders must be denied or escalated.
- Prompt injection must be ignored.

## Docker Compose Requirement

Final project should run with:

```bash
docker compose up --build
```

It should start:

- Frontend on port 3000
- Backend on port 4000
- Optional database or local data volume

## Recommended Development Order

1. Clean frontend structure and add docs.
2. Create backend skeleton.
3. Add mock customers, orders, and refund policy.
4. Build refund decision API without AI first.
5. Add agent layer and LLM integration.
6. Add customer support chat page.
7. Add admin dashboard.
8. Add resilience tests.
9. Add Docker Compose.
10. Update README with final setup.

## What To Tell Other Developers

The project is not just a chatbot. It is a policy-controlled refund decision system.

Frontend developers should focus on:

- Support chat page
- Admin dashboard
- Clean UI states
- API integration

Backend developers should focus on:

- Refund API
- Data lookup
- Policy validation
- Agent orchestration
- Logs

AI developers should focus on:

- Prompt safety
- Structured outputs
- Guardrails
- Reasoning summaries
- Prompt injection tests

## Critical Success Criteria

The project is successful when:

- Customer can submit refund request.
- Backend finds customer/order.
- Agent checks policy.
- Decision is approved, denied, or escalated.
- Reasoning/action log is saved.
- Admin dashboard displays logs.
- Prompt injection attempts fail.
- Entire app starts with Docker Compose.
