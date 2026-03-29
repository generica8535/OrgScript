# enhancement(diagnostics): polish diagnostics UX

## Why

Diagnostics are already stable and machine-readable, but the human-facing experience can still become clearer and easier to scan.

## Scope

- improve wording of common diagnostics
- make `check` output easier to read
- preserve stable code namespaces and JSON contracts
- keep text and JSON behavior aligned

## Definition Of Done

- common diagnostics read more cleanly
- `check` output is easier to scan without losing structure
- no existing diagnostic code stability is broken
- README or spec remains consistent with implementation

## Labels

- `v0.5.0`
- `enhancement`
- `diagnostics`
- `ux`

## Dependencies

- current diagnostics contract in `spec/diagnostics.md`

## Notes

This is a polish pass, not a language change.
