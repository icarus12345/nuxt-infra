import { $ApiClient } from '@gateways';
import { IRoleAttribute, IRole, IEntity } from '@entities';
import { IConditions, IConditionDto, IResource, IResourceList, IRepository } from '@interfaces';
import { EntityMapper } from '@mappers';

export const RoleRepository = {
  async fetch(conditions: IConditions): Promise<IResourceList<IRole>> {
    try {
      const result: IResourceList = await $ApiClient.get('/api/v1/roles', conditions);
      return EntityMapper.toEntities<IRole>(result)
    } catch (error) {
      throw error;
    }
  },

  async save(entity: IRole): Promise<IRole> {
    if(entity.id) {
      return RoleRepository.patch(entity)
    }
    return RoleRepository.post(entity)
  },

  async post(entity: IRole): Promise<IRole> {
    try {
      const result: IResource<IRole> = await $ApiClient.post(`/api/v1/roles?include=permissions`, {
        data: {
          type: 'roles',
          attributes: entity.attributes,
          relationships: {
            permissions: {
              data: entity.relationships?.permissions?.data.map(d => ({
                id: d.id,
                type: 'permissions'
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

  async patch(entity: IRole): Promise<IRole> {
    try {
      let relationships;
      let include;
      if (entity.relationships) {
        relationships = {
          permissions: {
            data: entity.relationships?.permissions?.data.map(d => ({
              id: d.id,
              type: 'permissions'
            }))
          }
        }
        include = Object.keys(relationships)
      }
      const result: IResource<IRole> = await $ApiClient.patch(`/api/v1/roles/${entity.id}`, {
        data: {
          id: entity.id,
          type: 'roles',
          attributes: entity.attributes,
          relationships
        },
        include,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      return await $ApiClient.delete(`/api/v1/roles/${id}`);
    } catch (error) {
      throw error;
    }
  },
}