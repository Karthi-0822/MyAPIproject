import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseClient {
  protected readonly request: APIRequestContext;
  protected readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  //Central Guard call on Every response to check if the response is ok, if not throw an error with details
  protected async assertOk(response: APIResponse, context: string): Promise<void> {
    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Request to ${context} failed: ${response.status()} ${response.statusText()} ${response.url()} ${body}`);
    }
  }

  //Parse JSON response and handle any parsing errors gracefully, providing detailed error information
  protected async json<T>(response: APIResponse): Promise<T> {
    try {
      return await response.json() as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON from response: ${error}`);
    }
  }

  protected async assertAndParse<T>(response: APIResponse, context: string): Promise<T> {
    await this.assertOk(response, context);
    return this.json<T>(response);
  }
}
//The assertAndParse helper is the key. In raw tests you must remember to check the status before calling .json() every single time. In services, one method does both — the error message includes the HTTP status, URL, and body, so failures are self-describing without needing to open the Allure report.