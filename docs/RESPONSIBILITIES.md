# Frontend, Backend, Agent, and Data Responsibilities

## Frontend Responsibilities

The frontend is responsible for user experience.

- Show TalSuzo Bazaar storefront pages.
- Let customers browse products and manage cart/wishlist.
- Provide a `/support` refund request interface.
- Provide an `/admin/refunds` dashboard.
- Send clean API requests to the FastAPI backend.
- Display loading, success, error, empty, and decision states.

The frontend should not decide refund approval by itself.

## Backend Responsibilities

The backend is responsible for business workflow and API control.

- Validate refund request payloads.
- Read customer and order data.
- Call the agent workflow.
- Apply deterministic policy rules.
- Return structured API responses.
- Save refund decisions and action logs.
- Provide admin endpoints for dashboard review.

The backend is the central trusted layer.

## Agent Responsibilities

The agent is responsible for structured AI assistance.

- Understand and summarize customer refund requests.
- Use tools for customer, order, and policy lookup.
- Detect suspicious prompt injection attempts.
- Produce clear reasoning summaries for users and admins.
- Follow the policy engine decision.

The agent should not have permission to ignore company refund policy.

## Data Responsibilities

The data layer is responsible for project evidence and repeatability.

- Store synthetic customer profiles.
- Store synthetic order histories.
- Store refund policy rules.
- Store decision logs.

For the first version, JSON files are enough. MongoDB can be added later if the project needs persistent database behavior.
