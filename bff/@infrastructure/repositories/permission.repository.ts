import { $ApiClient } from '@gateways';
import { IPermission } from '@entities';
import { IConditions, IConditionDto, IResource, IResourceList } from '@interfaces';
import { EntityMapper } from '@mappers';

export const PermissionRepository = {
  async fetch(conditions: IConditions): Promise<IResourceList<IPermission>> {
    try {
      const result: IResourceList = await $ApiClient.get('/api/v1/permissions', conditions);
      return EntityMapper.toEntities<IPermission>(result)
    } catch (error) {
      throw error;
    }
  },

  async save(entity: IPermission): Promise<IPermission> {
    if(entity.id) {
      return PermissionRepository.patch(entity)
    }
    return PermissionRepository.post(entity)
  },

  async post(entity: IPermission): Promise<IPermission> {
    try {
      const result: IResource<IPermission> = await $ApiClient.post(`/api/v1/permissions`, {
        data: {
          type: 'permissions',
          attributes: entity.attributes,
        }
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(entity: IPermission): Promise<IPermission> {
    try {
      const result: IResource<IPermission> = await $ApiClient.patch(`/api/v1/permissions/${entity.id}`, {
        data: {
          id: entity.id,
          type: 'permissions',
          attributes: entity.attributes,
        },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      return await $ApiClient.delete(`/api/v1/permissions/${id}`);
    } catch (error) {
      throw error;
    }
  },
}