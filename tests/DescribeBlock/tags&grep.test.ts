import { test } from '@playwright/test';
// Tags go in the test options object — third argument
test('POST /users creates a user',
  { tag: ['@smoke', '@users'] },
  async ({ request }) => { /* ... */ }
);

test('GET /users with complex filters',
  { tag: '@regression' },
  async ({ request }) => { /* ... */ }
);

test('payment webhook end-to-end',
  { tag: ['@regression', '@slow', '@payments'] },
  async ({ request }) => { /* ... */ }
);

// You can also tag an entire describe block
test.describe('Payments API', { tag: '@payments' }, () => {
  // Every test in here inherits @payments
  test('create payment intent', { tag: '@smoke' }, async ({ request }) => {
    // This test has both @payments AND @smoke
  });
  test('refund flow', { tag: '@regression' }, async ({ request }) => {
    // This test has @payments AND @regression
  });
});
// Running subsets with --grep
// # Run only smoke tests — fast, on every PR
// npx playwright test --grep @smoke

// # Run all regression tests — nightly
// npx playwright test --grep @regression

// # Run all payment tests
// npx playwright test --grep @payments

// # Exclude slow tests
// npx playwright test --grep-invert @slow

// # Run smoke OR payments (regex OR)
// npx playwright test --grep "@smoke|@payments"copy
// Standard tag taxonomy — use this as your starting point
// Tag	                                 What runs	                           When to run
// @smoke	        Critical paths only — login, create, fetch	               Every PR — must be fast (<2 min)
// @regression	    Full coverage — all happy and sad paths	               Nightly or pre-release
// @slow         	Long-running flows, third-party calls                        Nightly, excluded from PR checks
// @payments     	Domain tag — all payment tests                         	 When payment code changes
// @auth	          Domain tag — all auth tests	                                 When auth code changes