import Image from 'next/image'

import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'

import { DeleteBrand } from './actions/delete/delete-brand'
import { EditBrand } from './actions/edit'
import { UpdateBrandForm } from './actions/edit/form'

type BrandsListProps = {
  page?: number
}

export const BrandsList = async ({ page }: BrandsListProps) => {
  const { results: brands } = await findAllBrands({ limit: 18, page }, { next: { tags: ['findAllBrands'] } })

  if (!brands || brands.length === 0) {
    return <Card className="flex h-full w-full items-center justify-center gap-y-3 p-2">Nenhum marca encontrada.</Card>
  }

  return (
    <section className="flex w-full flex-wrap items-center justify-center gap-4">
      {brands.map((brand) => (
        <Card key={brand.id} className="relative flex h-40 w-36 flex-col items-center justify-center gap-y-3 p-2">
          <Image
            src={brand.logoUrl}
            alt={brand.name}
            width={200}
            height={200}
            className="aspect-square size-24 object-cover object-center"
          />
          <CardContent className="py-0">
            <CardTitle className="line-clamp-1">{brand.name}</CardTitle>
          </CardContent>
          <div className="absolute right-3 top-3 flex flex-col gap-y-3">
            <DeleteBrand brandId={brand.id} />
            <EditBrand>
              <UpdateBrandForm logoUrl={brand.logoUrl} name={brand.name} id={brand.id} />
            </EditBrand>
          </div>
        </Card>
      ))}
    </section>
  )
}

export const BrandsListSkeleton = () => {
  return (
    <section className="flex w-full flex-wrap items-center justify-center gap-4">
      {[...Array(15)].map((_, index) => (
        <Card key={index} className="flex h-40 w-36 flex-col items-center justify-center gap-y-3 overflow-hidden pb-2">
          <Skeleton className="aspect-square h-full w-full object-cover object-center" />
          <CardContent className="py-0">
            <CardTitle>
              <Skeleton className="h-4 w-32" />
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
