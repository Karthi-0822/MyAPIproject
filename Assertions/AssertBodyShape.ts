// expect(body).toHaveProperty('key')
// Asserts a field exists on the response object. Does not care about the value — only presence.
// const body = await response.json(); expect(body).toHaveProperty('id'); expect(body).toHaveProperty('title'); // Nested path using dot notation expect(body).toHaveProperty('user.address.city');
// Use for contract testing — proving the API returns the fields your frontend depends on, regardless of their values.

// expect(body).toHaveProperty('key', value)
// Asserts a field exists AND equals a specific value. Two checks in one line.
// expect(body).toHaveProperty('id', 1); expect(body).toHaveProperty('status', 'active'); expect(body).toHaveProperty('meta.version', 'v2');

// expect(body).toMatchObject({...})
// Asserts the object contains at least the given fields and values. Extra fields in the response are ignored.\
// expect(body).toMatchObject({ id: 1, status: 'active', title: expect.any(String), // type, not value }); // passes even if body has 20 other fields
// This is the workhorse for body assertions. Use it instead of toEqual() unless you need to assert the entire object with no extra fields allowed.\


// expect(body).toEqual({...})
// Deep equality — the entire object must match exactly. Extra fields in the response cause a failure.\
// expect(body).toEqual({ id: 1, title: 'Post title', userId: 1, body: 'Content here', }); // fails if response has ANY extra field
// toEqual() is brittle on real APIs — servers often add fields (metadata, timestamps, versioning) that break this assertion. Prefer toMatchObject() unless you are testing a tightly controlled internal API.

// expect(body).toStrictEqual({...})
// Like toEqual() but also checks object types. undefined properties and array sparseness are considered.
// expect(body).toStrictEqual({ id: 1, tag: undefined, // must be explicitly undefined });
// Rarely needed in API testing. Use toMatchObject() for most cases. toStrictEqual() is more at home in unit tests.

// expect(value).toBeTruthy()
// Passes for any truthy value — anything that is not false, 0, null, undefined, or empty string.
// expect(body.token).toBeTruthy(); // token exists and non-empty expect(body.id).toBeTruthy(); // id is set
// toBeTruthy() is loose. The number 0 is falsy, so expect(body.count).toBeTruthy() fails when count is legitimately 0. Prefer .toBeDefined() or an explicit value check.

// expect(value).toBeDefined()
// Asserts the value is not undefined. Stricter than toBeTruthy() — 0, false, and null all pass.

// expect(body.id).toBeDefined(); expect(body.count).toBeDefined(); // passes even when count is 0
// Prefer toBeDefined() over toBeTruthy() when the value could legitimately be 0, false, or an empty string.

// expect(value).toBeNull()
// Asserts the value is exactly null. Use when null is the expected API response for an optional field.

// expect(body.deletedAt).toBeNull(); // not deleted yet expect(body.parent).toBeNull(); // top-level item

// expect(value).toBeInstanceOf(Array)
// Asserts the value is an instance of a given class. More explicit than Array.isArray().\
// expect(body).toBeInstanceOf(Array); // failure message tells you exactly what type it got