import { Pagination } from '@/components/ui/pagination'

import { findAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'

type PaginationBrandsProps = {
  page?: number
}

export const PaginationBrands = async (props: PaginationBrandsProps) => {
  const { page } = props
  const { meta } = await findAllBrands(
    {
      limit: 18,
      page,
    },
    { next: { tags: ['findAllBrands'] } },
  )

  if (meta.perPage > meta.totalCount) return null

  return <Pagination page={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
