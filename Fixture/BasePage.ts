import { test as base } from '@playwright/test';

type MyFixtures = {
  loggedInRequest: string;
};

export const test = base.extend<MyFixtures>({
  loggedInRequest: async ({ request }, use) => {
    const response = await request.post('/auth/login', {
      data: {
        username: 'user@test.com',
        password: 'secret',
      },
    });

    // optional but recommended
    if (!response.ok()) {
      throw new Error('Login failed');
    }

    const { token } = await response.json();

    await use(token);
  },
});
