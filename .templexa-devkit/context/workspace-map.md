# Workspace Map

The repo root is the Templexa application and product workspace.

| Path | Purpose |
|---|---|
| `.templexa-devkit/` | canonical model-neutral agent harness |
| `.claude/` | legacy Claude adapter and historical skills |
| `CLAUDE.md` | legacy Claude project context |
| `assets/` | global website CSS, JS, data, images |
| `products/` | generated products and customer invitations |
| `products/shared/` | shared assets, wedding library, music, animations, new intake |
| `scripts/` | conversion/protection utilities |
| `docs/` | docs, product catalog notes, memory |
| `wedding/` | wedding builder/customer folders |

## Editing Boundaries

- Customer invitation edits should stay inside the target folder unless shared assets/scripts are intentionally changed.
- Shared library edits affect many products and need stronger verification.
- `assets/js/data.js` and `assets/data/*.json` are catalog surfaces; update carefully and preserve existing format.
- `.claude/` should not receive new canonical rules unless maintaining Claude compatibility.

