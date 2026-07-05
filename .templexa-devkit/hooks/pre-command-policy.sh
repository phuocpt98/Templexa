#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--" ]]; then
  shift
fi

if [[ "$#" -gt 0 ]]; then
  cmd="$*"
else
  cmd="$(cat)"
fi

trimmed="$(printf '%s' "$cmd" | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//')"

deny() {
  echo "Command denied by Templexa policy: $1" >&2
  echo "Command: $trimmed" >&2
  exit 2
}

[[ -z "$trimmed" ]] && exit 0

# High-risk filesystem destruction.
if [[ "$trimmed" =~ (^|[[:space:];&|])rm[[:space:]]+.*(-rf|-fr|--recursive) ]]; then
  deny "recursive rm is not allowed in yolo mode"
fi

# Dangerous git state changes.
if [[ "$trimmed" =~ (^|[[:space:];&|])git[[:space:]]+reset[[:space:]]+--hard($|[[:space:];&|]) ]]; then
  deny "git reset --hard"
fi

if [[ "$trimmed" =~ (^|[[:space:];&|])git[[:space:]]+clean[[:space:]].*(-x|-X|-d).* ]]; then
  deny "git clean with destructive flags"
fi

if [[ "$trimmed" =~ (^|[[:space:];&|])git[[:space:]]+checkout[[:space:]]+(-f|--force)[[:space:]] ]]; then
  deny "forced git checkout"
fi

# Privilege escalation and system modification.
if [[ "$trimmed" =~ (^|[[:space:];&|])sudo($|[[:space:];&|]) ]]; then
  deny "sudo"
fi

if [[ "$trimmed" =~ (^|[[:space:];&|])(su|doas)($|[[:space:];&|]) ]]; then
  deny "privilege escalation"
fi

if [[ "$trimmed" =~ (^|[[:space:];&|])(chmod|chown)[[:space:]].*(-R|--recursive)[[:space:]]+(/|~|\$HOME) ]]; then
  deny "recursive chmod/chown outside project"
fi

# Disk, OS, and container destruction.
if [[ "$trimmed" =~ (^|[[:space:];&|])(dd|mkfs|diskutil)[[:space:]] ]]; then
  deny "disk operation"
fi

if [[ "$trimmed" =~ (^|[[:space:];&|])docker[[:space:]]+(system[[:space:]]+prune|volume[[:space:]]+prune|volume[[:space:]]+rm)[[:space:]] ]]; then
  deny "destructive docker operation"
fi

# Unsafe remote script execution.
if [[ "$trimmed" =~ (curl|wget).*(\||\>\().*(sh|bash|zsh) ]]; then
  deny "remote script piped to shell"
fi

# Secret dumping patterns.
if [[ "$trimmed" =~ (^|[[:space:];&|])(cat|sed|awk|grep|rg)[[:space:]].*(\.env|auth\.json|service-account|credentials|secret) ]]; then
  if [[ ! "$trimmed" =~ \.env\.example ]]; then
    deny "possible secret dump"
  fi
fi

exit 0
