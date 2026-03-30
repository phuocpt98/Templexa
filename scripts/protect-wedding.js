/**
 * protect-wedding.js
 *
 * Bảo vệ thiệp cưới: obfuscate JS + domain lock + anti-copy
 * Dev giữ index.html gốc, deploy bản đã bảo vệ
 *
 * Usage:
 *   node scripts/protect-wedding.js                    # Protect ALL wedding folders
 *   node scripts/protect-wedding.js gen_221_sage-green  # Protect 1 folder cụ thể
 *   node scripts/protect-wedding.js --restore           # Khôi phục từ backup
 */

const fs = require('fs');
const path = require('path');

const WEDDING_DIR = path.join(__dirname, '..', 'products', 'Invitation', 'Wedding');

// Domain được phép chạy — thêm domain của bạn vào đây
const ALLOWED_DOMAINS = [
  'phuocpt98.github.io',
  'templexa.com',
  'www.templexa.com',
  'localhost',
  '127.0.0.1'
];

// ============================================================
// PROTECTION LAYERS
// ============================================================

/**
 * Layer 1: Domain Lock — chỉ chạy trên domain cho phép
 * Copy về localhost khác hoặc domain khác → hiện cảnh báo
 */
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

/**
 * Layer 2: Anti-copy — chặn right-click, Ctrl+S/U, F12, text select
 */
function getAntiCopyScript() {
  return `
(function(){
  // Chặn right-click
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  // Chặn Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12
  document.addEventListener('keydown',function(e){
    if(e.ctrlKey&&(e.key==='s'||e.key==='u'||e.key==='S'||e.key==='U')){e.preventDefault();}
    if(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='i'||e.key==='J'||e.key==='j'||e.key==='C'||e.key==='c')){e.preventDefault();}
    if(e.key==='F12'){e.preventDefault();}
  });
  // Chặn drag ảnh
  document.addEventListener('dragstart',function(e){e.preventDefault();});
  // Chặn select text (trừ input/textarea)
  document.addEventListener('selectstart',function(e){
    if(e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){e.preventDefault();}
  });
})();`;
}

/**
 * Layer 3: Watermark ẩn — chứng minh bản quyền nếu bị copy
 */
function getWatermarkScript(folderName) {
  const timestamp = new Date().toISOString().slice(0, 10);
  const watermark = `Templexa|${folderName}|${timestamp}|phuocpt98`;
  // Encode watermark vào data attribute ẩn
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

/**
 * Minify HTML — xoá comments, whitespace thừa
 */
function minifyHTML(html) {
  return html
    // Xoá HTML comments (giữ IE conditional comments)
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
    // Xoá whitespace giữa tags
    .replace(/>\s+</g, '><')
    // Xoá newlines thừa trong style/script (nhưng giữ string literals)
    .replace(/\n\s*\n/g, '\n')
    // Trim mỗi dòng
    .split('\n').map(l => l.trim()).filter(l => l).join('\n');
}

/**
 * Obfuscate inline JS trong <script> tags
 * Đổi tên biến local, encode string literals
 */
function obfuscateInlineJS(html) {
  return html.replace(/<script>([\s\S]*?)<\/script>/g, (match, jsCode) => {
    // Bỏ qua script quá ngắn hoặc JSON-LD
    if (jsCode.length < 50 || jsCode.includes('"@context"')) return match;

    let obfuscated = jsCode;

    // Encode string literals → hex escape (giữ strings có dấu tiếng Việt)
    obfuscated = obfuscated.replace(/'([^']{3,})'/g, (m, str) => {
      // Bỏ qua URL, path, CSS selector
      if (str.includes('/') || str.includes('.') || str.includes('#') || str.includes(':')) return m;
      // Bỏ qua tiếng Việt (có dấu)
      if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(str)) return m;
      // Encode ASCII strings
      const hex = Array.from(str).map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
      return `'${hex}'`;
    });

    // Minify: xoá comments
    obfuscated = obfuscated.replace(/\/\/.*$/gm, '');
    obfuscated = obfuscated.replace(/\/\*[\s\S]*?\*\//g, '');

    // Minify: collapse whitespace
    obfuscated = obfuscated.replace(/\s+/g, ' ').trim();

    return `<script>${obfuscated}</script>`;
  });
}

/**
 * Inject protection scripts vào HTML
 */
function protectHTML(html, folderName) {
  const domainLock = getDomainLockScript();
  const antiCopy = getAntiCopyScript();
  const watermark = getWatermarkScript(folderName);

  // Gộp tất cả protection vào 1 script block, inject ngay sau <body>
  const protectionScript = `<script>${domainLock}${antiCopy}${watermark}</script>`;

  // Inject sau <body> hoặc sau <body ...>
  let result = html.replace(/(<body[^>]*>)/i, `$1${protectionScript}`);

  // Anti-select handled by JS selectstart event — no CSS needed
  // (CSS user-select:none can break touch/click on some mobile browsers)

  return result;
}

