import { expect, test } from '@playwright/test';

test('Bearer token authentication', async ({ request }) => {
  // Login call duplicated in EVERY test file
  const login = await request.post('/auth/login', {
    data: {
      username: 'user@test.com',
      password: 'secret'
    }
  })
  const { token } = await login.json();
// Now the actual test request
  const response = await request.get('/posts', { headers: { 'Authorization': `Bearer ${token}` } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();

})


//Three problems with this: The login call runs before every single test — slow. If the auth endpoint changes, you update it in every file. And if the test fails mid-run, you don't know if it's the auth or the actual test that broke.