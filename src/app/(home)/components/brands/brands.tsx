import { Suspense } from 'react'

import { Container } from '@/components/interface/container'

import { BrandsMarquee, BrandsMarqueeSkeleton } from './index'

export const Brands = () => {
  return (
    <Container.Content>
      <Container.Header className="*:mx-auto *:text-center">
        <Container.Title className="text-4xl">As melhores marcas</Container.Title>
        <Container.Description className="max-w-[500px]">
          Aqui você encontra as marcas mais conhecidas no mercado automobilístico.
        </Container.Description>
      </Container.Header>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Suspense fallback={<BrandsMarqueeSkeleton />}>
          <BrandsMarquee />
        </Suspense>
      </div>
    </Container.Content>
  )
}