// ============================================================
// MAIN
// ============================================================

/**
 * Tìm file HTML chính trong folder (index.html hoặc code.html)
 * Return { htmlFile, backupFile } hoặc null
 */
function findHTMLFile(folderPath) {
  // Ưu tiên index.html, fallback code.html
  for (const name of ['index.html', 'code.html']) {
    const htmlPath = path.join(folderPath, name);
    if (fs.existsSync(htmlPath)) {
      const backupName = name.replace('.html', '.dev.html');
      return { htmlFile: htmlPath, backupFile: path.join(folderPath, backupName), fileName: name };
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

  const { htmlFile, backupFile, fileName } = found;

  // Nếu có backup → code gốc ở backup, đọc từ backup để re-protect
  // (trường hợp sửa code gốc rồi protect lại)
  let originalHTML;
  if (fs.existsSync(backupFile)) {
    // Đã protect trước đó — kiểm tra backup có mới hơn không
    const backupStat = fs.statSync(backupFile);
    const htmlStat = fs.statSync(htmlFile);
    if (backupStat.mtimeMs > htmlStat.mtimeMs) {
      // Backup mới hơn (user sửa backup) → dùng backup
      originalHTML = fs.readFileSync(backupFile, 'utf-8');
      console.log(`  🔄 ${folderName} (${fileName}) — re-protect từ backup`);
    } else {
      // HTML mới hơn backup → user đã sửa trực tiếp HTML (đã restore trước đó)
      originalHTML = fs.readFileSync(htmlFile, 'utf-8');
      if (originalHTML.includes('data-t=')) {
        console.log(`  ⏭ ${folderName} (${fileName}) — đã protect, chưa thay đổi`);
        return false;
      }
    }
  } else {
    // Chưa protect bao giờ
    originalHTML = fs.readFileSync(htmlFile, 'utf-8');
    if (originalHTML.includes('data-t=')) {
      console.log(`  ⏭ ${folderName} (${fileName}) — đã protect rồi`);
      return false;
    }
  }

  // Backup file gốc (luôn ghi mới nhất)
  fs.writeFileSync(backupFile, originalHTML, 'utf-8');

  // Protect
  let protectedHTML = originalHTML;
  protectedHTML = protectHTML(protectedHTML, folderName);
  // Skip obfuscateInlineJS — hex-encoding strings breaks DOM methods
  // Skip minifyHTML — whitespace removal can break inline text/JS
  // Protection comes from domain lock + anti-copy + watermark, not obfuscation

  // Ghi đè HTML file
  fs.writeFileSync(htmlFile, protectedHTML, 'utf-8');

  const originalSize = Buffer.byteLength(originalHTML, 'utf-8');
  const protectedSize = Buffer.byteLength(protectedHTML, 'utf-8');
  const savedPercent = Math.round((1 - protectedSize / originalSize) * 100);

  console.log(`  ✅ ${folderName} (${fileName}) — ${(originalSize/1024).toFixed(0)}KB → ${(protectedSize/1024).toFixed(0)}KB (${savedPercent}% nhỏ hơn)`);
  return true;
}

function restoreFolder(folderPath, folderName) {
  let restored = false;
  // Restore cả index.dev.html và code.dev.html
  for (const name of ['index', 'code']) {
    const backupPath = path.join(folderPath, `${name}.dev.html`);
    const htmlPath = path.join(folderPath, `${name}.html`);
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, htmlPath);
      fs.unlinkSync(backupPath);
      console.log(`  ↩ ${folderName} (${name}.html) — khôi phục từ backup`);
      restored = true;
    }
  }
  return restored;
}

// Parse args
const args = process.argv.slice(2);
const isRestore = args.includes('--restore');
const targetFolder = args.find(a => !a.startsWith('--'));

console.log(`\n🔒 Templexa Wedding Protection\n`);

if (isRestore) {
  console.log('Mode: RESTORE (khôi phục code gốc)\n');
} else {
  console.log('Mode: PROTECT (obfuscate + domain lock + anti-copy)\n');
  console.log(`Domains cho phép: ${ALLOWED_DOMAINS.join(', ')}\n`);
}

// Lấy danh sách folders
let folders;
if (targetFolder) {
  // Tìm folder match
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

if (!isRestore && count > 0) {
  console.log('💡 Để khôi phục code gốc: node scripts/protect-wedding.js --restore');
  console.log('💡 File backup: index.dev.html (KHÔNG commit file này)\n');
}
