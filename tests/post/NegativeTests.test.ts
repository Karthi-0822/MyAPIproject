import { expect } from '@playwright/test';
import { test } from '../../Fixture/BasePage';

test('POST /posts rejects missing title', async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      // title intentionally omitted
      body: 'Content',
      userId: 1,
    },
  });

  expect(response.status()).toBe(422); // unprocessable entity

  const error = await response.json();
  expect(error).toHaveProperty('errors');
  expect(error.errors).toContain('title is required');
});


test('POST /posts rejects invalid userId type', async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      title: 'Post',
      body: 'Content',
      userId: 'not-a-number', // string instead of number
    },
  });
  expect(response.status()).toBe(400);
});

test('POST /posts without token returns 401', async ({ request }) => {
  const response = await request.post('/posts', {
    data: { title: 'Post', body: 'Content', userId: 1 },
    headers: { 'Authorization': '' }, // empty — no token
  });
  expect(response.status()).toBe(401);
});

//400 vs 422 — know which your API uses. 400 means "bad request" (malformed JSON, wrong types). 422 means "unprocessable entity" (valid JSON but fails business rules like a missing required field). Your tests must match what your API actually returns — check the docs.