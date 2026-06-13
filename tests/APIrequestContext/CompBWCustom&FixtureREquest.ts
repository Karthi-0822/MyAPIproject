// Side-by-side comparison
// Both are APIRequestContext objects — the difference is who creates them, who configures them, and who cleans them up.

import { test } from "../../Fixture/BasePage";

// Property	             request fixture	                   Custom context
// How created	         Playwright auto-creates it	        You call playwright.request.newContext()
// Configured from	     playwright.config.ts use: {}	      Options you pass directly
// Lifecycle	           One per test, auto-disposed	      Lives until you call .dispose()
// Cleanup	             Automatic — you do nothing	        Manual — you must call .dispose()
// Cookie jar	         Fresh per test	                    Shared across all calls through it
// Multiple configs?	   One config for all tests	          Each context has its own config
// Multiple base URLs?	 No — one baseURL	                  Yes — create one context per API
// Best for	           Standard tests, one API	          Multi-API, multi-role, custom scenarios

// Same underlying type — different creation path
// Both variables below are APIRequestContext instances
// They have the exact same methods: .get() .post() .put() etc.

// Path A — from the fixture
test('example', async ({ request }) => {
  // request is APIRequestContext
  request.get('/posts');
});

// Path B — created manually
test('example', async ({ playwright }) => {
  const ctx = await playwright.request.newContext({  baseURL: 'https://api.example.com'  });
  // ctx is also APIRequestContext — same methods
  ctx.get('/posts');
});