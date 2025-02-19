import Link from 'next/link'
import { Fragment } from 'react'

import { CardIcon } from '@/app/components/advertisement-card/card-icon'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'

import { findAdById } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { formatDate } from '@/utils/format-date'
import { formatCurrencyBRL, formatKilometers, formatPhoneNumber } from '@/utils/format-number'
import {
  mappingFuel,
  mappingGearBox,
  mappingModel,
  mappingNumberOfCapacity,
  mappingNumberOfDoors,
} from '@/utils/mappings'

import { HandleCopy } from '../handle-copy'
import { HandleFavoriteButton } from '../handle-favorite'
import { HandleLikeButton } from '../handle-like'

type CarDetailsProps = {
  advertisementId: string
}

export const CarDetails = async ({ advertisementId }: CarDetailsProps) => {
  const adDetails = await findAdById(advertisementId)

  return (
    <div className="relative min-h-full space-y-6">
      <article className="space-y-1">
        <div className="absolute right-2 top-2 flex flex-col space-y-1.5">
          <HandleFavoriteButton advertisementId={advertisementId} />
          <HandleLikeButton advertisementId={advertisementId} />
          <HandleCopy />
        </div>
        <div className="mr-16 flex flex-nowrap items-center gap-4">
          <h1 className="line-clamp-2 text-wrap text-2xl font-extrabold uppercase tracking-wide lg:text-4xl">
            {adDetails.title}
          </h1>
          <Avatar className="my-auto h-14 w-14">
            <AvatarImage src={adDetails.brand.logoUrl} className="object-cover object-center" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>

        <span className="text-accent-foreground/80">{formatDate(adDetails.createdAt)}</span>
        <div className="!mt-3 flex flex-col text-lg">
          {adDetails.salePrice && (
            <Fragment>
              <s className="text-foreground/40">{formatCurrencyBRL(adDetails.price)}</s>
              <span className="font-bold">{formatCurrencyBRL(adDetails.salePrice)}</span>
            </Fragment>
          )}
          {!adDetails.salePrice && <span className="font-bold">{formatCurrencyBRL(adDetails.price)}</span>}
        </div>
      </article>
      <div className="space-y-3">
        <p className="text-sm">Informações do carro:</p>
        <div className="flex flex-wrap gap-8 *:!mx-0 *:!text-xs">
          <CardIcon iconName="CalendarRange">{adDetails.year}</CardIcon>
          <CardIcon iconName="KeySquare">{mappingModel[adDetails.model]}</CardIcon>
          <CardIcon iconName="User">{mappingNumberOfCapacity[adDetails.capacity]}</CardIcon>
          <CardIcon iconName="DoorClosed">{mappingNumberOfDoors[adDetails.doors]}</CardIcon>
          <CardIcon iconName="Fuel">{mappingFuel[adDetails.fuel]}</CardIcon>
          <CardIcon iconName="Gauge">{formatKilometers(adDetails.km)}</CardIcon>
          <CardIcon iconName="Cog">{mappingGearBox[adDetails.gearBox]}</CardIcon>
        </div>
      </div>
      <div className="hidden flex-wrap items-center gap-3 lg:flex">
        <Button effect="shine" icon={<Icon name="ShoppingCart" />} iconPlacement="left">
          Comprar
        </Button>
        <Button variant="secondary" effect="ringHover" icon={<Icon name="MessageCircle" />} iconPlacement="left">
          Conversar com o vendedor
        </Button>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>
            <h3 className="text-xl font-semibold">Sobre o veículo</h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <p>{adDetails.description}</p>
            <p>
              <b>Localização atual do veículo:</b> {adDetails.localization}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>
            <h3 className="text-xl font-semibold">Informações do vendedor</h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="flex w-fit items-center justify-center gap-4">
              <p>Vendido e entregue por:</p>
              <Link href={`/profile/${adDetails.user.id}`}>
                <div className="mx-auto flex flex-row items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={adDetails.user.avatar || '/assets/default-user-avatar.webp'}
                      className="object-cover object-center"
                    />
                    <AvatarFallback className="cursor-pointer">{adDetails.user.name[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1 text-sm font-medium text-foreground">{adDetails.user.name}</span>
                </div>
              </Link>
            </div>
            <p>Informações de contato: {formatPhoneNumber(adDetails.phone)}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-wrap items-center gap-3 lg:hidden">
        <Button effect="shine" icon={<Icon name="ShoppingCart" />} iconPlacement="left">
          Comprar
        </Button>
        <Button variant="secondary" effect="ringHover" icon={<Icon name="MessageCircle" />} iconPlacement="left">
          Conversar com o vendedor
        </Button>
      </div>
    </div>
  )
}

export const CarDetailsSkeleton = () => {
  return (
    <div className="relative min-h-full space-y-6">
      <article className="space-y-1">
        <div className="absolute right-2 top-2 flex flex-col space-y-1.5">
          <button className="h-8 w-8 overflow-hidden rounded-full p-0">
            <Skeleton className="size-full" />
          </button>
          <button className="h-8 w-8 overflow-hidden rounded-full p-0">
            <Skeleton className="size-full" />
          </button>
        </div>
        <div className="mr-16 flex flex-nowrap items-center gap-4">
          <h1 className="line-clamp-2 text-wrap text-2xl font-extrabold uppercase tracking-wide lg:text-4xl">
            <Skeleton className="h-10 w-96" />
          </h1>
          <Avatar className="my-auto h-14 w-14">
            <AvatarFallback>
              <Skeleton className="size-full" />
            </AvatarFallback>
          </Avatar>
        </div>

        <span className="text-accent-foreground/80">
          <Skeleton className="h-5 w-20" />
        </span>
        <div className="!mt-3 flex flex-col text-lg">
          <Skeleton className="h-5 w-32" />
        </div>
      </article>
      <div className="space-y-3">
        <p className="text-sm">Informações do carro:</p>
        <div className="flex flex-wrap gap-8 *:!mx-0 *:!text-xs">
          <CardIcon iconName="CalendarRange">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
          <CardIcon iconName="KeySquare">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
          <CardIcon iconName="User">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
          <CardIcon iconName="DoorClosed">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
          <CardIcon iconName="Fuel">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
          <CardIcon iconName="Gauge">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
          <CardIcon iconName="Cog">
            <Skeleton className="mt-2 h-4 w-10" />
          </CardIcon>
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>
            <h3 className="text-xl font-semibold">Sobre o veículo</h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <Skeleton className="h-5 w-60" />
            <div className="flex items-center gap-2">
              <b>Localização atual do veículo:</b> <Skeleton className="h-5 w-32" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="description">
          <AccordionTrigger>
            <h3 className="text-xl font-semibold">Informações do vendedor</h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="flex w-fit items-center justify-center gap-4">
              <p>Vendido e entregue por:</p>
              <div className="mx-auto flex flex-row items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <Skeleton className="size-full" />
                  </AvatarFallback>
                </Avatar>
                <span className="line-clamp-1 text-sm font-medium text-foreground">
                  <Skeleton className="h-5 w-20" />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              Informações de contato: <Skeleton className="h-5 w-32" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
