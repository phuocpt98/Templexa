const fs = require('fs');
const base = 'D:/project/demo/template/products/Invitation/Wedding/gen_sinh_nhat_demo_2/';

let html = fs.readFileSync(base + 'index.html', 'utf8');
const localImages = fs.readdirSync(base + 'images/');

let fixCount = 0;

// Fix 1: Replace malformed CDN URLs with local paths where file exists locally
// Pattern: https://img.cinelove.meimages/UUID.jpg?params → images/UUID.jpg
// Pattern: https://assets.cinelove.meimages/UUID.jpg → images/UUID.jpg
html = html.replace(/https?:\/\/(?:img|assets)\.cinelove\.meimages\/([a-f0-9-]+\.[a-z]+)(?:\?[^"&]*(?:&amp;[^"]*)*)?/g, (match, filename) => {
  if (localImages.includes(filename)) {
    fixCount++;
    console.log('CDN → local: ' + filename);
    return 'images/' + filename;
  }
  // Fix the malformed URL at least
  fixCount++;
  console.log('CDN fix slash: ' + filename);
  return match.replace('cinelove.meimages/', 'cinelove.me/images/');
});

// Fix 2: Also fix any remaining malformed URLs we might have missed
html = html.replace(/cinelove\.meimages\//g, (match) => {
  fixCount++;
  return 'cinelove.me/images/';
});

fs.writeFileSync(base + 'index.html', html);
console.log('\nTotal fixes: ' + fixCount);

// Verify no malformed URLs remain
const remaining = html.match(/cinelove\.meimages/g);
console.log('Remaining malformed URLs:', remaining ? remaining.length : 0);

// Check final state of image references
console.log('\n=== Final image reference check ===');
const imgRefs = html.match(/(?:src|url\()["']?(?!data:|http|blob:)([^"')]+\.(png|jpg|jpeg|gif|svg|webp|ico))["']?/g) || [];
const localRefSet = new Set();
imgRefs.forEach(ref => {
  const m = ref.match(/(?:src=|url\()["']?([^"')]+)/);
  if (m) localRefSet.add(m[1]);
});
localRefSet.forEach(ref => {
  const fp = base + ref.replace(/&quot;/g, '');
  const exists = fs.existsSync(fp);
  console.log((exists ? 'OK    ' : 'MISSING') + ' ' + ref);
});
