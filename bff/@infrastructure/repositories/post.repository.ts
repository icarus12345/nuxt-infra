import { $ApiClient } from '@gateways';
import { IPostAttribute, IPost } from '@entities';
import { IConditions, IConditionDto, IResource, IPostRepository } from '@interfaces';

export const PostRepository: IPostRepository = {
  async fetch(conditions: IConditions): Promise<IResource<IPost[]>> {
    try {
      const result: IResource<IPost[]> = await $ApiClient.get('/api/v1/posts', conditions);
      return result
    } catch (error) {
      throw error;
    }
  },

  async post(attributes: Partial<IPostAttribute>): Promise<IPost> {
    try {
      const result: IResource<IPost> = await $ApiClient.post(`/api/v1/posts?include=author,tags`, {
        data: {
          type: 'posts',
          attributes: {
            content: 'post content',
            slug: 'post-title-' + new Date().getTime(),
            title: 'post title1',
          },
          "relationships": {
            "tags": {
              "data": [
                {
                  "id": '1',
                  "type": "tags",
                }
              ]
            }
          }
        }
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(id: number, attributes: Partial<IPostAttribute>): Promise<IPost> {
    try {
      const result: IResource<IPost> = await $ApiClient.patch(`/api/v1/posts/${id}`, {
        data: {
          id: id.toString(),
          type: 'posts',
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
      return await $ApiClient.delete(`/api/v1/posts/${id}`);
    } catch (error) {
      throw error;
    }
  },
}