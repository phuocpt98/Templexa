/**
 * protect-wedding.js
 *
 * Bảo vệ thiệp cưới: domain lock + anti-copy + watermark
 * Inject trực tiếp vào HTML, không tạo file backup
 *
 * Usage:
 *   node scripts/protect-wedding.js                    # Protect ALL wedding folders
 *   node scripts/protect-wedding.js gen_221_sage-green  # Protect 1 folder cụ thể
 *   node scripts/protect-wedding.js --restore           # Xoá protection block khỏi HTML
 */

const fs = require('fs');
const path = require('path');

const WEDDING_DIR = path.join(__dirname, '..', 'products', 'Invitation', 'Wedding');

const ALLOWED_DOMAINS = [
  'phuocpt98.github.io',
  'templexa.pages.dev',
  'templexa.com',
  'www.templexa.com',
  'templexa.vn',
  'www.templexa.vn',
  'localhost',
  '127.0.0.1'
];

const PROTECT_START = '<!--TEMPLEXA-PROTECT-->';
const PROTECT_END = '<!--/TEMPLEXA-PROTECT-->';

// ============================================================
// PROTECTION LAYERS
// ============================================================

function getDomainLockScript() {
  const domains = JSON.stringify(ALLOWED_DOMAINS);
  return `
(function(){
  var _d=${domains};
  var _h=location.hostname;
  var _ok=false;
  for(var i=0;i<_d.length;i++){if(_h===_d[i]||_h.endsWith('.'+_d[i])){_ok=true;break;}}
  if(!_ok&&_h!==''){
    document.body.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;background:#f5f0e8;"><div><h2 style="color:#7DA06D;">Templexa</h2><p style="color:#666;">Thiệp này chỉ có thể xem tại website chính thức.</p><a href="https://phuocpt98.github.io/Templexa/" style="color:#7DA06D;">Truy cập Templexa</a></div></div>';
    throw new Error('Domain not authorized');
  }
})();`;
}

function getAntiCopyScript() {
  return `
(function(){
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  document.addEventListener('keydown',function(e){
    if(e.ctrlKey&&(e.key==='s'||e.key==='u'||e.key==='S'||e.key==='U')){e.preventDefault();}
    if(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='i'||e.key==='J'||e.key==='j'||e.key==='C'||e.key==='c')){e.preventDefault();}
    if(e.key==='F12'){e.preventDefault();}
  });
  document.addEventListener('dragstart',function(e){e.preventDefault();});
  document.addEventListener('selectstart',function(e){
    if(e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();}
  });
})();`;
}

function getWatermarkScript(folderName) {
  const timestamp = new Date().toISOString().slice(0, 10);
  const watermark = `Templexa|${folderName}|${timestamp}|phuocpt98`;
  return `
(function(){
  var _w=document.createElement('div');
  _w.setAttribute('data-t','${Buffer.from(watermark).toString('base64')}');
  _w.style.cssText='position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none;';
  document.body.appendChild(_w);
})();`;
}

// ============================================================
// HTML PROCESSING
// ============================================================

function stripProtection(html) {
  // Strip new format (with markers)
  const reNew = new RegExp(`${PROTECT_START}[\\s\\S]*?${PROTECT_END}`, 'g');
  let result = html.replace(reNew, '');
  // Strip old format (no markers): <script> right after <body> containing domain lock
  result = result.replace(/(<body[^>]*>)(<script>\s*\(function\(\)\{\s*var _d=\[[\s\S]*?data-t[\s\S]*?<\/script>)+/gi, '$1');
  return result;
}

function protectHTML(html, folderName) {
  let clean = stripProtection(html);

  const domainLock = getDomainLockScript();
  const antiCopy = getAntiCopyScript();
  const watermark = getWatermarkScript(folderName);

  const block = `${PROTECT_START}<script>${domainLock}${antiCopy}${watermark}</script>${PROTECT_END}`;

  return clean.replace(/(<body[^>]*>)/i, `$1${block}`);
}

// ============================================================
// MAIN
// ============================================================

function findHTMLFile(folderPath) {
  for (const name of ['index.html', 'code.html']) {
    const htmlPath = path.join(folderPath, name);
    if (fs.existsSync(htmlPath)) {
      return { htmlFile: htmlPath, fileName: name };
    }
  }
  return null;
}

function processFolder(folderPath, folderName) {
  const found = findHTMLFile(folderPath);
  if (!found) {
    console.log(`  ⏭ ${folderName} — không có index.html / code.html`);
    return false;
  }

  const { htmlFile, fileName } = found;
  const html = fs.readFileSync(htmlFile, 'utf-8');

  const protectedHTML = protectHTML(html, folderName);
  fs.writeFileSync(htmlFile, protectedHTML, 'utf-8');

  const originalSize = Buffer.byteLength(html, 'utf-8');
  const protectedSize = Buffer.byteLength(protectedHTML, 'utf-8');

  console.log(`  ✅ ${folderName} (${fileName}) — ${(originalSize/1024).toFixed(0)}KB → ${(protectedSize/1024).toFixed(0)}KB`);
  return true;
}

function restoreFolder(folderPath, folderName) {
  const found = findHTMLFile(folderPath);
  if (!found) return false;

  const { htmlFile, fileName } = found;
  const html = fs.readFileSync(htmlFile, 'utf-8');

  if (!html.includes(PROTECT_START) && !html.includes('Domain not authorized')) {
    console.log(`  ⏭ ${folderName} (${fileName}) — chưa protect`);
    return false;
  }

  const clean = stripProtection(html);
  fs.writeFileSync(htmlFile, clean, 'utf-8');
  console.log(`  ↩ ${folderName} (${fileName}) — đã xoá protection`);
  return true;
}

// Parse args
const args = process.argv.slice(2);
const isRestore = args.includes('--restore');
const targetFolder = args.find(a => !a.startsWith('--'));

console.log(`\n🔒 Templexa Wedding Protection\n`);

if (isRestore) {
  console.log('Mode: RESTORE (xoá protection block)\n');
} else {
  console.log('Mode: PROTECT (domain lock + anti-copy + watermark)\n');
  console.log(`Domains cho phép: ${ALLOWED_DOMAINS.join(', ')}\n`);
}

let folders;
if (targetFolder) {
  const allFolders = fs.readdirSync(WEDDING_DIR).filter(f =>
    fs.statSync(path.join(WEDDING_DIR, f)).isDirectory()
  );
  folders = allFolders.filter(f => f.includes(targetFolder));
  if (folders.length === 0) {
    console.log(`❌ Không tìm thấy folder chứa "${targetFolder}"`);
    process.exit(1);
  }
} else {
  folders = fs.readdirSync(WEDDING_DIR).filter(f =>
    fs.statSync(path.join(WEDDING_DIR, f)).isDirectory()
  );
}

let count = 0;
for (const folder of folders) {
  const folderPath = path.join(WEDDING_DIR, folder);
  if (isRestore) {
    if (restoreFolder(folderPath, folder)) count++;
  } else {
    if (processFolder(folderPath, folder)) count++;
  }
}

console.log(`\n${isRestore ? '↩' : '🔒'} Xong — ${count}/${folders.length} folders đã xử lý.\n`);
