# Integration: GitHub Actions

You can use OrgScript in your CI pipeline to ensure all logic models in your repository remain valid, lint-clean, and canonically formatted.

## Basic Validation Workflow

Create a file named `.github/workflows/orgscript-check.yml`:

```yaml
name: OrgScript Logic Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install OrgScript
        run: npm install -g orgscript
        
      - name: Run OrgScript Check
        run: |
          # Check all .orgs files in the repository
          find . -name "*.orgs" -exec orgscript check {} +
```

## AI Search/Index Ingest Workflow

To feed your organization's logic into an LLM or vector database periodically:

```yaml
  index-logic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install OrgScript
        run: npm install -g orgscript
      - name: Generate AI Context
        run: |
          mkdir -p logic-context
          for file in $(find examples -name "*.orgs"); do
            name=$(basename "$file" .orgs)
            orgscript export context "$file" > "logic-context/${name}.json"
          done
      # Then upload logic-context as artifact or push to your index
```
