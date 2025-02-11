'use server'
import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { createAdvertisement } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

import { CreateAdvertisementSchemaProps } from './schema'

type CreateAdvertisementActions = CreateAdvertisementSchemaProps & { currentPathname: string }

export const createAdvertisementActions = async (
  values: CreateAdvertisementActions,
): Promise<ActionResponse<string>> => {
  try {
    const {
      brandId,
      capacity,
      color,
      description,
      doors,
      fuel,
      gearBox,
      imagesIds,
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

    const { currentPathname } = values

    await createAdvertisement({
      brandId,
      capacity,
      color,
      description,
      doors,
      fuel,
      gearBox,
      imagesIds,
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

    if (currentPathname.includes('manager')) {
      revalidateTag('findAllManagerAdvertisements')
    }

    revalidateTag('findAllOwnAdvertisements')
    revalidateTag('findAllAdvertisements')

    return { success: true, data: 'Anúncio criado com sucesso' }
  } catch (error) {
    const _error = error as Error
    return { success: false, error: _error.message, data: null }
  }
}
