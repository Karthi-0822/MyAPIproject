import { test as base } from '@playwright/test';
import { PetStoreService } from '../Services/PetStoreService';

type MyFixtures = {
  petStore: PetStoreService;
};

export const test = base.extend<MyFixtures>({
  petStore: async ({ request }, use) => {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
    throw new Error(
      'BASE_URL environment variable is missing'
    );
  }
    await use(new PetStoreService(request, baseURL!));
  }
})

export { expect } from '@playwright/test';
