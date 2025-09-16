import { ApiClient } from './apiClient';

export class ArticlesClient {
  constructor(private api: ApiClient) {}

  createArticle(token: string, article: any) {
    return this.api.post('api/articles', { article }, { Authorization: `Token ${token}` });
  }

  getArticles(query?: string) {
    return this.api.get(`api/articles${query ? `?${query}` : ''}`);
  }
}
