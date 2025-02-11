import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { UserRoles } from '@/@types/user'
import { QueryParams } from '@/utils/query-params'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { FilterUsersSchemaProps, filterUsersSchema } from './schema'

export const useFilterUsersForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<FilterUsersSchemaProps>({
    resolver: zodResolver(filterUsersSchema),
    mode: 'all',
    defaultValues: {
      createdAt: (searchParams.get('createdAt') as 'asc' | 'desc') || '',
      name: (searchParams.get('name') as 'asc' | 'desc') || '',
      role: (searchParams.get('role') as UserRoles) || '',
      status: (searchParams.get('status') as 'ACTIVE' | 'INACTIVE') || '',
      title: searchParams.get('title') || '',
    },
  })

  const onSubmit = async (values: FilterUsersSchemaProps) => {
    const currentPathname = pathname.split('?')[0]
    const url = QueryParams.baseUrl(currentPathname)

    if (values.createdAt !== undefined || values.createdAt !== '') {
      url.query({
        query: 'createdAt',
        value: values.createdAt,
      })
    }

    if (values.name !== undefined || values.name !== '') {
      url.query({
        query: 'name',
        value: values.name,
      })
    }

    if (values.role !== undefined || values.role !== '') {
      url.query({
        query: 'role',
        value: values.role,
      })
    }

    if (values.status !== undefined || values.status !== '') {
      url.query({
        query: 'status',
        value: values.status,
      })
    }

    if (values.title !== undefined || values.title !== '') {
      url.query({
        query: 'title',
        value: values.title,
      })
    }

    toast.success(`Novos filtros adicionados`)
    router.push(url.value())
  }

  const clear = () => {
    form.reset({
      createdAt: undefined,
      name: undefined,
      status: undefined,
      role: undefined,
      title: undefined,
    })

    window.location.replace('/dashboard/users')
  }

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    clear,
  }
}
