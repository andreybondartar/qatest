import { ApiClient } from './apiClient';

export class FavouriteClient {
  constructor(private api: ApiClient) {}

  addToFavorites(token: string, slug: string) {
    return this.api.post(`api/articles/${slug}/favorite`, {}, token);
  }

  removeFromFavorites(token: string, slug: string) {
    return this.api.delete(`api/articles/${slug}/favorite`, token);
  }
}
