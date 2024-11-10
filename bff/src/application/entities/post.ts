import { IEntity } from "./base"

export interface IPostAttribute {
  name: string
}
export interface IPost extends IEntity<IPostAttribute> {}