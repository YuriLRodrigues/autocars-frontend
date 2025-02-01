import { Pagination } from '@/components/ui/pagination'

import { SoldStatus } from '@/@types/advertisement'
import { findAllOwnAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type PaginationOwnAdvertisementsProps = {
  limit?: number
  page?: number
  createdAt?: 'asc' | 'desc'
  title?: string
  price?: number
  endDate?: string
  startDate?: string
  soldStatus?: SoldStatus
  brandId?: string
}

export const PaginationOwnAdvertisements = async (props: PaginationOwnAdvertisementsProps) => {
  const { createdAt, endDate, limit, page, price, soldStatus, startDate, title, brandId } = props
  const { meta } = await findAllOwnAdvertisements({
    createdAt,
    endDate,
    limit,
    page,
    price,
    soldStatus,
    startDate,
    title,
    brandId,
  })

  if (meta.perPage > meta.totalCount) return null

  return <Pagination page={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
