// POST → GET — proving persistence
// The fundamental chain. Create a resource, use its ID to fetch it, assert the data survived the round trip.

// POST /posts → extract id →GET /posts/:id →assert fields match
import { test, expect } from '@playwright/test';

test('POST /posts → GET — data persists correctly', async ({ request }) => {

  // Store payload as a variable — reuse in assertions below
  const payload = {
    title: 'My chained test post',
    body: 'Content that must survive the round trip',
    userId: 1,
  };

  // ── Step 1: CREATE ────────────────────────────────
  const createRes = await request.post('/posts', { data: payload });
  expect(createRes.status()).toBe(201);

  const created = await createRes.json();
  expect(created.id).toBeDefined();            // id must exist before we use it
  expect(typeof created.id).toBe('number');  // id must be the right type

  // ── Step 2: READ ──────────────────────────────────
  const getRes = await request.get(`/posts/${created.id}`);
  expect(getRes.status()).toBe(200);

  const fetched = await getRes.json();

  // ── Step 3: ASSERT ROUND TRIP ─────────────────────
  expect(fetched.id).toBe(created.id);
  expect(fetched.title).toBe(payload.title);  // compare to original payload
  expect(fetched.body).toBe(payload.body);   // not to created — avoids false pass
  expect(fetched.userId).toBe(payload.userId);

});
// Compare fetched data to the original payload, not to created. If you assert fetched.title === created.title and the server returned wrong data in the POST response, both will match — you've proven nothing. Asserting against payload.title means the data must have come from what you sent, not from what the server echoed.