'use server'
import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { Capacity, Color, Doors, Fuel, GearBox, Model } from '@/@types/advertisement'
import { updateAdvertisement } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

import { EditAdvertisementSchemaProps } from './schema'

type EditAdvertisementActionsProps = {
  advertisementId: string
  values: Partial<EditAdvertisementSchemaProps>
  currentPathname: string
}

export const editAdvertisementActions = async ({
  advertisementId,
  values,
  currentPathname,
}: EditAdvertisementActionsProps): Promise<ActionResponse<string>> => {
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
    salePrice,
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
      km,
      localization,
      phone,
      price,
      salePrice,
      thumbnailImageId,
      title,
      year,
      details,
    })

    if (currentPathname.includes('manager')) {
      revalidateTag('findAllManagerAdvertisements')
    }

    revalidateTag('findAllOwnAdvertisements')
    revalidateTag('findAllAdvertisements')

    return { data: 'Anúncio atualizado', success: true }
  } catch (error) {
    const _error = error as Error
    return { error: _error.message, success: false, data: null }
  }
}
