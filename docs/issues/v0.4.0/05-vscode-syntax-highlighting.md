# feat(editor): add initial VS Code syntax highlighting scaffold

## Why

A language project becomes much easier to adopt once files are readable in a mainstream editor. Syntax highlighting is a high-leverage DX improvement without changing the language itself.

## Scope

- add a minimal VS Code extension scaffold for `.orgs`
- register the `.orgs` extension
- highlight:
  - top-level blocks
  - core keywords
  - strings
  - operators
- document local installation and usage

## Definition Of Done

- `.orgs` files are recognized by VS Code
- OrgScript keywords receive basic syntax highlighting
- extension scaffold lives in the repository with a short setup guide
- README or docs mention the editor integration

## Labels

- `v0.4.0`
- `enhancement`
- `dx`
- `editor`

## Dependencies

- none

## Notes

Keep the first pass small and explicit. A basic TextMate grammar is enough for the initial milestone.
