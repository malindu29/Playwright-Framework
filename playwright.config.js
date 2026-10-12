const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
    testIdAttribute: 'data-test'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/
    },
    {
      name: 'login',
      testMatch: /login\.spec\.js/,
      use: { ...devices['Desktop Chrome'], storageState: undefined }
    },
    {
      name: 'chromium',
      testIgnore: /login\.spec\.js/,
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'firefox',
      testIgnore: /login\.spec\.js/,
      use: { ...devices['Desktop Firefox'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      testIgnore: /login\.spec\.js/,
      use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup']
    }
  ]
});
