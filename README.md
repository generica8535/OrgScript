# OrgScript

Describe how your business works in a way humans and machines both understand.

OrgScript is a human-readable, AI-friendly description language for business logic, operational processes, rules, roles, and state transitions.

It is not a programming language. It is a text-first layer between plain-language documentation and technical execution.

## Why OrgScript exists

Organizations usually describe their logic in a mix of SOPs, tickets, spreadsheets, chat messages, CRM fields, and tribal knowledge. That makes processes hard to review, automate, validate, and improve.

OrgScript aims to provide one shared layer between plain-language documentation and technical execution.

```text
OrgScript text
-> parser
-> AST
-> canonical model
-> exports, validation, documentation, automation, AI analysis
```

## Design goals

- Human-readable and easy to author
- Strict enough for parsers and algorithms
- AI-friendly by default
- Text-first and diff-friendly
- Focused on business logic, not software implementation
- English-first, with localization as a later extension

## Non-goals

- General-purpose programming
- Turing-complete logic
- Workflow execution in the core language
- Replacing BPMN, CRMs, or task tools directly
- Free-form natural language without structure

## Example

Hero example: a craft business flow from lead intake to production approval.

```orgs
process CraftBusinessLeadToOrder

  when lead.created

  if lead.source = "referral" then
    assign lead.priority = "high"
    assign lead.sales_path = "premium"
    notify sales with "Handle referral lead first"

  else if lead.source = "aroundhome" then
    assign lead.priority = "low"
    assign lead.sales_path = "standard"

  if lead.project_type != "kitchen" and lead.project_type != "interior" then
    transition lead.status to "disqualified"
    notify sales with "Outside target project type"
    stop

  if lead.estimated_value < 10000 then
    transition lead.status to "disqualified"
    notify sales with "Below minimum project value"
    stop

  transition lead.status to "qualified"
  assign lead.owner = "sales"
```

See the full example in [`examples/craft-business-lead-to-order.orgs`](examples/craft-business-lead-to-order.orgs).

## From Source To Output

OrgScript already generates visible downstream artifacts.

Mermaid demos live in [`docs/demos/mermaid/README.md`](docs/demos/mermaid/README.md):

- process demo from [`examples/lead-qualification.orgs`](examples/lead-qualification.orgs) to [`docs/demos/mermaid/lead-qualification.mermaid.md`](docs/demos/mermaid/lead-qualification.mermaid.md)
- stateflow demo from [`examples/order-approval.orgs`](examples/order-approval.orgs) to [`docs/demos/mermaid/order-approval.mermaid.md`](docs/demos/mermaid/order-approval.mermaid.md)

Markdown summary demos live in [`docs/demos/markdown/README.md`](docs/demos/markdown/README.md):

- process summary from [`examples/lead-qualification.orgs`](examples/lead-qualification.orgs) to [`docs/demos/markdown/lead-qualification.summary.md`](docs/demos/markdown/lead-qualification.summary.md)
- mixed summary from [`examples/order-approval.orgs`](examples/order-approval.orgs) to [`docs/demos/markdown/order-approval.summary.md`](docs/demos/markdown/order-approval.summary.md)

Generate both demo sets with:

```text
npm run demo:generate
```

## Why this matters

- Teams get a shared source of truth for operational logic.
- AI can analyze process gaps without guessing from prose.
- Automation can be derived from structured text instead of tribal knowledge.
- Git diffs and code review become possible for business logic.

## What OrgScript is

- A description language for processes, rules, roles, policies, events, and stateflows
- Human-readable enough for operators and managers
- Structured enough for parsers, validators, and AI systems
- English-first in its canonical syntax

## What OrgScript is not

- A general-purpose programming language
- A workflow engine
- A replacement for BPMN, CRMs, or ERP systems
- Free-form natural language

## Core building blocks in v0.1

- `process`
- `stateflow`
- `rule`
- `role`
- `policy`
- `metric`
- `event`
- `when`
- `if`, `else`, `then`
- `assign`
- `transition`
- `notify`
- `create`
- `update`
- `require`
- `stop`

## Repo layout

