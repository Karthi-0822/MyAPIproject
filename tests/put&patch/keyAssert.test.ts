import { expect } from '@playwright/test';
import { test } from '../../Fixture/BasePage';
// PUT — assert that omitted fields ARE wiped
test('PUT wipes omitted fields', async ({ request }) => {
  const res = await request.put('/users/1', {
    data: { name: 'Only Name' }, // email, role, age omitted
  });
  const body = await res.json();

  expect(body.email).toBeNull();    // wiped ✓
  expect(body.role).toBeNull();     // wiped ✓
});

// PATCH — assert that omitted fields ARE NOT wiped
test('PATCH preserves omitted fields', async ({ request }) => {
  const before = await (await request.get('/users/1')).json();

  const res = await request.patch('/users/1', {
    data: { name: 'Only Name' }, // email, role, age omitted
  });
  const body = await res.json();

  expect(body.email).toBe(before.email); // preserved ✓
  expect(body.role).toBe(before.role);  // preserved ✓
});

//These two tests are mirror images of each other. PUT proves omitted fields are wiped. PATCH proves omitted fields survive. Together they prove the server is implementing both methods with distinct, correct semantics — not treating them as aliases of each other.



// Quick reference — what to assert
// PUT
// ✓ Sent fields have new values
// ✓ Omitted fields are null
// ✓ Status is 200 (or 204)

// PATCH
// ✓ Sent fields have new values
// ✓ Omitted fields match before
// ✓ Status is 200 (or 204)