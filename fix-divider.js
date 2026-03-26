const sharp = require('sharp');
const fs = require('fs');
const src = 'products/shared/images/wedding/icons/divider-roses-pink.webp.bak';
const out = 'products/shared/images/wedding/icons/divider-roses-pink-nobg.webp';

(async () => {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8Array(data);
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i+1], b = px[i+2];
    const sat = Math.max(r,g,b) - Math.min(r,g,b);
    const lum = (r+g+b) / 3;
    if (sat < 40 && lum > 185) { px[i+3] = 0; }
    else if (sat < 35 && lum > 165) { px[i+3] = Math.min(px[i+3], Math.round(255 * (185-lum) / 20)); }
  }
  await sharp(Buffer.from(px), { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 0 })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(out);
  const m = await sharp(out).metadata();
  console.log('Done:', m.width + 'x' + m.height, Math.round(fs.statSync(out).size/1024) + 'KB');
})();
