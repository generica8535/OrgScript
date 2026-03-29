# Policy: LateResponseEscalation

## Clauses
- When `ticket.unanswered_for > 24h`, notify `owner` with `"Ticket waiting more than 24 hours"`.
- When `ticket.unanswered_for > 48h`, assign `ticket.owner` to `"team_lead"` and notify `team_lead` with `"Ticket escalated after 48 hours"`.

# Role: Support

## Can
- `view ticket`
- `update ticket.status`
- `create followup`

## Cannot
- `close refund_case`
