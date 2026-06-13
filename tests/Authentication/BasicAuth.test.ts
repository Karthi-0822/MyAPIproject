import { test } from "../../Fixture/BasePage";
import { expect } from "@playwright/test";

// Option A — in playwright.config.ts (applies globally)
// export default defineConfig({
//   use: {
//     baseURL: process.env.BASE_URL,
//     httpCredentials: {
//       username: process.env.BASIC_USER,
//       password: process.env.BASIC_PASS,
//     },
//   },
// });



// Option B — per request context in a fixture
// const context = await playwright.request.newContext({
//   baseURL: process.env.BASE_URL,
//   httpCredentials: {
//     username: process.env.BASIC_USER,
//     password: process.env.BASIC_PASS,
//   },
// });.

//Manual Base64 encoding — when you need full control
test('GET /admin with manual basic auth', async ({ request }) => {
  const credentials = Buffer.from(
    `${process.env.BASIC_USER}:${process.env.BASIC_PASS}`
  ).toString('base64');

  const response = await request.get('/admin', {
    headers: {
      'Authorization': `Basic ${credentials}`,
    },
  });
  expect(response.status()).toBe(200);
});

//Prefer httpCredentials over manual encoding. Playwright handles the Base64 encoding, the Basic prefix, and the correct header format automatically. Manual encoding is only needed if you want to test malformed credentials or non-standard header values.

//Basic auth sends credentials on every request. Always use HTTPS with Basic auth — the Base64 encoding is not encryption, it is trivially reversible. Never use Basic auth over plain HTTP.