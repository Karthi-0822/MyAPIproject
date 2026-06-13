// // The 4 rules of negative testing
// // Every negative test must follow all four of these. Break any one and the test is incomplete.

// // #	Rule	                                        What it means
// // 1	Assert the exact status code	         toBe(422) not not.toBeOK(). A 500 is also not OK — but it means something completely different to a 422.
// // 2	Assert the error body shape	           Check that the response has an error or message field. A blank 422 body is a bug — your frontend has nothing to show the user.
// // 3	Assert no data leaked	                 On auth failures, check the body does NOT contain user data. A 401 that still returns profile info is a security bug.
// // 4	Assert the error message is specific	"title is required" not just "invalid input". Vague errors break the user experience and make debugging hard.
// // The anatomy of a complete negative test
// import { test } from "../Fixture/RobustFixture"
// test('describes exactly what should fail', async ({ request }) => {
//   // 1. Make the bad request — deliberately
//   const response = await request.post('/resource', { /* bad input */ });

//   // 2. Exact status — not .not.toBeOK()
//   expect(response.status()).toBe(422);

//   // 3. Parse the error body
//   const body = await response.json();

//   // 4. Error structure exists
//   expect(body).toHaveProperty('error');

//   // 5. No data leaked
//   expect(body).not.toHaveProperty('data');
// });