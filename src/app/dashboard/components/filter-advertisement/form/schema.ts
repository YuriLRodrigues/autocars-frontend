import { z } from 'zod'

export const filterAdvertisementsSchema = z.object({
  createdAt: z.string().optional(),
  title: z.string().optional(),
  price: z.number().optional(),
  endDate: z.string().optional(),
  startDate: z.string().optional(),
  soldStatus: z.string().optional(),
  brandId: z.string().optional(),
})

export type FilterAdvertisementsSchemaProps = z.infer<typeof filterAdvertisementsSchema>
