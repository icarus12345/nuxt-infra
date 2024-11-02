import { DataSourceMapper, UserMapper } from '@mappers';
import { $ApiClient } from '@gateways';
import { User } from '@entities';
import { IConditions, IConditionDto, IUserListResource, IUserRepository, IResource } from '@interfaces';

export class UserRepository implements IUserRepository {
  static USERS_LIST_URL: string = '/api/v1/users'
  async fetchUsers(cond: IConditions): Promise<IResource<User[]>> {
    try {
      
      const conditions: IConditionDto = DataSourceMapper.toDataSource(cond, 'roles')
      const result: IUserListResource = await $ApiClient.get(
        UserRepository.USERS_LIST_URL,
        conditions
      );
      return {
        items: UserMapper.toUsers(result),
        total: result.meta.page.total
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // async createUser(userData: UserAttribute): Promise<User> {
  //   try {
  //     const result: Result<User> = await $ApiClient.post('/api/v1/users', userData);
  //     return result.data;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw error;
  //   }
  // }
}

export const $UserRepository = new UserRepository()