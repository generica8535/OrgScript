# GitHub Project Setup

This document turns the local v0.5.0 planning artifacts into a clean GitHub milestone and issue set.

## Milestone

- name: `v0.5.0`
- title suggestion: `v0.5.0 - Adoption, Editor, and Polish`
- goal: make OrgScript easier to adopt, demo, and understand without expanding the language surface

## Issue creation order

1. [`feat(editor): improve VS Code syntax highlighting and local testing flow`](issues/v0.5.0/01-vscode-highlighting-v2.md)
2. [`docs(readme): add a visual source-to-artifact showcase`](issues/v0.5.0/02-readme-visual-showcase.md)
3. [`docs(examples): curate the example catalog into learning tiers`](issues/v0.5.0/03-curate-example-catalog.md)
4. [`enhancement(diagnostics): polish CLI diagnostics UX and check output`](issues/v0.5.0/04-diagnostics-ux-polish.md)
5. [`docs(governance): add language evolution and compatibility notes`](issues/v0.5.0/05-language-evolution-notes.md)

## Suggested labels

- `v0.5.0`
- `dx`
- `cli`
- `diagnostics`
- `editor`
- `documentation`
- `quality`
- `governance`
- `good first issue`
- `help wanted`

## Suggested release flow

1. create the `v0.5.0` milestone
2. create the five milestone issues from the local drafts
3. apply release and focus labels consistently
4. start implementation in the recommended order
5. when milestone scope is complete, prepare release notes under `docs/releases/`
6. wait for `main` CI to be green before tagging

## Notes

- Keep GitHub issue titles identical to the local draft titles.
- Prefer linking milestone issues back to the roadmap when relevant.
- Do not widen the milestone with new language features unless a concrete adoption blocker appears.
