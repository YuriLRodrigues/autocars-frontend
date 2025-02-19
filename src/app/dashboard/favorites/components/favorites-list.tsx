import { AdvertisementCard } from '@/app/components/advertisement-card'
import { AdvertisementCardSkeleton } from '@/app/components/advertisement-card/advertisement-card'
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
    <section className="mx-auto grid w-full gap-x-3 gap-y-4 px-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {results.map((fav, index) => (
        <AnimatedWrapper key={fav.id} delay={0.25 * index}>
          <AdvertisementCard
            className="mx-auto w-full max-sm:max-w-[400px]"
            advertisementId={fav.advertisement.id}
            model={fav.advertisement.model}
            soldStatus={fav.advertisement.soldStatus}
            capacity={fav.advertisement.capacity}
            doors={fav.advertisement.doors}
            fuel={fav.advertisement.fuel}
            gearBox={fav.advertisement.gearBox}
            km={fav.advertisement.km}
            price={fav.advertisement.price}
            thumbnailUrl={fav.advertisement.thumbnailUrl}
            blurHash={fav.advertisement.blurHash}
            title={fav.advertisement.title}
            salePrice={fav.advertisement.salePrice}
          />
        </AnimatedWrapper>
      ))}
    </section>
  )
}

export const FavoritesListSkeleton = () => {
  return (
    <section className="mx-auto grid w-full gap-x-3 gap-y-4 px-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {...[...Array(12)].map((_, index) => <AdvertisementCardSkeleton key={index} />)}
    </section>
  )
}
