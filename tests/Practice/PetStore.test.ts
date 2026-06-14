import { test, expect } from '../../Fixture/BasePageFixture';
import users from '../../testData/petStoreData.json';
import * as allure from 'allure-js-commons';

for (const userData of users) {

  test(`Create User - ${userData.firstName}`, async ({ petStore }) => {

    // ===== Allure Metadata =====
    await allure.epic('PetStore');
    await allure.feature('User Management');
    await allure.story('Create, Fetch and Delete User');
    await allure.severity('critical');
    await allure.owner('Siva');
    await allure.tag('smoke');
    await allure.tag('api');
    await allure.description(`
        Verify user can be:
        1. Created
        2. Retrieved
        3. Deleted

        User Data:${userData.firstName}`);

    const timestamp = Date.now();

    const requestBody = {
      username: `${userData.firstName}-${timestamp}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: `${userData.firstName}-${timestamp}@test.com`,
      password: 'Password123',
      phone: '9999999999',
      userStatus: userData.userStatus
    };

    // ===== Step 1 =====
    const createResponse = await allure.step('Create User', async () => {
      const response = await petStore.create(requestBody);
      expect(response.code).toBe(200);
      expect(response.message).toBeTruthy();
      return response;
    });

    await new Promise(r => setTimeout(r, 1000)); // Adding a small delay to ensure data consistency before fetching
    // ===== Step 2 =====
    const user =
      await allure.step('Fetch Created User', async () => {
        const response = await petStore.getByUsername(requestBody.username);
        expect(response.username).toBe(requestBody.username);
        expect(response.firstName).toBe(requestBody.firstName);
        expect(response.lastName).toBe(requestBody.lastName);
        expect(response.email).toBe(requestBody.email);
        expect(response.phone).toBe(requestBody.phone);
        expect(response.userStatus).toBe(requestBody.userStatus);
        return response;
      });
    // ===== Step 3 =====

    await allure.step('Delete User', async () => {
      await petStore.delete(requestBody.username);
    });

  }
  );

}