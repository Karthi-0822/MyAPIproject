import { test, expect } from '@playwright/test';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

test('POST /posts — full body validation', async ({ request }) => {
  const payload = {
    title: 'My new post',
    body: 'Post content here',
    userId: 1,
  };

  const response = await request.post('/posts', { data: payload });

  // 1. Status
  expect(response.status()).toBe(201);

  // 2. Response Content-Type header
  expect(response.headers()['content-type'])
    .toContain('application/json');

  const created = await response.json() as Post;

  // 3. Server echoed back what we sent
  expect(created.title).toBe(payload.title);
  expect(created.body).toBe(payload.body);
  expect(created.userId).toBe(payload.userId);

  // 4. Server assigned an id — format + value
  expect(created.id).toBeDefined();
  expect(typeof created.id).toBe('number');
  expect(created.id).toBeGreaterThan(0);

  // 5. No sensitive fields leaked
  expect(created).not.toHaveProperty('password');
  expect(created).not.toHaveProperty('internalNotes');

  // 6. Shape — all required fields present
  expect(created).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    body: expect.any(String),
    userId: expect.any(Number),
  });
});


// #	What to check           	         Why it matters
// 1	Status is exactly 201	         Confirms resource was created, not just "something succeeded"
// 2	Content-Type is JSON	         Catches servers that return HTML error pages silently
// 3	Server echoed sent fields	     Confirms data was persisted, not silently dropped
// 4	Server-assigned id exists	     Proves the record was actually stored in the database
// 5	Sensitive fields absent	       Security — passwords, tokens must never appear in responses
// 6	Shape matches interface	       Contract test — frontend won't break on this response
