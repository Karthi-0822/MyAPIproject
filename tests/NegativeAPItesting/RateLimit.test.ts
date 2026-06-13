// Rate limiting — 429
// Prove the rate limiter exists and fires correctly — and that it returns the right headers so clients know when to retry.

import { test, expect } from '@playwright/test';

test('POST /auth/login — rate limited after N failed attempts',
  { tag: '@regression'},
  async ({ request }) => {

    const BAD_CREDS = { email: 'user@test.com', password: 'wrong' };
    let lastResponse;

    // Fire requests until we hit the rate limit
    for (let i = 0; i < 20; i++) {
      lastResponse = await request.post('/auth/login', { data: BAD_CREDS });
      if (lastResponse.status() === 429) break;
    }

    // Confirm we hit the limit
    expect(lastResponse!.status()).toBe(429);

    const body = await lastResponse!.json();
    expect(body).toHaveProperty('error');

    // Retry-After header must exist — clients need it to back off
    const headers = lastResponse!.headers();
    expect(headers['retry-after']).toBeDefined();
    expect(Number(headers['retry-after'])).toBeGreaterThan(0);
  }
);

test('GET /posts — rate limit headers present on normal response',
  async ({ request }) => {
    const res = await request.get('/posts');
    expect(res.status()).toBe(200);

    const headers = res.headers();
    // Rate limit headers should be present even on success
    expect(headers['x-ratelimit-limit']).toBeDefined();
    expect(headers['x-ratelimit-remaining']).toBeDefined();
  }
);
// Assert Retry-After on the 429 response. Without this header, clients have no way to know when they can try again — they either poll too aggressively or wait too long. This is an API contract detail that's invisible unless you test for it explicitly.