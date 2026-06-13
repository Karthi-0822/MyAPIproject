// // AJV — JSON Schema standard
// // AJV validates against the JSON Schema specification. Use it when you need standards-compliant schemas, OpenAPI integration, or language-agnostic schema sharing.

// // Install
// // npm install ajv ajv-formats
// // tests/schemas/user.schema.ts — JSON Schema definition
// import Ajv from 'ajv';
// import addFormats from 'ajv-formats';

// const ajv = new Ajv({ allErrors: true }); // collect ALL errors, not just first
// addFormats(ajv);                             // adds 'email', 'date-time', 'uuid' etc.

// export const UserSchema = {
//   type: 'object',
//   required: ['id', 'name', 'email', 'role', 'createdAt'],
//   additionalProperties: false,  // fail on unexpected fields
//   properties: {
//     id: { type: 'integer', minimum: 1 },
//     name: { type: 'string', minLength: 1 },
//     email: { type: 'string', format: 'email' },
//     role: { type: 'string', enum: ['admin', 'member', 'guest'] },
//     createdAt: { type: 'string', format: 'date-time' },
//     age: { type: ['number', 'null'], minimum: 0 },
//     tags: { type: 'array', items: { type: 'string' } },
//   },
// } as const;

// // Compile once — reuse the validator function across all tests
// export const validateUser = ajv.compile(UserSchema);


// tests/users.spec.ts — using AJV in tests
// import { test, expect } from '@playwright/test';
// import { validateUser } from './schemas/user.schema';

// test('GET /users/:id matches UserSchema', async ({ request }) => {
//   const body = await (await request.get('/users/1')).json();

//   const valid = validateUser(body);

//   if (!valid) {
//     const errors = validateUser.errors!.map(e =>
//       `${e.instancePath || 'root'}: ${e.message}`
//     ).join('\n');
//     throw new Error(`Schema validation failed:\n${errors}`);
//   }

//   // body is validated — safe to assert values
//   expect(body.id).toBe(1);
// });
// Compile schemas once, outside tests. ajv.compile() is expensive — it builds an optimised validator function. If you call it inside a test or a beforeEach, you're recompiling on every test. Export the compiled validator at module level so it's created once per worker.