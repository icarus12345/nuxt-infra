import { IUser } from "../entities";
import { IAuthIdentity } from "../interfaces";

export class AuthMapper {
  static toAuthIdentity(data: any, meta: any): IAuthIdentity {
    // Extract user information
    const user: IUser = {
      id: data.id,
      type: data.type,
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