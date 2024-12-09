// import { z } from 'zod'

import { IDataSource, type FieldSchema, type Column } from "@interfaces/data-source"

// // We're keeping a simple non-relational schema here.
// // IRL, you will have a schema for your data models.
// export const taskSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   email: z.string(),
//   active: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
// })

// export type Task = z.infer<typeof taskSchema>
export interface ISchema {
  name: string
  description: string
  source: IDataSource
  columns: Column[]
  schema: FieldSchema,
  permissions: Record<string, string>
} 