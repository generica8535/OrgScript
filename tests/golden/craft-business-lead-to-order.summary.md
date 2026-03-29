# Process: CraftBusinessLeadToOrder

## Trigger
- `lead.created`

## Summary
- If `lead.source = "referral"`, assign `lead.priority` to `"high"`, assign `lead.sales_path` to `"premium"`, and notify `sales` with `"Handle referral lead first"`.
- Else if `lead.source = "aroundhome"`, assign `lead.priority` to `"low"` and assign `lead.sales_path` to `"standard"`.
- If `lead.project_type != "kitchen" and lead.project_type != "interior"`, transition `lead.status` to `"disqualified"`, notify `sales` with `"Outside target project type"`, and stop the branch.
- If `lead.estimated_value < 10000`, transition `lead.status` to `"disqualified"`, notify `sales` with `"Below minimum project value"`, and stop the branch.
- Then transition `lead.status` to `"qualified"` and assign `lead.owner` to `"sales"`.

# Process: QuoteToOrder

## Trigger
- `quote.accepted`

## Summary
- If `order.deposit_received = false`, transition `order.status` to `"awaiting_deposit"`, notify `finance` with `"Deposit required before confirmation"`, and stop the branch.
- Then transition `order.status` to `"confirmed"`, create `production_order`, and notify `operations` with `"Order ready for production planning"`.

# Stateflow: OrderLifecycle

## States
- qualified
- quoted
- awaiting_deposit
- confirmed
- in_production
- scheduled_for_installation
- completed
- cancelled

## Allowed transitions
- `qualified -> quoted`
- `quoted -> awaiting_deposit`
- `quoted -> confirmed`
- `awaiting_deposit -> confirmed`
- `confirmed -> in_production`
- `in_production -> scheduled_for_installation`
- `scheduled_for_installation -> completed`
- `qualified -> cancelled`
- `quoted -> cancelled`
- `awaiting_deposit -> cancelled`

# Rule: NoProductionWithoutDeposit

## Scope
- `order`

## Summary
- If `order.deposit_received = false`, require `finance_clearance` and notify `operations` with `"Production blocked until deposit is received"`.