- [`docs/manifesto.md`](docs/manifesto.md)
- [`docs/ast-v0.2.md`](docs/ast-v0.2.md)
- [`docs/cli-v0.1-plan.md`](docs/cli-v0.1-plan.md)
- [`docs/language-principles.md`](docs/language-principles.md)
- [`docs/github-labels.md`](docs/github-labels.md)
- [`docs/github-project-setup.md`](docs/github-project-setup.md)
- [`docs/governance.md`](docs/governance.md)
- [`docs/orgscript-for-humans.md`](docs/orgscript-for-humans.md)
- [`docs/orgscript-for-ai.md`](docs/orgscript-for-ai.md)
- [`docs/roadmaps/v0.4.0.md`](docs/roadmaps/v0.4.0.md)
- [`docs/repository-structure.md`](docs/repository-structure.md)
- [`docs/syntax.md`](docs/syntax.md)
- [`docs/semantics.md`](docs/semantics.md)
- [`docs/demos/markdown/README.md`](docs/demos/markdown/README.md)
- [`docs/demos/mermaid/README.md`](docs/demos/mermaid/README.md)
- [`examples/README.md`](examples/README.md)
- [`spec/grammar.ebnf`](spec/grammar.ebnf)
- [`spec/language-spec.md`](spec/language-spec.md)
- [`spec/canonical-model.md`](spec/canonical-model.md)
- [`spec/diagnostics.md`](spec/diagnostics.md)
- [`examples/craft-business-lead-to-order.orgs`](examples/craft-business-lead-to-order.orgs)
- [`examples/lead-qualification.orgs`](examples/lead-qualification.orgs)
- [`examples/order-approval.orgs`](examples/order-approval.orgs)
- [`examples/service-escalation.orgs`](examples/service-escalation.orgs)
- [`editors/vscode/README.md`](editors/vscode/README.md)
- [`packages/parser/README.md`](packages/parser/README.md)
- [`packages/cli/README.md`](packages/cli/README.md)
- [`packages/formatter/README.md`](packages/formatter/README.md)
- [`packages/linter/README.md`](packages/linter/README.md)

## Available now

- Draft language specification
- Examples from realistic business scenarios
- Separate guides for human authors and AI/tooling
- AST-backed validation: `orgscript validate <file>`
- AST-backed formatting: `orgscript format <file>`
- Canonical format checks: `orgscript format <file> --check`
- AST-backed linting: `orgscript lint <file>`
- Combined quality checks: `orgscript check <file>`
- Machine-readable combined checks: `orgscript check <file> --json`
- Machine-readable format checks: `orgscript format <file> --check --json`
- Canonical JSON export: `orgscript export json <file>`
- Markdown summary export: `orgscript export markdown <file>`
- Mermaid export for `process` and `stateflow`: `orgscript export mermaid <file>`
- Machine-readable diagnostics: `orgscript validate <file> --json`, `orgscript lint <file> --json`, `orgscript check <file> --json`
- Stable diagnostic codes across syntax, semantic validation, lint, format, and CLI usage errors
- Golden snapshot tests for AST, canonical model, and formatter output
- Stable lint severities: `error`, `warning`, `info`
- Canonical master spec: [`spec/language-spec.md`](spec/language-spec.md)
- Initial VS Code syntax-highlighting extension: [`editors/vscode`](editors/vscode)
- Generated demo artifacts for Mermaid and Markdown summaries under [`docs/demos`](docs/demos)

## Quick start

```text
npm install
node ./bin/orgscript.js validate ./examples/craft-business-lead-to-order.orgs
node ./bin/orgscript.js validate ./examples/craft-business-lead-to-order.orgs --json
node ./bin/orgscript.js check ./examples/craft-business-lead-to-order.orgs
node ./bin/orgscript.js check ./examples/craft-business-lead-to-order.orgs --json
node ./bin/orgscript.js format ./examples/craft-business-lead-to-order.orgs
node ./bin/orgscript.js format ./examples/craft-business-lead-to-order.orgs --check
node ./bin/orgscript.js format ./examples/craft-business-lead-to-order.orgs --check --json
node ./bin/orgscript.js lint ./tests/lint/process-missing-trigger.orgs
node ./bin/orgscript.js lint ./tests/lint/process-missing-trigger.orgs --json
node ./bin/orgscript.js export json ./examples/craft-business-lead-to-order.orgs
node ./bin/orgscript.js export markdown ./examples/craft-business-lead-to-order.orgs
node ./bin/orgscript.js export mermaid ./examples/craft-business-lead-to-order.orgs
```

Exit codes are CI-friendly:

- `validate` returns `0` for valid files and `1` for invalid files.
- `lint` returns `0` when findings contain only `warning` and `info`, and `1` when findings contain at least one `error`.
- `check` returns `0` only when validation passes, lint has no `error`, and formatting is canonical. Warnings and info findings alone do not fail `check`.

## JSON diagnostics

OrgScript exposes stable JSON diagnostics for CI, editors, AI systems, and downstream tooling.

`validate --json` on a canonical example:

```json
{
  "command": "validate",
  "file": "examples/craft-business-lead-to-order.orgs",
  "ok": true,
  "valid": true,
  "summary": {
    "topLevelBlocks": 4,
    "statements": 47,
    "diagnostics": 0,
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "diagnostics": []
}
```

`lint --json` on an error-producing fixture:

