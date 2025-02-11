import { z } from 'zod'

export const filterAdvertisementsSchema = z.object({
  title: z.string().optional(),
  soldStatus: z.string().optional(),
  fuel: z.string().optional(),
  color: z.string().optional(),
  model: z.string().optional(),
  price: z.number().optional(),
  year: z.number().optional(),
  createdAt: z.string().optional(),
  brandId: z.string().optional(),
  km: z.number().optional(),
})

export type FilterAdvertisementsSchemaProps = z.infer<typeof filterAdvertisementsSchema>
