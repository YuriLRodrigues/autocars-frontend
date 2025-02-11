import { Suspense } from 'react'

import { CarsListSkeleton, CarsList } from './components/cars-list'
import { FilterAdvertisements } from './components/filter-advertisements'
import { FilterAdvertisementsSkeleton } from './components/filter-advertisements/filter-advertisements'
import { PaginationAdvertisements } from './components/pagination-advertisements'
import { Container } from '@/components/interface/container'

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
      <section className="flex min-h-[calc(100vh-330px)] w-full flex-col gap-x-5 gap-y-4 md:flex-row">
        <Suspense fallback={<FilterAdvertisementsSkeleton />}>
          <FilterAdvertisements />
        </Suspense>
        <div className="space-y-3">
          <Suspense fallback={<CarsListSkeleton />}>
            <CarsList {...props} />
          </Suspense>
          <Suspense fallback={null}>
            <PaginationAdvertisements {...props} />
          </Suspense>
        </div>
      </section>
    </Container.Content>
  )
}
