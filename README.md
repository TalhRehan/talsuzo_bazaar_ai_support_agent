# TalSuzo Bazaar

TalSuzo Bazaar is a Next.js ecommerce storefront that will be extended into a full-stack AI-powered customer support system for refund decisions.

## Project Identity

- Project name: TalSuzo Bazaar
- Package name: `talsuzo-bazaar`
- Product type: Ecommerce storefront with AI customer support
- Main customer feature: Shopping and refund support
- Main admin feature: Refund decision review dashboard

The final system will include:

- Ecommerce storefront
- Customer refund chat interface
- Backend API
- AI refund decision agent
- Synthetic CRM and order data
- Refund policy document
- Admin dashboard for reasoning logs and decisions
- Docker Compose local setup

## Current Frontend

The current app is built with:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- NextAuth
- Server actions

## Planned Backend

The backend will use the stack that best matches the project direction and Talha Rehan's AI/backend skill set:

- Python
- FastAPI
- Pydantic
- LangGraph
- LangChain
- OpenAI API
- Docker Compose

Run locally:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Check code:

```bash
npm run lint
npm run build
```

## Required Environment Variables

Create `.env.local` from `.env.example`.

```env
NEXTAUTH_SECRET=change-this-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

When the AI backend is added, API keys will be configured in the backend environment, not exposed directly in the frontend.

## Planned Architecture

```text
current root frontend/Next.js app
  Customer shop UI
  Refund chat UI
  Admin dashboard UI

apps/api FastAPI backend
  Auth/customer endpoints
  Refund request endpoints
  Admin log endpoints

agent layer
  Customer lookup
  Order lookup
  Refund policy validation
  LLM reasoning support
  Final approve/deny/escalate decision

data layer
  Synthetic customers
  Synthetic orders
  Refund policy document
  Agent decision logs
```

## Implementation Plan

See [docs/AI_SUPPORT_AGENT_PLAN.md](docs/AI_SUPPORT_AGENT_PLAN.md).

## Project Structure Docs

- [Project identity](docs/PROJECT_IDENTITY.md)
- [Architecture](docs/architecture.md)
- [Frontend, backend, agent, and data responsibilities](docs/RESPONSIBILITIES.md)
- [API contract](docs/api_contract.md)
- [API ownership and migration plan](docs/api_ownership.md)
- [Agent workflow](docs/agent_workflow.md)
- [AI support agent plan](docs/AI_SUPPORT_AGENT_PLAN.md)
