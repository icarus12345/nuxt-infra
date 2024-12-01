import { IRepository } from "."
import { IPermissionAttribute, IPermission } from "../entities";

export interface IPermissionRepository extends IRepository<IPermission, IPermissionAttribute> {}