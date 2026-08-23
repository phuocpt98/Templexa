# Invitation LadiPage Standards

These rules apply to customer invitations under `products/Invitation/Wedding/` and similar LadiPage exports.

## Editing Pattern

- Prefer scoped overrides in a small `<style id="templexa-overrides">` block when modifying generated LadiPage HTML.
- Keep original generated CSS mostly intact unless a direct replacement is safer.
- When changing text or image references in minified HTML, verify by DOM query or browser screenshot.

## Animation

- Offscreen LadiPage elements should generally start as `ladi-animation-hidden`.
- If elements appear before scroll, compare with the source template and restore hidden classes.
- Verify by loading at top, inspecting hidden/animation counts, then scrolling to the affected section.

## Mobile Width

- Mobile invitations should not horizontally overflow.
- Verify `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- Common overflow sources: offscreen decorative images, absolute groups, popup backgrounds, fixed-width sections.

## Images

- Use local `customer/*.webp` where possible.
- After WebP conversion, verify all local references resolve and no local `.jpg/.jpeg/.png` remains unless intentionally kept.
- Do not convert SVG calendar/ornament files to WebP.

## Visual Check

- Use Puppeteer/Chromium screenshots for final layout checks.
- Inspect at least the affected scroll position and the first viewport.

