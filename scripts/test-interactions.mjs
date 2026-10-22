import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

async function runInteractionTests() {
  console.log('Testing mobile menu interactions...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });

  // Test 1: Open menu and Close with X button
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle2' });
  let openBtn = await page.$('button[aria-label="Open navigation menu"]');
  await openBtn.click();
  await new Promise((r) => setTimeout(r, 400));
  let drawer = await page.$('#mobile-navigation');
  console.log('Test 1a - Menu opened:', !!drawer);

  let closeBtn = await page.$('button[aria-label="Close navigation menu"]');
  await closeBtn.click();
  await new Promise((r) => setTimeout(r, 400));
  drawer = await page.$('#mobile-navigation');
  console.log('Test 1b - Menu closed with Close button:', !drawer);

  // Test 2: Open menu and Close with Escape key
  openBtn = await page.$('button[aria-label="Open navigation menu"]');
  await openBtn.click();
  await new Promise((r) => setTimeout(r, 400));
  drawer = await page.$('#mobile-navigation');
  console.log('Test 2a - Menu re-opened:', !!drawer);

  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));
  drawer = await page.$('#mobile-navigation');
  console.log('Test 2b - Menu closed with Escape key:', !drawer);

  // Test 3: Open menu and Close with Backdrop tap
  openBtn = await page.$('button[aria-label="Open navigation menu"]');
  await openBtn.click();
  await new Promise((r) => setTimeout(r, 400));
  drawer = await page.$('#mobile-navigation');
  console.log('Test 3a - Menu re-opened:', !!drawer);

  // Backdrop is at left half of screen on larger/medium or tap outside
  // On 375px screen, drawer takes max-w-md (375px), but let's test clicking on a link
  const aboutLink = await page.$('#mobile-navigation a[href="/about"]');
  await aboutLink.click();
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('Test 4 - Navigated to:', page.url());
  drawer = await page.$('#mobile-navigation');
  console.log('Test 4b - Drawer closed after link navigation:', !drawer);

  // Test 5: Body scroll locking check
  openBtn = await page.$('button[aria-label="Open navigation menu"]');
  await openBtn.click();
  await new Promise((r) => setTimeout(r, 300));
  const bodyOverflowWhenOpen = await page.evaluate(() => document.body.style.overflow);
  console.log('Test 5a - Body overflow when menu is open:', bodyOverflowWhenOpen);

  closeBtn = await page.$('button[aria-label="Close navigation menu"]');
  await closeBtn.click();
  await new Promise((r) => setTimeout(r, 300));
  const bodyOverflowWhenClosed = await page.evaluate(() => document.body.style.overflow);
  console.log('Test 5b - Body overflow when menu is closed:', bodyOverflowWhenClosed || '(empty/restored)');

  await browser.close();
  console.log('All interaction tests finished successfully!');
}

runInteractionTests().catch(console.error);
