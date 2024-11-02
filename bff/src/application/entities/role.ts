import { Entity } from "./base"

export interface RoleAttribute {
  name: string
  display: string
  guard_name: string
}
export interface Role extends Entity<RoleAttribute> {}