const puppeteer = require('puppeteer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const folder = path.resolve(__dirname);
const filePath = 'file:///' + path.join(folder, 'code.html').replace(/\\/g, '/');

async function prepPage(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.reveal, .fade-in, [class*=slide-up], [class*=fadeIn]').forEach(el => {
      el.classList.add('visible', 'in-view');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    const env = document.querySelector('.open-screen, .envelope, #envelope, [class*=open-overlay]');
    if (env) env.style.display = 'none';
    document.querySelectorAll('[class*=particle], [class*=petal], [class*=float]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('img[loading="lazy"]').forEach(img => img.loading = 'eager');
  });
  await new Promise(r => setTimeout(r, 3000));
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Desktop full page
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await prepPage(page);
  await page.screenshot({ path: path.join(folder, 'screen_1.png'), type: 'png', fullPage: true });
  console.log('screen_1.png done');

  // Mobile
  await page.setViewport({ width: 440, height: 956, deviceScaleFactor: 2 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));
  await prepPage(page);

  const h = await page.evaluate(() => document.body.scrollHeight);
  console.log('Mobile height:', h);

  await page.screenshot({ path: path.join(folder, 'mobile.png'), type: 'png', fullPage: true });
  console.log('mobile.png done');

  // Detail shots
  const shots = [
    { name: 'screen_2', top: Math.floor(h * 0.25), height: Math.min(2400, Math.floor(h / 3)), label: 'middle' },
    { name: 'screen_3', top: Math.max(0, h - 3000), height: Math.min(3000, Math.floor(h / 3) + 600), label: 'bottom' },
  ];
  for (const s of shots) {
    await page.screenshot({ path: path.join(folder, s.name + '.png'), type: 'png', clip: { x: 0, y: s.top, width: 880, height: s.height } });
    console.log(s.name + '.png done');
  }

  await browser.close();

  // Convert to WebP
  for (const f of ['screen_1', 'screen_2', 'screen_3', 'mobile']) {
    const src = path.join(folder, f + '.png');
    const dst = path.join(folder, f + '.webp');
    const meta = await sharp(src).metadata();
    const w = f === 'mobile' ? 440 : (meta.width > 1200 ? 1200 : undefined);
    let p = sharp(src);
    if (w) p = p.resize({ width: w });
    await p.webp({ quality: 82 }).toFile(dst);
    fs.unlinkSync(src);
    console.log(f + '.webp — ' + Math.round(fs.statSync(dst).size / 1024) + 'KB');
  }
  console.log('All done!');
}

run().catch(e => { console.error(e); process.exit(1); });
