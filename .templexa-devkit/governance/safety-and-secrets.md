# Safety And Secrets

## Secrets

- Do not print secret values from `.env`, API keys, tokens, Google Sheets deployment URLs, service account files, or credentials.
- It is okay to report that a required key exists or is missing by key name.
- Generated exports can contain customer data and should not be committed unless explicitly intended and sanitized.

## Customer Assets

- Customer images, QR codes, and invitation details are production content.
- Do not delete originals unless a workflow explicitly does so and references are updated.
- For WebP conversion, confirm resulting references point to existing files.

## Git

- Do not run destructive commands such as `git reset --hard`, `git clean -fdx`, or branch deletion unless the user explicitly asks.
- Do not revert unrelated changes.
- Inspect `git status` before commit/deploy workflows.

## External Commands

- Prefer project wrappers in `.templexa-devkit/bin/` and `scripts/`.
- Any yolo mode should run only on a trusted local machine or inside an external sandbox.

