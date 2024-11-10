import { IEntity } from "./base"

export interface ICommentAttribute {
  name: string
}
export interface IComment extends IEntity<ICommentAttribute> {}