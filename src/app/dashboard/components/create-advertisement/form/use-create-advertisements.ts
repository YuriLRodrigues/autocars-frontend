import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToggle } from '@/hooks/use-toggle'
import { zodResolver } from '@hookform/resolvers/zod'
import { Content } from '@tiptap/react'
import { toast } from 'sonner'

import { createAdvertisementActions } from './create-advertisement.actions'
import { CreateAdvertisementSchemaProps, createAdvertisementSchema } from './schema'

type useCreateAdvertisementsFormProps = {
  uploadedImagesIds: string[]
}

export const useCreateAdvertisementsForm = ({ uploadedImagesIds }: useCreateAdvertisementsFormProps) => {
  const currentPathname = usePathname()
  const { toggle } = useToggle()
  const [details, setDetails] = useState<Content>('')
  const [thumbnailImageId, setThumbnailImageId] = useState<string | undefined>(undefined)

  const form = useForm<CreateAdvertisementSchemaProps>({
    resolver: zodResolver(createAdvertisementSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      brandId: undefined,
      doors: undefined,
      model: undefined,
      color: undefined,
      fuel: undefined,
      capacity: undefined,
      gearBox: undefined,
      km: undefined,
      localization: '',
      price: 0,
      title: '',
      year: 0,
      description: '',
      details: [details?.toString()],
      imagesIds: uploadedImagesIds,
      phone: undefined,
      step: 'SEND-IMAGES',
      thumbnailImageId: thumbnailImageId,
    },
  })

  const stepFields: Record<string, (keyof CreateAdvertisementSchemaProps)[]> = {
    'SEND-IMAGES': ['imagesIds', 'thumbnailImageId'],
    'AD-DATA': [
      'title',
      'description',
      'brandId',
      'model',
      'gearBox',
      'fuel',
      'color',
      'doors',
      'capacity',
      'price',
      'year',
      'km',
      'phone',
      'localization',
    ],
    // 'AD-DETAILS': ['details'],
  }

  const [progressByStep, setProgressByStep] = useState<Record<string, number>>({})

  const calculateProgress = (fields: (keyof CreateAdvertisementSchemaProps)[]) => {
    const total = fields.length
    const filled = fields.filter((field) => {
      const value = form.getValues(field)
      return value && value.toString().trim().length > 0
    }).length
    return (filled / total) * 100
  }

  useEffect(() => {
    const subscription = form.watch(() => {
      const newProgressByStep: Record<string, number> = {}
      Object.keys(stepFields).forEach((step) => {
        newProgressByStep[step] = calculateProgress(stepFields[step])
      })
      setProgressByStep(newProgressByStep)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, form.watch()])

  const onSubmit = async (values: CreateAdvertisementSchemaProps) => {
    const response = await createAdvertisementActions({ currentPathname, ...values })

    if (!response.error) {
      toast.success(`Anúncio criado com sucesso`)
    } else {
      switch (response.error) {
        case 'Not allowed':
          toast.error('Você não possui permissão para realizar esta ação')
          break
        case 'Resource not found':
          toast.error('Algum valor de referência para a criação do anúncio não foi encontrado')
          break
        default:
          toast.error('Erro ao criar anúncio', {
            action: {
              label: 'Tentar novamente',
              onClick: () => onSubmit(values),
            },
          })
      }
    }

    toggle(false)
  }

  const validateStepFields = (step: string) => {
    const fields = stepFields[step]
    if (!fields) return false

    const isValid = fields.every((field) => {
      const fieldValue = form.watch(field)
      const fieldErrors = form.formState.errors[field]

      return fieldValue && !fieldErrors
    })

    return isValid
  }

  const isImagesStep = form.watch('step') === 'SEND-IMAGES'
  const isAdDataStep = form.watch('step') === 'AD-DATA'
  const isAdDetailsStep = form.watch('step') === 'AD-DETAILS'

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    progressByStep,
    isSubmitting: form.formState.isSubmitting,
    details,
    setDetails,
    thumbnailImageId,
    setThumbnailImageId,
    isImagesStep,
    isAdDataStep,
    isAdDetailsStep,
    validateStepFields,
  }
}
