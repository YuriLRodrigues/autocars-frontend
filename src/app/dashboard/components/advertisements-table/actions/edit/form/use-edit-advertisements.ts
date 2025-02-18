import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Capacity, Color, Doors, Fuel, GearBox, Model } from '@/@types/advertisement'
import {
  updateAdvertisement,
  useFindAdById,
} from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { EditAdvertisementSchemaProps, editAdvertisementSchema } from './schema'

type useEditAdvertisementsFormProps = {
  uploadedFiles: Array<{ id: string; url: string }>
  advertisementId: string
}

export const useEditAdvertisementsForm = ({ uploadedFiles, advertisementId }: useEditAdvertisementsFormProps) => {
  const { data: advertisementDetails } = useFindAdById(advertisementId)

  const oldImages = advertisementDetails?.images || []

  const uploadedImagesIds = uploadedFiles.map((file) => file.id)

  const [thumbnailImageId, setThumbnailImageId] = useState<string | undefined>(undefined)
  const [removedImagesIds, setRemovedImagesIds] = useState<string[]>([])

  const allImagesByAdvertisement = [
    ...(oldImages || []),
    ...(uploadedFiles?.map((file) => ({ id: file.id, url: file.url })) || []),
  ].filter((img) => !removedImagesIds.includes(img.id))

  const form = useForm<EditAdvertisementSchemaProps>({
    resolver: zodResolver(editAdvertisementSchema),
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
      km: 0,
      localization: '',
      price: 0,
      title: '',
      year: 0,
      description: '',
      newImagesIds: uploadedImagesIds || [],
      phone: undefined,
      step: 'SEND-IMAGES',
      thumbnailImageId: undefined,
    },
  })

  useEffect(() => {
    if (advertisementDetails) {
      form.reset({
        brandId: advertisementDetails.brand?.id || undefined,
        doors: advertisementDetails.doors || undefined,
        model: advertisementDetails.model || undefined,
        color: advertisementDetails.color || undefined,
        fuel: advertisementDetails.fuel || undefined,
        capacity: advertisementDetails.capacity || undefined,
        gearBox: advertisementDetails.gearBox || undefined,
        km: advertisementDetails.km || 0,
        localization: advertisementDetails.localization || '',
        price: advertisementDetails.price || 0,
        title: advertisementDetails.title || '',
        year: advertisementDetails.year || 0,
        description: advertisementDetails.description || '',
        newImagesIds: uploadedImagesIds || [],
        phone: advertisementDetails.phone || undefined,
        step: 'SEND-IMAGES',
        thumbnailImageId:
          thumbnailImageId || advertisementDetails.images.find((img) => img.isThumbnail)?.id || undefined,
      })
      if (!thumbnailImageId) {
        setThumbnailImageId(advertisementDetails.images.find((img) => img.isThumbnail)?.id || undefined)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisementDetails, form.reset, thumbnailImageId])

  const stepFields: Record<string, (keyof EditAdvertisementSchemaProps)[]> = {
    'SEND-IMAGES': ['thumbnailImageId'],
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
      await updateAdvertisement(advertisementId, {
        brandId,
        capacity: capacity as Capacity,
        color: color as Color,
        description,
        doors: doors as Doors,
        fuel: fuel as Fuel,
        gearBox: gearBox as GearBox,
        model: model as Model,
        newImagesIds: newImagesIds || [],
        removedImagesIds,
        km,
        localization,
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

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    progressByStep,
    isSubmitting: form.formState.isSubmitting,
    thumbnailImageId,
    setThumbnailImageId,
    isImagesStep,
    isAdDataStep,
    validateStepFields,
    setRemovedImagesIds,
    allImagesByAdvertisement,
  }
}
