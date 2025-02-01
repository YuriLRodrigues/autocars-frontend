import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { mappingMonthReference } from '@/utils/mappings'
import { QueryParams } from '@/utils/query-params'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { selectreferenceDateSchema, SelectreferenceDateSchemaProps } from './schema'

export const useSelectreferenceDate = () => {
  const referenceDate = Number(useSearchParams().get('referenceDate')) || 1

  const form = useForm<SelectreferenceDateSchemaProps>({
    resolver: zodResolver(selectreferenceDateSchema),
    mode: 'all',
    defaultValues: {
      referenceDate: referenceDate,
    },
  })

  const onSubmit = async (values: SelectreferenceDateSchemaProps) => {
    const url = QueryParams.baseUrl('/dashboard')

    if (values.referenceDate !== undefined) {
      url.query({
        query: 'referenceDate',
        value: values.referenceDate.toString(),
      })
    }

    toast.success(`Mês de ${mappingMonthReference[values.referenceDate]} selecionado`)
    await wait()

    window.location.replace(url.value())
    return
  }

  return {
    form,
    handleSubmit: onSubmit,
  }
}
