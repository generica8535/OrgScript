# Polish VS Code syntax highlighting scopes

Suggested labels: `help wanted`, `editor`, `dx`

## Summary

Improve the current VS Code syntax-highlighting grammar so common OrgScript files look cleaner and more consistent across themes.

## Why this matters

The initial highlighting works, but editor polish has a strong effect on adoption and contributor confidence.

## Scope

- review the current TextMate grammar under `editors/vscode`
- improve highlighting for block names, dotted references, and operators where helpful
- keep the grammar simple and maintainable
- do not add semantic tokens or IntelliSense in this issue

## Definition of done

- existing example files remain highlighted correctly
- common OrgScript constructs look cleaner in VS Code
- editor docs mention the improvement if needed

## Notes

This is a good issue for contributors comfortable with VS Code grammars.
