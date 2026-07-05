# Command Policy

The command policy has two layers.

## Runtime Layer

Codex sandbox/approval is controlled when Codex starts. Repo files cannot bypass it after the session has started.

Fast mode:

```bash
.templexa-devkit/bin/tmx-codex-yolo
```

Direct equivalent:

```bash
codex -C /path/to/Templexa --dangerously-bypass-approvals-and-sandbox
```

Safer no-prompt mode that can still fail on sandbox boundaries:

```bash
codex -C /path/to/Templexa -s workspace-write -a never
```

## Project Guard Layer

The denylist source is:

```bash
.templexa-devkit/hooks/pre-command-policy.sh
```

Use it in tool hook systems that support pre-command hooks. It can also be run manually:

```bash
.templexa-devkit/hooks/pre-command-policy.sh -- git status
```

The guard blocks high-risk commands such as force deletion, hard reset, disk formatting, privilege escalation, and unsafe curl-pipe-shell patterns.

## Important Limitation

If Codex is launched with `--dangerously-bypass-approvals-and-sandbox`, this repo-level hook only protects commands if the active tool runtime actually invokes the hook. For stronger isolation, launch Codex yolo inside a separate OS user, container, or devcontainer.

