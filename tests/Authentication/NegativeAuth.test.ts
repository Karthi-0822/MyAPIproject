import {test} from '@playwright/test';
import {expect} from '@playwright/test';


// No token — 401
test('GET /profile without token returns 401', async ({ request }) => {
  const response = await request.get('/profile', {
    headers: { 'Authorization': '' }, // strip any global token
  });
  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body).toHaveProperty('error');
  expect(body).not.toHaveProperty('data'); // no data leaked
});


// Expired / invalid token — 401
test('GET /profile with invalid token returns 401', async ({ request }) => {
  const response = await request.get('/profile', {
    headers: { 'Authorization': 'Bearer this-is-not-a-real-token' },
  });
  expect(response.status()).toBe(401);
});

// Valid token, wrong role — 403
test('GET /admin with user token returns 403', async ({ request }) => {
  const response = await request.get('/admin', {
    headers: {
      'Authorization': `Bearer ${process.env.USER_TOKEN}`,
      // Valid token, but user role — not admin
    },
  });
  expect(response.status()).toBe(403);
});

//401 vs 403 — never confuse them. 401 means "I don't know who you are" (no token or invalid token). 403 means "I know who you are, but you don't have permission." A server that returns 403 for a missing token is technically wrong — and your test catches that.

// Complete negative auth checklist
// Scenario                  	Expected status	                                 What it proves
// No Authorization header        	401	                             Endpoint is protected — not open by mistake
// Empty token Bearer	            401	                             Server validates token presence
// Malformed/invalid token	        401	                             Server validates token integrity
// Valid token, wrong role	        403	                             Authorization logic works (not just authentication)
// Valid token, wrong resource owner	403	                             Users can't access each other's data