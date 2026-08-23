# Task Intake Workflow

Use this for every non-trivial Templexa task.

1. Identify task type: global site, generated product, customer invitation, shared asset, catalog/data, deploy.
2. Identify affected paths and read nearby files.
3. Check for existing scripts or capabilities.
4. Choose a scoped implementation strategy.
5. Make edits.
6. Verify with the smallest reliable checks.
7. Report changed files and verification.

## Default Verification By Task Type

| Task | Minimum verification |
|---|---|
| Customer invitation HTML | Puppeteer screenshot or DOM checks at affected scroll positions |
| WebP conversion | file existence, reference check, browser load check |
| Global CSS/JS | render affected page and check console |
| Catalog metadata | syntax check and product path check |
| Deploy | git status, protect script result, push result |

