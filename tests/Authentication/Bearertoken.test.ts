import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('login then access protected route', async ({ request }) => {

  // Step 1 — get a token from the login endpoint
  const loginRes = await request.post('/auth/login', {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    },
  });

  // Guard — fail fast with a clear message if login broke
  if (!loginRes.ok()) {
    throw new Error(`Login failed: ${loginRes.status()}`);
  }

  const { token } = await loginRes.json();

  // Step 2 — use the token in follow-up requests
  const profileRes = await request.get('/profile', {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  expect(profileRes.status()).toBe(200);
  expect(await profileRes.json()).toHaveProperty('email');
});

//Always guard the login response. If you skip the if (!loginRes.ok()) check and login silently fails (wrong credentials, server down), token becomes undefined. Every downstream test then fails with a mysterious 401, and you have no idea whether the auth or the feature is broken.