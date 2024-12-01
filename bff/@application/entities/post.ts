import { IEntity } from "./base"

export interface IPostAttribute {
  name: string
}
export type IPost = IEntity<IPostAttribute>