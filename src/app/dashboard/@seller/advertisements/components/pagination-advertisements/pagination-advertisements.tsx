import { Pagination } from '@/components/ui/pagination'

import { SoldStatus } from '@/@types/advertisement'
import { findAllOwnAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type PaginationAdvertisementsProps = {
  limit?: number
  page?: number
  createdAt?: 'asc' | 'desc'
  title?: string
  price?: number
  endDate?: string
  startDate?: string
  soldStatus?: SoldStatus
}

export const PaginationAdvertisements = async (props: PaginationAdvertisementsProps) => {
  const { createdAt, endDate, limit, page, price, soldStatus, startDate, title } = props
  const { meta } = await findAllOwnAdvertisements({
    createdAt,
    endDate,
    limit,
    page,
    price,
    soldStatus,
    startDate,
    title,
  })

  if (meta.perPage > meta.totalCount) return null

  return <Pagination pageIndex={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
