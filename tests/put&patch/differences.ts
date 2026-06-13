

//PUT
//Full replacement
//Send the complete resource. The server replaces everything it has with exactly what you sent. Omitted fields are wiped
// Before
// name   "Alice"
// email   "a@x.com"
// role   "admin"
// age   30

// After
// name          "Alice Updated"   changed
// email            null              wiped
// role             null              wiped
// age              null              wiped
// PATCH
// Partial update
// Send only the fields you want to change. The server merges your changes. Omitted fields are untouched.
// Before
// name   "Alice"
// email   "a@x.com"
// role   "admin"
// age     30

// After
// name          "Alice Updated"   changed
// email            "a@x.com"      preserved
// role             "admin"        preserved
// age              "30"           preserved
