import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { SoldStatus } from '@/@types/advertisement'
import { useToggle } from '@/hooks/use-toggle'
import { QueryParams } from '@/utils/query-params'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { FilterAdvertisementsSchemaProps, filterAdvertisementsSchema } from './schema'

export const useFilterAdvertisementsForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toggle } = useToggle()

  const [showAllBrands, setShowAllBrands] = useState<number>(4)
  const [showAllModels, setShowAllModels] = useState<number>(4)
  const [showAllFuels, setShowAllFuels] = useState<number>(4)
  const [showAllColors, setShowAllColors] = useState<number>(4)

  const form = useForm<FilterAdvertisementsSchemaProps>({
    resolver: zodResolver(filterAdvertisementsSchema),
    mode: 'all',
    defaultValues: {
      createdAt: (searchParams.get('createdAt') as 'asc' | 'desc') || undefined,
      title: searchParams.get('title') || '',
      price: Number(searchParams.get('price')) || undefined,
      soldStatus: (searchParams.get('soldStatus') as SoldStatus) || undefined,
      brandId: searchParams.get('brandId') || undefined,
      color: searchParams.get('color') || undefined,
      model: searchParams.get('model') || undefined,
      year: Number(searchParams.get('year')) || undefined,
      fuel: searchParams.get('fuel') || undefined,
      km: Number(searchParams.get('km')) || undefined,
    },
  })

  const searchParamsPriceValue = searchParams.get('price') ? Number(searchParams.get('price')) : 0

  const searchParamsKmValue = searchParams.get('km') ? Number(searchParams.get('km')) : 0

  const [price, setPrice] = useState<number[]>([searchParamsPriceValue, 1000000000])
  const [km, setKm] = useState<number[]>([searchParamsKmValue, 1000000000])

  const onSubmit = async (values: FilterAdvertisementsSchemaProps) => {
    const url = QueryParams.baseUrl('/cars')

    if (values.createdAt !== undefined || values.createdAt !== '') {
      url.query({
        query: 'createdAt',
        value: values.createdAt,
      })
    }

    if (values.title !== undefined || values.title !== '') {
      url.query({
        query: 'title',
        value: values.title,
      })
    }

    if (price[0] !== undefined && price[0] > 0) {
      url.query({
        query: 'price',
        value: price[0].toString(),
      })
    }

    if (values.soldStatus !== undefined || values.soldStatus !== '') {
      url.query({
        query: 'soldStatus',
        value: values.soldStatus,
      })
    }

    if (values.brandId !== undefined) {
      url.query({
        query: 'brandId',
        value: values.brandId,
      })
    }

    if (values.color !== undefined) {
      url.query({
        query: 'color',
        value: values.color,
      })
    }

    if (values.model !== undefined) {
      url.query({
        query: 'model',
        value: values.model,
      })
    }

    if (values.year !== undefined) {
      url.query({
        query: 'year',
        value: values.year.toString(),
      })
    }

    if (values.fuel !== undefined) {
      url.query({
        query: 'fuel',
        value: values.fuel,
      })
    }

    if (km[0] !== undefined && km[0] > 0) {
      url.query({
        query: 'km',
        value: km[0].toString(),
      })
    }

    toast.success(`Novos filtros adicionados`)
    toggle(false)
    router.push(url.value())
    return
  }

  const clear = () => {
    form.reset({
      createdAt: undefined,
      title: undefined,
      price: undefined,
      color: undefined,
      model: undefined,
      year: undefined,
      fuel: undefined,
      km: undefined,
      soldStatus: undefined,
      brandId: undefined,
    })

    window.location.replace('/cars')
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    clear,
    showAllFuels,
    setShowAllFuels,
    showAllBrands,
    setShowAllBrands,
    showAllModels,
    setShowAllModels,
    showAllColors,
    setShowAllColors,
    price,
    setPrice,
    km,
    setKm,
  }
}
