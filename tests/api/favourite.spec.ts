import { test } from '../fixtures/apiFixtures';
import { expect } from '@playwright/test';
import { FavouriteClient } from '../../api/clients/favouriteClient';

test.describe('Favourite Articles API', () => {
  let token: string;
  let slug: string;
  let favClient: FavouriteClient;

  test.beforeEach(async ({ users, articles, api }) => {
    favClient = new FavouriteClient(api);

    const user = { username: 'favuser', email: 'favuser@example.com', password: 'Password1!' };
    await users.createUser(user);
    const loginResp = await users.loginUser({ email: user.email, password: user.password });
    const body = await loginResp.json();
    token = body.user.token;

    const articleResp = await articles.createArticle(token, { title: 'Fav Article', description: 'desc', body: 'body', tagList: ['fav'] });
    const art = await articleResp.json();
    slug = art.article.slug;
  });

  test('Add and remove favourite article', async () => {
    const addResp = await favClient.addToFavorites(token, slug);
    expect(addResp.ok()).toBeTruthy();

    const removeResp = await favClient.removeFromFavorites(token, slug);
    expect(removeResp.ok()).toBeTruthy();
  });
});
