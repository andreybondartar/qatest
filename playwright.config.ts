import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://conduit-api.learnwebdriverio.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
