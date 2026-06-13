import { test as base } from '@playwright/test';

interface User { id: number; name: string; email: string }
interface Post { id: number; title: string; userId: number }

type Fixtures = {
  testUser: User;
  testPost: Post;  // depends on testUser
};

export const test = base.extend<Fixtures>({

  // Fixture 1 — create a user
  testUser: async ({ request }, use) => {
    const res = await request.post('/users', {
      data: { name: 'Test User', email: `u-${Date.now()}@test.com` },
    });
    if (!res.ok()) throw new Error(`User setup failed: ${res.status()}`);
    const user = await res.json() as User;

    await use(user);

    await request.delete(`/users/${user.id}`);
  },

  // Fixture 2 — create a post that belongs to testUser
  // Declares testUser as a dependency — Playwright injects it
  testPost: async ({ request, testUser }, use) => {
    const res = await request.post('/posts', {
      data: {
        title: 'Test Post',
        userId: testUser.id,  // uses the user created above
      },
    });
    if (!res.ok()) throw new Error(`Post setup failed: ${res.status()}`);
    const post = await res.json() as Post;

    await use(post);

    await request.delete(`/posts/${post.id}`);
    // User deleted by testUser fixture teardown — no need to repeat
  },

});

export { expect } from '@playwright/test';

// Using composed fixtures in a test
// import { test, expect } from './fixtures';

// // Uses both fixtures — Playwright creates user first, then post
// test('GET /posts/:id returns post with correct userId', async ({
//   request, testUser, testPost
// }) => {
//   const res = await request.get(`/posts/${testPost.id}`);
//   expect(res.status()).toBe(200);

//   const body = await res.json();
//   expect(body.userId).toBe(testUser.id);  // relationship is correct
//   expect(body.title).toBe(testPost.title);
// // teardown order: post deleted first, then user — Playwright reverses the setup order
// });
// Teardown order is automatically reversed. If setup runs user → post, teardown runs post → user. Playwright handles this — you never need to manually coordinate cleanup order between dependent fixtures.

