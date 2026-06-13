import { test, expect } from '@playwright/test';
test('POST /posts with auth header', async ({ request }) => {
  const response = await request.post('/posts', {

    data: {
      title: 'My new post',
      body: 'Post content here',
      userId: 1,
    },

    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Accept': 'application/json',
      'X-Request-ID': 'test-001',
    },

  });

  expect(response.status()).toBe(201);


  // Assert what YOU sent was reflected back by the server
  const body = await response.json();

  // Check the echo — server returns what you sent
  expect(body.title).toBe('My new post');
  expect(body.userId).toBe(1);

  // Check what the server ADDED — id assigned, timestamps set
  expect(body.id).toBeDefined();
  expect(body.id).toBeGreaterThan(0);
});

