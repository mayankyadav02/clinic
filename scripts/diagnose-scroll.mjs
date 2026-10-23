import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

async function diagnose() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  console.log('--- TEST 1: DESKTOP (1280px) SCROLL BEHAVIOR ---');
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });

  for (const scrollY of [0, 10, 20, 30, 36, 40, 50, 100, 200, 500]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise((r) => setTimeout(r, 50));
    const headerInfo = await page.evaluate(() => {
      const h = document.querySelector('header');
      const topStrip = document.querySelector('body > div:first-child');
      const rect = h.getBoundingClientRect();
      const style = window.getComputedStyle(h);
      return {
        windowScrollY: window.scrollY,
        headerTop: rect.top,
        headerBottom: rect.bottom,
        headerHeight: rect.height,
        position: style.position,
        topStyle: style.top,
        transition: style.transition,
        topStripHeight: topStrip ? topStrip.getBoundingClientRect().height : 0,
      };
    });
    console.log(`scrollY: ${scrollY}px -> header rect.top: ${headerInfo.headerTop}px (height: ${headerInfo.headerHeight}px, transition: "${headerInfo.transition}")`);
  }

  console.log('\n--- TEST 2: MOBILE (375px) SCROLL BEHAVIOR ---');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });

  for (const scrollY of [0, 10, 20, 30, 40, 50, 100, 200, 500]) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise((r) => setTimeout(r, 50));
    const headerInfo = await page.evaluate(() => {
      const h = document.querySelector('header');
      const rect = h.getBoundingClientRect();
      return {
        windowScrollY: window.scrollY,
        headerTop: rect.top,
        headerBottom: rect.bottom,
      };
    });
    console.log(`scrollY: ${scrollY}px -> header rect.top: ${headerInfo.headerTop}px`);
  }

  await browser.close();
}

diagnose().catch(console.error);
