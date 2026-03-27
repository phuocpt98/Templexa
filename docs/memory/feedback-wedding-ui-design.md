---
name: Wedding UI design lessons
description: UI/UX lessons from redesigning wedding invitation sections — emoji issues, object-fit, brainstorm-first workflow
type: feedback
---

## Never use emoji for decorative elements
Emojis like 🪨🌿🌱 break on some devices/OS versions. Always use icon images from the shared library.
**Why:** User reported broken display on some devices for `sign-ground` emoji row.
**How to apply:** Replace emoji decorations with `<img>` from `products/shared/images/wedding/icons/`. Mirror with `scaleX(-1)` for symmetry.

## object-fit:cover cuts edge details
Using `object-fit: cover` on gate/door images cuts off hinges and edges.
**Why:** Cover crops to fill container, losing content at edges.
**How to apply:** Use `object-fit: contain` + slight overlap (`width: 52%`, `left: -2%`) to keep full image while closing gaps between panels.

## Brainstorm before coding envelope/section redesigns
Presenting 4-5 options with pros/cons before implementing leads to better results and avoids rework.
**Why:** User changed direction multiple times when we jumped straight to coding (iron gate → watercolor book → composed pieces → AI image).
**How to apply:** Always use brainstormer agent first for envelope/open effects and major section redesigns. Let user pick, then implement once.

## Hanging tags pattern works well for event info
2 tags on a rope line with swing animation — charming, responsive, no emoji dependency.
**How to apply:** Reusable pattern: rope-line div + hang-tag cards with ::before string + ::after knot. Icons from glass-white set work well inside tags.
