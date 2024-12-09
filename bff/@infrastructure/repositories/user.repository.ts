import { $ApiClient } from '@gateways';
import { IUserAttribute, IUser, IEntity } from '@entities';
import { IConditions, IConditionDto, IResource, IResourceList, IRepository } from '@interfaces';
import { EntityMapper } from '@mappers';

export const UserRepository: IRepository<IUser> = {
  async fetch<IUser>(conditions: IConditions): Promise<IResourceList<IUser>> {
    try {
      const result: IResourceList = await $ApiClient.get('/api/v1/users', conditions);
      return EntityMapper.toEntities<IUser>(result)
    } catch (error) {
      throw error;
    }
  },

  async save(user: IUser): Promise<IUser> {
    if(user.id) {
      return UserRepository.patch(user)
    }
    return UserRepository.post(user)
  },

  async post(user: IUser): Promise<IUser> {
    try {
      const result: IResource<IUser> = await $ApiClient.post(`/api/v1/users`, {
        data: {
          type: 'users',
          ...user
        },
        include: user.relationships ? Object.keys(user.relationships) : undefined
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(user: IUser): Promise<IUser> {
    try {
      // let relationships;
      // let include;
      // if (user.relationships) {
      //   relationships = {
      //     roles: {
      //       data: user.relationships?.roles.data.map(d => ({
      //         id: d.id,
      //         type: 'roles'
      //       }))
      //     }
      //   }
      //   include = Object.keys(relationships)
      // }
      const result: IResource<IUser> = await $ApiClient.patch(`/api/v1/users/${user.id}`, {
        data: {
          type: 'users',
          ...user
        },
        include: user.relationships ? Object.keys(user.relationships) : undefined
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      return await $ApiClient.delete(`/api/v1/users/${id}`);
    } catch (error) {
      throw error;
    }
  },
}