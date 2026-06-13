// // Wrong Content-Type — 415
// // Test that your API rejects unexpected content types — plain text, XML, form data sent to a JSON endpoint. Commonly skipped, commonly broken.

// import { test, expect } from '@playwright/test';

// test.describe('POST /posts — content-type validation', () => {

//   test('415 when sending plain text to a JSON endpoint',
//     async ({ request }) => {
//       const res = await request.post('/posts', {
//         body: 'title=hello&body=world',  // raw string, not JSON
//         headers: { 'Content-Type': 'text/plain' },
//       });
//       expect(res.status()).toBe(415); // unsupported media type
//     }
//   );

//   test('400 when JSON body is malformed',
//     async ({ request }) => {
//       const res = await request.post('/posts', {
//         body: '{ title: "missing quotes around key" }',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       expect(res.status()).toBe(400);
//       const body = await res.json();
//       expect(body).toHaveProperty('error');
//       expect(body.error).toMatch(/invalid json|parse error/i);
//     }
//   );

//   test('415 when sending XML to a JSON-only endpoint',
//     async ({ request }) => {
//       const res = await request.post('/posts', {
//         body: '<post><title>hello</title></post>',
//         headers: { 'Content-Type': 'application/xml' },
//       });
//       expect(res.status()).toBe(415);
//     }
//   );

//   test('response is always JSON even when request format is bad',
//     async ({ request }) => {
//       const res = await request.post('/posts', {
//         body: 'garbage',
//         headers: { 'Content-Type': 'text/plain' },
//       });
//       // Error responses must also be JSON — not HTML error pages
//       expect(res.headers()['content-type']).toContain('application/json');
//     }
//   );

// });
// // The last test is the most important one in this group. Many APIs return HTML error pages (from frameworks like Express or Rails) when they hit a parse error — your frontend's response.json() call then throws "unexpected token <" and the error handling completely breaks. Asserting the content-type on error responses catches this before it reaches production.