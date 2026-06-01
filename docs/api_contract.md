# API Contract

This document defines the planned API contract between the Next.js frontend and the FastAPI backend.

## Base URL

```text
http://localhost:4000/api
```

Frontend environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Frontend API helper:

```ts
import { apiUrl } from "@/lib/api-client"

const response = await fetch(apiUrl("/refunds/request"))
```

## Health Check

```text
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "TalSuzo Bazaar API is healthy.",
  "data": {
    "status": "ok",
    "service": "talsuzo-bazaar-api",
    "environment": "local"
  }
}
```

## Create Refund Request

```text
POST /api/refunds/request
```

Request:

```json
{
  "customer_email": "customer@example.com",
  "order_id": "ORD-1001",
  "product_id": "PROD-1001",
  "product_name": "Wireless Headphones",
  "reason": "The item arrived damaged.",
  "message": "The box was opened and the product does not work."
}
```

Response:

```json
{
  "success": true,
  "message": "Refund request processed.",
  "data": {
    "request_id": "generated-id",
    "status": "approved",
    "customer_email": "customer@example.com",
    "customer_id": "CUS-1001",
    "order_id": "ORD-1001",
    "reason": "The request meets TalSuzo Bazaar refund policy requirements.",
    "matched_rules": ["VALID_REFUND_APPROVAL"],
    "actions": ["receive_request", "validate_input", "customer_lookup", "order_lookup", "policy_validation", "approval_decision"],
    "agent_summary": "Decision: approved. Reason: The request meets TalSuzo Bazaar refund policy requirements. Matched rules: VALID_REFUND_APPROVAL.",
    "created_at": "2026-06-01T00:00:00Z"
  }
}
```

Possible `status` values:

- `approved`
- `denied`
- `escalated`

Common policy rule codes:

- `VALID_REFUND_APPROVAL`
- `CUSTOMER_NOT_FOUND`
- `ORDER_NOT_FOUND`
- `ORDER_CUSTOMER_MISMATCH`
- `PRODUCT_NOT_IN_ORDER`
- `FINAL_SALE_DENIAL`
- `OUTSIDE_REFUND_WINDOW`
- `HIGH_VALUE_REFUND_ESCALATION`
- `HIGH_RISK_CUSTOMER_ESCALATION`
- `REFUND_ABUSE_RISK_ESCALATION`
- `PENDING_REFUND_ESCALATION`
- `PROMPT_INJECTION_ESCALATION`

## Get Refund Detail

```text
GET /api/refunds/{request_id}
```

Returns one refund decision record.

## Admin Refund Logs

```text
GET /api/admin/refunds
```

Returns refund decision logs for the admin dashboard.

## Admin Refund Log Detail

```text
GET /api/admin/refunds/{request_id}/logs
```

Returns one refund decision log with customer/order summary, matched policy rules, agent actions, timestamp, and agent summary.

## API Ownership

Refund support and admin review endpoints are project-owned FastAPI endpoints.

The storefront still uses the RouteMisr ecommerce API for product browsing and existing ecommerce demo flows. See [api_ownership.md](api_ownership.md) for the migration plan.
