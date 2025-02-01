import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório.' }).optional(),
  username: z.string({ required_error: 'Nome de usuário é obrigatório.' }).optional(),
  email: z.string().optional(),
})

export type UpdateProfileSchemaProps = z.infer<typeof updateProfileSchema>
