import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/interface/container'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <Container.Content className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
      <Container.Header>
        <Container.Title>Encontre o Carro Perfeito para Você</Container.Title>
        <Container.Description className="max-w-[500px]">
          Auto cars dará todas as garantias que você precisa para encontrar seu carro dos sonhos.
        </Container.Description>
        <Button effect="ringHover" className="!mt-3 w-fit bg-primary hover:bg-primary" asChild>
          <Link href="/cars">Encontrar carro</Link>
        </Button>
      </Container.Header>
      <div className="relative mx-auto w-fit overflow-hidden rounded-lg">
        <Image
          src="/assets/home/hero-section.webp"
          alt="hero-section-image"
          width={500}
          height={300}
          className="max-w-full object-cover duration-300 hover:scale-110"
          priority
        />
      </div>
    </Container.Content>
  )
}
