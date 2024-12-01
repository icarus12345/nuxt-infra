import { IRepository } from "."
import { ICommentAttribute, IComment } from "../entities";

export interface ICommentRepository extends IRepository<IComment, ICommentAttribute> {}