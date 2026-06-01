# API App

FastAPI backend for TalSuzo Bazaar.

## Responsibilities

- Expose REST API endpoints for the frontend
- Receive customer refund requests
- Load synthetic CRM and order data
- Apply deterministic refund policy rules
- Run the AI agent workflow
- Store refund decisions and action logs
- Serve admin dashboard data

## Planned Local Command

```bash
uvicorn app.main:app --reload --port 4000
```

## Planned API Docs

```text
http://localhost:4000/docs
```

## Environment Variables

Use `.env.example` as the backend template.

```env
ENVIRONMENT=local
APP_NAME=TalSuzo Bazaar API
FRONTEND_ORIGIN=http://localhost:3000
OPENAI_API_KEY=replace-with-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
```
