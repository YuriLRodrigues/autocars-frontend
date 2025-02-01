import Image from 'next/image'
import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { Capacity, Doors, Fuel, GearBox } from '@/@types/advertisement'
import { formatCurrencyBRL, formatKilometers } from '@/utils/format-number'
import { mappingFuel, mappingGearBox, mappingNumberOfCapacity, mappingNumberOfDoors } from '@/utils/mappings'

import { CardIcon } from './card-icon'
import { HandleFavoriteButton } from './handle-favorite'

type AdvertisementCardProps = {
  advertisementId: string
  price: number
  title: string
  thumbnailUrl: string
  blurHash: string
  doors: string
  capacity: string
  fuel: string
  gearBox: string
  km: number
  children?: ReactNode
}

export const AdvertisementCard = ({
  advertisementId,
  price,
  capacity,
  doors,
  fuel,
  gearBox,
  km,
  thumbnailUrl,
  blurHash,
  title,
  children,
}: AdvertisementCardProps) => {
  return (
    <Card className="animate-jump-in animate-once animate-duration-[600ms] animate-ease-in-out w-80 overflow-hidden">
      <CardContent className="relative p-0">
        <Badge variant="success" className="absolute right-3 top-3">
          {formatCurrencyBRL(price)}
        </Badge>
        <HandleFavoriteButton advertisementId={advertisementId} />
        <Image
          src={thumbnailUrl}
          width={350}
          height={350}
          alt={title}
          placeholder="blur"
          blurDataURL={blurHash}
          className="aspect-video max-h-full max-w-full object-cover object-center"
        />
        <CardHeader className="space-y-5 *:text-center">
          <CardTitle className="font-bold">{title}</CardTitle>
          <div className="grid grid-cols-5 gap-x-4">
            <CardIcon iconName="User">{mappingNumberOfCapacity[capacity as Capacity]}</CardIcon>
            <CardIcon iconName="DoorClosed">{mappingNumberOfDoors[doors as Doors]}</CardIcon>
            <CardIcon iconName="Fuel">{mappingFuel[fuel as Fuel]}</CardIcon>
            <CardIcon iconName="Gauge">{formatKilometers(km)}</CardIcon>
            <CardIcon iconName="Cog">{mappingGearBox[gearBox as GearBox]}</CardIcon>
          </div>
        </CardHeader>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  )
}
