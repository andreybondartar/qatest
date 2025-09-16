import { ApiClient } from './apiClient';

export class TagsClient {
  constructor(private api: ApiClient) {}

  /**
   * Получить все статьи с указанным тегом
   * @param tag Название тега
   * @returns Response API
   */
  getArticlesByTag(tag: string) {
    return this.api.get(`api/articles?tag=${tag}`);
  }

  /**
   * Получить список всех тегов
   */
  getAllTags() {
    return this.api.get('api/tags');
  }
}
