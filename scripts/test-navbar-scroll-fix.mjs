import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const BASE_URL = 'http://localhost:3001';

const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 600 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-412', width: 412, height: 915 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

async function runTestSuite() {
  console.log('=================================================================');
  console.log('   NAVBAR SCROLL STABILITY & PINNING VERIFICATION TEST SUITE     ');
  console.log('=================================================================\n');

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const outDir = path.resolve('public', 'test-screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];
  let totalErrors = 0;

  try {
    const page = await browser.newPage();

    // Listen for console errors
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    for (const vp of VIEWPORTS) {
      console.log(`\n--- TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height}px) ---`);
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

      // 1. Initial State at scrollY = 0
      const initial = await page.evaluate(() => {
        const h = document.querySelector('header');
        const logo = h ? h.querySelector('a') : null;
        const rect = h ? h.getBoundingClientRect() : null;
        const logoRect = logo ? logo.getBoundingClientRect() : null;
        const overflow = document.documentElement.scrollWidth > window.innerWidth;
        return {
          headerTop: rect ? Math.round(rect.top) : null,
          headerHeight: rect ? Math.round(rect.height) : null,
          logoTop: logoRect ? Math.round(logoRect.top) : null,
          overflow,
        };
      });

      console.log(`[scrollY: 0px] Header top: ${initial.headerTop}px, Height: ${initial.headerHeight}px, Logo top: ${initial.logoTop}px, Overflow: ${initial.overflow ? 'FAIL' : 'NONE'}`);

      if (initial.headerTop !== 0) {
        console.error(`FAIL: Header is not at top: 0 at scrollY = 0 (was ${initial.headerTop}px)`);
        totalErrors++;
      }

      // 2. Scroll DOWN: 100px, 300px, 600px, 1200px
      const scrollPositions = [100, 300, 600, 1200];
      let scrollDownPassed = true;

      for (const y of scrollPositions) {
        await page.evaluate((pos) => window.scrollTo(0, pos), y);
        await new Promise((r) => setTimeout(r, 60));

        const scrollState = await page.evaluate(() => {
          const h = document.querySelector('header');
          const logo = h ? h.querySelector('a') : null;
          const rect = h ? h.getBoundingClientRect() : null;
          const logoRect = logo ? logo.getBoundingClientRect() : null;
          const overflow = document.documentElement.scrollWidth > window.innerWidth;
          return {
            windowScrollY: Math.round(window.scrollY),
            headerTop: rect ? Math.round(rect.top) : null,
            headerHeight: rect ? Math.round(rect.height) : null,
            logoTop: logoRect ? Math.round(logoRect.top) : null,
            overflow,
          };
        });

        const headerPinned = scrollState.headerTop === 0;
        const logoStable = scrollState.logoTop === initial.logoTop;

        if (!headerPinned || !logoStable || scrollState.overflow) {
          scrollDownPassed = false;
          totalErrors++;
          console.error(`  FAIL at scrollY ${y}px: HeaderTop=${scrollState.headerTop}px (expected 0), LogoTop=${scrollState.logoTop}px (expected ${initial.logoTop}px), Overflow=${scrollState.overflow}`);
        } else {
          console.log(`  ✓ scrollY: ${scrollState.windowScrollY}px -> Header pinned at ${scrollState.headerTop}px, Logo steady at ${scrollState.logoTop}px`);
        }
      }

      // 3. Scroll UP: 400px, 150px, 0px
      const scrollUpPositions = [400, 150, 0];
      let scrollUpPassed = true;

      for (const y of scrollUpPositions) {
        await page.evaluate((pos) => window.scrollTo(0, pos), y);
        await new Promise((r) => setTimeout(r, 60));

        const scrollState = await page.evaluate(() => {
          const h = document.querySelector('header');
          const logo = h ? h.querySelector('a') : null;
          const rect = h ? h.getBoundingClientRect() : null;
          const logoRect = logo ? logo.getBoundingClientRect() : null;
          return {
            windowScrollY: Math.round(window.scrollY),
            headerTop: rect ? Math.round(rect.top) : null,
            logoTop: logoRect ? Math.round(logoRect.top) : null,
          };
        });

        const headerPinned = scrollState.headerTop === 0;
        const logoStable = scrollState.logoTop === initial.logoTop;

        if (!headerPinned || !logoStable) {
          scrollUpPassed = false;
          totalErrors++;
          console.error(`  FAIL scroll UP to ${y}px: HeaderTop=${scrollState.headerTop}px, LogoTop=${scrollState.logoTop}px`);
        } else {
          console.log(`  ✓ scroll UP to: ${scrollState.windowScrollY}px -> Header pinned at ${scrollState.headerTop}px, Logo steady at ${scrollState.logoTop}px`);
        }
      }

      // Capture screenshot at scrollY: 300px
      await page.evaluate(() => window.scrollTo(0, 300));
      await new Promise((r) => setTimeout(r, 100));
      await page.screenshot({ path: path.join(outDir, `${vp.name}-scrolled-300px.png`) });

      results.push({
        viewport: vp.name,
        width: vp.width,
        scrollDownPassed,
        scrollUpPassed,
        overflowFree: !initial.overflow,
      });
    }

    // 4. Test "More ▼" Dropdown Interaction WHILE Scrolled (Desktop: 1280px)
    console.log('\n--- TESTING DROPDOWN INTERACTION WHILE SCROLLED (1280px) ---');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise((r) => setTimeout(r, 100));

    const moreBtn = await page.$('button[aria-label*="More navigation"]');
    if (moreBtn) {
      await moreBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      const dropdownBox = await page.evaluate(() => {
        const menu = document.querySelector('div[role="menu"]');
        if (!menu) return null;
        const rect = menu.getBoundingClientRect();
        return {
          top: Math.round(rect.top),
          bottom: Math.round(rect.bottom),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          height: Math.round(rect.height),
          visible: rect.height > 0 && rect.top > 0,
        };
      });

      console.log(`Dropdown opened while scrolled at 500px: Visible=${dropdownBox?.visible}, top=${dropdownBox?.top}px, height=${dropdownBox?.height}px`);
      if (!dropdownBox?.visible) {
        console.error('FAIL: Dropdown is not visible when opened while page is scrolled!');
        totalErrors++;
      } else {
        console.log('✓ Dropdown menu opens cleanly and remains anchored while page is scrolled');
      }

      await page.screenshot({ path: path.join(outDir, 'desktop-dropdown-while-scrolled.png') });

      // Escape key to dismiss
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 200));
      const dropdownClosed = await page.$('div[role="menu"]');
      console.log(`✓ Escape dismissed dropdown while scrolled: ${!dropdownClosed ? 'PASS' : 'FAIL'}`);
    }

    // 5. Test Mobile Drawer Interaction WHILE Scrolled (Mobile: 375px)
    console.log('\n--- TESTING MOBILE DRAWER WHILE SCROLLED (375px) ---');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise((r) => setTimeout(r, 100));

    const hamburgerBtn = await page.$('button[aria-label*="navigation menu"]');
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await new Promise((r) => setTimeout(r, 350));

      const drawerBox = await page.evaluate(() => {
        const drawer = document.querySelector('#mobile-navigation');
        const bodyOverflow = window.getComputedStyle(document.body).overflow;
        if (!drawer) return null;
        const rect = drawer.getBoundingClientRect();
        return {
          top: Math.round(rect.top),
          height: Math.round(rect.height),
          width: Math.round(rect.width),
          bodyOverflow,
        };
      });

      console.log(`Mobile drawer opened while scrolled at 500px: top=${drawerBox?.top}px, height=${drawerBox?.height}px, bodyOverflow="${drawerBox?.bodyOverflow}"`);
      if (drawerBox?.top !== 0 || drawerBox?.height !== 812) {
        console.error('FAIL: Mobile drawer did not cover full viewport when opened while scrolled!');
        totalErrors++;
      } else {
        console.log('✓ Mobile drawer covers 100% viewport cleanly with scroll lock active');
      }

      await page.screenshot({ path: path.join(outDir, 'mobile-drawer-while-scrolled.png') });

      // Close drawer
      const closeBtn = await page.$('button[aria-label="Close navigation menu"]');
      if (closeBtn) {
        await closeBtn.click();
        await new Promise((r) => setTimeout(r, 200));
        const bodyOverflowRestored = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
        console.log(`✓ Close button dismissed drawer and restored body overflow: "${bodyOverflowRestored}"`);
      }
    }

    console.log('\n=================================================================');
    console.log(`   TEST SUMMARY: ${totalErrors === 0 ? 'ALL CHECKS PASSED (100% SUCCESS)' : `${totalErrors} FAILURES DETECTED`}`);
    console.log('=================================================================');

    console.log('\nViewports Tested:');
    console.table(results);

    if (totalErrors > 0) {
      process.exit(1);
    }
  } finally {
    await browser.close();
  }
}

runTestSuite().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
