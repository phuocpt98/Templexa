const fs = require('fs');
const path = require('path');
const base = 'D:/project/demo/template/products/Invitation/Wedding/gen_sinh_nhat_demo_2/';

const html = fs.readFileSync(base + 'index.html', 'utf8');

// 1. Find ALL src= and href= in HTML
const regex = /(?:src|href)=["']([^"']+)["']/g;
let match;
const allRefs = [];
while ((match = regex.exec(html)) !== null) {
  const url = match[1];
  if (/^(data:|http|#|mailto:|javascript:|blob:)/.test(url)) continue;
  allRefs.push(url);
}
console.log('=== All local refs in HTML ===');
allRefs.forEach(r => {
  const fullPath = path.resolve(base, r);
  const exists = fs.existsSync(fullPath);
  console.log((exists ? 'OK    ' : 'BROKEN') + '  ' + r);
});

// 2. Find url() in HTML inline styles
const urlRefs = html.match(/url\(["']?(?!data:|http|blob:)([^)"']+)["']?\)/g) || [];
console.log('\n=== url() refs in HTML ===');
urlRefs.forEach(r => console.log('  ' + r));

// 3. Check if CSS files load from relative paths
console.log('\n=== CSS files check ===');
const cssRefs = allRefs.filter(r => r.endsWith('.css'));
cssRefs.forEach(r => {
  const fp = path.resolve(base, r);
  console.log((fs.existsSync(fp) ? 'OK' : 'MISSING') + ' ' + r + ' → ' + fp);
});

// 4. Check if JS files load from relative paths
console.log('\n=== JS files check ===');
const jsRefs = allRefs.filter(r => r.endsWith('.js'));
jsRefs.forEach(r => {
  const fp = path.resolve(base, r);
  console.log((fs.existsSync(fp) ? 'OK' : 'MISSING') + ' ' + r + ' → ' + fp);
});

// 5. Find image refs in HTML body (not in head)
console.log('\n=== Image refs in HTML ===');
const imgRefs = allRefs.filter(r => /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(r));
imgRefs.forEach(r => {
  const fp = path.resolve(base, r);
  console.log((fs.existsSync(fp) ? 'OK' : 'MISSING') + ' ' + r);
});

// 6. Check inline CSS in <style> tags for url() with local refs
const styleBlocks = html.match(/<style[^>]*>[^]*?<\/style>/g) || [];
console.log('\n=== Inline style url() refs ===');
let inlineUrlCount = 0;
for (const block of styleBlocks) {
  const urls = block.match(/url\(["']?(?!data:|http|blob:)([^)"']+)["']?\)/g) || [];
  urls.forEach(u => {
    inlineUrlCount++;
    console.log('  ' + u);
  });
}
console.log('Total inline url() refs:', inlineUrlCount);

// 7. Check for background-image in inline style attributes
const inlineStyles = html.match(/style="[^"]*url\([^)]+\)[^"]*"/g) || [];
console.log('\n=== Inline style= with url() ===');
inlineStyles.forEach(s => {
  const url = s.match(/url\(["']?([^)"']+)["']?\)/);
  if (url && !url[1].startsWith('data:') && !url[1].startsWith('http')) {
    console.log('  ' + url[1]);
  }
});
