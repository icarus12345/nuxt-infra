import { IResource } from "../interfaces"
import { IPermission } from "./permission"

export interface IRoleAttribute {
  name: string
  guardName: string
}
export interface IRole {
  id: Nullable<string>
  type: string
  attributes: IRoleAttribute,
  relationships?: {
    permissions: IResource<IPermission[]>
  }
}