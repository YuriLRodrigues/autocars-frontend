import { Pagination } from '@/components/ui/pagination'

import { SoldStatus } from '@/@types/advertisement'
import { findAllManagerAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type PaginationManagerProps = {
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

export const PaginationManager = async (props: PaginationManagerProps) => {
  const { createdAt, endDate, limit, page, price, soldStatus, startDate, title, brandId } = props
  const { meta } = await findAllManagerAdvertisements(
    {
      createdAt,
      endDate,
      limit,
      page,
      price,
      soldStatus,
      startDate,
      title,
      brandId,
    },
    {
      next: {
        tags: ['findAllManagerdvertisements'],
      },
    },
  )

  if (meta?.perPage > meta?.totalCount) return null

  return <Pagination page={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
