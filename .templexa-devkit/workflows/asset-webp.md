# Asset WebP Workflow

Use for converting local images to WebP.

## Standard Conversion

```bash
node scripts/convert-webp.js <folder>
```

The script uses Sharp quality 80. If WebP is smaller, it deletes the original and keeps WebP. If WebP is larger, it keeps the original.

## Reference Updates

`scripts/update-webp-refs.js` updates only a fixed set of root catalog files. For customer invitation folders, update local `index.html` references manually or with a scoped mechanical replacement.

## Verify

```bash
find <folder> -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \)
rg -n 'customer/[^"\\)]*\.(jpg|jpeg|png)|og-cover\.jpg' <folder>/index.html
```

Then verify browser load with Puppeteer and confirm no failed local image requests.

