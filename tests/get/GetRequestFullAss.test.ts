import { test, expect } from '@playwright/test';

test('GET /posts/1 — full assertions', async ({ request }) => {
  const response = await request.get('/posts/1');

  // Status
  expect(response.status()).toBe(200);

  // Header keys are always lowercase in Playwright
  expect(response.headers()['content-type']).toContain('application/json');

  // Always await response.json() — it is async
  const body = await response.json();

  // Field existence
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('title');
  expect(body).toHaveProperty('userId');

  // Exact value
  expect(body.id).toBe(1);

  // Type checks
  expect(typeof body.title).toBe('string');
  expect(body.title.length).toBeGreaterThan(0);
});

test('GET /posts — array assertions', async ({ request }) => {
  const response = await request.get('/posts');
  const body = await response.json(); // Ensure the response body is consumed
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  for (const post of body) {
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('userId');
    expect(typeof post.title).toBe('string');
    expect(post.title.length).toBeGreaterThan(0);
  }


});