# Templexa Project Memory

## Wedding Data Architecture (updated 2026-03-25)
- **Single source of truth**: `products/shared/wedding-data.js` — `WEDDING_DATA` object
- Previously 3 files (catalog.json, wedding-asset-catalog.js, shared-data.js) — NOW DELETED
- Contains: backgrounds (34), icons (161), elements (38), photoCollections (9), music (11), fonts (6), generalIcons (5), stylePresets (7)
- Query helpers: findBackgrounds, findIcons, findElements, findPhotoSets, findMusic, getStylePreset
- Node.js compat: `module.exports` at bottom

## Icon path gotcha
- `WEDDING_DATA.icons.basePath` = `products/shared/images/wedding/icons/`
- BUT `icon.file` already includes `icons/` prefix (e.g. `icons/wax-seal.webp`)
- So use `basePath.replace(/icons\/$/, '')` + `file` to get correct path
- Elements don't have this issue: `basePath` = `products/shared/images/`, `file` = `wedding-elements/xxx.webp`

## thu-vien-hieu-ung.html Structure
- Dark-theme only resource library page (~1489 lines)
- 6 accordion sections: Effects, Photos, Elements, Fonts, Music, Backgrounds
- All content lazy-loaded via `data-lazy` attribute + `loadCategoryContent()` switch
- Icon Gallery + Icon Effects demos are in cat-elements (NOT cat-effects)
- Renders dynamically from WEDDING_DATA (no hardcoded data)
- Has lightbox for image viewing (openLightbox/closeLightbox)

## Skill: /catalog-assets
- Updated to reference only `wedding-data.js` (not 3 files)
- Verify: `node -e "require('./products/shared/wedding-data.js')"`

## Wedding Design Techniques
- [Design depth & anti-boring](feedback-wedding-design-depth.md) — paper texture, handwritten font, torn paper, off-balance photos, sepia filter
- [Envelope design lessons #218](feedback-envelope-iteration.md) — simple CSS (photo blur + tint + particles + fade) beats canvas physics. Hero text hide until open.
- [UI design lessons](feedback-wedding-ui-design.md) — no emoji decorations, object-fit:contain for gates, brainstorm before coding, hanging tags pattern

## Asset Processing
- [Asset processing lessons](feedback-asset-processing.md) — Gemini bakes checkerboard, sharp loses alpha, bash crashes on Windows, always register icons in data.js
