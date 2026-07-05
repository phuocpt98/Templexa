# External Sandbox Options

Codex yolo bypasses Codex approvals and sandbox. If you want "run freely but limit blast radius", use an external sandbox controlled outside Codex.

## Option A: Separate macOS User

Create a dedicated local user such as `templexa-agent`, clone the repo there, and run:

```bash
.templexa-devkit/bin/tmx-codex-yolo
```

This prevents accidental access to your main user's home directory, browser profile, and unrelated project folders.

## Option B: Devcontainer / Docker

Use a container with only this repo mounted. This is safest for command execution, but Codex auth and browser dependencies need setup inside the container.

Recommended mount policy:

- mount repo read/write
- mount no personal home directories
- mount a temp directory for screenshots/artifacts
- provide only the env keys needed for the task

## Option C: Local Yolo With Hook Guard

Use:

```bash
.templexa-devkit/bin/tmx-codex-yolo
```

Then configure any available agent hook system to call:

```bash
.templexa-devkit/hooks/pre-command-policy.sh -- <command>
```

This is fastest but not a hard security boundary unless the runtime invokes the hook for every command.

