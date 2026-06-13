// Timeouts — three levels, three jobs
// Playwright has three separate timeout settings. Each covers a different scope. Knowing which to set where eliminates most "test timed out" confusion.

// Timeout	            Default	                                   Controls	                              Where to set
// timeout	           30 000ms	                     Entire test — all steps combined	                    Config or per-test
// actionTimeout	      0 (inherit)	                   Single request or action	                          Config use:{}
// navigationTimeout	  30 000ms	                       Page navigation (UI tests)	                      Config use:{}
// Global timeouts in playwright.config.ts

// export default defineConfig({
//   // Each test has 30s total to complete all its requests
//   timeout: 30_000,

//   use: {
//     // Each individual request times out after 10s
//     actionTimeout: 10_000,
//   },
// });

// Per-request timeout — override for one slow call

test('slow report generation endpoint', async ({ request }) => {
  // This endpoint is known to take up to 45s — set per-request
  const response = await request.post('/reports/generate', {
    data: { type: 'annual', year: 2024 },
    timeout: 45_000, // ms — this request only
  });
  expect(response.status()).toBe(200);
}, { timeout: 60_000 }); // overall test timeout toocopy
Per-test timeout — for a whole describe group
test.describe('slow integration flows', () => {
  // Every test in this group gets 60s
  test.describe.configure({ timeout: 60_000 });

  test('full signup flow', async ({ request }) => { /* ... */ });
  test('data export flow', async ({ request }) => { /* ... */ });
});
Don't raise global timeouts to fix flaky tests. A flaky test hiding behind a 120s timeout is still a flaky test — it just takes twice as long to fail. Timeouts are a diagnostic tool: if a test consistently needs 45s, that request is the problem, not the timeout value. Raise only the timeout for the specific request that needs it.