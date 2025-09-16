import { test as base } from '@playwright/test';
import { ApiClient } from '../../api/clients/apiClient';
import { UsersClient } from '../../api/clients/usersClient';
import { ArticlesClient } from '../../api/clients/articlesClient';
import { CommentsClient } from '../../api/clients/commentsClient';
import { TagsClient } from '../../api/clients/tagsClient';
import { FavouriteClient } from '../../api/clients/favouriteClient';

export const test = base.extend<{
  api: ApiClient;
  users: UsersClient;
  articles: ArticlesClient;
  comments: CommentsClient;
  tags: TagsClient;
  favourite: FavouriteClient;
}>({
  api: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use(client);
  },
  users: async ({ api }, use) => {
    await use(new UsersClient(api));
  },
  articles: async ({ api }, use) => {
    await use(new ArticlesClient(api));
  },
  comments: async ({ api }, use) => {
    await use(new CommentsClient(api));
  },
  tags: async ({ api }, use) => {
    await use(new TagsClient(api));
  },
  favourite: async ({ api }, use) => {
    await use(new FavouriteClient(api));
  },
});
