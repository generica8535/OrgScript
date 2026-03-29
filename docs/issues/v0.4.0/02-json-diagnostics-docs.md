# docs(cli): add JSON diagnostics examples and contract

## Why

The machine-readable diagnostics are one of OrgScript's strongest integration points, but they are not yet visible enough in the public docs.

## Scope

- document `orgscript validate <file> --json` in the README
- document `orgscript lint <file> --json` in the README
- add concrete JSON output examples for valid and invalid cases
- clarify severity fields, file and line structure, and exit behavior
- keep the examples aligned with real CLI output

## Definition Of Done

- README contains at least one real JSON example for `validate --json`
- README contains at least one real JSON example for `lint --json`
- [`spec/diagnostics.md`](../../../spec/diagnostics.md) stays consistent with the examples
- examples are derived from current fixtures or golden-style snapshots

## Labels

- `v0.4.0`
- `documentation`
- `dx`
- `cli`
- `diagnostics`

## Dependencies

- none

## Notes

This issue is deliberately documentation-first. It should not introduce new diagnostics behavior unless the docs uncover a mismatch.
