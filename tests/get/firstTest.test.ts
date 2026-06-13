import { expect, test } from "@playwright/test";

test("first API test", async ({ request }) => {

  const response = await request.get('/users');
  console.log(`THIS IS THE RESPONSE STATUS: ${response.status()}`);
  console.log(`THIS IS THE API URL: ${response.url()}`);
  
  console.log(`THIS IS THE RESPONSE IN JSON FORMAT`)
  console.log(await response.json());

  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(`THIS IS THE BODY OF THE RESPONSE IN JSON FORMAT`)
  console.log(body);
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('id');
  expect(body[0]).toHaveProperty('email');


})