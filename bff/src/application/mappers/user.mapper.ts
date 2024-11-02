import { Role, User } from "../entities";
import { IUserListResource } from "../interfaces/dto";
import { IRoleDto, IUserDto } from "../interfaces/dto";
import { RoleMapper } from "./role.mapper";

export class UserMapper {
  static toUser(data: IUserDto): User {
    return new User(
      data.id,
      data.attributes,
      RoleMapper.toRoles(data.relationships.roles)
    )
  }
  static toUsers(resource: IUserListResource): User[] {
    const map = new Map<number, IRoleDto>(resource.included?.map(role => [role.id, role]))
    return resource.data.map((userDto: IUserDto) => {
      const roles = userDto.relationships.roles.data.map((role: IRoleDto) => {
        const r = map.get(role.id);
        if (r) {
          Object.assign(role, r)
        }
      })
      return UserMapper.toUser(userDto)
    })
  }
}