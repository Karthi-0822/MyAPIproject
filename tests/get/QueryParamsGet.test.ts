import { test, expect } from '@playwright/test';

test('GET /posts with filters', async ({ request }) => {

  // Option A — inline string (breaks on special chars)
  const r1 = await request.get('/posts?userId=1');

  // Option B — params object (preferred)
  const r2 = await request.get('/posts', {
    params: { userId: 1, _limit: 5 },
  });

  const posts = await r2.json();
  expect(posts.length).toBeLessThanOrEqual(5);
  posts.forEach((p: { userId: number }) => expect(p.userId).toBe(1));
});