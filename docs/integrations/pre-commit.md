# Integration: Pre-commit Hooks

Ensure no invalid or non-canonical OrgScript logic enters your repository.

## Using Husky

If you use [Husky](https://typicode.github.io/husky/) in your project:

1. **Install Husky:**
   ```bash
   npm install husky --save-dev
   npx husky init
   ```

2. **Add pre-commit hook:**
   ```bash
   echo "find . -name '*.orgs' -exec orgscript check {} +" > .husky/pre-commit
   chmod +x .husky/pre-commit
   ```

## Using a Shell Script

For a barebones git pre-commit hook, add this to `.git/hooks/pre-commit`:

```bash
#!/bin/sh

# Staged files (.orgs only)
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".orgs$")

if [ -z "$STAGED_FILES" ]; then
    exit 0
fi

echo "Running OrgScript check on staged files..."

for file in $STAGED_FILES; do
    orgscript check "$file"
    if [ $? -ne 0 ]; then
        echo "OrgScript check failed for $file. Aborting commit."
        exit 1
    fi
done

exit 0
```
