# Codex Adapter

Codex should read `.templexa-devkit/README.md` first, then the workflow/capability relevant to the task.

## Normal Mode

```bash
codex -C /Users/phantienphuoc/Documents/project/web/Templexa
```

## Yolo Mode

```bash
.templexa-devkit/bin/tmx-codex-yolo
```

This uses Codex's official bypass flag. It does not depend on `.claude`.

## Project Trust

`~/.codex/config.toml` may mark this project trusted, but trust does not disable sandbox/approvals by itself.

## Hooks

The project command policy lives at:

```bash
.templexa-devkit/hooks/pre-command-policy.sh
```

If a future Codex hook configuration is added, point it at that file rather than copying deny rules into global config.

