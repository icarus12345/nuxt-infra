import { IEntity } from "./base"

export interface ICommentAttribute {
  name: string
}
export type IComment = IEntity<ICommentAttribute>