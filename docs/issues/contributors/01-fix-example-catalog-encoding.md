# Fix example catalog encoding in examples/README.md

Suggested labels: `good first issue`, `documentation`

## Summary

The example catalog currently contains broken emoji/encoding output in section headings. Clean this up so the file renders cleanly on GitHub and stays ASCII-friendly unless Unicode is clearly intentional.

## Why this matters

The examples catalog is one of the first entry points for new contributors. Broken rendering makes the repo look less polished than it is.

## Scope

- inspect `examples/README.md`
- replace broken heading markers with clean text or intentional emoji
- keep the document easy to read on GitHub
- avoid changing the structure of the example catalog

## Definition of done

- `examples/README.md` renders cleanly
- no broken encoding artifacts remain
- the file still reads naturally on GitHub

## Notes

This is intentionally small and beginner-friendly.
