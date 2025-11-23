// @ts-check
import { defineConfig, devices } from '@playwright/test';

// ====== ENV VARIABLES ======
const selectedBrowser = process.env.BROWSER || null;     // chromium / firefox / webkit / chrome
const selectedTest = process.env.PW_TEST || '**/*.spec.js';
const isHeadless = process.env.HEADLESS === 'true';

// ====== PROJECT DEFINITIONS ======
let projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
    },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
];

// If browser passed → filter only that project
if (selectedBrowser) {
  projects = projects.filter(p => p.name === selectedBrowser);
}

export default defineConfig({
  testDir: './tests',

  // Run only selected test file or pattern
  testMatch: selectedTest,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // IMPORTANT → HTML report auto-opens
  reporter: [['html', { open: 'on-end' }]],

  use: {
    trace: 'on-first-retry',
    headless: isHeadless,
  },

  projects,

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000,
  },
});
