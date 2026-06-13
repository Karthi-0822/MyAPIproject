// Auth failure — 401 and 403
// Every protected endpoint needs at least three auth tests: no token, invalid token, and valid token with wrong permissions.

// No token, invalid token, wrong role
import { test, expect } from '@playwright/test';

test.describe('Auth failure scenarios', () => {

  test('returns 401 with no token', async ({ request }) => {
    const response = await request.get('/profile', {
      headers: { 'Authorization': '' }, // strip any global token
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body).not.toHaveProperty('email');    // no data leaked
    expect(body).not.toHaveProperty('password'); // no data leaked
  });

  test('returns 401 with malformed token', async ({ request }) => {
    const response = await request.get('/profile', {
      headers: { 'Authorization': 'Bearer not-a-real-token' },
    });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toMatch(/invalid.*token/i); // specific message
  });

  test('returns 403 when user role hits admin endpoint', async ({ request }) => {
    const response = await request.get('/admin/users', {
      headers: {
        'Authorization': `Bearer ${process.env.USER_TOKEN}`,
      },
    });

    // 403 = authenticated but not authorised — NOT 401
    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body).not.toHaveProperty('users'); // no admin data leaked
  });

});
// 401 vs 403 is not optional. 401 = "I don't know who you are." 403 = "I know who you are, but no." A server returning 403 on a missing token is wrong. A server returning 401 on a valid-but-low-privilege token is wrong. Both are testable and both are caught here.

