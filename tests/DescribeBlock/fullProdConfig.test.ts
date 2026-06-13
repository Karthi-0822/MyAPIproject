// // playwright.config.ts — complete
// import { defineConfig } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';

// const env = process.env.ENV ?? 'dev';
// dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

// export default defineConfig({
//   testDir: './tests/api',
//   fullyParallel: true,
//   retries: env === 'production' ? 2 : 0,
//   workers: 4,

//   reporter: [
//     ['html', { open: 'never' }],
//     ['list'], // live output in terminal
//   ],

//   use: {
//     baseURL: process.env.BASE_URL,
//     extraHTTPHeaders: {
//       'Authorization': `Bearer ${process.env.API_TOKEN}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     ignoreHTTPSErrors: env !== 'production',
//   },

//   projects: [
//     // Run by tag
//     { name: 'smoke', grep: /@smoke/ },
//     { name: 'regression', grep: /@regression/ },

//     // Run by domain
//     { name: 'auth', grep: /@auth/, testMatch: '**/auth.spec.ts' },
//     { name: 'payments', grep: /@payments/, testMatch: '**/payments.spec.ts' },
//   ],
// });
// // Complete spec file showing all patterns together
// // tests/api/users.spec.ts
// import { test, expect } from '@playwright/test';

// test.describe('Users API', { tag: '@users' }, () => {

//   test.describe('GET /users', () => {

//     test('returns user list',
//       { tag: ['@smoke', '@regression'] },
//       async ({ request }) => {
//         const res = await request.get('/users');
//         expect(res.status()).toBe(200);
//         expect(await res.json()).toBeInstanceOf(Array);
//       }
//     );

//     test('filters by role=admin',
//       { tag: '@regression' },
//       async ({ request }) => {
//         const res = await request.get('/users', { params: { role: 'admin' } });
//         const users = await res.json();
//         expect(users.every((u: any) => u.role === 'admin')).toBeTruthy();
//       }
//     );
//   });

//   test.describe('POST /users', () => {

//     test('creates user',
//       { tag: ['@smoke', '@regression'] },
//       async ({ request }) => {
//         const res = await request.post('/users', {
//           data: { name: 'New', email: `e-${Date.now()}@test.com` },
//         });
//         expect(res.status()).toBe(201);
//       }
//     );

//     test('rejects duplicate email',
//       { tag: '@regression' },
//       async ({ request,  testUser}) => {
//         const res = await request.post('/users', {
//           data: { name: 'Dupe', email: testUser.email },
//         });
//         expect(res.status()).toBe(409);
//       }
//     );
//   });

// });
// // This is the complete pattern. Domain tag on the describe block, purpose tags on individual tests, fixture for data setup, and describe nesting that makes the HTML report output read like a specification document.