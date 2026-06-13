// import { test, expect } from '../fixtures';

// // Top-level describe = the resource
// test.describe('Users API', () => {

//   // Nested describe = the endpoint
//   test.describe('GET /users', () => {
//     test('returns all users', async ({ request }) => { /* ... */ });
//     test('filters by role', async ({ request }) => { /* ... */ });
//   });

//   test.describe('GET /users/:id', () => {
//     test('returns a single user', async ({ request, testUser }) => { /* ... */ });
//     test('returns 404 for unknown id', async ({ request }) => { /* ... */ });
//   });

//   test.describe('POST /users', () => {
//     test('creates user and returns 201', async ({ request }) => { /* ... */ });
//     test('rejects missing email with 422', async ({ request }) => { /* ... */ });
//     test('rejects duplicate email with 409', async ({ request }) => { /* ... */ });
//   });

// });
// // The test name in the report becomes the full path: Users API › GET /users/:id › returns 404 for unknown id. You can read a failing test name in CI and know exactly what broke without opening any file.

// // describe.configure — shared settings per group
// test.describe('slow integration tests', () => {

//   // Every test in this group gets a 60s timeout
//   test.describe.configure({ timeout: 60_000 });

//   test('full user signup flow', async ({ request }) => { /* ... */ });
//   test('full checkout flow', async ({ request }) => { /* ... */ });

// });

// // Serial mode — tests run one at a time, in order, in this group
// test.describe.serial('stateful flow — order matters', () => {
//   test('step 1 — create account', async ({ request }) => { /* ... */ });
//   test('step 2 — verify email', async ({ request }) => { /* ... */ });
//   test('step 3 — complete profile', async ({ request }) => { /* ... */ });
// });
// // Avoid describe.serial by default. Serial tests cannot run in parallel — they slow the whole suite. Only use it when tests genuinely share state that cannot be isolated with fixtures. If you need it often, your fixtures need more work.