import { z } from 'zod'

export const editAdvertisementSchema = z.object({
  step: z.enum(['SEND-IMAGES', 'AD-DATA'], {
    errorMap: () => ({ message: 'Etapa inválida', code: 'invalid_enum_value' }),
  }),
  brandId: z.string().optional(),
  newImagesIds: z.array(z.string().min(1, { message: 'ID da imagem inválido' })).optional(),
  km: z
    .number({
      errorMap: () => ({ message: 'Quilometragem deve ser um número', code: 'invalid_type' }),
    })
    .optional(),
  localization: z.string().optional(),
  title: z.string().optional(),
  thumbnailImageId: z.string().optional(),
  description: z.string().optional(),
  year: z
    .number({
      errorMap: () => ({ message: 'Ano deve ser um número válido', code: 'invalid_type' }),
    })
    .optional(),
  doors: z.string().min(1, { message: 'Número de portas inválido' }).optional(),
  model: z.string().min(1, { message: 'Modelo inválido' }).optional(),
  color: z.string().min(1, { message: 'Cor inválida' }).optional(),
  price: z
    .number({
      errorMap: () => ({ message: 'Preço deve ser um número', code: 'invalid_type' }),
    })
    .optional(),
  gearBox: z.string().min(1, { message: 'Tipo de câmbio inválido' }).optional(),
  fuel: z.string().min(1, { message: 'Tipo de combustível inválido' }).optional(),
  capacity: z.string().min(1, { message: 'Capacidade de assentos inválida' }).optional(),
  details: z.array(z.string()).optional(),
  phone: z
    .string({
      errorMap: () => ({ message: 'Telefone deve ser um texto', code: 'invalid_type' }),
    })
    .optional(),
})

export const formSteps = editAdvertisementSchema.shape.step.options

export type EditAdvertisementSchemaProps = z.infer<typeof editAdvertisementSchema>
