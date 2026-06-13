// The request fixture — the auto-created context
// When you destructure { request } from a test function, Playwright hands you a pre-built APIRequestContext it created from your config. You never instantiate it.

import { test, expect } from '@playwright/test';

// `request` here IS an APIRequestContext
// Playwright built it from playwright.config.ts automatically
test('GET /posts', async ({ request }) => {
  const response = await request.get('/posts');
  expect(response).toBeOK();
});


// What Playwright configures it from
// // playwright.config.ts — this becomes the request fixture's config
// export default defineConfig({
//   use: {
//     baseURL: 'https://api.example.com',
//     extraHTTPHeaders: {
//       'Authorization': `Bearer ${process.env.API_TOKEN}`,
//       'Accept': 'application/json',
//     },
//     ignoreHTTPSErrors: true,
//   },
// });
// Its lifecycle — this is important
// Created         Once per test — a fresh context for every test function
// Scope           Lives only for the duration of one test
// Disposed        Automatically after the test ends — you never call .dispose()
// Shared?         No — each test gets its own isolated context, own cookie jar, own state
// The request fixture is test-scoped. Cookies set during one test do not bleed into the next. State is fully isolated. This is intentional — it prevents test-order dependencies, which are one of the most common causes of flaky test suites.