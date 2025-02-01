import { z } from 'zod'

export const createBrandSchema = z.object({
  logoId: z.string({ required_error: 'Logo é obrigatório' }).min(1, { message: 'A marca deve conter uma logo' }),
  name: z.string({ required_error: 'Nome da marca é obrigatório' }).min(1, { message: 'Nome da marca é obrigatório' }),
})

export type CreateBrandSchemaProps = z.infer<typeof createBrandSchema>
