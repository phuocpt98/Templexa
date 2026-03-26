/**
 * Remove white/light backgrounds from wedding asset images.
 * Uses sharp to convert near-white pixels to transparent.
 * Backs up originals to .bak before overwriting.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = 'D:/project/demo/template/products/shared/images';
const FILES = [
  'wedding-elements/corner-roses-pink-watercolor.webp',
  'wedding/icons/chibi-couple-floral-arch.webp',
  'wedding/icons/chibi-couple-pastel.webp',
  'wedding/icons/divider-roses-pink.webp',
  'wedding/icons/divider-heart-minimal.webp',
  'wedding/icons/bouquet-small-watercolor-pastel.webp',
];

// Algorithm: saturation + luminance based (catches gray/off-white tones)
// Pixels with low saturation AND high luminance → transparent
const LUM_CUT = 190;      // luminance above this + low sat → fully transparent
const LUM_FEATHER = 170;  // feather zone between 170-190
const SAT_CUT = 40;       // saturation below this is considered "bg"

async function removeWhiteBg(filePath) {
  const src = path.join(BASE, filePath);
  if (!fs.existsSync(src)) {
    console.log(`SKIP (not found): ${filePath}`);
    return;
  }

  // Backup original
  const bak = src + '.bak';
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(src, bak);
  }

  // Read from original backup (not already-processed file)
  const readFrom = fs.existsSync(bak) ? bak : src;
  const img = sharp(readFrom);
  const meta = await img.metadata();
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  let changed = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const lum = (r + g + b) / 3;

    if (sat < SAT_CUT && lum > LUM_CUT) {
      // Low saturation + high luminance → background, fully transparent
      pixels[i + 3] = 0;
      changed++;
    } else if (sat < SAT_CUT - 5 && lum > LUM_FEATHER) {
      // Feather zone — gradual fade
      const alpha = Math.round(255 * Math.max(0, (LUM_CUT - lum) / (LUM_CUT - LUM_FEATHER)));
      pixels[i + 3] = Math.min(pixels[i + 3], alpha);
      changed++;
    }
    // else: keep original alpha (actual flower/content pixels)
  }

  // Write to new file with -nobg suffix (avoid locked file issues)
  const ext = path.extname(src);
  const out = src.replace(ext, '-nobg' + ext);
  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(out);

  const newSize = Math.round(fs.statSync(out).size / 1024);
  const bakSize = Math.round(fs.statSync(bak).size / 1024);
  console.log(`OK: ${filePath} → -nobg — ${bakSize}KB → ${newSize}KB (${changed} pixels made transparent)`);
}

(async () => {
  console.log('Removing white backgrounds from', FILES.length, 'files...\n');
  for (const f of FILES) {
    await removeWhiteBg(f);
  }
  console.log('\nDone! Backups saved as .bak files.');
  console.log('To revert: rename .bak back to .webp');
})();
