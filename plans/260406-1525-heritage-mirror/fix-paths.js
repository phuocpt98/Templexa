const fs = require('fs');
const p = require('path').join(__dirname, 'site', 'index.html');
let h = fs.readFileSync(p, 'utf8');
h = h.replace(/src="\/intro-video\.mp4/g, 'src="assets-local/intro-video.mp4');
h = h.replace(/<script[^>]*flock\.js[^>]*><\/script>/g, '');
fs.writeFileSync(p, h);
console.log('fixed');
