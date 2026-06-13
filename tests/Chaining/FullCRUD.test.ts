// Full CRUD chain — POST → GET → PATCH → DELETE → 404
// The complete lifecycle of a resource in one test. Every operation depends on the previous one's output.

// POST→GET→PATCH→GET→DELETE→GET → 404
import { test, expect } from '@playwright/test';
test('full CRUD lifecycle — post is created, updated, and deleted',
  { tag: ['@smoke', '@regression'] },
  async ({ request }) => {

    // ── 1. CREATE ─────────────────────────────────────
    const createRes = await request.post('/posts', {
      data: { title: 'Original title', body: 'Body', userId: 1 },
    });
    expect(createRes.status()).toBe(201);
    const { id } = await createRes.json();

    // ── 2. READ — confirm it exists ───────────────────
    const getRes = await request.get(`/posts/${id}`);
    expect(getRes.status()).toBe(200);
    expect((await getRes.json()).title).toBe('Original title');

    // ── 3. UPDATE — patch just the title ─────────────
    const patchRes = await request.patch(`/posts/${id}`, {
      data: { title: 'Updated title' },
    });
    expect(patchRes.status()).toBe(200);

    // ── 4. READ AGAIN — confirm update persisted ──────
    const getAfterPatch = await request.get(`/posts/${id}`);
    const updatedPost = await getAfterPatch.json();
    expect(updatedPost.title).toBe('Updated title');  // changed
    expect(updatedPost.body).toBe('Body');            // untouched

    // ── 5. DELETE ─────────────────────────────────────
    const deleteRes = await request.delete(`/posts/${id}`);
    expect(deleteRes.status()).toBe(204);

    // ── 6. CONFIRM GONE — 404 proves hard delete ──────
    const goneRes = await request.get(`/posts/${id}`);
    expect(goneRes.status()).toBe(404);

  }
);
// The GET after PATCH (step 4) is the one most people skip — and it's the one that catches the most bugs. PATCH returning 200 proves the endpoint accepted the request. The follow-up GET proves the change was actually written to the database. These are two different things.