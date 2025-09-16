import { test } from '../fixtures/apiFixtures';
import { expect } from '@playwright/test';

const articlesData = [
  { title: 'Playwright Test 1', description: 'Desc 1', body: 'Body 1', tagList: ['test'] },
  { title: 'Playwright Test 2', description: 'Desc 2', body: 'Body 2', tagList: ['automation'] },
  { title: 'Playwright Test 3', description: 'Desc 3', body: 'Body 3', tagList: ['ci'] },
];

test.describe('Parametrized Articles API', () => {
  let token: string;

  test.beforeEach(async ({ users }) => {
    const user = {
      username: `TestQA${Date.now()}`,
      email: `testqa${Date.now()}@example.com`,
      password: 'TestQAAndriiPlaywright1)',
    };

    const createResp = await users.createUser(user);
    if (!createResp.ok()) {
      const text = await createResp.text();
      throw new Error(`Create user failed: ${text}`);
    }

    const loginResp = await users.loginUser({ email: user.email, password: user.password });
    if (!loginResp.ok()) {
      const text = await loginResp.text();
      throw new Error(`Login failed: ${text}`);
    }

    const body = await loginResp.json();
    token = body.user.token;
  });

  for (const articleData of articlesData) {
    test(`Create and verify article: ${articleData.title}`, async ({ articles }) => {
      const createResp = await articles.createArticle(token, articleData);
      expect(createResp.ok()).toBeTruthy();

      const created = await createResp.json();
      expect(created.article.title).toBe(articleData.title);

      const searchResp = await articles.getArticles(`tag=${articleData.tagList[0]}`);
      expect(searchResp.ok()).toBeTruthy();

      const searchBody = await searchResp.json();
      const found = searchBody.articles.find((a: any) => a.slug === created.article.slug);
      expect(found).toBeTruthy();
    });
  }
});
