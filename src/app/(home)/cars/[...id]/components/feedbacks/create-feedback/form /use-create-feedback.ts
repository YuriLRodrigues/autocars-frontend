import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { createFeedbackActions } from './create-feedback.actions'
import { CreateFeedbackSchemaProps, createFeedbackSchema } from './schema'

export const useCreateFeedbackForm = () => {
  const params = useParams()
  const advertisementId = params.id as string
  const [hoveredStar, setHoveredStar] = useState<number>(0)

  const form = useForm<CreateFeedbackSchemaProps>({
    resolver: zodResolver(createFeedbackSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      comment: '',
      stars: undefined,
      title: '',
    },
  })

  const onSubmit = async (values: CreateFeedbackSchemaProps) => {
    const { comment, stars, title } = values

    const response = await createFeedbackActions({
      comment,
      stars,
      title,
      advertisementId,
    })

    if (!response.error) {
      toast.success(`Comentário adicionado ao anúncio`)
    } else {
      switch (response.error) {
        case 'Resource not found':
          toast.error('Algum valor de referência ao adicionar um comentário não foi encontrado')
          break
        default:
          toast.error('Erro ao adicionar um comentário', {
            action: {
              label: 'Tentar novamente',
              onClick: () => onSubmit(values),
            },
          })
      }
    }
  }

  const isAnyFieldFilled = Object.values(form.watch()).some((value) => value?.toString()?.trim() !== '')

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isAnyFieldFilled,
    hoveredStar,
    setHoveredStar,
  }
}
