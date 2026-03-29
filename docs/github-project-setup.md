# GitHub Project Setup

This document turns the local v0.4.0 planning artifacts into a clean GitHub milestone and issue set.

## Milestone

- name: `v0.4.0`
- title suggestion: `v0.4.0 - Developer Experience`
- goal: make OrgScript easier to use in local workflows, CI, and editors without expanding the language surface

## Issue creation order

1. [`feat(format): add --check mode for canonical formatting`](issues/v0.4.0/01-format-check.md)
2. [`docs(cli): add JSON diagnostics examples and contract`](issues/v0.4.0/02-json-diagnostics-docs.md)
3. [`feat(cli): add orgscript check as a combined quality command`](issues/v0.4.0/03-check-command.md)
4. [`enhancement(diagnostics): make CLI output more consistent and machine-friendly`](issues/v0.4.0/04-diagnostics-consistency.md)
5. [`feat(editor): add initial VS Code syntax highlighting scaffold`](issues/v0.4.0/05-vscode-syntax-highlighting.md)

## Suggested labels

- `v0.4.0`
- `dx`
- `cli`
- `formatter`
- `diagnostics`
- `editor`
- `documentation`
- `quality`
- `good first issue`
- `help wanted`

## Suggested release flow

1. create the `v0.4.0` milestone
2. create the five milestone issues from the local drafts
3. apply release and focus labels consistently
4. start implementation in the recommended order
5. when milestone scope is complete, prepare release notes under `docs/releases/`
6. wait for `main` CI to be green before tagging

## Notes

- Keep GitHub issue titles identical to the local draft titles.
- Prefer linking milestone issues back to the roadmap when relevant.
- Do not widen the milestone with new language features unless a concrete adoption blocker appears.
