import { User } from "../entities";
import { AuthIdentity } from "../interfaces";

export class AuthMapper {
  static toAuthIdentity(data: any, meta: any): AuthIdentity {
    // Extract user information
    const user: User = {
      id: data.id,
      attributes: data.attributes
    };

    // // Extract roles
    // const roles = data.included
    //   .filter((item: any) => item.type === 'roles')
    //   .map((role: any) => role.attributes.name);

    // // Extract permissions
    // const permissions = data.included
    //   .filter((item: any) => item.type === 'permissions')
    //   .map((permission: any) => permission.attributes.name);

    // Get token
    const token = meta.access_token;

    return {
      user,
      roles: [],
      permissions: [],
      token,
    };
  }
}