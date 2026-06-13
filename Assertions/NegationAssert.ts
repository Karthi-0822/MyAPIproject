// expect(response).not.toBeOK()
// Asserts the response is NOT in the 2xx range. Broad failure check for error scenarios.
// // When testing auth failure const response = await request.get('/admin', { headers: { 'Authorization': 'Bearer bad-token' }, }); expect(response).not.toBeOK(); expect(response.status()).toBe(401); // be specific toocopy
// Always follow .not.toBeOK() with an exact status check. Knowing it failed is not enough — knowing HOW it failed (401 vs 403 vs 422) is the real assertion.

// expect(body).not.toHaveProperty('key')
// Asserts a field is absent from the response. Use to verify sensitive fields are stripped.
// const body = await response.json(); // Password must never appear in API responses expect(body).not.toHaveProperty('password'); expect(body).not.toHaveProperty('passwordHash'); expect(body).not.toHaveProperty('internalNotes');copy
// This is a security assertion. If your API ever accidentally leaks a password or secret field, this is what catches it. Every user-facing endpoint should have at least one .not.toHaveProperty check for sensitive fields.

// expect(body).not.toEqual({})
// Asserts the body is not an empty object or specific value.
// expect(body).not.toEqual({}); expect(body).not.toEqual([]); expect(body.data).not.toBeNull()