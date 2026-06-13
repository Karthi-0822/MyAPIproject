// Input validation — 400 and 422
// Test every way a request body can be wrong: missing fields, wrong types, invalid values, and empty strings.

import { test, expect } from '@playwright/test';

const VALID_PAYLOAD = {
  title: 'Post title', body: 'Content', userId: 1,
};

test.describe('POST /posts — validation errors', () => {

  test('422 when title is missing', async ({ request }) => {
    const { title, ...withoutTitle } = VALID_PAYLOAD;
    const res = await request.post('/posts', { data: withoutTitle });

    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body).toHaveProperty('errors');
    expect(body.errors).toContain('title is required');
  });

  test('422 when title is empty string', async ({ request }) => {
    const res = await request.post('/posts', {
      data: { ...VALID_PAYLOAD, title: '' },
    });
    // Empty string !== missing field — both must be tested separately
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.errors).toContain('title cannot be empty');
  });

  test('400 when userId is wrong type', async ({ request }) => {
    const res = await request.post('/posts', {
      data: { ...VALID_PAYLOAD, userId: 'not-a-number' },
    });
    expect(res.status()).toBe(400);
  });

  test('400 when body is completely empty', async ({ request }) => {
    const res = await request.post('/posts', { data: {} });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('errors');
    expect(Array.isArray(body.errors)).toBeTruthy();
    expect(body.errors.length).toBeGreaterThan(0);
  });

});
// Missing field vs empty string are two different bugs. undefined and "" hit different validation code paths. A server that rejects missing title correctly might silently accept title: "" and store a blank record. Test both every time.