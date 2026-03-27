const sharp = require('sharp');
const src = 'D:/project/demo/template/products/shared/new/item/Gemini_Generated_Image_yb1wipyb1wipyb1w.png';
const dst = 'D:/project/demo/template/products/shared/images/wedding/icons/gate-iron-floral-watercolor.webp';

sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height } = info;
    const out = Buffer.from(data);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = out[i], g = out[i + 1], b = out[i + 2];

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max > 0 ? (max - min) / max : 0;

        // Remove near-gray/white pixels (checkerboard pattern)
        // Checkerboard cells are ~(190-200) and ~(230-240) with very low saturation
        if (sat < 0.12 && r > 170 && g > 170 && b > 170) {
          out[i + 3] = 0;
        }
      }
    }

    return sharp(out, { raw: { width, height, channels: 4 } })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(dst);
  })
  .then(() => console.log('Done - background removed'))
  .catch(e => console.error(e));
