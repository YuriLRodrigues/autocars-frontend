import { Suspense } from 'react'

import { BrandsList, BrandsListSkeleton } from './components/brands-list'
import { CreateBrand } from './components/create-brand'
import { PaginationBrands } from './components/pagination-brands'
import { Container } from '@/components/interface/container'

type BrandsPageProps = {
  searchParams: Promise<{ page?: number }>
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
  const { page } = await searchParams
  return (
    <Container.Content>
      <Container.Header>
        <Container.Title>Marcas</Container.Title>
        <Container.Description>Aqui você pode visualizar e gerenciar as marcas dos carros.</Container.Description>
      </Container.Header>
      <div className="flex items-center justify-between">
        <CreateBrand />
      </div>
      <div className="flex min-h-[calc(100vh-290px)] flex-col">
        <Suspense fallback={<BrandsListSkeleton />}>
          <BrandsList page={Number(page) || undefined} />
        </Suspense>
        <Suspense fallback={null}>
          <PaginationBrands page={Number(page) || undefined} />
        </Suspense>
      </div>
    </Container.Content>
  )
}
