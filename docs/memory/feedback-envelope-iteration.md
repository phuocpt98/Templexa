---
name: Envelope design lessons from #218
description: User prefers simple CSS envelope (photo bg + tint + particles) over complex canvas/physics. Hero text should hide until envelope opens.
type: feedback
---

Envelope design: simple CSS beats complex canvas physics.

**Why:** Thiệp #218 iterated 6 times: veil lift → mist dissolve → canvas cloth (fabric folds) → flat wave grid (visible cells) → remove waves → final simple CSS. User rejected every "clever" approach. Winner = ảnh hero blur + purple tint overlay + sparkles/bubbles + fade out on click.

**How to apply:**
- Default envelope approach: hero photo as bg (blur 6px, opacity 0.5) + color tint overlay + decorative particles (sparkles + bubbles) + library flower icon as center decoration + floral frame from backgrounds library
- Click anywhere to open (not just button)
- No "chạm để mở" text — just the flower icon floating
- Fade out transition (1.8s opacity) — simplest, most elegant
- Hero text: opacity:0 by default, add `.revealed` class via JS after envelope opens → staggered animations (pretitle → names blur-to-sharp → date → scroll arrow)
- Avoid: canvas simulations, cloth physics, wave grids, translateY veil lift, complex mask-image reveals
- Use library assets: flower icons for button, floral backgrounds for frame decoration
