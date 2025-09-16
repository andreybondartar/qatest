import { ApiClient } from './apiClient';

export class TagsClient {
  constructor(private api: ApiClient) {}

  /**
   * Отримати всі статті із зазначеним тегом
   * @param tag Назва тега
   * @returns Response API
   */
  getArticlesByTag(tag: string) {
    return this.api.get(`api/articles?tag=${tag}`);
  }

  /**
   * Отримати список усіх теґів
   */
  getAllTags() {
    return this.api.get('api/tags');
  }
}
