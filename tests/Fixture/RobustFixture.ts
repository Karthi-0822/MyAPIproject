import { test as base } from '@playwright/test';

interface User {
  id: number; name: string; email: string;
}
type MyFixtures = { testUser: User };

export const test = base.extend<MyFixtures>({

  testUser: async ({ request }, use) => {
    const uniqueEmail = `user-${Date.now()}-${Math.random().toString(36).slice(2)}@test.com`;

    // SETUP
    const res = await request.post('/users', {
      data: { name: 'Fixture User', email: uniqueEmail },
    });

    // Guard — fail immediately if creation fails
    if (!res.ok()) {
      const body = await res.text();
      throw new Error(
        `Fixture setup failed — POST /users returned ${res.status()}: ${body}`
      );
    }

    const user = await res.json() as User;

    // HANDOFF
    await use(user);

    // TEARDOWN — runs even if test threw
    // Don't throw here — a teardown failure shouldn't hide a test failure
    const del = await request.delete(`/users/${user.id}`);
    if (!del.ok() && del.status() !== 404) {
      console.warn(`Teardown warning: DELETE /users/${user.id} returned ${del.status()}`);
    }
  },

});

export { expect } from '@playwright/test';
// Teardown should warn, not throw. If the DELETE fails and you throw from teardown, Playwright surfaces the teardown error instead of the original test failure — you lose the real reason the test broke. Use console.warn() for teardown issues. The 404 check is also important — if the test itself deleted the user, a 404 on teardown is expected and should not be a warning.

// Why both Date.now() and Math.random() in the email? Date.now() alone can collide when tests run in the same millisecond in parallel. Adding a random suffix makes collisions essentially impossible.