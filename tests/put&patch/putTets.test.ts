import { test, expect } from '@playwright/test';

test('PUT /users/1 replaces the full resource', async ({ request }) => {
  // PUT requires ALL fields — omitting any is a bug
  const fullReplacement = {
    name: 'Alice Updated',
    email: 'alice-new@example.com',
    role: 'admin',
    age: 31,
  };

  const response = await request.put('/users/1', {
    data: fullReplacement,
  });

  expect(response.status()).toBe(200);

  const updated = await response.json();

  // All fields must reflect exactly what we sent
  expect(updated).toMatchObject(fullReplacement);
});

test('PUT /users/1 wipes fields not in the payload', async ({ request }) => {
  // Send ONLY name — intentionally omit the rest
  const response = await request.put('/users/1', {
    data: { name: 'Alice Updated' },
  });

  expect(response.status()).toBe(200);

  const updated = await response.json();

  // Sent field changed
  expect(updated.name).toBe('Alice Updated');

  // Omitted fields must be null/undefined — not the old values
  expect(updated.email).toBeNull();
  expect(updated.role).toBeNull();
  expect(updated.age).toBeNull();
  // PUT on existing resource — 200 with body
  expect(response.status()).toBe(200);

  // PUT on non-existent resource (some APIs create it)
  expect(response.status()).toBe(201);

  // PUT with no response body
  expect(response.status()).toBe(204);
});
//The second test is the important one. Most teams only test the happy path — all fields sent, all fields come back. The real PUT contract is that omitted fields are wiped. If your server silently preserves omitted fields on a PUT, it is behaving like PATCH, which is a correctness bug.