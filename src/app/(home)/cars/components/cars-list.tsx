import Link from 'next/link'

import { AdvertisementCard } from '@/app/components/advertisement-card'
import { AdvertisementCardSkeleton } from '@/app/components/advertisement-card/advertisement-card'
import { AnimatedWrapper } from '@/components/ui/animated-wrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { Color, Fuel, Model, SoldStatus } from '@/@types/advertisement'
import { findAllAdvertisements } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type CardsListProps = {
  page?: number
  limit?: number
  title?: string
  soldStatus?: SoldStatus
  fuel?: Fuel
  color?: Color
  model?: Model
  price?: number
  year?: number
  createdAt?: 'asc' | 'desc'
  brandId?: string
  km?: number
}

export const CarsList = async (props: CardsListProps) => {
  const { results } = await findAllAdvertisements({ ...props }, { next: { tags: ['findAllAdvertisements'] } })

  if (!results || results.length === 0) {
    return (
      <Card className="flex h-[calc(100vh-240px)] w-full items-center justify-center gap-y-3 p-2">
        Nenhum anúncio encontrado.
      </Card>
    )
  }

  return results.map((ad, index) => (
    <AnimatedWrapper key={ad.advertisementId} delay={0.1 * index}>
      <AdvertisementCard
        advertisementId={ad.advertisementId}
        capacity={ad.capacity}
        model={ad.model}
        doors={ad.doors}
        fuel={ad.fuel}
        gearBox={ad.gearBox}
        km={ad.km}
        price={ad.price}
        soldStatus={ad.soldStatus}
        thumbnailUrl={ad.thumbnailUrl}
        blurHash={ad.blurHash}
        salePrice={ad.salePrice}
        title={ad.title}
      >
        <Link href={`/cars/${ad.advertisementId}`} className="min-w-full">
          <Button className="min-w-full p-2" effect="shineHover">
            Ver detalhes
          </Button>
        </Link>
      </AdvertisementCard>
    </AnimatedWrapper>
  ))
}

export const CarsListSkeleton = () => {
  return [...Array(12)].map((_, index) => <AdvertisementCardSkeleton key={index} />)
}
