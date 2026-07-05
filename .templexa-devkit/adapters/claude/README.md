# Claude Adapter

Legacy Claude files are still present:

- `CLAUDE.md`
- `.claude/commands/*`
- `.claude/skills/*`
- `.claude/refs/*`

New canonical rules live in `.templexa-devkit/`. Claude-specific commands can remain as compatibility wrappers, but updates should first be made in `.templexa-devkit/`.

## Migration Rule

When changing a skill or workflow:

1. Update `.templexa-devkit/`.
2. Mirror to `.claude/` only if Claude compatibility requires it.
3. Prefer small adapter notes over duplicated long instructions.

