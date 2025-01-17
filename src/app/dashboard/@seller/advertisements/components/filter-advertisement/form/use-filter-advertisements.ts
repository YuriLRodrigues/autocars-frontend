import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'

import { SoldStatus } from '@/@types/advertisement'
import { QueryParams } from '@/utils/query-params'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { FilterAdvertisementsSchemaProps, filterAdvertisementsSchema } from './schema'

export const useFilterAdvertisementsForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<FilterAdvertisementsSchemaProps>({
    resolver: zodResolver(filterAdvertisementsSchema),
    mode: 'all',
    defaultValues: {
      createdAt: (searchParams.get('createdAt') as 'asc' | 'desc') || '',
      title: searchParams.get('title') || '',
      price: Number(searchParams.get('price')) || undefined,
      endDate: searchParams.get('endDate') || '',
      startDate: searchParams.get('startDate') || '',
      soldStatus: (searchParams.get('soldStatus') as SoldStatus) || '',
    },
  })

  const [date, setDate] = useState<DateRange | undefined>({
    from: searchParams.get('startDate') ? new Date(searchParams.get('startDate') as string) : undefined,
    to: searchParams.get('endDate') ? new Date(searchParams.get('endDate') as string) : undefined,
  })

  const searchParamsPriceValue = searchParams.get('price') ? Number(searchParams.get('price')) : 0

  const [price, setPrice] = useState<number[]>([searchParamsPriceValue, 1000000000])

  const onSubmit = async (values: FilterAdvertisementsSchemaProps) => {
    const url = QueryParams.baseUrl('/dashboard/advertisements')

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

    if (date?.from !== undefined) {
      url.query({
        query: 'startDate',
        value: new Date(date?.from).toISOString(),
      })
    }

    if (date?.to !== undefined) {
      url.query({
        query: 'endDate',
        value: new Date(date?.to).toISOString(),
      })
    }

    toast.success(`Novos filtros adicionados`)

    router.push(url.value())
    return
  }

  const clear = () => {
    form.reset({
      createdAt: undefined,
      title: undefined,
      price: undefined,
      endDate: undefined,
      startDate: undefined,
      soldStatus: undefined,
    })

    window.location.replace('/dashboard/advertisements')
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    clear,
    date,
    setDate,
    price,
    setPrice,
  }
}
