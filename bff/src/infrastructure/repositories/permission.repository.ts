import { DataSourceMapper } from '@mappers';
import { $ApiClient } from '@gateways';
import { IPermissionAttribute, IPermission } from '@entities';
import { IConditions, IConditionDto, IResource, IPermissionRepository } from '@interfaces';

export const PermissionRepository: IPermissionRepository = {
  async fetch(cond: IConditions): Promise<IResource<IPermission[]>> {
    try {
      const conditions: IConditionDto = DataSourceMapper.toDataSource(cond)
      const result: IResource<IPermission[]> = await $ApiClient.get('/api/v1/permissions', conditions);
      return result
    } catch (error) {
      throw error;
    }
  },

  async post(attributes: Partial<IPermissionAttribute>): Promise<IPermission> {
    try {
      const result: IResource<IPermission> = await $ApiClient.post(`/api/v1/permissions`, {
        data: {
          type: 'permissions',
          attributes
        }
      });
      return result.data
    } catch (error) {
      throw error;
    }
  },

  async patch(id: number, attributes: Partial<IPermissionAttribute>): Promise<IPermission> {
    try {
      const result: IResource<IPermission> = await $ApiClient.patch(`/api/v1/permissions/${id}`, {
        data: {
          id: id.toString(),
          type: 'permissions',
          attributes
        }
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      return await $ApiClient.delete(`/api/v1/permissions/${id}`);
    } catch (error) {
      throw error;
    }
  },
}