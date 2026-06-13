// // Reusable validation helper
// // Wrap schema validation in a helper so every test uses the same pattern with one clean line.

// // tests/helpers/validate.ts — reusable for both Zod and AJV
// import { ZodSchema } from 'zod';
// import { APIResponse } from '@playwright/test';

// /**
//  * Parse and validate a Playwright APIResponse body against a Zod schema.
//  * Throws a clear error message listing every validation failure.
//  */
// export async function validateResponse<T>(
//   response: APIResponse,
//   schema: ZodSchema<T>
// ): Promise<T> {
//   const body = await response.json();
//   const result = schema.safeParse(body);

//   if (!result.success) {
//     const issues = result.error.issues
//       .map(i => ` • ${i.path.join('.') || 'root'}: ${i.message}`)
//       .join('\n');
//     throw new Error(
//       `Schema validation failed for ${response.url()}\n${issues}`
//     );
//   }

//   return result.data;
// }
// // tests/users.spec.ts — clean test using the helper
// import { test, expect } from '@playwright/test';
// import { validateResponse } from './helpers/validate';
// import { UserSchema, UserListSchema } from './schemas/user.schema';

// test('GET /users/:id — schema + values', async ({ request }) => {
//   const response = await request.get('/users/1');
//   expect(response.status()).toBe(200);

//   // One line — parses body, validates schema, returns typed object
//   const user = await validateResponse(response, UserSchema);

//   // user is fully typed — full IDE autocomplete here
//   expect(user.id).toBe(1);
//   expect(user.role).toMatch(/^(admin|member|guest)$/);
// });

// test('GET /users — list schema', async ({ request }) => {
//   const response = await request.get('/users');
//   expect(response.status()).toBe(200);

//   const users = await validateResponse(response, UserListSchema);
//   expect(users.length).toBeGreaterThan(0);
// });
// // This is the pattern to adopt as your standard. Every test does three things in order: assert the status code, validate the schema, then assert specific values. The schema check sits between them — it guarantees the shape before you access any fields, so your value assertions can never throw unexpected TypeErrors.

