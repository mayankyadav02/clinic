import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 600 },
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-412', width: 412, height: 915 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

export async function testViewports(baseUrl = 'http://localhost:3001') {
  console.log(`Starting Puppeteer browser test using: ${executablePath}`);
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

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle2' });

    // Check for hamburger button at this viewport
    const menuBtn = await page.$('button[aria-label*="navigation menu"]');
    const isMenuBtnVisible = menuBtn ? await menuBtn.isIntersectingViewport() : false;

    let drawerBox = null;
    let linkCount = 0;
    let menuOpenWorked = false;

    if (menuBtn && isMenuBtnVisible) {
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 400));

      const drawer = await page.$('#mobile-navigation');
      if (drawer) {
        drawerBox = await drawer.boundingBox();
        const links = await page.$$('#mobile-navigation a');
        linkCount = links.length;
        menuOpenWorked = true;
      }

      await page.screenshot({ path: path.join(outDir, `${vp.name}-menu-open.png`) });
    } else {
      await page.screenshot({ path: path.join(outDir, `${vp.name}-desktop.png`) });
    }

    results.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      hasMenuButton: isMenuBtnVisible,
      menuOpenWorked,
      drawerBoundingBox: drawerBox,
      linkCount,
    });

    await page.close();
  }

  await browser.close();
  console.log('Results:\n', JSON.stringify(results, null, 2));
  return results;
}

testViewports().catch(console.error);
