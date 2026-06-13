// expect(value).toBeGreaterThan(n)
// Asserts a number is strictly greater than n. Useful for non-empty lists and minimum values.
// const body = await response.json(); expect(body.length).toBeGreaterThan(0); // non-empty expect(body.total).toBeGreaterThan(100); // minimum total

// expect(value).toBeGreaterThanOrEqual(n)
// Asserts a number is greater than OR equal to n.
// expect(body.page).toBeGreaterThanOrEqual(1); expect(body.items.length).toBeGreaterThanOrEqual(1);

// expect(value).toBeLessThan(n)
// Asserts a number is strictly less than n. Use for pagination limits and max values.
// expect(body.items.length).toBeLessThan(101); // max page size expect(body.errorCode).toBeLessThan(500);

// expect(value).toBeLessThanOrEqual(n)
// Asserts a number is less than OR equal to n.
// expect(body.results.length).toBeLessThanOrEqual(20);

// expect(string).toContain(substring)
// Asserts a string contains a substring, or an array contains an item.
// // String contains expect(body.message).toContain('successfully'); expect(response.headers()['content-type']).toContain('application/json'); // Array contains item expect(body.roles).toContain('admin');


// expect(string).toMatch(/regex/)
// Asserts a string matches a regular expression. Use for format validation — UUIDs, dates, emails.
// expect(body.id).toMatch(/^[0-9a-f-]{36}$/); // UUID format expect(body.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}/); // ISO date expect(body.email).toMatch(/^.+@.+\..+$/);
// This is underused. UUID, date, and email format checks catch backend bugs that value checks miss entirely.

// expect(value).toHaveLength(n)
// Asserts an array or string has exactly the given length.
// expect(body).toHaveLength(100); // exactly 100 items expect(body.token).toHaveLength(64); // token length expect(body.tags).toHaveLength(3);