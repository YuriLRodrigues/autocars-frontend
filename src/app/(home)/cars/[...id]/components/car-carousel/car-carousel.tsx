'use client'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'

import { BlurImage } from '@/components/ui/blur-image'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import { cn } from '@/lib/utils'

import { ViewImageFullscreenDialog } from './view-image-details'

type ImageProps = {
  url: string
  blurHash: string
}

type CarCarousel = {
  images: ImageProps[]
}

export const CarCarousel = ({ images }: CarCarousel) => {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className="relative aspect-video max-h-[310px] min-h-[150px] w-full max-w-full sm:min-h-[250px]"
        >
          <BlurImage
            src={image.url}
            alt={`view-car-image-${index + 1}`}
            width={800}
            height={450}
            className="aspect-video h-full max-h-full w-full max-w-full rounded-lg object-cover"
            priority={index === 0}
          />
        </CarouselItem>
      )),
    [images],
  )

  const thumbnailImages = useMemo(
    () => (
      <CarouselItem className="mx-4 flex gap-4 p-1 py-3">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={cn(
              'relative min-w-0 flex-[0_0_35%] cursor-pointer rounded-lg ring-offset-background transition-all hover:opacity-100 sm:flex-[0_0_20%] lg:flex-[0_0_26%] xl:flex-[0_0_20%] 2xl:flex-[0_0_17%]',
              index === current
                ? 'opacity-100 ring-2 ring-primary ring-offset-2'
                : 'opacity-60 hover:ring-2 hover:ring-primary/50 hover:ring-offset-2',
            )}
          >
            <BlurImage
              src={image.url}
              alt={`thumbnail-${index + 1}`}
              width={200}
              height={112}
              className="aspect-video w-full rounded-lg object-cover"
              blurDataURL={image.blurHash}
            />
          </div>
        ))}
      </CarouselItem>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images, current],
  )

  useEffect(() => {
    if (!mainApi || !thumbnailApi) {
      return
    }

    const handleTopSelect = () => {
      const selected = mainApi.selectedScrollSnap()
      setCurrent(selected)
      thumbnailApi.scrollTo(selected)
    }

    const handleBottomSelect = () => {
      const selected = thumbnailApi.selectedScrollSnap()
      setCurrent(selected)
      mainApi.scrollTo(selected)
    }

    mainApi.on('select', handleTopSelect)
    thumbnailApi.on('select', handleBottomSelect)

    return () => {
      mainApi.off('select', handleTopSelect)
      thumbnailApi.off('select', handleBottomSelect)
    }
  }, [mainApi, thumbnailApi])

  const handleClick = (index: number) => {
    if (!mainApi || !thumbnailApi) {
      return
    }
    thumbnailApi.scrollTo(index)
    mainApi.scrollTo(index)
    setCurrent(index)
  }

  return (
    <Card className="mx-auto flex max-h-fit w-full flex-col justify-between space-y-4 overflow-hidden p-4">
      <Carousel setApi={setMainApi}>
        <CarouselContent>{mainImage}</CarouselContent>
        <ViewImageFullscreenDialog>
          <Image
            src={images[current].url}
            alt={`dialog-image-details-${current}`}
            width={1920}
            height={1080}
            className="max-h-full rounded-lg object-cover"
          />
        </ViewImageFullscreenDialog>
      </Carousel>
      <Carousel setApi={setThumbnailApi}>
        <CarouselContent>{thumbnailImages}</CarouselContent>
      </Carousel>
    </Card>
  )
}
