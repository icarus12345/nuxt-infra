import { IAuthRepository, IAuthIdentity, IdentityResource, IUserAttribute, IUser } from "@interfaces";
import { $ApiClient } from '@gateways';
import { AuthMapper } from "@mappers";


export class AuthRepository implements IAuthRepository {
  async updatePassword(oldPassword: string, password: string): Promise<boolean> {
    try {
      const response: IdentityResource = await $ApiClient.patch('/api/v1/auth/update-password', {
        oldPassword,
        password,
      });
      return AuthMapper.toUser(response.data)
    } catch (error) {
      throw error;
    }
  }
  async updateProfile(profile: Partial<IUserAttribute>): Promise<IUser> {
    try {
      const response: IdentityResource = await $ApiClient.patch('/api/v1/auth/update-profile', profile);
      return AuthMapper.toUser(response.data)
    } catch (error) {
      throw error;
    }
  }
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