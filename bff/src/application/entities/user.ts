import { Entity } from "./base"
import { Role } from "./role"

export interface UserAttribute {
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export class User implements Entity<UserAttribute> {
  constructor(
    public id: number,
    public attributes: UserAttribute,
    public roles: Role[] = [],
  ) {

  }
}
