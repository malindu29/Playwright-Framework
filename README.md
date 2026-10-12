# Playwright UI Framework

Playwright JavaScript framework for [Sauce Demo](https://www.saucedemo.com), using Page Object Model and reusable fixtures.

## Covered flows

- Login, including locked-out-user validation
- Add/remove products in the cart
- End-to-end checkout
- Chromium, Firefox, and WebKit projects
- Authentication storage state, so dependent tests start on the inventory page
- `@smoke` and `@regression` tags
- One retry in local runs and two in CI
- Screenshots and Trace Viewer traces retained on failure

## Run

```powershell
npm install
npx playwright install
npm test
npm run test:smoke
npm run test:regression
npm run report
```

The default Sauce Demo credentials are built in for the public demo. Override them with `SAUCE_USERNAME`, `SAUCE_PASSWORD`, and `BASE_URL` when needed.

## Measuring the optimization

Compare equivalent runs with and without the setup dependency:

```powershell
Measure-Command { npx playwright test --project=chromium --grep @regression }
```

The optimized run uses `playwright/.auth/user.json` and avoids repeating the UI login in each test. Run a baseline by removing the `storageState` line from the selected project and adding the login fixture step to each test, then compare elapsed seconds. Record the measured values in the resume bullet rather than using an estimate.
