import { Pagination } from '@/components/ui/pagination'

import { Color, Fuel, Model, SoldStatus } from '@/@types/advertisement'
import { findAllAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type PaginationAdvertisementsProps = {
  page?: number
  limit?: number
  title?: string
  soldStatus?: SoldStatus
  fuel?: Fuel
  color?: Color
  model?: Model
  price?: number
  year?: number
  createdAt?: 'asc' | 'desc'
  brandId?: string
  km?: number
}

export const PaginationAdvertisements = async (props: PaginationAdvertisementsProps) => {
  const { meta } = await findAllAdvertisements({ ...props }, { next: { tags: ['findAllAdvertisements'] } })

  if (meta?.perPage > meta?.totalCount) return null

  return <Pagination page={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
