import { Suspense } from 'react'

import { CreateAdvertisement } from '../../../components/create-advertisement/create-advertisement'
import {
  AdvertisementsTable,
  OwnAdvertisementsTableRows,
  TableRowsSkeleton,
} from '@/app/dashboard/components/advertisements-table'
import { FilterAdvertisements } from '@/app/dashboard/components/filter-advertisement'
import { InputTitleForm } from '@/app/dashboard/components/filter-advertisement/form/input-title-form'
import { PaginationOwnAdvertisements } from '@/app/dashboard/components/pagination-advertisements'
import { Container } from '@/components/interface/container'

import { SoldStatus } from '@/@types/advertisement'

type AdvertisementsPageProps = {
  searchParams: Promise<{
    limit?: number
    page?: number
    createdAt?: 'asc' | 'desc'
    title?: string
    price?: number
    endDate?: string
    startDate?: string
    soldStatus?: SoldStatus
    brandId?: string
  }>
}

export default async function AdvertisementsPage({ searchParams }: AdvertisementsPageProps) {
  const { limit, page, createdAt, endDate, price, startDate, title, soldStatus, brandId } = await searchParams

  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Anúncios</Container.Title>
        <Container.Description>
          Aqui você pode visualizar todos os seus anúncios e filtrar de acordo com seu gosto.
        </Container.Description>
      </Container.Header>

      <div className="flex flex-col justify-between gap-y-2 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-7">
          <FilterAdvertisements />
          <InputTitleForm className="hidden sm:flex" />
        </div>
        <InputTitleForm className="flex sm:hidden" />
        <CreateAdvertisement />
      </div>

      <AdvertisementsTable>
        <Suspense fallback={<TableRowsSkeleton />}>
          <OwnAdvertisementsTableRows
            limit={limit}
            page={page}
            createdAt={createdAt}
            endDate={endDate}
            price={Number(price) || undefined}
            startDate={startDate}
            title={title}
            soldStatus={soldStatus}
            brandId={brandId}
          />
        </Suspense>
      </AdvertisementsTable>

      <Suspense fallback={null}>
        <PaginationOwnAdvertisements
          limit={limit}
          page={page}
          createdAt={createdAt}
          endDate={endDate}
          price={Number(price) || undefined}
          startDate={startDate}
          title={title}
          soldStatus={soldStatus}
          brandId={brandId}
        />
      </Suspense>
    </Container.Content>
  )
}
