import { ApiClient } from './apiClient';

export class UsersClient {
  constructor(private api: ApiClient) {}

  createUser(user: { username: string; email: string; password: string }) {
    return this.api.post('api/users', { user });
  }

  loginUser(user: { email: string; password: string }) {
    return this.api.post('api/users/login', { user });
  }
}
