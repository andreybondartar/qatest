import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  get(url: string, headers?: any) {
    return this.request.get(url, { headers });
  }

  post(url: string, data: any, headers?: any) {
    return this.request.post(url, { data, headers });
  }

  put(url: string, data: any, headers?: any) {
    return this.request.put(url, { data, headers });
  }

  delete(url: string, headers?: any) {
    return this.request.delete(url, { headers });
  }
}
