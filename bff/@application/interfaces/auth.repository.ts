import { IUser, IUserAttribute } from "@entities"

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
  updateProfile(profile: Partial<IUserAttribute>): Promise<IUser>
  updatePassword(oldPassword: string, password: string): Promise<boolean>
  logout(): Promise<boolean>
  login(email: string, password: string): Promise<Nullable<IAuthIdentity>>
}