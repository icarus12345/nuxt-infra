import { IAuthRepository, IAuthIdentity, IdentityResource } from "@interfaces";
import { $ApiClient } from '@gateways';
import { AuthMapper } from "@mappers";


export class AuthRepository implements IAuthRepository {
  
  async login(email: string, password: string): Promise<IAuthIdentity> {
    try {
      const response: IdentityResource = await $ApiClient.post('/api/v1/auth/login', { email, password });
      return AuthMapper.toAuthIdentity(response.data, response.meta)
    } catch (error) {
      throw error;
    }
  }
  async logout(): Promise<Boolean> {
    try {
      await $ApiClient.post('/api/v1/auth/logout');
      return true
    } catch (error) {
      throw error;
    }
  }
}

export const $AuthRepository = new AuthRepository()