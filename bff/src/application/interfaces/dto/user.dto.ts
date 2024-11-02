import { IRoleDto, IRoleListResource } from "."

export interface IUserDto {
  id: number
  type: string
  attributes: {
    name: string
    email: string
    createdAt: string
    updatedAt: string
  }
  relationships: {
    roles: IRoleListResource
  }
}

export interface IUserListResource {
  data: IUserDto[],
  included: IRoleDto[]
  meta: {
    page: {
      total: number
    }
  }
}