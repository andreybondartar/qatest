import { test } from '../fixtures/apiFixtures';
import { expect } from '@playwright/test';

test.describe('Comments API', () => {
  let token: string;
  let slug: string;
  let commentId: number;

  test.beforeEach(async ({ users, articles }) => {
    const user = { username: 'commentuser', email: 'commentuser@example.com', password: 'Password1!' };
    await users.createUser(user);
    const loginResp = await users.loginUser({ email: user.email, password: user.password });
    const body = await loginResp.json();
    token = body.user.token;

    const articleResp = await articles.createArticle(token, { title: 'Comment Article', description: 'desc', body: 'body', tagList: ['comment'] });
    const art = await articleResp.json();
    slug = art.article.slug;
  });

  test('Add and remove comment', async ({ comments }) => {
    const commentResp = await comments.addComment(token, slug, { body: 'Nice article!' });
    expect(commentResp.ok()).toBeTruthy();
    const commentBody = await commentResp.json();
    commentId = commentBody.comment.id;

    const removeResp = await comments.removeComment(token, slug, commentId);
    expect(removeResp.ok()).toBeTruthy();
  });
});
