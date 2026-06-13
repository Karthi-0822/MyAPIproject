//   Zod vs AJV — which to use
// Neither is universally better. The right choice depends on your team's context.

// Zod
// TypeScript-first project
// ✓ Schema IS the TypeScript type — zero duplication
// ✓ Readable, chainable API
// ✓ No separate type definitions
// ✓ Better error messages out of the box
// ✗ Not JSON Schema — can't share with OpenAPI
// ✗ Slightly larger bundle

// AJV
// Standards / OpenAPI project
// ✓ JSON Schema standard — import from OpenAPI spec
// ✓ Language-agnostic — share with backend teams
// ✓ Extremely fast compiled validators
// ✓ Rich ecosystem (formats, keywords)
// ✗ Verbose JSON Schema syntax
// ✗ No automatic TypeScript types

// Situation	                                        Pick
// TypeScript throughout — tests and app code        	Zod
// You have an OpenAPI spec to validate against	      AJV
// Schemas shared with a non-TypeScript backend	      AJV
// You want inferred types with zero boilerplate	    Zod
// Performance-critical — thousands of validations   	AJV
// Team already uses Zod in the app	                  Zod — reuse existing schemas
// The real superpower of Zod in a TypeScript project: if you define your schemas in a shared schemas/ folder, both your Playwright tests and your application code can import the same schema. Your API contract is enforced in production and in tests from a single source of truth.