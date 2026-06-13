// Why schema validation beats field-by-field assertions
// There are two different things to assert about an API response. Most teams only do one of them.

// What you usually write
// Value assertions
// Does this specific response have the right values? expect(body.id).toBe(1)

// What schema validation adds
// Contract assertions
// Does this endpoint always return the right shape? Every field, every type, every constraint — regardless of which record.

// // Value assertion — checks ONE response
// expect(body.id).toBe(1);
// expect(body.email).toBe('alice@test.com');
// // If the backend removes 'email' tomorrow → this still passes!
// // expect(body.email) is just undefined.toBe('alice@test.com') → TypeError

// // Schema validation — checks the CONTRACT
// // If the backend removes 'email' tomorrow → fails immediately with:
// // "Required field 'email' missing at body.email"
// validateSchema(body, UserSchema);copy
// Value assertions don't catch missing fields. If your API silently drops the email field, expect(body.email).toBe('alice@test.com') throws a TypeError: Cannot read property 'toBe' of undefined — not a meaningful test failure. Schema validation tells you exactly which field is missing, what type it should be, and why.

// What schema validation catches that value assertions miss
// Backend change	                                Value assertion	                     Schema validation
// Field renamed userId →                 user_id	Passes (field is undefined)	    Fails — userId missing
// Field type changed number → string    	Passes if value matches	                Fails — wrong type
// New required field added	              Passes (you never tested it)	          Fails if not in schema
// Nullable field made non-nullable	      Passes	                                Fails — nullability broken
// Array becomes object	                  TypeError on .length	                  Fails — expected array