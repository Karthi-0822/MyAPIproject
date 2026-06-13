// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   use: {
//     baseURL: process.env.BASE_URL,

//     // Every request gets these headers — no per-test setup needed
//     extraHTTPHeaders: {
//       'Authorization': `Bearer ${process.env.API_TOKEN}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//   },
// });

//This is the right default for most teams. If 90% of your tests hit the same authenticated API, set the token globally. The 10% that test unauthenticated scenarios explicitly override the header per-test by passing an empty string.

import { test } from '@playwright/test';
import { expect } from '@playwright/test';

// Global auth is set — but this test needs NO auth
test('POST /register does not need auth', async ({ request }) => {
  const response = await request.post('/register', {
    data: { email: 'new@example.com', password: 'secret' },
    headers: {
      'Authorization': '', // override: strip the global token
    },
  });
  expect(response.status()).toBe(201);
});

// This test needs a DIFFERENT role's token
test('GET /admin with admin token', async ({ request }) => {
  const response = await request.get('/admin', {
    headers: {
      'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
    },
  });
  expect(response.status()).toBe(200);
});


//Multiple roles — projects in playwright.config.ts
// export default defineConfig({
//   projects: [
//     {
//       name: 'as-user',
//       use: { extraHTTPHeaders: { 'Authorization': `Bearer ${process.env.USER_TOKEN}` } },
//     },
//     {
//       name: 'as-admin',
//       use: { extraHTTPHeaders: { 'Authorization': `Bearer ${process.env.ADMIN_TOKEN}` } },
//     },
//     {
//       name: 'unauthenticated',
//       use: {},
//     },
//   ],
// });

//Projects let you run the same test files under different auth contexts automatically. A permissions test file can be picked up by both as-user and as-admin projects — and the assertions differ per project without any test code changes.