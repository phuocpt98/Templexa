---
name: Asset processing lessons
description: Lessons learned processing AI-generated images (Gemini), removing backgrounds, converting WebP, and handling icons
type: feedback
---

## Gemini AI images bake checkerboard into pixels
Don't trust PNG alpha metadata — Gemini gen images often have 4 channels but alpha=255 everywhere. Checkerboard pattern is rendered into RGB pixels.
**Why:** Gemini outputs "fake transparency" as visible checkerboard, not real alpha.
**How to apply:** Always check pixel values with sharp raw buffer. Use color threshold script to remove near-gray/white pixels (sat < 0.12, rgb > 170). Never assume hasAlpha means real transparency.

## Sharp WebP convert can lose alpha
`sharp(src).webp().toFile()` may output 3-channel if source has no real transparent pixels.
**Why:** Sharp optimizes away unused alpha channel.
**How to apply:** Process raw pixels first (set alpha=0 for bg pixels), then pipe through sharp with `alphaQuality: 100`.

## Bash on Windows crashes with long commands
Bash (Git Bash) frequently crashes with `Exit code 3221225477` on long `node -e` or `rm` with many files.
**Why:** Git Bash memory/path issues on Windows.
**How to apply:** Write `.js` script files and run `node script.js` instead of inline `node -e`. Use `node -e "fs.unlinkSync()"` for file deletion instead of `rm`.

## Always register new icons in wedding-data.js
Icons placed in `icons/` folder won't show in thu-vien-hieu-ung.html until added to `WEDDING_DATA.icons.items[]`.
**How to apply:** After processing icons, immediately add entries to wedding-data.js. Verify with `node -e "...WEDDING_DATA.icons.items.length"`.
