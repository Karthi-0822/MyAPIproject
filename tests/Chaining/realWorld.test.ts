// // Real-world file — chaining with TypeScript and fixtures
// // Production pattern: typed responses, fixtures for pre-existing data, and explicit step labels in the test output.

// // tests/posts.spec.ts
// import { test, expect } from '@playwright/test';

// interface Post { id: number; title: string; body: string; userId: number }

// test.describe('POST /posts chains', () => {

//   test('created post is fetchable by id', async ({ request }) => {
//     const payload = { title: 'Chain test', body: 'Content', userId: 1 };

//     // test.step() labels show in the HTML report — great for debugging
//     const created = await test.step('Create post', async () => {
//       const res = await request.post('/posts', { data: payload });
//       expect(res.status()).toBe(201);
//       return await res.json() as Post;
//     });

//     const fetched = await test.step('Fetch by id', async () => {
//       const res = await request.get(`/posts/${created.id}`);
//       expect(res.status()).toBe(200);
//       return await res.json() as Post;
//     });

//     await test.step('Assert round trip', async () => {
//       expect(fetched.id).toBe(created.id);
//       expect(fetched.title).toBe(payload.title);
//       expect(fetched.userId).toBe(payload.userId);
//     });
//   });

//   test('comment links to correct post and user',
//     async ({ request, testUser }) => {
//       // testUser comes from fixture — no setup needed here

//       const post = await test.step('Create post for user', async () => {
//         const res = await request.post('/posts', {
//           data: { title: 'Post', body: 'Body', userId: testUser.id },
//         });
//         return await res.json() as Post;
//       });

//       const comment = await test.step('Add comment to post', async () => {
//         const res = await request.post(`/posts/${post.id}/comments`, {
//           data: { body: 'Great post!', userId: testUser.id },
//         });
//         return await res.json();
//       });

//       await test.step('Assert relationships', async () => {
//         expect(comment.postId).toBe(post.id);         // linked correctly
//         expect(comment.userId).toBe(testUser.id);    // linked correctly
//       });
//     }
//   );

// });
// // test.step() is the pattern that makes chained tests debuggable at scale. Each step appears as a named entry in the HTML report — when a chain of 6 requests fails, you see exactly which step failed and which succeeded. Without steps, a failure in step 4 just says "assertion failed" with no context about what the first 3 steps did.