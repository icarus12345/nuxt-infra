import { DataSourceMapper } from '@mappers';
import { $ApiClient } from '@gateways';
import { IUserAttribute, IUser, IEntity } from '@entities';
import { IConditions, IConditionDto, IResource, IResourceList, IRepository } from '@interfaces';
import { EntityMapper } from '@/application/mappers';

export const UserRepository = {
  async fetch(cond: IConditions): Promise<IResourceList<IUser>> {
    try {
      const conditions: IConditionDto = DataSourceMapper.toDataSource(cond)
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
      const result: IResource<IUser> = await $ApiClient.post(`/api/v1/users?include=roles`, {
        data: {
          type: 'users',
          attributes: user.attributes,
          relationships: {
            roles: {
              data: user.relationships?.roles.data.map(d => ({
                id: d.id,
                type: 'roles'
              }))
            }
          }
        }
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(user: IUser): Promise<IUser> {
    try {
      let relationships;
      let include;
      if (user.relationships) {
        relationships = {
          roles: {
            data: user.relationships?.roles.data.map(d => ({
              id: d.id,
              type: 'roles'
            }))
          }
        }
        include = Object.keys(relationships)
      }
      const result: IResource<IUser> = await $ApiClient.patch(`/api/v1/users/${user.id}`, {
        data: {
          id: user.id,
          type: 'users',
          attributes: user.attributes,
          relationships
        },
        include,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      return await $ApiClient.delete(`/api/v1/users/${id}`);
    } catch (error) {
      throw error;
    }
  },
}