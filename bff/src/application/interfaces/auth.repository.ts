import { User, Role } from "@entities"
import { IUserDto } from "./dto"

export interface IAuthIdentity {
  user: User
  roles: string[]
  permissions: string[]
  token: string
}

export interface IdentityResource {
  meta: {
    access_token: string
  },
  data: IUserDto,
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<Nullable<IAuthIdentity>>
}