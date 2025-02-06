import { z } from 'zod'

export const updateBrandSchema = z.object({
  logoId: z.string({ required_error: 'Logo é obrigatório' }).optional(),
  name: z.string({ required_error: 'Nome da marca é obrigatório' }).optional(),
})

export type UpdateBrandSchemaProps = z.infer<typeof updateBrandSchema>
