import { BaseClient } from "./BaseClient";
import { attachRequest } from "../helpers/allure-request";

export interface PetStoreUser {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}
export interface PetStoreApiResponse {
  code: number;
  type: string;
  message: string;
}

export type CreateUserRequest = PetStoreUser;
export type UpdateUserRequest = Partial<PetStoreUser>;

export class PetStoreService extends BaseClient {
  private readonly endpoint = "/v2/user";

  async create(data: PetStoreUser): Promise<PetStoreApiResponse> {
    const res = await this.request.post(`${this.baseURL}${this.endpoint}`, { data });
    await attachRequest(res, {
      method: 'POST',
      url: `${this.baseURL}${this.endpoint}`,
      payload: data
    });

    return this.assertAndParse<PetStoreApiResponse>(res, `POST ${this.endpoint}`);
  }

  async getByUsername(username: string): Promise<PetStoreUser> {
    const res = await this.request.get(`${this.baseURL}${this.endpoint}/${username}`);
    await attachRequest(res, {
      method: 'GET',
      url: `${this.baseURL}${this.endpoint}/${username}`
    });
    return this.assertAndParse<PetStoreUser>(res, `GET ${this.endpoint}/${username}`);
  }

  async update(username: string, data: UpdateUserRequest) {
    const res = await this.request.put(`${this.baseURL}${this.endpoint}/${username}`, { data });
    await attachRequest(res, {
      method: 'PUT',
      url: `${this.baseURL}${this.endpoint}/${username}`,
      payload: data
    });
    return this.assertAndParse(res, `PUT ${this.endpoint}/${username}`);
  }

  async delete(username: string): Promise<void> {
    const res = await this.request.delete(`${this.baseURL}${this.endpoint}/${username}`);
    await attachRequest(res, {
      method: 'DELETE',
      url: `${this.baseURL}${this.endpoint}/${username}`
    });
    await this.assertOk(res, `DELETE ${this.endpoint}/${username}`);
  }
}