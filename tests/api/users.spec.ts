import { test } from '../fixtures/apiFixtures';
import { expect } from '@playwright/test';

// Добавляем объявление массива пользователей
const usersData = [
  { username: 'user1', email: 'user1@example.com', password: 'Password1!' },
  { username: 'user2', email: 'user2@example.com', password: 'Password2!' },
];

test.describe('Users API', () => {
  for (const user of usersData) {
    test(`Create and login user: ${user.username}`, async ({ users }) => {
      // Создаём уникального пользователя, чтобы избежать конфликтов
      const uniqueUser = {
        username: `${user.username}${Date.now()}`,
        email: `${Date.now()}_${user.email}`,
        password: user.password,
      };

      const createResp = await users.createUser(uniqueUser);
      expect(createResp.ok()).toBeTruthy();

      const loginResp = await users.loginUser({ email: uniqueUser.email, password: uniqueUser.password });
      expect(loginResp.ok()).toBeTruthy();

      const body = await loginResp.json();
      expect(body.user.token).toBeTruthy();
    });
  }
});
