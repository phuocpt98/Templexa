const fs = require('fs');
const base = 'D:/project/demo/template/products/Invitation/Wedding/gen_sinh_nhat_demo_2/';
const html = fs.readFileSync(base + 'index.html', 'utf8');

// Check if inline-style CSS files are referenced
const cssDir = base + 'css/';
const cssFiles = fs.readdirSync(cssDir);
const inlineStyles = cssFiles.filter(f => f.startsWith('inline-style'));
console.log('Inline-style CSS files:', inlineStyles.length);

// Check if they're linked in HTML
inlineStyles.forEach(f => {
  if (html.includes(f)) {
    console.log('  LINKED: ' + f);
  } else {
    console.log('  NOT LINKED: ' + f);
  }
});

// Count <style> tags in HTML
const styleTags = (html.match(/<style/g) || []).length;
console.log('\n<style> tags in HTML:', styleTags);

// Count <link rel="stylesheet"> tags
const linkTags = (html.match(/<link[^>]*stylesheet/g) || []).length;
console.log('<link stylesheet> tags:', linkTags);

// Check how font.css is referenced
const fontIdx = html.indexOf('font.css');
if (fontIdx > -1) {
  console.log('\nfont.css context:');
  console.log(html.substring(fontIdx - 50, fontIdx + 100));
}

// Check if page opens in browser at all - check for <body> and </html>
console.log('\nHas <body>:', html.includes('<body'));
console.log('Has </html>:', html.includes('</html>'));
console.log('Has <div id="__next">:', html.includes('__next'));

// Check size
console.log('\nHTML size:', (html.length / 1024).toFixed(0) + ' KB');

// Check inline script content
const scriptMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([^<]*)<\/script>/);
if (scriptMatch) {
  const data = JSON.parse(scriptMatch[1]);
  console.log('\n__NEXT_DATA__ keys:', Object.keys(data));
  if (data.props && data.props.pageProps) {
    console.log('pageProps keys:', Object.keys(data.props.pageProps));
  }
}

// Check how images are referenced in the actual body
const bodyStart = html.indexOf('<body');
const bodyContent = html.substring(bodyStart);

// Look for img tags
const imgTags = bodyContent.match(/<img[^>]+>/g) || [];
console.log('\n<img> tags:', imgTags.length);
imgTags.forEach(tag => {
  const src = tag.match(/src="([^"]+)"/);
  if (src) console.log('  ' + src[1].substring(0, 80));
});
