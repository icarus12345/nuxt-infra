import { IResource } from "../interfaces"
import { IEntity } from "./base"
import { IRole } from "./role"

export interface IUserAttribute {
  name: string
  email: string
  active: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: Nullable<string>
}

export interface IUser {
  id: Nullable<string>
  type: string
  attributes: Partial<IUserAttribute>
  relationships?: {
    roles: IResource<IRole[]>
  }
}