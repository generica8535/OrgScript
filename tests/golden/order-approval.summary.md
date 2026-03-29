# Stateflow: OrderStatus

## States
- draft
- pending_approval
- approved
- production
- completed
- cancelled

## Allowed transitions
- `draft -> pending_approval`
- `pending_approval -> approved`
- `approved -> production`
- `production -> completed`
- `draft -> cancelled`
- `pending_approval -> cancelled`

# Rule: NoProductionWithoutApproval

## Scope
- `order`

## Summary
- If `order.approved = false`, require `management_approval` and notify `operations` with `"Order cannot enter production"`.
