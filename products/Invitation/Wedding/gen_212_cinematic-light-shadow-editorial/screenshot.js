const puppeteer = require('puppeteer');
const path = require('path');

const folder = path.resolve(__dirname);
const filePath = 'file:///' + path.join(folder, 'index.html').replace(/\\/g, '/');

// Force all reveal elements visible + open envelope + hide floating particles
async function prepPage(page) {
  await page.evaluate(() => {
    // Force all reveal elements visible
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
    // Hide envelope overlay (show main content)
    const env = document.querySelector('.envelope');
    if (env) env.style.display = 'none';
    // Hide floating effects that clutter screenshots
    document.querySelectorAll('.sparkle, .particle, .film-grain, [class*=floating], [class*=petal], [class*=fall]').forEach(el => {
      el.style.display = 'none';
    });
    // Force any lazy/hidden images visible
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'eager';
    });
  });
  await new Promise(r => setTimeout(r, 2000));
}

async function captureScreenshots() {
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

  // Get page height for section analysis
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Mobile page height:', pageHeight);

  // Analyze sections after reveal
  const sections = await page.evaluate(() => {
    const results = [];
    const selectors = 'section, [class*=chapter], [class*=hero], [class*=gallery], [class*=rsvp], [class*=countdown], [class*=love-story], [class*=guestbook], [class*=events], [class*=family], [class*=gift], [class*=closing], [class*=intro], [class*=dark-chapter]';
    document.querySelectorAll(selectors).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.height > 100) {
        results.push({
          id: el.id || '',
          cls: el.className.toString().substring(0, 100),
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height)
        });
      }
    });
    return results;
  });
  console.log('Sections:', JSON.stringify(sections.map(s => `${s.cls} top=${s.top} h=${s.height}`), null, 2));

  // Mobile full-page screenshot (capped height to avoid WebP limit)
  await page.screenshot({ path: path.join(folder, 'mobile.png'), type: 'png', fullPage: true });
  console.log('mobile.png done');

  // === DETAIL SCREENSHOTS (mobile 2x viewport) ===
  // anh_1: Hero area (top of page after envelope hidden)
  // anh_2: Middle content (events, countdown, dark chapter)
  // anh_3: Bottom content (gallery, RSVP, guestbook)
  const third = Math.floor(pageHeight / 3);
  const detailShots = [
    { name: 'anh_1', top: 0, height: Math.min(1912, third), label: 'hero+intro' },
    { name: 'anh_2', top: Math.floor(pageHeight * 0.35), height: Math.min(2400, third), label: 'events+dark-chapter' },
    { name: 'anh_3', top: Math.max(0, pageHeight - 3200), height: Math.min(3200, third + 800), label: 'gallery+rsvp+closing' },
  ];

  for (const shot of detailShots) {
    await page.screenshot({
      path: path.join(folder, `${shot.name}.png`),
      type: 'png',
      clip: { x: 0, y: shot.top, width: 880, height: shot.height }
    });
    console.log(`${shot.name}.png done (${shot.label}, top=${shot.top}, h=${shot.height})`);
  }

  await browser.close();
  console.log('All screenshots captured!');
}

captureScreenshots().catch(e => { console.error(e); process.exit(1); });
