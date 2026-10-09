// Optional: Playwright is needed only for this browser check, not for the site.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || chromium.executablePath() });
  const errors = [];
  const url = process.env.SITE_URL || 'http://127.0.0.1:8000';
  const artifacts = join(__dirname, '..', 'artifacts');
  await mkdir(artifacts, { recursive: true });
  try {
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      page.on('pageerror', error => errors.push(error.message));
      page.on('requestfailed', request => errors.push(request.url()));
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      assert.match(await page.title(), /小胡子档案/);
      assert.equal(await page.locator('.timeline > li:visible').count(), 6);
      for (const [label, region] of [['德国起源', 'germany'], ['走向美国', 'america']]) {
        await page.getByRole('button', { name: label }).click();
        assert.equal(await page.locator('.timeline > li:visible').count(), 3);
        assert.equal(await page.locator(`.timeline > li[data-region="${region}"]:visible`).count(), 3);
        assert.equal(await page.getByRole('button', { name: label }).getAttribute('aria-pressed'), 'true');
      }
      await page.getByRole('button', { name: '全部足迹' }).click();
      assert.equal(await page.locator('.timeline > li:visible').count(), 6);
      await page.locator('summary').first().click();
      assert.equal(await page.locator('details[open]').count(), 1);
      await page.locator('summary').first().click();
      assert.equal(await page.locator('details[open]').count(), 0);
      await page.getByRole('link', { name: '翻开它的故事' }).click();
      assert.equal(new URL(page.url()).hash, '#history');
      assert(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0)));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
      await page.getByRole('button', { name: '德国起源' }).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.timeline > li:visible').count(), 3);
      await page.getByRole('button', { name: '全部足迹' }).click();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: join(artifacts, `site-${width}.png`), fullPage: true });
      await page.close();
      console.log(`PASS: ${width}px layout, images, navigation, filters, keyboard and FAQ`);
    }
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await page.goto(url);
    assert.equal(await page.locator('.timeline > li:visible').count(), 6);
    assert.equal(await page.locator('[data-filter]:visible').count(), 0);
    await page.locator('summary').first().click();
    assert.equal(await page.locator('details[open]').count(), 1);
    await page.close();
    assert.deepEqual(errors, []);
    console.log('PASS: all history and native FAQ remain usable without JavaScript; no browser or HTTP errors');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
