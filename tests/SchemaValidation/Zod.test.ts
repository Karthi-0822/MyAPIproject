// // Zod — TypeScript-first schema validation
// // Zod schemas double as TypeScript types. Define the schema once — get both runtime validation and compile-time type safety.

// // Install
// // npm install zod
// // tests/schemas/user.schema.ts — define once, use everywhere
// import { z } from 'zod';

// export const UserSchema = z.object({
//   id: z.number().int().positive(),
//   name: z.string().min(1),
//   email: z.string().email(),
//   role: z.enum(['admin', 'member', 'guest']),
//   createdAt: z.string().datetime(),     // ISO 8601 format
//   age: z.number().min(0).nullable(),// nullable — can be null
//   tags: z.array(z.string()).optional(),// optional — may be absent
// });

// // Free TypeScript type — no duplication
// export type User = z.infer<typeof UserSchema>;

// // Array schema for list endpoints
// export const UserListSchema = z.array(UserSchema);

// tests/users.spec.ts — using Zod in tests
// import { test, expect } from '@playwright/test';
// import { UserSchema, UserListSchema } from './schemas/user.schema';

// test('GET /users/:id matches UserSchema', async ({ request }) => {
//   const body = await (await request.get('/users/1')).json();

//   // parse() throws a ZodError with full details if validation fails
//   const user = UserSchema.parse(body);

//   // user is now typed as User — full autocomplete
//   expect(user.id).toBe(1);
//   expect(user.email).toContain('@');
// });

// test('GET /users matches UserListSchema', async ({ request }) => {
//   const body = await (await request.get('/users')).json();

//   const users = UserListSchema.parse(body);
//   expect(users.length).toBeGreaterThan(0);
// });
// parse() vs safeParse(). parse() throws a ZodError on failure — Playwright catches it and fails the test with the full error message. safeParse() returns { success, data, error } — use it when you want to inspect the error programmatically before deciding how to fail.

// Using safeParse for custom error messages
// const result = UserSchema.safeParse(body);

// if (!result.success) {
//   // Format errors as readable list
//   const errors = result.error.issues.map(i =>
//     `${i.path.join('.')}: ${i.message}`
//   ).join('\n');
//   throw new Error(`Schema validation failed:\n${errors}`);
// }
// // result.data is the validated, typed object