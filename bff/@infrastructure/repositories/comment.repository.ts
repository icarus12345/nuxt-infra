import { $ApiClient } from '@gateways';
import { ICommentAttribute, IComment } from '@entities';
import { IConditions, IConditionDto, IResource, ICommentRepository } from '@interfaces';

export const CommentRepository: ICommentRepository = {
  async fetch(conditions: IConditions): Promise<IResource<IComment[]>> {
    try {
      const result: IResource<IComment[]> = await $ApiClient.get('/api/v1/comments', conditions);
      return result
    } catch (error) {
      throw error;
    }
  },

  async post(attributes: Partial<ICommentAttribute>): Promise<IComment> {
    try {
      const result: IResource<IComment> = await $ApiClient.post(`/api/v1/comments`, {
        data: {
          type: 'comments',
          attributes
        }
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(id: number, attributes: Partial<ICommentAttribute>): Promise<IComment> {
    try {
      const result: IResource<IComment> = await $ApiClient.patch(`/api/v1/comments/${id}`, {
        data: {
          id: id.toString(),
          type: 'comments',
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
      return await $ApiClient.delete(`/api/v1/comments/${id}`);
    } catch (error) {
      throw error;
    }
  },
}