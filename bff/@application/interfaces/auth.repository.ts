import { IUser, IRole } from "@entities"

export interface IAuthIdentity {
  user: IUser
  roles: string[]
  permissions: string[]
  token: string
}

export interface IdentityResource {
  meta: {
    access_token: string
  },
  data: IUser,
}

export interface IAuthRepository {
  login(email: string, password: string): Promise<Nullable<IAuthIdentity>>
}