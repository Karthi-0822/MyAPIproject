import { expect } from '@playwright/test';
import { test } from '../../Fixture/BasePage';


test("Sample post data", async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      title: 'My new post',
      body: 'Post content here',
      userId: 1,
    }
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body.title).toBe('My new post');
  expect(body.body).toBe('Post content here');
  expect(body.userId).toBe(1);
});

//POST returns 201, not 200. A 201 means "resource created". Using toBeOK() here would pass on a 200 too — which might mean the server created nothing. Always assert the exact code on write operations.

