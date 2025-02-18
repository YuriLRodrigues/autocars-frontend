import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllFeedbacksByAdId } from '@/http/orval-generation/routes/feedback-controller/feedback-controller'
import { formatDate } from '@/utils/format-date'
import { formatNumber } from '@/utils/format-number'
import { mappingStarsQuantity } from '@/utils/mappings'

import { HandleLikeButton } from './handle-like'

type FeedbacksProps = {
  limit?: number
  page?: number
  advertisementId: string
}

export const Feedbacks = async ({ advertisementId, limit, page }: FeedbacksProps) => {
  const { results } = await findAllFeedbacksByAdId(
    advertisementId,
    { limit, page },
    { next: { tags: [`${advertisementId}-feedbacks`] } },
  )

  if (results?.length === 0) {
    return (
      <Card className="flex h-full min-h-[400px] w-full items-center justify-center gap-y-3 p-2">
        Nenhuma avaliação encontrada.
      </Card>
    )
  }

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {results?.map((feedback) => (
        <Card key={feedback.id} className="h-full space-y-2">
          <CardHeader>
            <CardTitle className="space-y-1.5">
              <span className="text-sm text-foreground/60">{formatDate(feedback.createdAt)}</span>
              <div className="flex items-center gap-1">
                <Avatar>
                  <AvatarImage src={feedback.user.avatar} className="object-cover object-center" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <p>{feedback.user.name}</p>
              </div>
              <span>{mappingStarsQuantity[feedback.stars]}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <h4 className="font-bold">{feedback.title}</h4>
              <p className="line-clamp-4">{feedback.comment}</p>
            </div>
            <div className="flex items-center gap-2">
              <HandleLikeButton feedbackId={feedback.id} />
              <span>{feedback.totalLikes > 0 && formatNumber(feedback.totalLikes)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}

export const FeedbacksSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="h-full space-y-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-1">
              <Avatar>
                <AvatarFallback>
                  <Skeleton className="size-full" />
                </AvatarFallback>
              </Avatar>
              <Skeleton className="h-5 w-20" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-6" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
