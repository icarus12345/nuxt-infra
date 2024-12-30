import { IEntity } from "../entities";
import { IResource, IResourceList } from "../interfaces";

export class EntityMapper {
  static toEntity<T = IEntity> (resource: IResource<IEntity>): IResource<T> {
    const map = new Map<string, IEntity>(resource.included?.map((entity: IEntity) => [`${entity.type}${entity.id}`, entity]))
    const entity = resource.data
    const record: any = entity.relationships || {}
    Object.entries(record).forEach(([key, relationshipResource]: any) => {
      if (relationshipResource.data instanceof Array) {
        return (relationshipResource.data).map((simpleEntity: IEntity) => {
          const sourceEntity =  map.get(`${simpleEntity.type}${simpleEntity.id}`);
          Object.assign(simpleEntity, sourceEntity)
        })
      } else if (relationshipResource.data instanceof Object) {
        const simpleEntity = relationshipResource.data
        const sourceEntity =  map.get(`${simpleEntity.type}${simpleEntity.id}`);
        Object.assign(simpleEntity, sourceEntity)
      }
    })
    return resource as IResource<T>
  }
  static toEntities<T = IEntity>(resource: IResourceList<IEntity>): IResourceList<T> {
    const map = new Map<string, IEntity>(resource.included?.map((entity: IEntity) => [`${entity.type}${entity.id}`, entity]))
    resource.data.map((entity: IEntity) => {
      const record: any = entity.relationships || {}
      Object.entries(record).forEach(([key, relationshipResource]: any) => {
        if (relationshipResource.data instanceof Array) {
          return (relationshipResource.data).map((simpleEntity: IEntity) => {
            const sourceEntity =  map.get(`${simpleEntity.type}${simpleEntity.id}`);
            Object.assign(simpleEntity, sourceEntity)
          })
        } else if (relationshipResource.data instanceof Object) {
          const simpleEntity = relationshipResource.data
          const sourceEntity =  map.get(`${simpleEntity.type}${simpleEntity.id}`);
          Object.assign(simpleEntity, sourceEntity)
        }
      })
      return entity as T
    })
    return resource as IResourceList<T>;
  }
}