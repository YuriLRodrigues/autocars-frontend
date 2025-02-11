import { Marquee } from '@/components/ui/marquee'
import { Skeleton } from '@/components/ui/skeleton'

import { findAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'
import { cn } from '@/lib/utils'

type ReviewCardProps = {
  logoUrl?: string
  name?: string
  isSkeleton?: boolean
}

const ReviewCard = ({ logoUrl, name, isSkeleton }: ReviewCardProps) => {
  return (
    <figure
      className={cn(
        'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {!isSkeleton ? (
          <img className="rounded-full" width="32" height="32" alt="" src={logoUrl} />
        ) : (
          <Skeleton className="size-10" />
        )}

        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {!isSkeleton ? name : <Skeleton className="h-4 w-28" />}
          </figcaption>
          <span className="text-xs font-medium dark:text-white/40">
            {!isSkeleton ? name : <Skeleton className="mt-1 h-4 w-28" />}
          </span>
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{body}</blockquote> */}
    </figure>
  )
}

export async function BrandsMarquee() {
  const { results: brands } = await findAllBrands({ limit: 1000 }, { next: { tags: ['findAllBrands'] } })

  if (!brands || brands.length === 0) return null

  const firstRow = brands.slice(0, brands.length / 2)
  const secondRow = brands.slice(brands.length / 2)

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-10">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} logoUrl={review.logoUrl} name={review.name} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} logoUrl={review.logoUrl} name={review.name} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}

export const BrandsMarqueeSkeleton = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {[...Array(20)].map((_, index) => (
          <ReviewCard key={index} isSkeleton={true} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {[...Array(20)].map((_, index) => (
          <ReviewCard key={index} isSkeleton={true} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}
