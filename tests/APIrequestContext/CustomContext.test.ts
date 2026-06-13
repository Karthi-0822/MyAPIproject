import { test, expect } from '@playwright/test';

test('call two different APIs in one test', async ({ playwright }) => {

  // Context A — your main API, with auth
  const apiCtx = await playwright.request.newContext({
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
  });

  // Context B — a third-party service, different auth scheme
  const analyticsCtx = await playwright.request.newContext({
    baseURL: 'https://analytics.thirdparty.com',
    extraHTTPHeaders: {
      'X-API-Key': process.env.ANALYTICS_KEY!,
    },
  });

  // Use them independently — no config bleed between them
  const user = await (await apiCtx.get('/users/1')).json();
  const stats = await (await analyticsCtx.get('/events')).json();

  // Always dispose manually — no automatic cleanup
  await apiCtx.dispose();
  await analyticsCtx.dispose();
});

// Always call .dispose() on manually created contexts. Unlike the request fixture, Playwright does not clean these up automatically. A context that isn't disposed keeps its network connections open and can cause resource leaks, especially in large test suites. Wrap in a fixture's teardown block to guarantee cleanup even when tests throw.

// The right way — inside a fixture with guaranteed teardown
// export const test = base.extend({
//   adminCtx: async ({ playwright }, use) => {
//     const ctx = await playwright.request.newContext({
//       baseURL: process.env.BASE_URL,
//       extraHTTPHeaders: {
//         'Authorization': `Bearer ${process.env.ADMIN_TOKEN}`,
//       },
//     });

//     await use(ctx);         // test runs here
//     await ctx.dispose();   // always runs — even if test throws
//   },
// });