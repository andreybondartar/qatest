import { ApiClient } from './apiClient';

export class CommentsClient {
  constructor(private api: ApiClient) {}

  addComment(token: string, slug: string, comment: { body: string }) {
    return this.api.post(
      `api/articles/${slug}/comments`,
      { comment }, // тіло запиту
      { Authorization: `Token ${token}` } // ✅ правильний заголовок
    );
  }

  removeComment(token: string, slug: string, commentId: number) {
    return this.api.delete(
      `api/articles/${slug}/comments/${commentId}`,
      { Authorization: `Token ${token}` } // ✅ правильний заголовок
    );
  }
}
