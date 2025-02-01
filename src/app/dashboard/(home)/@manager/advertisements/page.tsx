import { Suspense } from 'react'

import {
  AdvertisementsTable,
  OwnAdvertisementsTableRows,
  TableRowsSkeleton,
} from '../../../components/advertisements-table'
import { FilterAdvertisements } from '../../../components/filter-advertisement/filter-advertisement'
import { InputTitleForm } from '../../../components/filter-advertisement/form/input-title-form'
import {
  PaginationManagerAdvertisements,
  PaginationOwnAdvertisements,
} from '../../../components/pagination-advertisements'
import { ManagerAdvertisementsTableRows } from '@/app/dashboard/components/advertisements-table/manager-advertisements-table-rows'
import { CreateAdvertisement } from '@/app/dashboard/components/create-advertisement/create-advertisement'
import { Container } from '@/components/interface/container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

      <Tabs defaultValue="manager" className="!mt-3 space-y-4">
        <TabsList>
          <TabsTrigger value="manager">Todos os anúncios</TabsTrigger>
          <TabsTrigger value="me">Meus anúncios</TabsTrigger>
        </TabsList>

        <TabsContent value="manager">
          <AdvertisementsTable>
            <Suspense fallback={<TableRowsSkeleton />}>
              <ManagerAdvertisementsTableRows
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
            <PaginationManagerAdvertisements
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
        </TabsContent>

        <TabsContent value="me">
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
        </TabsContent>
      </Tabs>
    </Container.Content>
  )
}
