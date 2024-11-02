import { Role } from "../entities";
import { IRoleDto, IRoleListResource } from "../interfaces/dto";

export class RoleMapper {
  static toRole(data: IRoleDto): Role {
    return {
      id: data.id,
      attributes: data.attributes,
    }
  }
  static toRoles(resource: IRoleListResource): Role[] {
    return resource.data.map(RoleMapper.toRole)
  }
}