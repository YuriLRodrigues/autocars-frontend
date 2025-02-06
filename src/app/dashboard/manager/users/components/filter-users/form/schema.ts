import { z } from 'zod'

export const filterUsersSchema = z.object({
  createdAt: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  role: z.string().optional(),
})

export type FilterUsersSchemaProps = z.infer<typeof filterUsersSchema>
