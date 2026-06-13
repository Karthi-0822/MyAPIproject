import { test as base } from '@playwright/test';

export interface User {
  id: number; name: string; email: string; role: string;
}
type Fixtures = { testUser: User };

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const test = base.extend<Fixtures>({

  testUser: async ({ request }, use) => {
    // SETUP
    const res = await request.post('/users', {
      data: { name: 'Fixture User', email: `user-${uid()}@test.com`, role: 'member' },
    });
    if (!res.ok()) {
      throw new Error(`Fixture failed — POST /users: ${res.status()} ${await res.text()}`);
    }
    const user = await res.json() as User;

    // HANDOFF
    await use(user);

    // TEARDOWN
    const del = await request.delete(`/users/${user.id}`);
    if (!del.ok() && del.status() !== 404) {
      console.warn(`Teardown: DELETE /users/${user.id} → ${del.status()}`);
    }
  },

});
export { expect } from '@playwright/test';
// tests/users.spec.ts — three tests, zero setup code
// import { test, expect } from './fixtures';

// test.describe('User API', () => {

//   test('GET /users/:id returns the user', async ({ request, testUser }) => {
//     const res = await request.get(`/users/${testUser.id}`);
//     expect(res.status()).toBe(200);
//     expect(await res.json()).toMatchObject({
//       id: testUser.id, email: testUser.email,
//     });
//   });

//   test('PATCH /users/:id updates the user', async ({ request, testUser }) => {
//     const res = await request.patch(`/users/${testUser.id}`, {
//       data: { name: 'Updated Name' },
//     });
//     expect(res.status()).toBe(200);
//     expect((await res.json()).name).toBe('Updated Name');
//   });

//   test('DELETE /users/:id removes the user', async ({ request, testUser }) => {
//     const res = await request.delete(`/users/${testUser.id}`);
//     expect(res.status()).toBe(204);

//     // Confirm it's really gone
//     const check = await request.get(`/users/${testUser.id}`);
//     expect(check.status()).toBe(404);
//     // teardown will try DELETE too — 404 is handled gracefully
//   });

// });
// Notice the DELETE test deletes the user itself, then the fixture teardown also tries to delete them and gets a 404. The del.status() !== 404 guard in the teardown handles this gracefully — no warning, no error. The test and the fixture cooperate without needing to know about each other.