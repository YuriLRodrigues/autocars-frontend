import { Brands } from './components/brands/brands'
import { Features } from './components/features'
import { WorldMapSection } from './components/map'
import { Container } from '@/components/interface/container'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'

export default function Home() {
  return (
    <Container.Root className="pb-0">
      <HeroGeometric
        badge="AutoCars"
        title1="Encontre o Veículo"
        title2="Ideal para Você"
        description="Na Auto Cars, você encontra segurança e confiança para comprar ou vender seu próximo carro com tranquilidade."
      />
      <Features />
      <Brands />
      <WorldMapSection />
    </Container.Root>
  )
}
