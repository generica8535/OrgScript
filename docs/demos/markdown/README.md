# Markdown summary demos

This folder shows the shortest path from OrgScript source to human-readable Markdown summaries.

Each demo keeps the source file in `examples/` and generates one downstream artifact here:

- `*.summary.md`: a concise Markdown summary of the modeled logic

## Generate

```text
npm run demo:generate
```

## Demos

| Demo | Source | Markdown summary |
| --- | --- | --- |
| Craft Business: Lead to Order | [craft-business-lead-to-order.orgs](../../../examples/craft-business-lead-to-order.orgs) | [craft-business-lead-to-order.summary.md](./craft-business-lead-to-order.summary.md) |
|  |  | Our hero example showcasing multi-block processes, rules, and stateflows in a realistic business scenario. |
| Hiring: Standard Candidate Process | [hiring-process.orgs](../../../examples/hiring-process.orgs) | [hiring-process.summary.md](./hiring-process.summary.md) |
|  |  | A multi-role hiring process including GDPR policies, manager permissions, and conditional rejection branches. |
| Incident Escalation SLA | [incident-escalation.orgs](../../../examples/incident-escalation.orgs) | [incident-escalation.summary.md](./incident-escalation.summary.md) |
|  |  | Operational incident handling with time-based escalation policies and on-call role definitions. |
| Lead qualification process | [lead-qualification.orgs](../../../examples/lead-qualification.orgs) | [lead-qualification.summary.md](./lead-qualification.summary.md) |
|  |  | A compact process example that shows trigger, branching, assignment, notification, and state transition. |
| Order approval stateflow | [order-approval.orgs](../../../examples/order-approval.orgs) | [order-approval.summary.md](./order-approval.summary.md) |
|  |  | A stateflow-focused example that also demonstrates how Mermaid export skips unsupported blocks while still producing useful output. |

## Notes

- These artifacts are generated from the current Markdown summary exporter.
- The summaries are intentionally concise and deterministic rather than prose-heavy.
- If you change Markdown export behavior, regenerate this folder with `npm run demo:generate` and review the diffs.

