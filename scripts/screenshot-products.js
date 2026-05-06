const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PRODUCTS = [
    {
        name: 'Film Reel',
        url: 'products/Invitation/Other/gen_237_lien-hoan-phim-retro/index.html',
        outDir: 'products/Invitation/Other/gen_237_lien-hoan-phim-retro',
    },
    {
        name: 'Cork Board',
        url: 'products/Invitation/Other/gen_237_lien-hoan-bang-tin/index.html',
        outDir: 'products/Invitation/Other/gen_237_lien-hoan-bang-tin',
    },
];

const BASE = path.resolve(__dirname, '..');

const VIEWPORTS = {
    mobile: { width: 430, height: 932, isMobile: true, hasTouch: true },
    desktop: { width: 1440, height: 900, isMobile: false, hasTouch: false },
};

async function dismissCover(page) {
    try {
        await page.evaluate(() => {
            // Hide all cover/overlay elements
            ['#coverScreen', '#cover', '.cover', '.envelope-overlay'].forEach(sel => {
                const el = document.querySelector(sel);
                if (el) el.style.cssText = 'display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;position:absolute!important;';
            });

            // Show main content wrappers that start hidden
            ['#invitationWrapper', '#mainBoard', '#mainContent', '.invitation-wrapper', '.board-frame', '.wrapper'].forEach(sel => {
                const el = document.querySelector(sel);
                if (el) {
                    el.style.display = 'block';
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.classList.add('active', 'show', 'visible');
                }
            });

            // Force all scroll-reveal / anim elements visible
            document.querySelectorAll('.anim, .scroll-reveal, .reveal, [class*="scroll"]').forEach(el => {
                el.classList.add('on', 'visible', 'active');
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.animationDelay = '0s';
            });

            // Remove any hidden class
            document.querySelectorAll('.hidden').forEach(el => {
                if (!el.id || !el.id.includes('guest')) el.classList.remove('hidden');
            });
        });
        await new Promise(r => setTimeout(r, 1500));
    } catch (e) { console.error('dismissCover error:', e); }
}

async function scrollAndCapture(page, outputPath, viewport, scrollPositions) {
    const shots = [];
    for (let i = 0; i < scrollPositions.length; i++) {
        const pos = scrollPositions[i];
        await page.evaluate((y) => window.scrollTo(0, y), pos);
        await new Promise(r => setTimeout(r, 600));
        const filename = viewport === 'mobile'
            ? 'mobile.webp'
            : (i === 0 ? 'screen.webp' : `desktop_${i}.webp`);
        const filePath = path.join(outputPath, filename);
        await page.screenshot({ path: filePath, type: 'webp', quality: 82 });
        shots.push(filename);
        console.log(`  ✓ ${filename}`);
    }
    return shots;
}

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const product of PRODUCTS) {
        console.log(`\n📸 ${product.name}`);
        const outDir = path.join(BASE, product.outDir);
        const fileUrl = 'file://' + path.join(BASE, product.url);

        // Mobile screenshot
        console.log('  Mobile (430x932):');
        const mobilePage = await browser.newPage();
        await mobilePage.setViewport(VIEWPORTS.mobile);
        await mobilePage.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        await dismissCover(mobilePage);
        await new Promise(r => setTimeout(r, 800));

        const mobileHeight = await mobilePage.evaluate(() => document.documentElement.scrollHeight);
        const mobilePositions = [0];
        for (let y = 800; y < mobileHeight - 400; y += 800) {
            mobilePositions.push(y);
        }
        // Only take first screenshot for mobile
        await scrollAndCapture(mobilePage, outDir, 'mobile', [0]);
        await mobilePage.close();

        // Desktop screenshots (screen + 4 desktop scrolls)
        console.log('  Desktop (1440x900):');
        const desktopPage = await browser.newPage();
        await desktopPage.setViewport(VIEWPORTS.desktop);
        await desktopPage.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        await dismissCover(desktopPage);
        await new Promise(r => setTimeout(r, 800));

        const desktopHeight = await desktopPage.evaluate(() => document.documentElement.scrollHeight);
        const step = Math.floor((desktopHeight - 900) / 4);
        const desktopPositions = [0];
        for (let i = 1; i <= 4; i++) {
            desktopPositions.push(Math.min(i * step, desktopHeight - 900));
        }
        await scrollAndCapture(desktopPage, outDir, 'desktop', desktopPositions);
        await desktopPage.close();
    }

    await browser.close();
    console.log('\n✅ Done!');
})();
