import Image from 'next/image'

import { Container } from '@/components/interface/container'

export function MapSection() {
  return (
    <Container.Content className="bg-foreground/5">
      <Container.Header className="*:mx-auto *:text-center">
        <Container.Title>Compre carros de varios lugares do país</Container.Title>
        <Container.Description className="max-w-[500px]">
          Auto cars oferece a melhor opção para você encontrar o seu carro dos sonhos.
        </Container.Description>
      </Container.Header>
      <Image
        src="/assets/home/map-section.png"
        alt="map-section-image"
        width={500}
        height={500}
        className="mx-auto max-w-full object-cover object-center"
        quality={100}
        priority
      />
    </Container.Content>
  )
}
