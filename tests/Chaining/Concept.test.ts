// What request chaining is and why you need it
// Chaining means using data from one response as input to the next request. It's what proves your API actually works end-to-end — not just that individual endpoints respond.

// The core pattern — extract then inject
// // Step 1 — create something, capture its id
// const createRes = await request.post('/posts', { data: payload });
// const { id } = await createRes.json();

// // Step 2 — use that id in the next request
// const getRes = await request.get(`/posts/${id}`);

// // Step 3 — assert the data is actually there
// expect((await getRes.json()).id).toBe(id);

// Why a POST returning 201 is not enough proof
// POST /posts → 201 ✓
//   vs  
// POST /posts → 201 ✓ → GET /posts/:id → 200 + data ✓
// A 201 only proves the endpoint responded. The server could return 201 and write nothing to the database — or write the wrong data. Only a follow-up GET with the returned ID proves the resource was actually persisted correctly. This is the most important chain to have for every POST endpoint.