const puppeteer = require('puppeteer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const folder = path.resolve(__dirname);
const filePath = 'file:///' + path.join(folder, 'index.html').replace(/\\/g, '/');

async function prepPage(page) {
  await page.evaluate(() => {
    // Force all reveal elements visible
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible', 'in-view'));
    // Hide envelope (show main content)
    const env = document.getElementById('envelope-section');
    if (env) env.style.display = 'none';
    // Hide ambient particles
    document.querySelectorAll('.ceramic-particle, #petal-canvas, [class*=particle]').forEach(el => el.style.display = 'none');
    // Force lazy images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => img.loading = 'eager');
  });
  await new Promise(r => setTimeout(r, 3000));
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // === DESKTOP FULL PAGE (screen) ===
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await prepPage(page);
  await page.screenshot({ path: path.join(folder, 'screen.png'), type: 'png', fullPage: true });
  console.log('screen.png done');

  // === MOBILE (440px, 2x retina) ===
  await page.setViewport({ width: 440, height: 956, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await prepPage(page);

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Mobile page height:', pageHeight);

  // Mobile full page
  await page.screenshot({ path: path.join(folder, 'mobile.png'), type: 'png', fullPage: true });
  console.log('mobile.png done');

  // === DETAIL SCREENSHOTS ===
  const third = Math.floor(pageHeight / 3);
  const shots = [
    { name: 'anh_1', top: 0, height: Math.min(1912, third), label: 'hero+intro' },
    { name: 'anh_2', top: Math.floor(pageHeight * 0.3), height: Math.min(2400, third), label: 'family+story' },
    { name: 'anh_3', top: Math.max(0, pageHeight - 3200), height: Math.min(3200, third + 800), label: 'gallery+closing' },
  ];

  for (const shot of shots) {
    await page.screenshot({
      path: path.join(folder, `${shot.name}.png`),
      type: 'png',
      clip: { x: 0, y: shot.top, width: 880, height: shot.height }
    });
    console.log(`${shot.name}.png done (${shot.label})`);
  }

  await browser.close();

  // === CONVERT TO WEBP ===
  const files = ['screen', 'mobile', 'anh_1', 'anh_2', 'anh_3'];
  for (const f of files) {
    const src = path.join(folder, f + '.png');
    const dst = path.join(folder, f + '.webp');
    const meta = await sharp(src).metadata();
    const w = f === 'mobile' ? 440 : (meta.width > 1200 ? 1200 : undefined);
    let p = sharp(src);
    if (w) p = p.resize({ width: w });
    await p.webp({ quality: 82 }).toFile(dst);
    fs.unlinkSync(src);
    console.log(`${f}.webp — ${Math.round(fs.statSync(dst).size / 1024)}KB`);
  }

  console.log('All done!');
}

run().catch(e => { console.error(e); process.exit(1); });
