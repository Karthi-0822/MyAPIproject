// What is APIRequestContext?
// APIRequestContext is the object that actually sends HTTP requests in Playwright. Every request you make — whether via the test fixture or a manually created context — goes through one.

// It is a container that holds
// baseURL   The root URL prepended to every relative path — '/posts' becomes 'https://api.example.com/posts'
// headers   Default headers sent on every request — auth token, Accept, Content-Type
// cookies   Cookie jar shared across all requests made through this context
// timeout   Default request timeout applied when no per-request timeout is set
// ignoreHTTPS Whether to skip TLS certificate validation — useful for self-signed certs in staging



// Think of APIRequestContext like a configured HTTP client. The same way you'd configure an axios instance with a base URL and default headers and reuse it across your app — that's exactly what APIRequestContext is in Playwright.

// It exposes these HTTP methods
// context.get(url, options?)
// context.post(url, options?)
// context.put(url, options?)
// context.patch(url, options?)
// context.delete(url, options?)
// context.head(url, options?)
// context.fetch(url, options?) // generic — any methodcopy

// The key insight: request in your test function is an APIRequestContext. It was created by Playwright and configured from your playwright.config.ts. You can also create your own contexts with different config — that's the whole distinction.

