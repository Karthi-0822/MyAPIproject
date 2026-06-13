// File and folder structure
// Good structure makes navigation instant and report output readable. Group by domain — not by HTTP method.

// bad — grouped by method (fights readability)
// tests/
//   get-tests.spec.ts← all GETs in one file? unusable at scale
//   post-tests.spec.ts
//   delete-tests.spec.ts

  
// good — grouped by domain/resource
// tests/
//   api/
//     users.spec.ts← all user CRUD in one place
//     posts.spec.ts
//     auth.spec.ts← login, logout, token refresh
//     payments.spec.ts
//   fixtures/
//     index.ts← all fixtures exported from one file
//     users.fixture.ts
//     posts.fixture.ts
//   playwright.config.ts
//   .env.dev
//   .env.staging
//   .env.production
// One spec file per resource. Everything about users — GET, POST, PATCH, DELETE, error cases — lives in users.spec.ts. When a user endpoint breaks, you know exactly which file to open. When a file grows beyond ~200 lines, split by sub-resource: users.spec.ts and users-roles.spec.ts.