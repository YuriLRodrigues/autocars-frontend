'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { deleteAdvertisement } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type DeleteAdvertisementActionsProps = {
  advertisementId: string
  currentPathname: string
}

export const deleteAdvertisementActions = async ({
  advertisementId,
  currentPathname,
}: DeleteAdvertisementActionsProps): Promise<ActionResponse<string>> => {
  try {
    await deleteAdvertisement(advertisementId)

    if (currentPathname.includes('manager')) {
      revalidateTag('findAllManagerAdvertisements')
    }

    revalidateTag('findAllOwnAdvertisements')
    revalidateTag('findAllAdvertisements')

    return { data: 'Anúncio deletado com sucesso', success: true }
  } catch (error) {
    const _error = error as Error
    return { data: null, success: false, error: _error.message }
  }
}
