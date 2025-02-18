import { Suspense } from 'react'

import { CarsListSkeleton, CarsList } from './components/cars-list'
import { FilterAdvertisements } from './components/filter-advertisements'
import { FilterAdvertisementsSkeleton } from './components/filter-advertisements/filter-advertisements'
import { PaginationAdvertisements } from './components/pagination-advertisements'
import { Container } from '@/components/interface/container'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { Color, Fuel, Model, SoldStatus } from '@/@types/advertisement'

type CarsPageProps = {
  searchParams: Promise<{
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
  }>
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const props = await searchParams

  return (
    <Container.Content className="pt-16">
      <Container.Header>
        <Container.Title>Anúncios</Container.Title>
        <Container.Description>
          Aqui você pode visualizar todos os anúncios dos veículos disponíveis na Auto Cars. Clique em &quot;ver
          detalhes&quot; para ver mais detalhes e opções de compra ou venda.
        </Container.Description>
      </Container.Header>
      <section className="flex w-full flex-col gap-x-5 gap-y-4 md:max-h-[calc(100vh-300px)] md:flex-row">
        <Suspense fallback={<FilterAdvertisementsSkeleton />}>
          <FilterAdvertisements />
        </Suspense>
        <div className="flex w-full space-y-3 @container md:max-h-[70vh]">
          <ScrollArea className="min-w-full" scrollHideDelay={0}>
            <div className="mx-auto grid w-full gap-x-3 gap-y-4 px-2 @sm:grid-cols-1 @md:grid-cols-2 @lg:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
              <Suspense fallback={<CarsListSkeleton />}>
                <CarsList {...props} />
              </Suspense>
            </div>
            <Suspense fallback={null}>
              <PaginationAdvertisements {...props} />
            </Suspense>
            <ScrollBar />
          </ScrollArea>
        </div>
      </section>
    </Container.Content>
  )
}
