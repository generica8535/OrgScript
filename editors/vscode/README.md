# OrgScript VS Code

This folder contains the official, locally testable VS Code extension for `.orgs` files.

## What is included

- `package.json` registers the `OrgScript` language with language id `orgscript`
- `syntaxes/orgscript.tmLanguage.json` provides TextMate-based syntax highlighting
- `language-configuration.json` adds lightweight editor behavior for double-quoted strings
- `.vscode/launch.json` provides an Extension Development Host launch target for F5 testing

## What is highlighted

- top-level blocks such as `process`, `stateflow`, `rule`, `role`, `policy`, `metric`, and `event`
- block names such as `LeadQualification` or `OrderLifecycle`
- section keywords such as `states`, `transitions`, `applies to`, `can`, `cannot`, `formula`, `owner`, and `target`
- core statements such as `when`, `if`, `else`, `then`, `assign`, `transition`, `notify`, `create`, `update`, `require`, and `stop`
- operator forms such as `=`, `!=`, `<`, `<=`, `>`, `>=`, and `->`
- dotted references such as `lead.status` and `lead.created`
- strings, booleans, and numeric literals

OrgScript does not define an official comment syntax in the language spec yet, so this extension intentionally does not add comment highlighting.

## Local testing in VS Code

1. Open this repository in VS Code.
2. Open the `editors/vscode/` folder directly in VS Code, or add it to your Workspace. It works best if `editors/vscode/` is the active root workspace because `.vscode/launch.json` is located there.
3. Open the Run and Debug side panel (Ctrl+Shift+D).
4. Make sure "Launch OrgScript Extension" is selected at the top.
5. Press `F5` to start the Extension Development Host.
6. In the newly opened Extension Development Host window, open the root `OrgScript` folder and open one of these realistic test files:
   - `examples/craft-business-lead-to-order.orgs`
   - `examples/order-approval.orgs`
   - `examples/service-escalation.orgs`
7. Confirm that the language mode in the bottom right corner is `OrgScript`.
8. Check that blocks, statements, strings, operators, and dotted references are highlighted correctly (including inline occurrences of `then` and dotted properties).

## Good demo files

- `examples/craft-business-lead-to-order.orgs`
  Good for `process`, `if`, strings, dotted references, operators, and `stateflow`.
- `examples/order-approval.orgs`
  Good for `stateflow`, `rule`, `applies to`, and transitions.
- `examples/service-escalation.orgs`
  Good for `policy`, `event`, `metric`, and role-oriented language.

## Current scope

- TextMate grammar only
- no semantic tokens
- no IntelliSense
- no snippets
- no hover provider
- no diagnostics integration
- no editor-driven formatting
