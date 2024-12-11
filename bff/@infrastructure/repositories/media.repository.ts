import { DataSourceMapper } from '@mappers';
import { $ApiClient } from '@gateways';
import { IEntity, IMedia } from '@entities';
import { IConditions, IConditionDto, IResource, IResourceList } from '@interfaces';
import { EntityMapper } from '@mappers';

export const MediaRepository = {
  async fetch(path?: string, type?: string): Promise<IResourceList<IMedia>> {
    try {
      const result: IResourceList = await $ApiClient.get('/api/v1/medias', {
        filter: {
          path,
          type,
        }
      });
      return EntityMapper.toEntities<IMedia>(result)
    } catch (error) {
      throw error;
    }
  },

  async save(name: string, content: string): Promise<IMedia> {
    try {
      const result: IResource<IMedia> = await $ApiClient.post(`/api/v1/medias`, {
        data: {
          type: 'medias',
          attributes: {
            name,
            content,
          },
        }
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(path: string): Promise<boolean> {
    try {
      return await $ApiClient.delete(`/api/v1/medias/${path}`);
    } catch (error) {
      throw error;
    }
  },
}