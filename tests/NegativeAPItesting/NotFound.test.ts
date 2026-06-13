// // Resource not found — 404
// // Test missing IDs, deleted records, and IDs belonging to other users. All three are distinct cases.

// import { test, expect } from '@playwright/test';
// // import { test as base, expect } from './fixtures';

// test.describe('404 scenarios', () => {

//   test('GET /posts/:id — 404 for non-existent id', async ({ request }) => {
//     const res = await request.get('/posts/999999999');

//     expect(res.status()).toBe(404);
//     const body = await res.json();
//     expect(body).toHaveProperty('error');
//     expect(body).not.toHaveProperty('data');  // no partial data leaked
//   });

//   test('GET /posts/:id — 404 after deletion', async ({ request, testPost }) => {
//     // Delete the post first
//     const del = await request.delete(`/posts/${testPost.id}`);
//     expect(del.status()).toBe(204);

//     // Then confirm it's gone — proves hard delete, not soft-hidden
//     const res = await request.get(`/posts/${testPost.id}`);
//     expect(res.status()).toBe(404);
//   });

//   test("GET /posts/:id — 404 for another user's post", async ({ request, otherUserPost }) => {
//     // Authenticated as current user — trying to access someone else's private post
//     const res = await request.get(`/posts/${otherUserPost.id}`);

//     // 404 preferred over 403 — don't reveal the resource exists
//     expect(res.status()).toBe(404);
//   });

//   test('GET /posts/:id — 404 for string id', async ({ request }) => {
//     const res = await request.get('/posts/not-a-valid-id');
//     // Could be 400 or 404 — assert whichever your API uses, just be explicit
//     expect([400, 404]).toContain(res.status());
//   });

// });
// // Return 404, not 403, for resources belonging to other users. Returning 403 confirms the resource exists — an attacker can enumerate IDs by probing which ones return 403 vs 404. The correct behaviour is to return 404 as if the resource simply doesn't exist for that user.