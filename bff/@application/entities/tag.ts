import { IEntity } from "./base"

export interface ITagAttribute {
  name: string
  display: string
  guard_name: string
}
export type ITag = IEntity<ITagAttribute>