import { Capacity, Color, Doors, Fuel, GearBox, Model } from '@/@types/advertisement'
import { z } from 'zod'

export const editAdvertisementSchema = z.object({
  step: z.enum(['SEND-IMAGES', 'AD-DATA', 'AD-DETAILS'], {
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
  doors: z
    .nativeEnum(Doors, {
      errorMap: () => ({ message: 'Número de portas inválido', code: 'invalid_enum_value' }),
    })
    .optional(),
  model: z
    .nativeEnum(Model, {
      errorMap: () => ({ message: 'Modelo inválido', code: 'invalid_enum_value' }),
    })
    .optional(),
  color: z
    .nativeEnum(Color, {
      errorMap: () => ({ message: 'Cor inválida', code: 'invalid_enum_value' }),
    })
    .optional(),
  price: z
    .number({
      errorMap: () => ({ message: 'Preço deve ser um número', code: 'invalid_type' }),
    })
    .optional(),
  gearBox: z
    .nativeEnum(GearBox, {
      errorMap: () => ({ message: 'Tipo de câmbio inválido', code: 'invalid_enum_value' }),
    })
    .optional(),
  fuel: z
    .nativeEnum(Fuel, {
      errorMap: () => ({ message: 'Tipo de combustível inválido', code: 'invalid_enum_value' }),
    })
    .optional(),
  capacity: z
    .nativeEnum(Capacity, {
      errorMap: () => ({ message: 'Capacidade de assentos inválida', code: 'invalid_enum_value' }),
    })
    .optional(),
  details: z.array(z.string()).optional(),
  phone: z
    .string({
      errorMap: () => ({ message: 'Telefone deve ser um texto', code: 'invalid_type' }),
    })
    .optional(),
})

export const formSteps = editAdvertisementSchema.shape.step.options

export type EditAdvertisementSchemaProps = z.infer<typeof editAdvertisementSchema>
