import { Pagination } from '@/components/ui/pagination'

import { findAllFeedbacksByAdId } from '@/http/orval-generation/routes/feedback-controller/feedback-controller'

type PaginationFeedbacksProps = {
  limit?: number
  page?: number
  advertisementId: string
}

export const PaginationFeedbacks = async (props: PaginationFeedbacksProps) => {
  const { advertisementId, limit, page } = props
  const { meta } = await findAllFeedbacksByAdId(advertisementId, { limit, page })

  if (meta?.perPage > meta?.totalCount) return null

  return <Pagination page={meta.page} totalCount={meta.totalCount} perPage={meta.perPage} />
}
