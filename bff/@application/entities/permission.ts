import { IEntity } from "./base"

export interface IPermissionAttribute {
  name: string
  display: string
}
export type IPermission = IEntity<IPermissionAttribute>