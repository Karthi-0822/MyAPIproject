// Decision guide — which to use
// One question to ask yourself first: does the default config in playwright.config.ts work for this test?

// Use request fixture when
// ✓ All tests hit the same API
// ✓ Same auth token for all tests
// ✓ Same base URL throughout
// ✓ You want automatic cleanup
// ✓ You want test isolation by default

// This covers ~90% of test suites

// Create your own context when
// ✓ You need a different base URL
// ✓ You need a different auth role
// ✓ Two APIs in one test
// ✓ You need persistent cookies across multiple requests
// ✓ Worker-scoped auth (login once, share across tests)

// Concrete scenario map
// Scenario	                                                      Use
// Standard CRUD tests — one API, one token	                      request fixture
// Test a user vs admin accessing the same endpoint	              Two custom contexts — one per role
// Your app calls a third-party API in its flow	                  Custom context for the third-party
// Worker-scoped auth — login once, share token	                  Custom context in a worker-scoped fixture
// Session-based auth with cookie persistence	                    Custom context — cookie jar persists across calls
// Test an endpoint that redirects across domains	                Custom context — control maxRedirects per context


// Start with the request fixture. It handles the vast majority of cases and gives you automatic lifecycle management. Reach for a custom context only when you hit a limitation — needing a different base URL, a different auth header, or a persistent cookie jar. The interface is identical either way.