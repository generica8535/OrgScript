# feat(editor): improve VS Code syntax highlighting

## Why

OrgScript already has a usable first VS Code extension, but the editor experience still needs refinement before it feels polished for everyday use.

## Scope

- refine TextMate scopes for top-level blocks, block names, references, and operators
- improve local testing and installation notes
- add one or two visual examples or usage hints for editor validation
- keep the scope limited to syntax highlighting and extension usability

## Definition Of Done

- highlighting is visibly better on the existing example files
- `editors/vscode/README.md` explains local testing clearly
- README or docs mention the improved editor support
- no semantic tokens, snippets, or IntelliSense are added in this step

## Labels

- `v0.5.0`
- `enhancement`
- `dx`
- `editor`

## Dependencies

- none

## Notes

Do not expand the language. Improve the first-run editor experience.
