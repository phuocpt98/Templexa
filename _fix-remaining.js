const fs = require('fs');
const base = 'D:/project/demo/template/products/Invitation/Wedding/gen_sinh_nhat_demo_2/';
let html = fs.readFileSync(base + 'index.html', 'utf8');

// Replace CDN URL for 37877611 with local since we downloaded it
const before = html.match(/https:\/\/img\.cinelove\.me\/images\/37877611[^"&]*/g);
console.log('CDN refs for 37877611:', before);

html = html.replace(/https:\/\/img\.cinelove\.me\/images\/37877611-5c5b-4643-834b-e9757c0d48d6\.jpg(?:\?[^"&]*(?:&amp;[^"]*)*)?/g,
  'images/37877611-5c5b-4643-834b-e9757c0d48d6.jpg');

fs.writeFileSync(base + 'index.html', html);

// Verify
const localImages = fs.readdirSync(base + 'images/');
console.log('\n37877611 exists locally:', localImages.includes('37877611-5c5b-4643-834b-e9757c0d48d6.jpg'));
console.log('Total local images:', localImages.length);

// Final check - any remaining external cinelove refs?
const extRefs = html.match(/cinelove\.me/g);
console.log('Remaining cinelove.me refs:', extRefs ? extRefs.length : 0);
