// // Basic fixture — create and delete a user
// // The minimal working version. Two files: the fixture definition and a test that uses it.

// import { test as base } from '@playwright/test';

// // Shape of the user the fixture hands to each test
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// type MyFixtures = { testUser: User };

// export const test = base.extend<MyFixtures>({

//   testUser: async ({ request }, use) => {

//     // SETUP — create the user
//     const res = await request.post('/users', {
//       data: {
//         name: 'Test User',
//         email: `test-${Date.now()}@example.com`,
//       },
//     });

//     const user = await res.json() as User;

//     // HANDOFF — give the user to the test
//     await use(user);

//     // TEARDOWN — always runs, even if test failed
//     await request.delete(`/users/${user.id}`);
//   },

// });

// export { expect } from '@playwright/test';

// // Import from YOUR fixtures file, not from @playwright/test
// import { test, expect } from './fixtures';

// test('GET /users/:id returns the user', async ({ request, testUser }) => {
//   // testUser already exists in the DB — no setup needed here
//   const res = await request.get(`/users/${testUser.id}`);

//   expect(res.status()).toBe(200);
//   expect(await res.json()).toMatchObject({
//     id: testUser.id,
//     email: testUser.email,
//   });
// // testUser is automatically deleted after this test ends
// });
// // Date.now() in the email makes each test user's email unique. Without it, parallel tests create users with the same email and clash on unique-email constraints. Always make test data unique with a timestamp or crypto.randomUUID().