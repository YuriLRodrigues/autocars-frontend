import Link from 'next/link'
import { ComponentProps, ReactNode } from 'react'

import { BlurImage } from '@/components/ui/blur-image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { Capacity, Doors, Fuel, GearBox, Model, SoldStatus } from '@/@types/advertisement'
import { cn } from '@/lib/utils'
import { formatCurrencyBRL, formatKilometers } from '@/utils/format-number'
import {
  mappingAdCardSoldStatus,
  mappingFuel,
  mappingGearBox,
  mappingModel,
  mappingNumberOfCapacity,
  mappingNumberOfDoors,
} from '@/utils/mappings'

import { CardIcon, CardIconSkeleton } from './card-icon'
import { HandleFavoriteButton } from './handle-favorite'

type AdvertisementCardProps = ComponentProps<'div'> & {
  advertisementId: string
  price: number
  salePrice?: number
  title: string
  thumbnailUrl: string
  blurHash: string
  doors: string
  capacity: string
  fuel: string
  gearBox: string
  model: string
  soldStatus: string
  km: number
  children?: ReactNode
}

export const AdvertisementCard = ({
  advertisementId,
  price,
  salePrice,
  capacity,
  doors,
  fuel,
  gearBox,
  model,
  km,
  thumbnailUrl,
  blurHash,
  soldStatus,
  title,
  className,
  children,
}: AdvertisementCardProps) => {
  return (
    <Card
      className={cn(
        'animate-jump-in animate-once animate-duration-[600ms] animate-ease-in-out flex h-full min-h-full w-full flex-col justify-between overflow-hidden',
        className,
      )}
    >
      <CardContent className="relative p-0">
        <div className="absolute right-3 top-3 z-50 space-y-1">
          <div className="rounded-lg bg-green-500 p-1.5 text-xs font-semibold transition-all duration-200 hover:bg-green-700">
            {formatCurrencyBRL(salePrice ?? price)}
          </div>
          {mappingAdCardSoldStatus[soldStatus as SoldStatus]}
        </div>
        <HandleFavoriteButton advertisementId={advertisementId} />
        <BlurImage
          src={thumbnailUrl}
          width={400}
          height={350}
          alt={title}
          placeholder="blur"
          blurDataURL={blurHash}
          className="aspect-video max-h-full max-w-full object-cover object-center"
        />
        <CardHeader className="my-auto space-y-5 *:text-center">
          <CardTitle className="line-clamp-1 text-wrap text-2xl font-extrabold uppercase tracking-wide hover:underline lg:text-2xl">
            <Link href={`/cars/${advertisementId}`}>{title}</Link>
          </CardTitle>
          <div className="grid">
            <ScrollArea className="pb-3">
              <div className="flex items-center justify-between gap-x-4 gap-y-4">
                <CardIcon iconName="KeySquare">{mappingModel[model as Model]}</CardIcon>
                <CardIcon iconName="User">{mappingNumberOfCapacity[capacity as Capacity]}</CardIcon>
                <CardIcon iconName="DoorClosed">{mappingNumberOfDoors[doors as Doors]}</CardIcon>
                <CardIcon iconName="Fuel">{mappingFuel[fuel as Fuel]}</CardIcon>
                <CardIcon iconName="Gauge">{formatKilometers(km)}</CardIcon>
                <CardIcon iconName="Cog">{mappingGearBox[gearBox as GearBox]}</CardIcon>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardHeader>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center gap-3">{children}</CardFooter>
    </Card>
  )
}

export const AdvertisementCardSkeleton = () => {
  return (
    <Card className="animate-jump-in animate-once animate-duration-[600ms] animate-ease-in-out flex h-full min-h-full w-full flex-col justify-between overflow-hidden">
      <CardContent className="relative p-0">
        <div className="absolute right-3 top-3 space-y-2">
          <Skeleton className="h-6 w-16 rounded-lg p-1.5 text-xs" />
          <Skeleton className="h-6 w-16 rounded-lg p-1.5 text-xs" />
        </div>
        <Skeleton className="absolute left-3 top-3 flex h-5 w-5 items-center gap-2 p-1" />
        <Skeleton className="aspect-video max-h-full max-w-full object-cover object-center" />
        <CardHeader className="my-auto space-y-5 *:text-center">
          <CardTitle className="font-bold">
            <Skeleton className="mx-auto h-4 w-36" />
          </CardTitle>
          <div className="grid">
            <ScrollArea className="pb-3">
              <div className="flex items-center justify-between gap-x-4 gap-y-4">
                <CardIconSkeleton />
                <CardIconSkeleton />
                <CardIconSkeleton />
                <CardIconSkeleton />
                <CardIconSkeleton />
                <CardIconSkeleton />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4"></div>
        </CardHeader>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-3">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
