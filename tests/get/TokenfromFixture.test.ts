import { test } from '../../Fixture/BasePage';
import { expect } from '@playwright/test';


test('GET /posts with Bearer token from fixture', async ({ loggedInRequest, request }) => {
  const response = await request.get('/posts', {
    headers: { 'Authorization': `Bearer ${loggedInRequest}` },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
});

//The auth is handled once, in one place. Every test file just imports test from your fixtures file instead of from @playwright/test. That's the whole idea.