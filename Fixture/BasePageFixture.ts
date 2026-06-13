import { test as base } from '@playwright/test';
import { PetStoreService } from '../Services/PetStoreService';

type MyFixtures = {
  petStore: PetStoreService;
};

export const test = base.extend<MyFixtures>({
  petStore: async ({ request, baseURL }, use) => {
    console.log('baseURL:', baseURL);
    await use(new PetStoreService(request, baseURL!));
  }
})

export { expect } from '@playwright/test';
