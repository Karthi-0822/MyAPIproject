import { APIResponse } from '@playwright/test';
import * as allure from 'allure-js-commons';

interface RequestLog {
  method: string;
  url: string;
  payload?: unknown;
}

export async function attachRequest(response: APIResponse, requestInfo: RequestLog ) {

  await allure.attachment(requestInfo.method + ' - Request', JSON.stringify(requestInfo, null, 2), 'application/json');

  const responseInfo = { status: response.status(), headers: response.headers(), body: await safeJson(response) };

  await allure.attachment(requestInfo.method + ' - Response', JSON.stringify(responseInfo, null, 2), 'application/json');
}

async function safeJson(response: APIResponse) {
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
}