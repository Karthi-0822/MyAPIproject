// How setup and teardown work in fixtures
// A fixture is split in two by a single await use() call. Everything before is setup. Everything after is teardown — and it runs even if the test throws.

// Setup — before await use()
// Create the user via API. Assert it worked. Store the user object to pass to the test.

// await use(user) — the test runs
// Playwright hands the user object to the test function. The fixture pauses here until the test finishes — pass or fail.

// Teardown — after await use()
// Delete the user via API. This runs unconditionally — even when the test throws an error mid-way.

// async ({ request }, use) => {

//   // ── SETUP ────────────────────────────────────────
//   const res = await request.post('/users', { data: { ... } });
//   const user = await res.json();

//   // ── HANDOFF — test runs here ──────────────────────
//   await use(user);

//   // ── TEARDOWN — always runs ────────────────────────
//   await request.delete(`/users/${user.id}`);

// };
// The teardown guarantee is the whole point. If you put cleanup code inside the test itself, a failing assertion stops execution and the cleanup never runs — leaving orphaned records in your database. The teardown block after await use() runs no matter what happens in the test.