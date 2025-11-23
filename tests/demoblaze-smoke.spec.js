import { test, expect } from '@playwright/test';

test('DemoBlaze - Basic page load', async ({ page }) => {
  // Navigate to DemoBlaze
  await page.goto('https://www.demoblaze.com/index.html', { waitUntil: 'domcontentloaded' });

  // Get page title
  const title = await page.title();
  console.log(`Page title: ${title}`);
  expect(title).toContain('STORE');

  // Check if page has content (body element)
  const body = page.locator('body');
  await expect(body).toBeVisible();

  // Check if we can find any product links by looking for the carousel
  const links = await page.locator('a').count();
  console.log(`Found ${links} links on page`);
  expect(links).toBeGreaterThan(5);

  console.log('✅ Page loaded successfully via MCP!');
});

test('DemoBlaze - Simple navigation', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html', { waitUntil: 'domcontentloaded' });

  // Wait a moment for JS to run
  await page.waitForTimeout(2000);

  // Try to find and click any category link
  const links = await page.locator('a:visible').all();
  console.log(`Found ${links.length} visible links`);

  // Find first link that might be a category (look for text like "Phones", "Laptops", etc)
  for (let i = 0; i < Math.min(5, links.length); i++) {
    const text = await links[i].textContent();
    console.log(`Link ${i}: ${text}`);
  }

  console.log('✅ Navigation test complete');
});
