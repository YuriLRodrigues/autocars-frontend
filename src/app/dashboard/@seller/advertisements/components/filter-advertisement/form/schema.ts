import { SoldStatus } from '@/@types/advertisement'
import { z } from 'zod'

export const filterAdvertisementsSchema = z.object({
  createdAt: z.enum(['asc', 'desc']).optional(),
  title: z.string().optional(),
  price: z.number().optional(),
  endDate: z.string().optional(),
  startDate: z.string().optional(),
  soldStatus: z.enum([SoldStatus.Active, SoldStatus.Reserved, SoldStatus.Sold]).optional(),
})

export type FilterAdvertisementsSchemaProps = z.infer<typeof filterAdvertisementsSchema>
