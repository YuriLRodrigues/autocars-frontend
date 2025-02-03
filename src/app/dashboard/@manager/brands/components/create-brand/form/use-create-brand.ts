import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createBrandActions } from './create-brand.actions'
import { CreateBrandSchemaProps, createBrandSchema } from './schema'

type useCreateBrandFormProps = {
  uploadedImagesIds: string[]
}

export const useCreateBrandForm = ({ uploadedImagesIds }: useCreateBrandFormProps) => {
  const form = useForm<CreateBrandSchemaProps>({
    resolver: zodResolver(createBrandSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      logoId: uploadedImagesIds[0] || '',
      name: '',
    },
  })

  const queryClient = useQueryClient()

  const onSubmit = async (values: CreateBrandSchemaProps) => {
    const result = await createBrandActions({ values })
    if (!result.error) {
      toast.success(`Marca criada com sucesso`)
      queryClient.invalidateQueries({ queryKey: ['findAllBrands'] })
    } else {
      switch (result.error) {
        case 'Not allowed':
          toast.error('Você não possui permissão para realizar esta ação')
          break
        case 'Resource already exists':
          toast.error('Esta marca já existe')
          break
        case 'Resource not found':
          toast.error('Algum valor de referência para a criação não foi encontrado')
          break
        default:
          toast.error('Erro ao criar marca', {
            action: {
              label: 'Tentar novamente',
              onClick: () => onSubmit(values),
            },
          })
      }
    }
  }

  const isAllFieldsFilled = Object.values(form.watch()).every((value) => value?.trim() !== '')

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isAllFieldsFilled,
  }
}
