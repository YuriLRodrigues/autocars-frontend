/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { updateOwnUser, useMe } from '@/http/orval-generation/routes/user-controller/user-controller'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { SIGNIN_COOKIE_MAX_AGE } from '@/utils/cookie-max-age'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next/client'
import { toast } from 'sonner'

import { UpdateProfileSchemaProps, updateProfileSchema } from './schema'

type UseUpdateProfileFormProps = {
  uploadedAvatar?: string
}

export const useUpdateProfileForm = ({ uploadedAvatar }: UseUpdateProfileFormProps) => {
  const { data } = useMe({ query: { staleTime: 0, refetchOnMount: true } })

  const form = useForm<UpdateProfileSchemaProps>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      email: data?.user?.email || '',
      name: data?.user?.name || '',
      username: data?.user?.username || '',
    },
  })

  useEffect(() => {
    if (data?.user) {
      form.reset({
        email: data.user.email || '',
        name: data.user.name || '',
        username: data.user.username || '',
      })
    }
  }, [data, form.reset])

  const onSubmit = async (values: UpdateProfileSchemaProps) => {
    const { email, name, username } = values

    try {
      const { token } = await updateOwnUser({ avatar: uploadedAvatar, email, name, username })
      setCookie(AUTH_COOKIE_NAME, token, { maxAge: SIGNIN_COOKIE_MAX_AGE })

      toast.success(`Perfil atualizado`)

      await wait()
      window.location.reload()
    } catch (error) {
      const _error = error as Error
      switch (_error.message) {
        case 'Not allowed':
          toast.error('Você não possui permissão para realizar esta ação')
          break
        case 'Resource not found':
          toast.error('Algum valor de referência ao atualizar o perfil não foi encontrado')
          break
        case 'Resource already exists':
          toast.error('Nome de usuário e/ou e-mail já em uso')
          break
        default:
          toast.error('Erro ao atualizar o perfil', {
            action: {
              label: 'Tentar novamente',
              onClick: () => onSubmit(values),
            },
          })
      }
    }
  }

  const isAnyFieldFilled = Object.values(form.watch()).some((value) => value?.trim() !== '') || !!uploadedAvatar

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isAnyFieldFilled,
  }
}
