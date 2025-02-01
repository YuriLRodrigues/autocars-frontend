import { z } from 'zod'

export const selectreferenceDateSchema = z.object({
  referenceDate: z.number().min(1).max(12).optional().default(1),
})

export type SelectreferenceDateSchemaProps = z.infer<typeof selectreferenceDateSchema>
