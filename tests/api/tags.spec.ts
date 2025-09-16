import { test } from '../fixtures/apiFixtures';
import { expect } from '@playwright/test';

test.describe('Tags API', () => {
  test('Search articles by tag', async ({ tags, articles, users }) => {
    const user = { username: 'taguser', email: 'taguser@example.com', password: 'Password1!' };
    await users.createUser(user);
    const loginResp = await users.loginUser({ email: user.email, password: user.password });
    const body = await loginResp.json();
    const token = body.user.token;

    await articles.createArticle(token, { title: 'Tag Article', description: 'desc', body: 'body', tagList: ['playwright'] });

    const tagResp = await tags.getArticlesByTag('playwright');
    expect(tagResp.ok()).toBeTruthy();
    const tagBody = await tagResp.json();
    expect(tagBody.articles.length).toBeGreaterThan(0);
  });
});