```json
{
  "command": "lint",
  "file": "tests/lint/process-multiple-triggers.orgs",
  "ok": false,
  "clean": false,
  "summary": {
    "diagnostics": 2,
    "error": 1,
    "warning": 0,
    "info": 1
  },
  "diagnostics": [
    {
      "source": "lint",
      "severity": "error",
      "code": "lint.process-multiple-triggers",
      "file": "tests/lint/process-multiple-triggers.orgs",
      "line": 5,
      "message": "Process `MultipleTriggers` declares multiple `when` triggers."
    },
    {
      "source": "lint",
      "severity": "info",
      "code": "lint.process-trigger-order",
      "file": "tests/lint/process-multiple-triggers.orgs",
      "line": 5,
      "message": "Process `MultipleTriggers` declares a `when` trigger after operational statements."
    }
  ]
}
```

`check --json` on a clean file:

```json
{
  "command": "check",
  "file": "examples/craft-business-lead-to-order.orgs",
  "ok": true,
  "summary": {
    "diagnostics": 0,
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "validate": {
    "ok": true,
    "valid": true,
    "skipped": false,
    "summary": {
      "topLevelBlocks": 4,
      "statements": 47,
      "diagnostics": 0,
      "error": 0,
      "warning": 0,
      "info": 0
    },
    "diagnostics": []
  },
  "lint": {
    "ok": true,
    "clean": true,
    "skipped": false,
    "summary": {
      "diagnostics": 0,
      "error": 0,
      "warning": 0,
      "info": 0
    },
    "diagnostics": []
  },
  "format": {
    "ok": true,
    "canonical": true,
    "skipped": false,
    "summary": {
      "diagnostics": 0,
      "error": 0,
      "warning": 0,
      "info": 0
    },
    "diagnostics": []
  }
}
```

`format --check --json` on a canonical file:

```json
{
  "command": "format",
  "file": "examples/order-approval.orgs",
  "ok": true,
  "canonical": true,
  "check": true,
  "mode": "check",
  "summary": {
    "diagnostics": 0,
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "diagnostics": []
}
```

## Guides

- Human authoring guide: [`docs/orgscript-for-humans.md`](docs/orgscript-for-humans.md)
- AI interpretation guide: [`docs/orgscript-for-ai.md`](docs/orgscript-for-ai.md)
- Diagnostics contract: [`spec/diagnostics.md`](spec/diagnostics.md)
- Canonical language spec: [`spec/language-spec.md`](spec/language-spec.md)
- Language governance: [`docs/governance.md`](docs/governance.md)
- Example catalog: [`examples/README.md`](examples/README.md)
- VS Code editor scaffold: [`editors/vscode/README.md`](editors/vscode/README.md)

## Visible outputs

OrgScript currently produces two human-facing output types from the same source file:

- Mermaid diagrams via `orgscript export mermaid <file>`
- Markdown summaries via `orgscript export markdown <file>`

## Editor support

OrgScript now ships with a first usable VS Code syntax-highlighting extension under [`editors/vscode`](editors/vscode).

It currently covers:

- `.orgs` file association
- top-level blocks and block names
- core statements and section keywords
- strings, booleans, numbers, and operators
- dotted references such as `lead.status` and `lead.created`

See [`editors/vscode/README.md`](editors/vscode/README.md) for local installation and usage notes.

## Near-term plan

1. Expand diagnostics examples and integration guidance around CI and editors.
2. Improve diagnostics consistency further across human-readable CLI output.
3. Grow the example catalog across `simple`, `realistic`, and `advanced` scenarios.
4. Extend editor support beyond the initial VS Code syntax-highlighting scaffold.
5. Add additional downstream exporters and documentation views.

See [`docs/roadmaps/v0.4.0.md`](docs/roadmaps/v0.4.0.md) for the current milestone plan.

## CLI

Available now:

```text
orgscript validate file.orgs
orgscript validate file.orgs --json
orgscript format file.orgs
orgscript format file.orgs --check
orgscript format file.orgs --check --json
orgscript lint file.orgs
orgscript lint file.orgs --json
orgscript export json file.orgs
orgscript export markdown file.orgs
orgscript export mermaid file.orgs
orgscript check file.orgs
orgscript check file.orgs --json
```

`orgscript check` runs `validate`, `lint`, and `format --check` in that order and fails on validation errors, lint errors, or formatting drift. Warnings and info findings alone do not fail the command.

`orgscript export mermaid` currently supports `process` and `stateflow` blocks and emits a Markdown document with Mermaid code blocks for direct use in GitHub or docs.

See [`docs/cli-v0.1-plan.md`](docs/cli-v0.1-plan.md) for the implementation plan.

## Testing

```text
npm test
npm run export:markdown
npm run export:mermaid
npm run demo:generate
npm run check
npm run check:all
npm run format:check:all
npm run validate:all
npm run lint:all
npm run golden:generate
```

## License

Apache-2.0

See [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE).
