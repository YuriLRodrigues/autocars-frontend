import { z } from 'zod'

export const createFeedbackSchema = z.object({
  stars: z
    .number({ required_error: 'Número de estrelas é obrigatório' })
    .min(1, { message: 'Número de estrelas é obrigatório' })
    .max(5),
  comment: z.string({ required_error: 'Comentário é obrigatório' }).min(1, { message: 'Comentário é obrigatório' }),
  title: z.string({ required_error: 'Título é obrigatório' }).min(1, { message: 'Título é obrigatório' }),
})

export type CreateFeedbackSchemaProps = z.infer<typeof createFeedbackSchema>
