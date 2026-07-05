# Invitation Edit Workflow

Use when editing a customer invitation under `products/Invitation/Wedding/`.

1. Read the target `index.html`.
2. If it was cloned from a template, read the source template under `products/shared/new/` when relevant.
3. Locate affected LadiPage ids with `rg`.
4. Prefer adding or updating `#templexa-overrides` rules for layout/image changes.
5. For text changes, edit the exact element text and preserve surrounding generated structure.
6. For image changes, use local WebP assets and verify references.
7. For animation issues, compare `ladi-animation` vs `ladi-animation-hidden`.
8. Verify mobile width and screenshots after scroll.

## Common Checks

```bash
rg -n "TEXT_OR_ID" products/Invitation/Wedding/<slug>/index.html
find products/Invitation/Wedding/<slug> -type f
```

Browser verification should check:

- no local image request failures
- no horizontal overflow
- affected text/section visible after scroll
- animation appears only when scrolled into view

