# Capabilities

This folder contains migrated Claude skills. They are now model-neutral references for any agent.

## Migrated Capabilities

| Capability | Purpose |
|---|---|
| `catalog-assets` | classify new shared assets, convert, rename, catalog |
| `convert-webp` | convert PNG/JPG/JPEG to WebP and update references |
| `gen-landing` | generate landing page products |
| `gen-wedding` | generate wedding invitation products |
| `gen-wedding-pro` | higher-quality wedding generation workflow |
| `gen-anniversary-pro` | anniversary invitation workflow |
| `gen-baby-pro` | baby invitation workflow |
| `gen-birthday-pro` | birthday invitation workflow |
| `gen-qr` | generate QR codes |
| `scan-images` | scan product images into catalog metadata |
| `sort-music` | classify MP3 assets |
| `push` | deploy/protect workflow |

## Rule

When a capability is used, read that capability's `SKILL.md` and any referenced files before acting. New capabilities should be added here first, then adapted to `.claude/` only if needed.

