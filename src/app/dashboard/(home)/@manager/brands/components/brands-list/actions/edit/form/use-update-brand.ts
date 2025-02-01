import { useForm } from 'react-hook-form'

import { updateBrand } from '@/http/orval-generation/routes/brand-controller/brand-controller'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { UpdateBrandSchemaProps, updateBrandSchema } from './schema'

type useUpdateBrandFormProps = {
  uploadedImagesIds: string[]
  logoId?: string
  name?: string
  id: string
}

export const useUpdateBrandForm = ({ uploadedImagesIds, logoId, id, name }: useUpdateBrandFormProps) => {
  const form = useForm<UpdateBrandSchemaProps>({
    resolver: zodResolver(updateBrandSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      logoId: uploadedImagesIds[0] || logoId || '',
      name: name || '',
    },
  })

  const onSubmit = async (values: UpdateBrandSchemaProps) => {
    const { logoId, name } = values

    try {
      await updateBrand(id, { logoId, name })

      toast.success(`Marca atualizada com sucesso`)
      await wait()
      window.location.reload()
    } catch (error) {
      const _error = error as Error
      switch (_error.message) {
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

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  }
}
