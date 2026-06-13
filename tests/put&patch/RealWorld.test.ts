// tests/users.spec.ts
import { test, expect } from '@playwright/test';

interface User {
  id: number; name: string;
  email: string; role: string;
}

const FULL_USER: Omit<User, 'id'> = {
  name: 'Alice Updated',
  email: 'alice@example.com',
  role: 'admin',
};

test.describe('PUT /users/:id', () => {

  test('replaces full resource on 200', async ({ request }) => {
    const res = await request.put('/users/1', { data: FULL_USER });
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(FULL_USER);
  });

  test('wipes omitted fields', async ({ request }) => {
    const res = await request.put('/users/1', {
      data: { name: 'Alice' }, // email and role omitted
    });
    const body = await res.json();
    expect(body.email).toBeNull();
    expect(body.role).toBeNull();
  });

  test('returns 404 for unknown id', async ({ request }) => {
    const res = await request.put('/users/99999', { data: FULL_USER });
    expect(res.status()).toBe(404);
  });

});

test.describe('PATCH /users/:id', () => {

  test('updates only sent fields', async ({ request }) => {
    const before = await (await request.get('/users/1')).json() as User;

    const res = await request.patch('/users/1', {
      data: { name: 'Alice Patched' },
    });
    expect(res.status()).toBe(200);

    const after = await res.json() as User;
    expect(after.name).toBe('Alice Patched');  // changed
    expect(after.email).toBe(before.email);    // preserved
    expect(after.role).toBe(before.role);      // preserved
  });

  test('null explicitly clears a field', async ({ request }) => {
    const res = await request.patch('/users/1', {
      data: { role: null }, // deliberate clear
    });
    const body = await res.json();
    expect(body.role).toBeNull();
  });

  test('returns 404 for unknown id', async ({ request }) => {
    const res = await request.patch('/users/99999', {
      data: { name: 'Ghost' },
    });
    expect(res.status()).toBe(404);
  });

});

//Every describe block has a 404 test. This is not optional — it verifies the API doesn't silently create a ghost resource when the id doesn't exist, which is a real and common bug in PUT/PATCH handlers.