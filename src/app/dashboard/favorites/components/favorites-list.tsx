import { AdvertisementCard } from '@/app/components/advertisement-card'
import { AnimatedWrapper } from '@/components/ui/animated-wrapper'
import { Card } from '@/components/ui/card'

import { findAllFavoritesByUserId } from '@/http/orval-generation/routes/favorite-controller/favorite-controller'

export const FavoritesList = async () => {
  const { results } = await findAllFavoritesByUserId({}, { next: { tags: ['findAllFavoritesByUserId'] } })

  if (!results || results.length === 0) {
    return (
      <Card className="flex h-[calc(100vh-240px)] w-full items-center justify-center gap-y-3 p-2">
        Nenhum favorito encontrado.
      </Card>
    )
  }

  return (
    <section className="flex flex-wrap items-center gap-6">
      {results.map((fav, index) => (
        <AnimatedWrapper key={fav.id} delay={0.25 * index}>
          <AdvertisementCard
            advertisementId={fav.advertisement.id}
            capacity={fav.advertisement.capacity}
            doors={fav.advertisement.doors}
            fuel={fav.advertisement.fuel}
            gearBox={fav.advertisement.gearBox}
            km={fav.advertisement.km}
            price={fav.advertisement.price}
            thumbnailUrl={fav.advertisement.thumbnailUrl}
            blurHash={fav.advertisement.blurHash}
            title={fav.advertisement.title}
          />
        </AnimatedWrapper>
      ))}
    </section>
  )
}
