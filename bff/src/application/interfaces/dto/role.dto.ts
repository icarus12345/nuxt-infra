export interface IRoleDto {
  id: number
  type: string
  attributes: {
    name: string
    display: string
    guard_name: string
  }
  // relationships: {
  //   roles: {
  //     data: {
  //       id: number
  //       type: string
  //     }[]
  //   }
  // }
}

export interface IRoleListResource {
  data: IRoleDto[],
}