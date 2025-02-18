/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useMe } from '@/http/orval-generation/routes/user-controller/user-controller'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { UpdateProfileSchemaProps, updateProfileSchema } from './schema'
import { updateProfileActions } from './update-profile.actions'

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

    const response = await updateProfileActions({
      email,
      avatar: uploadedAvatar,
      name,
      username,
    })

    if (!response.error) {
      toast.success(`Perfil atualizado com sucesso`)
    } else {
      switch (response.error) {
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
