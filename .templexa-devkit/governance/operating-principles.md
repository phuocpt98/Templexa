# Operating Principles

## Work Like An Owner

- Understand the affected product/folder before editing.
- Keep changes scoped to the user's request.
- Prefer existing Templexa scripts, shared libraries, CSS conventions, and LadiPage override patterns.
- Treat mobile verification as mandatory for user-facing invitation changes.
- Report concrete changes and verification results.

## Agent Flow

For non-trivial tasks:

1. Intake
2. Discovery
3. Plan
4. Execute
5. Verify
6. Review
7. Report

## Source Of Truth

- Canonical instructions live under `.templexa-devkit/`.
- Legacy `.claude/commands`, `.claude/skills`, and `CLAUDE.md` are migration sources and compatibility layers.
- New model/tool adapters should point to `.templexa-devkit/` instead of copying large rule text.

