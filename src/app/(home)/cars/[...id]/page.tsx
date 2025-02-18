import { Suspense } from 'react'

import { CarCarousel } from './components/car-carousel'
import { CarDetails, CarDetailsSkeleton } from './components/car-details'
import { Feedbacks, FeedbacksSkeleton } from './components/feedbacks'
import { CreateFeedback } from './components/feedbacks/create-feedback'
import { PaginationFeedbacks } from './components/feedbacks/pagination-feedbacks'
import { Container } from '@/components/interface/container'
import { CustomBreadCrumb } from '@/components/ui/custom-breadcrumb'
import { Icon } from '@/components/ui/icon'

import { isAuthenticated } from '@/auth'

type CarsDetailsPageProps = {
  params: Promise<{ id: string; page?: number; limit: number }>
}

export default async function CarsDetailsPage({ params }: CarsDetailsPageProps) {
  const { id, limit, page } = await params
  const userIsAuthenticated = await isAuthenticated()

  return (
    <Container.Content className="space-y-4 pt-16">
      <CustomBreadCrumb />
      <section className="grid gap-x-8 gap-y-5 lg:grid-cols-2">
        <Suspense fallback={<CarDetailsSkeleton />}>
          <CarDetails advertisementId={id} />
        </Suspense>
        <CarCarousel advertisementId={id} />
      </section>
      <section className="space-y-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <span className="flex items-center gap-4">
            <Icon name="Star" className="size-8 text-yellow-500" fill="currentColor" />
            <h4 className="text-3xl font-bold uppercase tracking-tight">Avaliações dos usuários</h4>{' '}
          </span>
          {userIsAuthenticated && <CreateFeedback />}
        </div>
        <Suspense fallback={<FeedbacksSkeleton />}>
          <Feedbacks advertisementId={id} limit={Number(limit) || 6} page={Number(page) || 1} />
        </Suspense>
        <Suspense fallback={null}>
          <PaginationFeedbacks advertisementId={id} limit={Number(limit) || 6} page={Number(page) || 1} />
        </Suspense>
      </section>
    </Container.Content>
  )
}
