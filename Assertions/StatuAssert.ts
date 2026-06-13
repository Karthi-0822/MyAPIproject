
// expect(response).toBeOK()

// Passes when the HTTP status code is in the 2xx range (200–299). The simplest success check.

// expect(response).toBeOK(); // passes for 200, 201, 204 — fails for 400, 404, 500copy
// Use this for happy-path tests where any success is acceptable. Switch to the exact status check below when the specific code matters.

// ---------------------------------------------------------------------------------------------------------------------------

// expect(response.status()).toBe(201)

// Asserts the exact HTTP status code. Use whenever the specific code carries meaning.

// expect(response.status()).toBe(200); // GET — resource found expect(response.status()).toBe(201); // POST — resource created expect(response.status()).toBe(204); // DELETE — no content expect(response.status()).toBe(404); // negative testcopy
// toBeOK() silently passes a 201 when you expected a 200, or a 204 when something should have returned a body. In negative tests always check the exact code.


// ----------------------------------------------------------------------------------------------------------------------------------
// expect(response.status()).not.toBe(500)

// Asserts the status is NOT a specific code. Useful as a broad "server did not crash" guard.

// expect(response.status()).not.toBe(500); expect(response.status()).not.toBe(401); // auth is workingcopy
// Pair with .toBeOK() — one checks you got a success, the other rules out a specific failure.


//*******************************************************************************************************************************************