import { IEntity } from "./base"

export interface IMediaAttribute {
  type: string
  name: string
  path: string
  url: string
  size: number
  mimeType?: string
}
export type IMedia = IEntity<IMediaAttribute>