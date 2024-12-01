import { IRepository } from "."
import { IPostAttribute, IPost } from "../entities";

export interface IPostRepository extends IRepository<IPost, IPostAttribute> {}