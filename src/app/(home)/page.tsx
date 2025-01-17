import { Suspense } from 'react'

import { Brands, BrandsSkeleton } from './components/brands'
import { Features } from './components/features'
import { HeroSection } from './components/hero-section'
import { MapSection } from './components/map-section'
import { Container } from '@/components/interface/container'

export default async function Home() {
  return (
    <Container.Root className="pb-0">
      <HeroSection />
      <Features />
      <Suspense fallback={<BrandsSkeleton />}>
        <Brands />
      </Suspense>
      <MapSection />
    </Container.Root>
  )
}
