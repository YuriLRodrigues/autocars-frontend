import { Capacity, Color, Doors, Fuel, GearBox, Model } from '@/@types/advertisement'
import { z } from 'zod'

export const createAdvertisementSchema = z.object({
  step: z.enum(['SEND-IMAGES', 'AD-DATA', 'AD-DETAILS'], {
    errorMap: () => ({ message: 'Etapa inválida', code: 'invalid_enum_value' }),
  }),
  brandId: z.string().min(1, { message: 'ID da marca é obrigatório' }),
  imagesIds: z
    .array(z.string().min(1, { message: 'ID da imagem inválido' }))
    .min(1, { message: 'Deve conter pelo menos uma imagem' }),
  km: z
    .union([
      z.string().transform((value) => {
        const parsedValue = Number(value)
        return parsedValue
      }),
      z.number(),
    ])
    .refine((value) => value === 0 || !isNaN(value), {
      message: 'Quilometragem deve ser um número válido',
    }),
  localization: z.string().min(1, { message: 'Localização é obrigatória' }),
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  thumbnailImageId: z.string().min(1, { message: 'URL da miniatura é obrigatória' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  year: z
    .number({
      errorMap: () => ({ message: 'Ano deve ser um número válido', code: 'invalid_type' }),
    })
    .refine((value) => value > 0 && value <= new Date().getFullYear() + 1, {
      message: `O ano deve ser um número positivo maior que 0 e menor ou igual a ${new Date().getFullYear() + 1}`,
    }),
  doors: z.nativeEnum(Doors, {
    errorMap: () => ({ message: 'Número de portas inválido', code: 'invalid_enum_value' }),
  }),
  model: z.nativeEnum(Model, {
    errorMap: () => ({ message: 'Modelo inválido', code: 'invalid_enum_value' }),
  }),
  color: z.nativeEnum(Color, {
    errorMap: () => ({ message: 'Cor inválida', code: 'invalid_enum_value' }),
  }),
  price: z.number({
    required_error: 'Preço é obrigatório',
  }),
  gearBox: z.nativeEnum(GearBox, {
    errorMap: () => ({ message: 'Tipo de câmbio inválido', code: 'invalid_enum_value' }),
  }),
  fuel: z.nativeEnum(Fuel, {
    errorMap: () => ({ message: 'Tipo de combustível inválido', code: 'invalid_enum_value' }),
  }),
  capacity: z.nativeEnum(Capacity, {
    errorMap: () => ({ message: 'Capacidade de assentos inválida', code: 'invalid_enum_value' }),
  }),
  details: z.array(z.string()).optional(),
  phone: z.string({ required_error: 'Telefone é obrigatório' }).min(1, { message: 'Telefone é obrigatório' }),
})

export const formSteps = createAdvertisementSchema.shape.step.options

export type CreateAdvertisementSchemaProps = z.infer<typeof createAdvertisementSchema>
