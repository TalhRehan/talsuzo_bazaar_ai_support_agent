# Shared Package

Shared contracts for TalSuzo Bazaar.

Use this package for types and schemas that must stay consistent between the frontend and backend.

Examples:

- Refund request shape
- Refund response shape
- Customer profile shape
- Order shape
- Decision status values

The backend will use Pydantic schemas. The frontend can mirror those contracts with TypeScript types.

## Folder Structure

```text
packages/shared/
  types/
  schemas/
```
