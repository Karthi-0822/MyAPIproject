// tests/posts.spec.ts
import { test, expect } from '@playwright/test';

interface Post {
  id: number; title: string;
  body: string; userId: number;
}

// Reusable valid payload — change once, updates all tests
const VALID_POST = {
  title: 'Test post title',
  body: 'Test post content',
  userId: 1,
};

test.describe('POST /posts', () => {

  test('creates post and returns 201 with body', async ({ request }) => {
    const response = await request.post('/posts', { data: VALID_POST });

    expect(response.status()).toBe(201);

    const created = await response.json() as Post;
    expect(created).toMatchObject({
      ...VALID_POST,
      id: expect.any(Number),
    });
  });

  test('created id can be used to fetch the post', async ({ request }) => {
    const postRes = await request.post('/posts', { data: VALID_POST });
    const { id } = await postRes.json();

    // Chain: use the created id in a follow-up GET
    const getRes = await request.get(`/posts/${id}`);
    expect(getRes.status()).toBe(200);

    const fetched = await getRes.json() as Post;
    expect(fetched.title).toBe(VALID_POST.title);
  });

  test('rejects missing title with 422', async ({ request }) => {
    const { title, ...withoutTitle } = VALID_POST;
    const response = await request.post('/posts', { data: withoutTitle });
    expect(response.status()).toBe(422);
  });

  test('rejects unauthenticated request with 401', async ({ request }) => {
    const response = await request.post('/posts', {
      data: VALID_POST,
      headers: { 'Authorization': '' },
    });
    expect(response.status()).toBe(401);
  });

});

//Three patterns to copy from this file: (1) A shared VALID_POST constant — one place to update the payload. (2) Spreading it with ...VALID_POST inside toMatchObject to assert the echo without repeating each field. (3) The chained POST→GET test — this is how you prove persistence, not just a 201 response code.

