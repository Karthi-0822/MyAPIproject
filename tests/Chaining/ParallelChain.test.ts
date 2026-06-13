// Parallel chains — multiple resources at once
// When test steps don't depend on each other, run them in parallel with Promise.all. Faster tests, same coverage.

// Sequential vs parallel — when to use each
// Sequential — when step 2 needs step 1's output
// const user = await (await request.post('/users', { data: userData })).json();
// const post = await (await request.post('/posts', { data: { userId: user.id } })).json();
// post must come after user — it needs user.id

// Parallel — when steps are independent
// const [usersRes, postsRes, commentsRes] = await Promise.all([
//   request.get('/users'),
//   request.get('/posts'),
//   request.get('/comments'),
// ]);
// All three fire simultaneously — 3x faster than sequential
// expect(usersRes.status()).toBe(200);
// expect(postsRes.status()).toBe(200);
// expect(commentsRes.status()).toBe(200);
// Parallel resource creation — useful for tests that need multiple pre-existing records
import { test, expect } from '@playwright/test';
test('GET /posts filters correctly across multiple users', async ({ request }) => {

  // Create two users in parallel
  const [user1, user2] = await Promise.all([
    request.post('/users', { data: { name: 'Alice', email: `a-${Date.now()}@t.com` } })
      .then(r => r.json()),
    request.post('/users', { data: { name: 'Bob', email: `b-${Date.now()}@t.com` } })
      .then(r => r.json()),
  ]);

  // Create posts for each user — sequential because they need user ids
  await Promise.all([
    request.post('/posts', { data: { title: 'Alice post', userId: user1.id } }),
    request.post('/posts', { data: { title: 'Bob post', userId: user2.id } }),
  ]);

  // Now test the filter endpoint
  const res = await request.get('/posts', { params: { userId: user1.id } });
  const posts = await res.json();
  expect(posts.every((p: any) => p.userId === user1.id)).toBeTruthy();

});
// Don't parallelize steps that share mutable state. If two requests both modify the same record, their results are non-deterministic — whichever completes last wins. Parallel is safe for reads and for creating independent resources. Sequential is required when one step's output feeds the next.