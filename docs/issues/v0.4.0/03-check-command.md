# feat(cli): add orgscript check as a combined quality command

## Why

Most contributors want one command that answers the practical question: "Is this file ready?" A combined quality command reduces friction and makes OrgScript easier to adopt in CI and local workflows.

## Scope

- add `orgscript check <file>`
- run `validate`, `lint`, and `format --check` in one command
- produce a single summary that explains which sub-checks passed or failed
- keep exit behavior CI-friendly

## Definition Of Done

- CLI exposes `orgscript check <file>`
- success and failure paths are covered by tests
- output clearly identifies failing sub-checks
- README contains one example
- command works well as a single entry point for local verification

## Labels

- `v0.4.0`
- `enhancement`
- `dx`
- `cli`
- `quality`

## Dependencies

- [`feat(format): add --check mode for canonical formatting`](01-format-check.md)

## Notes

Prefer composition over duplication. `check` should reuse the existing command logic rather than reimplementing validation behavior.
