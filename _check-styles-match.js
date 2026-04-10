const fs = require('fs');
const base = 'D:/project/demo/template/products/Invitation/Wedding/gen_sinh_nhat_demo_2/';
const html = fs.readFileSync(base + 'index.html', 'utf8');

// Extract <style> tag contents (first 100 chars each)
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
let idx = 0;
const styleTags = [];
while ((match = styleRegex.exec(html)) !== null) {
  idx++;
  styleTags.push({ idx, content: match[1].substring(0, 80), len: match[1].length });
}
console.log('=== Style tags ===');
styleTags.forEach(s => console.log(`  #${s.idx} (${s.len} chars): ${s.content}...`));

// Check inline-style-1.css content vs first inline style tag
const inlineCss1 = fs.readFileSync(base + 'css/inline-style-1.css', 'utf8');
console.log('\n=== inline-style-1.css (first 200 chars) ===');
console.log(inlineCss1.substring(0, 200));

// Check if inline-style-1.css content is already in HTML
const isInHtml = html.includes(inlineCss1.substring(0, 50));
console.log('\ninline-style-1.css content in HTML?', isInHtml);

// Check __NEXT_DATA__
const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (nextDataMatch) {
  const data = JSON.parse(nextDataMatch[1]);
  const tp = data.props?.pageProps?.templateData;
  if (tp) {
    console.log('\n=== Template Data ===');
    console.log('Template name:', tp.name);
    console.log('Template slug:', tp.slug);
    console.log('Template has data:', !!tp);
    // Show keys
    console.log('Keys:', Object.keys(tp).join(', '));
  }
}

// Check malformed URLs
const malformed = html.match(/cinelove\.me[a-z]/g);
if (malformed) {
  console.log('\n=== Malformed URLs (missing / after domain) ===');
  const urls = html.match(/https?:\/\/[^\s"')]+cinelove\.me[^/\s"')][^\s"')]+/g);
  urls?.forEach(u => console.log('  ' + u.substring(0, 100)));
}
