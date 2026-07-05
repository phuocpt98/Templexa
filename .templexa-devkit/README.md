# Templexa Devkit

Model-neutral agent harness for Templexa engineering, product generation, invitation customization, and operations.

This folder is the new source of truth for agents. Tool-specific folders such as `.claude/`, Codex settings, IDE prompts, or future model adapters should point here instead of duplicating rules.

## Goals

- Give any agent enough context to edit Templexa safely.
- Centralize product, wedding invitation, asset, screenshot, WebP, and deploy workflows.
- Preserve the old Claude skills while moving toward model-neutral instructions.
- Support fast local execution with an optional Codex yolo wrapper plus project-level command guardrails.

## Read Order

1. `governance/operating-principles.md`
2. `governance/safety-and-secrets.md`
3. `context/project-overview.md`
4. `context/workspace-map.md`
5. `standards/frontend-vanilla.md`
6. `standards/invitation-ladipage.md` when touching LadiPage invitations
7. A workflow under `workflows/`
8. A capability under `capabilities/`
9. Adapter notes under `adapters/` only when configuring a tool

## Structure

```text
.templexa-devkit/
├── adapters/       # Claude, Codex, and future tool integration notes
├── bin/            # local wrapper commands
├── capabilities/   # migrated skills from .claude/skills plus index
├── context/        # project, workspace, domain maps
├── governance/     # operating, safety, command policy
├── hooks/          # command guard scripts
├── refs/           # migrated wedding references from .claude/refs
├── runtime/        # yolo runtime and command execution notes
├── standards/      # coding/design/verification standards
├── templates/      # task and report templates
└── workflows/      # task lifecycle and common Templexa workflows
```

## Migrated From `.claude`

The first migration copied:

- `.claude/skills/*` to `capabilities/*`
- `.claude/refs/*` to `refs/*`
- `.claude/commands/*` to `workflows/legacy-commands/*`

Future updates should edit `.templexa-devkit/` first. `.claude/` is compatibility, not canonical.

## Codex Yolo

Use:

```bash
.templexa-devkit/bin/tmx-codex-yolo
```

This launches Codex with full approval/sandbox bypass for this repo. It is intended for a trusted local machine. The repo also includes `.templexa-devkit/hooks/pre-command-policy.sh` as the command denylist source, but the bypass itself is controlled by the Codex launch flags, not by files in this repo.

For stronger isolation, read `runtime/external-sandbox.md`.
