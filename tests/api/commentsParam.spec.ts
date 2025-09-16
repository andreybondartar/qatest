import { test } from '../fixtures/apiFixtures';
import { expect } from '@playwright/test';

const commentsData = [
  { body: 'Great article!' },
  { body: 'Needs more examples.' },
  { body: 'Very informative.' },
];

test.describe('Parametrized Comments API', () => {
  let token: string;
  let slug: string;

  test.beforeEach(async ({ users, articles }) => {
    const user = { username: 'paramcomment', email: 'paramcomment@example.com', password: 'Password1!' };
    await users.createUser(user);
    const loginResp = await users.loginUser({ email: user.email, password: user.password });
    const body = await loginResp.json();
    token = body.user.token;

    const articleResp = await articles.createArticle(token, { title: 'Comment Article', description: 'desc', body: 'body', tagList: ['comments'] });
    const art = await articleResp.json();
    slug = art.article.slug;
  });

  for (const commentData of commentsData) {
    test(`Add and remove comment: "${commentData.body}"`, async ({ comments }) => {
      const addResp = await comments.addComment(token, slug, commentData);
      expect(addResp.ok()).toBeTruthy();

      const added = await addResp.json();
      const commentId = added.comment.id;
      expect(added.comment.body).toBe(commentData.body);

      const removeResp = await comments.removeComment(token, slug, commentId);
      expect(removeResp.ok()).toBeTruthy();
    });
  }
});
