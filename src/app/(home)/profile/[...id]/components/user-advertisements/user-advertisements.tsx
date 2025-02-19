import { AdvertisementCard } from '@/app/components/advertisement-card'
import { AdvertisementCardSkeleton } from '@/app/components/advertisement-card/advertisement-card'
import { AnimatedWrapper } from '@/components/ui/animated-wrapper'

import { findAllAdvertisementsByUserId } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type UserAdvertisementsProps = {
  userId: string
  page?: number
  limit?: number
}

export const UserAdvertisements = async ({ userId, limit, page }: UserAdvertisementsProps) => {
  const { results } = await findAllAdvertisementsByUserId(userId, { limit, page })

  return (
    <section className="mx-auto grid w-full gap-x-3 gap-y-4 px-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {results?.map((row, index) => (
        <AnimatedWrapper key={row.advertisement.id} delay={0.25 * index}>
          <AdvertisementCard
            className="mx-auto w-full max-sm:max-w-[400px]"
            advertisementId={row.advertisement.id}
            model={row.advertisement.model}
            soldStatus={row.advertisement.soldStatus}
            capacity={row.advertisement.capacity}
            doors={row.advertisement.doors}
            fuel={row.advertisement.fuel}
            gearBox={row.advertisement.gearBox}
            km={row.advertisement.km}
            price={row.advertisement.price}
            thumbnailUrl={row.advertisement.thumbnailUrl}
            blurHash={row.advertisement.blurHash}
            title={row.advertisement.title}
            salePrice={row.advertisement.salePrice}
          />
        </AnimatedWrapper>
      ))}
    </section>
  )
}

export const UserAdvertisementsSkeleton = () => {
  return (
    <section className="mx-auto grid w-full gap-x-3 gap-y-4 px-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {...[...Array(12)].map((_, index) => <AdvertisementCardSkeleton key={index} />)}
    </section>
  )
}
