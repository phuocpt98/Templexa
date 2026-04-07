// Archival mirror script — render SPA + download all assets to local folder.
// Usage: node mirror-site.js
// Output: ./site/ with index.html + assets folder, fully offline-playable.

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const TARGET = 'https://heritage-theme.thedigitalinvite.com/';
const OUT_DIR = path.join(__dirname, 'site');
const ASSETS_DIR = path.join(OUT_DIR, 'assets-local');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36';

fs.mkdirSync(ASSETS_DIR, { recursive: true });

// Sanitize URL -> safe local filename
function urlToFilename(u) {
  try {
    const parsed = new URL(u, TARGET);
    let p = parsed.pathname.replace(/^\/+/, '');
    if (!p || p.endsWith('/')) p += 'index.bin';
    // Flatten subfolders into filename
    const safe = p.replace(/[^a-zA-Z0-9._-]/g, '_');
    return safe.length > 180 ? safe.slice(-180) : safe;
  } catch { return 'asset_' + Date.now(); }
}

function downloadOnce(u, destPath) {
  return new Promise((resolve, reject) => {
    const req = https.get(u, { headers: { 'User-Agent': UA, Referer: TARGET } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return downloadOnce(new URL(res.headers.location, u).href, destPath).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${u}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(destPath)));
      file.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(60000, () => req.destroy(new Error('timeout')));
  });
}

(async () => {
  console.log('[1/5] Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // Collect every URL the page requests
  const requestedUrls = new Set();
  page.on('response', (res) => {
    const u = res.url();
    if (u.startsWith('http')) requestedUrls.add(u);
  });

  console.log('[2/5] Loading', TARGET);
  await page.goto(TARGET, { waitUntil: 'networkidle0', timeout: 90000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  // Let any intro animation finish + lazy assets load
  await new Promise((r) => setTimeout(r, 5000));
  // Scroll entire page to trigger lazy-loaded images/videos
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollTo(0, y);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          setTimeout(resolve, 1500);
        }
      }, 200);
    });
  });
  await new Promise((r) => setTimeout(r, 3000));
  await page.evaluate(() => window.scrollTo(0, 0));

  console.log('[3/5] Extracting rendered HTML...');
  let html = await page.content();

  console.log('[4/5] Downloading assets (' + requestedUrls.size + ' candidates)...');
  const urlMap = new Map(); // absoluteUrl -> local relative path
  let downloaded = 0, skipped = 0;
  for (const u of requestedUrls) {
    // Skip analytics & non-asset requests
    if (/analytics|flock\.js|googletagmanager|google-analytics/i.test(u)) { skipped++; continue; }
    // Skip the main HTML itself
    if (u === TARGET || u === TARGET.replace(/\/$/, '')) { skipped++; continue; }
    try {
      const filename = urlToFilename(u);
      const dest = path.join(ASSETS_DIR, filename);
      if (!fs.existsSync(dest)) await downloadOnce(u, dest);
      urlMap.set(u, 'assets-local/' + filename);
      downloaded++;
    } catch (e) {
      console.log('  skip', u.slice(0, 80), '-', e.message);
      skipped++;
    }
  }
  console.log('   downloaded=' + downloaded + ' skipped=' + skipped);

  console.log('[5/5] Rewriting asset URLs in HTML + CSS...');
  // Rewrite HTML: replace every absolute URL with local relative
  for (const [absUrl, localPath] of urlMap) {
    const safeAbs = absUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(safeAbs, 'g'), localPath);
    // Also handle URL without protocol (//host/path)
    const noProto = absUrl.replace(/^https?:/, '');
    const safeNoProto = noProto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(safeNoProto, 'g'), localPath);
  }
  // Also rewrite root-relative paths like "/assets/foo.js" -> "assets-local/..."
  for (const [absUrl, localPath] of urlMap) {
    try {
      const parsed = new URL(absUrl);
      if (parsed.origin === new URL(TARGET).origin) {
        const rootRel = parsed.pathname + parsed.search;
        const safe = rootRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        html = html.replace(new RegExp('"' + safe + '"', 'g'), '"' + localPath + '"');
        html = html.replace(new RegExp("'" + safe + "'", 'g'), "'" + localPath + "'");
      }
    } catch {}
  }

  // Rewrite CSS files (which may contain url(...) refs to fonts/images)
  for (const [absUrl, localPath] of urlMap) {
    if (!localPath.endsWith('.css')) continue;
    const cssPath = path.join(OUT_DIR, localPath);
    if (!fs.existsSync(cssPath)) continue;
    let css = fs.readFileSync(cssPath, 'utf8');
    for (const [absUrl2, localPath2] of urlMap) {
      const safe = absUrl2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      css = css.replace(new RegExp(safe, 'g'), '../' + localPath2);
      // Also root-relative
      try {
        const p2 = new URL(absUrl2).pathname;
        const safeP = p2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        css = css.replace(new RegExp('url\\(' + safeP + '\\)', 'g'), 'url(../' + localPath2 + ')');
        css = css.replace(new RegExp('url\\("' + safeP + '"\\)', 'g'), 'url("../' + localPath2 + '")');
        css = css.replace(new RegExp("url\\('" + safeP + "'\\)", 'g'), "url('../" + localPath2 + "')");
      } catch {}
    }
    fs.writeFileSync(cssPath, css);
  }

  // Also download & rewrite Google Fonts if any (CSS refs to fonts.gstatic.com)
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html);

  await browser.close();
  console.log('\n✅ Done. Open:', path.join(OUT_DIR, 'index.html'));
})().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
