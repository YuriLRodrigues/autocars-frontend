import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { updateAdvertisement } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { Content } from '@tiptap/react'
import { toast } from 'sonner'

import { EditAdvertisementSchemaProps, editAdvertisementSchema } from './schema'

type useEditAdvertisementsFormProps = {
  uploadedImagesIds: string[]
  defaultValues?: Partial<EditAdvertisementSchemaProps>
  adId: string
}

export const useEditAdvertisementsForm = ({
  uploadedImagesIds,
  adId,
  defaultValues,
}: useEditAdvertisementsFormProps) => {
  const [details, setDetails] = useState<Content>('')
  const [thumbnailImageId, setThumbnailImageId] = useState<string | undefined>(undefined)
  const [removedImagesIds, setRemovedImagesIds] = useState<string[]>([])

  const form = useForm<EditAdvertisementSchemaProps>({
    resolver: zodResolver(editAdvertisementSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      brandId: defaultValues?.brandId || undefined,
      doors: defaultValues?.doors || undefined,
      model: defaultValues?.model || undefined,
      color: defaultValues?.color || undefined,
      fuel: defaultValues?.fuel || undefined,
      capacity: defaultValues?.capacity || undefined,
      gearBox: defaultValues?.gearBox || undefined,
      km: defaultValues?.km || 0,
      localization: defaultValues?.localization || '',
      price: defaultValues?.price || 0,
      title: defaultValues?.title || '',
      year: defaultValues?.year || 0,
      description: defaultValues?.description || '',
      details: defaultValues?.details || [details?.toString()],
      newImagesIds: defaultValues?.newImagesIds || uploadedImagesIds || [],
      phone: defaultValues?.brandId || undefined,
      step: 'SEND-IMAGES',
      thumbnailImageId: defaultValues?.brandId || thumbnailImageId,
    },
  })

  const stepFields: Record<string, (keyof EditAdvertisementSchemaProps)[]> = {
    'SEND-IMAGES': ['newImagesIds', 'thumbnailImageId'],
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
    'AD-DETAILS': ['details'],
  }

  const [progressByStep, setProgressByStep] = useState<Record<string, number>>({})

  const calculateProgress = (fields: (keyof EditAdvertisementSchemaProps)[]) => {
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

  const onSubmit = async (values: EditAdvertisementSchemaProps) => {
    const {
      brandId,
      capacity,
      color,
      description,
      doors,
      fuel,
      gearBox,
      newImagesIds,
      km,
      localization,
      model,
      phone,
      price,
      thumbnailImageId,
      title,
      year,
      details,
    } = values

    try {
      await updateAdvertisement(adId, {
        brandId,
        capacity,
        color,
        description,
        doors,
        fuel,
        gearBox,
        newImagesIds: newImagesIds || [],
        removedImagesIds,
        km,
        localization,
        model,
        phone,
        price,
        thumbnailImageId,
        title,
        year,
        details: details ?? [],
      })

      toast.success(`Anúncio atualizado com sucesso`)
      await wait()
      window.location.reload()
    } catch (error) {
      const _error = error as Error
      switch (_error.message) {
        case 'Not allowed':
          toast.error('Você não possui permissão para realizar esta ação')
          break
        case 'Resource not found':
          toast.error('Algum valor de referência para a criação não foi encontrado')
          break
        default:
          toast.error('Erro ao atualizar o anúncio', {
            action: {
              label: 'Tentar novamente',
              onClick: () => onSubmit(values),
            },
          })
      }
    }
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
    setRemovedImagesIds,
  }
}
