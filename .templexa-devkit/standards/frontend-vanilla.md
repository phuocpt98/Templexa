# Frontend Vanilla Standards

Templexa uses plain HTML, CSS, and JavaScript.

## Rules

- Preserve Vietnamese UI text and tone.
- Keep global pages compatible with light/dark mode using existing CSS variables.
- Avoid new dependencies unless the project already uses them or the user asks.
- Use responsive CSS and verify at mobile widths.
- Do not add inline color styles on global site pages when CSS classes can be used.
- Keep generated product pages self-contained unless they intentionally use shared assets.

## Verification

- For global website edits, check relevant HTML page in browser or with a local static server.
- For catalog/data edits, verify data syntax and product rendering paths.
- For image changes, verify references exist and local images load.

