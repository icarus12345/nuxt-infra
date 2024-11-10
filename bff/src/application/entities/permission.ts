import { IEntity } from "./base"

export interface IPermissionAttribute {
  name: string
  display: string
}
export interface IPermission extends IEntity<IPermissionAttribute> {}