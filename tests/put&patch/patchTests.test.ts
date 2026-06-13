import { test, expect } from '@playwright/test';

test('PATCH /users/1 updates only sent fields', async ({ request }) => {
  // Step 1 — fetch current state so we know what to preserve
  const before = await (await request.get('/users/1')).json();

  // Step 2 — patch ONLY the name
  const response = await request.patch('/users/1', {
    data: { name: 'Alice Updated' },
  });

  expect(response.status()).toBe(200);

  const after = await response.json();

  // Changed field — new value
  expect(after.name).toBe('Alice Updated');

  // Untouched fields — must equal BEFORE values exactly
  expect(after.email).toBe(before.email);
  expect(after.role).toBe(before.role);
  expect(after.age).toBe(before.age);
  
  // Single field — most surgical PATCH
  await request.patch('/users/1', {
    data: { role: 'moderator' },
  });

  // Multiple fields — still a partial update
  await request.patch('/users/1', {
    data: { name: 'Alice New', age: 32 },
  });

  // Explicitly setting a field to null — intentional clear
  await request.patch('/users/1', {
    data: { age: null }, // deliberate null, not omission
  });
});

// /Fetch before you PATCH. To assert that untouched fields were preserved, you need to know what they were before the update. Always GET the resource first, store it in before, then compare after. This is the pattern that catches servers that accidentally wipe fields on PATCH.

//Null vs omission are different. Sending { age: null } tells the server "clear this field". Omitting age entirely tells the server "leave this field alone". Your tests must cover both cases to prove the server handles them correctly.