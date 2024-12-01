import { IRelationships } from "../interfaces"

export interface IEntity<T = IAttribute> {
  id: Nullable<string>
  type: string
  attributes: T
  relationships: IRelationships
}


export interface IAttribute {
  id: Nullable<string>
  name: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
