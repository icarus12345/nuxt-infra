import { $ApiClient } from '@gateways';
import { IAttribute, IEntity } from '@entities';
import { IConditions, IResource, IRepository } from '@interfaces';
import { EntityMapper } from '@mappers';

export const useRepository = (resource: string): IRepository => {
  async function fetch(conditions: IConditions): Promise<IResource<IEntity[]>> {
    try {
      const result: IResource<IEntity[]> = await $ApiClient.get(`/api/v1/${resource}`, conditions);
      return EntityMapper.toEntities<IEntity>(result)
    } catch (error) {
      throw error;
    }
  }
  async function post(attributes: Partial<IAttribute>): Promise<IEntity> {
    try {
      const result: IResource<IEntity> = await $ApiClient.post(`/api/v1/${resource}`, {
        data: {
          type: resource,
          ...attributes
        },
        include: attributes.relationships ? Object.keys(attributes.relationships) : undefined
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async function patch(entity: IEntity): Promise<IEntity> {
    try {
      const result: IResource<IEntity> = await $ApiClient.patch(`/api/v1/${resource}/${entity.id}`, {
        data: {
          type: resource,
          ...entity
        },
        include: entity.relationships ? Object.keys(entity.relationships) : undefined
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  return {
    resource,
    fetch,
    post,
    patch,
    async save(entity: IEntity): Promise<IEntity> {
      if(entity.id) {
        return patch(entity)
      }
      return post(entity)
    },

    async delete(id: number): Promise<boolean> {
      try {
        return await $ApiClient.delete(`/api/v1/${resource}/${id}`);
      } catch (error) {
        throw error;
      }
    },
  }
}