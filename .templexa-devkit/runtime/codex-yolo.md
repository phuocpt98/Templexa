# Codex Yolo Runtime

## Why Codex Still Asked For Permission

The current interactive session can be trusted at the project level but still run with:

- restricted filesystem sandbox
- restricted network sandbox
- approval policy `OnRequest`

That means Puppeteer, network, GUI-like browser launch, and commands outside approved prefixes can still ask for approval.

## Yolo Launch

Use the wrapper:

```bash
.templexa-devkit/bin/tmx-codex-yolo
```

It launches:

```bash
codex -C <repo> --dangerously-bypass-approvals-and-sandbox
```

Pass a prompt after the wrapper if needed:

```bash
.templexa-devkit/bin/tmx-codex-yolo "fix invitation mobile overflow"
```

## Safer Alternative

```bash
codex -C <repo> -s workspace-write -a never
```

This avoids prompts but does not grant more filesystem/network access. Commands blocked by sandbox will fail instead of asking.

## Guardrail Reality

Repo hooks are guardrails, not a real sandbox. For stronger safety, run yolo mode inside:

- a devcontainer
- a Docker container
- a separate macOS user
- a disposable VM

