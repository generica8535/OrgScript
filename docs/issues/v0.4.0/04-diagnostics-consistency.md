# enhancement(diagnostics): make CLI output more consistent and machine-friendly

## Why

OrgScript now has multiple quality commands. Their human-readable output should feel intentionally designed, not merely functional.

## Scope

- standardize text output shape across `validate`, `lint`, and `format --check`
- keep severity, code, file, line, and message ordering stable
- align JSON and text diagnostics so they describe the same result consistently
- improve wording for a handful of common error and finding messages

## Definition Of Done

- CLI output is visibly consistent across representative commands
- tests assert both output content and output structure
- at least five common error or finding messages are improved
- JSON diagnostics remain stable while text output becomes easier to scan

## Labels

- `v0.4.0`
- `enhancement`
- `dx`
- `diagnostics`
- `ux`

## Dependencies

- [`feat(format): add --check mode for canonical formatting`](01-format-check.md)
- [`feat(cli): add orgscript check as a combined quality command`](03-check-command.md)

## Notes

This is about consistency, not verbosity. Prefer small, stable output contracts over highly decorative CLI output.
