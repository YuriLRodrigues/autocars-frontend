import Image from 'next/image'

import { Container } from '@/components/interface/container'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'

export const Brands = async () => {
  const brands = await findAllBrands()

  return (
    <Container.Content>
      <Container.Header className="*:mx-auto *:text-center">
        <Container.Title className="text-4xl">As melhores marcas</Container.Title>
        <Container.Description className="max-w-[500px]">
          Aqui você encontra as marcas mais conhecidas no mercado automobilístico.
        </Container.Description>
      </Container.Header>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {brands.map((brand) => (
          <Image
            key={brand.name}
            src={brand.logoUrl}
            alt={`Logo - ${brand.name}`}
            width={112}
            height={112}
            className="aspect-square size-24 rounded-lg object-cover object-center opacity-70 transition-opacity hover:opacity-100 md:size-28"
          />
        ))}
      </div>
    </Container.Content>
  )
}

export const BrandsSkeleton = () => {
  return (
    <Container.Content>
      <Container.Header className="*:mx-auto *:text-center">
        <Container.Title>As melhores marcas</Container.Title>
        <Container.Description className="max-w-[500px]">
          Aqui você encontra as marcas mais conhecidas no mercado automobilístico.
        </Container.Description>
      </Container.Header>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {[...Array(20)].map((_, index) => (
          <Skeleton
            className="aspect-square size-24 rounded-lg object-cover object-center opacity-70 transition-opacity hover:opacity-100 md:size-28"
            key={index}
          />
        ))}
      </div>
    </Container.Content>
  )
}
