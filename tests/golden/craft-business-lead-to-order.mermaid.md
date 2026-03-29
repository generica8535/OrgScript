# OrgScript Mermaid Export

## Process: CraftBusinessLeadToOrder

```mermaid
flowchart TD
  p1_start_1(["CraftBusinessLeadToOrder"])
  p1_action_2["when lead.created"]
  p1_decision_3{"if lead.source = &quot;referral&quot;"}
  p1_action_4["assign lead.priority = &quot;high&quot;"]
  p1_action_5["assign lead.sales_path = &quot;premium&quot;"]
  p1_action_6["notify sales with &quot;Handle referral lead first&quot;"]
  p1_decision_7{"if lead.source = &quot;aroundhome&quot;"}
  p1_action_8["assign lead.priority = &quot;low&quot;"]
  p1_action_9["assign lead.sales_path = &quot;standard&quot;"]
  p1_decision_10{"if lead.project_type != &quot;kitchen&quot; and lead.project_type != &quot;interior&quot;"}
  p1_action_11["transition lead.status to &quot;disqualified&quot;"]
  p1_action_12["notify sales with &quot;Outside target project type&quot;"]
  p1_stop_13(["stop"])
  p1_decision_14{"if lead.estimated_value < 10000"}
  p1_action_15["transition lead.status to &quot;disqualified&quot;"]
  p1_action_16["notify sales with &quot;Below minimum project value&quot;"]
  p1_stop_17(["stop"])
  p1_action_18["transition lead.status to &quot;qualified&quot;"]
  p1_action_19["assign lead.owner = &quot;sales&quot;"]
  p1_end_20(["done"])
  p1_start_1 --> p1_action_2
  p1_action_2 --> p1_decision_3
  p1_decision_3 -->|yes| p1_action_4
  p1_action_4 --> p1_action_5
  p1_action_5 --> p1_action_6
  p1_decision_3 -->|no| p1_decision_7
  p1_decision_7 -->|yes| p1_action_8
  p1_action_8 --> p1_action_9
  p1_action_6 --> p1_decision_10
  p1_action_9 --> p1_decision_10
  p1_decision_7 -->|no| p1_decision_10
  p1_decision_10 -->|yes| p1_action_11
  p1_action_11 --> p1_action_12
  p1_action_12 --> p1_stop_13
  p1_decision_10 -->|no| p1_decision_14
  p1_decision_14 -->|yes| p1_action_15
  p1_action_15 --> p1_action_16
  p1_action_16 --> p1_stop_17
  p1_decision_14 -->|no| p1_action_18
  p1_action_18 --> p1_action_19
  p1_action_19 --> p1_end_20
```

## Process: QuoteToOrder

```mermaid
flowchart TD
  p2_start_1(["QuoteToOrder"])
  p2_action_2["when quote.accepted"]
  p2_decision_3{"if order.deposit_received = false"}
  p2_action_4["transition order.status to &quot;awaiting_deposit&quot;"]
  p2_action_5["notify finance with &quot;Deposit required before confirmation&quot;"]
  p2_stop_6(["stop"])
  p2_action_7["transition order.status to &quot;confirmed&quot;"]
  p2_action_8["create production_order"]
  p2_action_9["notify operations with &quot;Order ready for production planning&quot;"]
  p2_end_10(["done"])
  p2_start_1 --> p2_action_2
  p2_action_2 --> p2_decision_3
  p2_decision_3 -->|yes| p2_action_4
  p2_action_4 --> p2_action_5
  p2_action_5 --> p2_stop_6
  p2_decision_3 -->|no| p2_action_7
  p2_action_7 --> p2_action_8
  p2_action_8 --> p2_action_9
  p2_action_9 --> p2_end_10
```

## Stateflow: OrderLifecycle

```mermaid
stateDiagram-v2
  state "qualified" as s3_state_1
  state "quoted" as s3_state_2
  state "awaiting_deposit" as s3_state_3
  state "confirmed" as s3_state_4
  state "in_production" as s3_state_5
  state "scheduled_for_installation" as s3_state_6
  state "completed" as s3_state_7
  state "cancelled" as s3_state_8
  s3_state_1 --> s3_state_2
  s3_state_2 --> s3_state_3
  s3_state_2 --> s3_state_4
  s3_state_3 --> s3_state_4
  s3_state_4 --> s3_state_5
  s3_state_5 --> s3_state_6
  s3_state_6 --> s3_state_7
  s3_state_1 --> s3_state_8
  s3_state_2 --> s3_state_8
  s3_state_3 --> s3_state_8
```

> Note: Mermaid export currently supports only process and stateflow blocks. Skipped: rule NoProductionWithoutDeposit.
