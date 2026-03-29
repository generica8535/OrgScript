# OrgScript Manual (English)

## Introduction
OrgScript is a human-readable, AI-friendly description language for operational logic, processes, and rules. It provides a shared, structured layer between plain-language documentation and technical execution.

## Core Concepts

### Process (`process`)
A process describes the operational flow of a task. It starts with a trigger (`when`) and contains conditional statements (`if`, `then`, `else`).
- **Statements**: `assign` (set a value), `transition` (change status), `notify` (alert a role).

### Stateflow (`stateflow`)
Stateflows define the lifecycle of an object (e.g., an Order or a lead).
- **states**: The allowed states.
- **transitions**: The defined paths between states.

### Rule (`rule`)
Rules define permanent conditions or validations ("Guardrails") that apply to an object.

### Role (`role`)
Roles define permission boundaries (`can`, `cannot`).

## CLI Usage (Command Line Interface)

OrgScript provides a powerful CLI tool (`orgscript`):

1. **Check**: `orgscript check <file>` — Validates syntax, lints the logic, and checks for canonical formatting.
2. **Analyze**: `orgscript analyze <file>` — Provides structural metrics and complexity hints.
3. **Export**: 
   - `export mermaid`: Generates Mermaid diagrams.
   - `export html`: Creates a standalone documentation page.
   - `export context`: Prepares logic context for AI ingest.

## Best Practices
- **Iterative Modeling**: Start with simple states and add processes over time.
- **AI Context**: Use `export context` to reliably feed your internal operational rules into AI agents.
- **Version Control**: Store your business logic in Git to track changes and collaborate through pull requests.

---
*Version 0.8.0 / OrgScript Foundation*
