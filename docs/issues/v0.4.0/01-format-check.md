# feat(format): add --check mode for canonical formatting

## Why

`orgscript format` can already normalize files, but CI and pre-commit workflows also need a non-mutating check mode.

## Scope

- add `orgscript format <file> --check`
- exit `0` when the file is already canonically formatted
- exit `1` when formatting changes would be required
- keep current write-in-place behavior unchanged when `--check` is not used
- produce clear output that explains whether the file is canonical

## Definition Of Done

- CLI supports `--check`
- tests cover:
  - already formatted file
  - non-canonical file
  - invalid file
- README contains one short `format --check` example
- CI can use `format --check` without modifying files

## Labels

- `v0.4.0`
- `enhancement`
- `dx`
- `cli`
- `formatter`

## Dependencies

- none

## Notes

Prefer deterministic messages so the command works well in local shells, CI logs, and future editor integrations.
