import { test } from '@playwright/test';
import { expect } from '@playwright/test';


test('GET /data with API key header', async ({ request }) => {
  const response = await request.get('/data', {
    headers: {
      'X-API-Key': process.env.API_KEY!,
      // Some APIs use a different header name:
      // 'X-Api-Key', 'api-key', 'apikey' — check the docs
    },
  });
  expect(response.status()).toBe(200);
});

//As a query Parameter
test('GET /data with API key query param', async ({ request }) => {
  const response = await request.get('/data', {
    params: {
      api_key: process.env.API_KEY!,
      // Some APIs use: apiKey, key, access_token
    },
  });
  expect(response.status()).toBe(200);
});

//Header vs query param — which to use? Always prefer headers when both are supported. Query params appear in server access logs, browser history, and error reports — your API key can leak. Headers travel in the request but not the URL.

//Baked into the request context (best for many tests)
// Set once in playwright.config.ts — applies to every request
// export default defineConfig({
//   use: {
//     baseURL: process.env.BASE_URL,
//     extraHTTPHeaders: {
//       'X-API-Key': process.env.API_KEY!,
//       'Accept': 'application/json',
//     },
//   },
// });

// Now every test's `request` fixture has the key — no headers needed per test
test('GET /data', async ({ request }) => {
  const response = await request.get('/data');
  expect(response.status()).toBe(200);
});