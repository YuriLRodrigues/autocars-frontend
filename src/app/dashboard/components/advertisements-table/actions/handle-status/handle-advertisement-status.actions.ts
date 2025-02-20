'use server'
import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { SoldStatus } from '@/@types/advertisement'
import { updateAdvertisement } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'

type ChangeAdvertisementStatusActionsProps = {
  advertisementId: string
  soldStatus: SoldStatus
  currentPathname: string
}

export const changeAdvertisementStatusActions = async ({
  advertisementId,
  soldStatus,
  currentPathname,
}: ChangeAdvertisementStatusActionsProps): Promise<ActionResponse<string>> => {
  try {
    await updateAdvertisement(advertisementId, { soldStatus })

    if (currentPathname.includes('manager')) {
      revalidateTag('findAllManagerAdvertisements')
    }

    revalidateTag('findAllOwnAdvertisements')
    revalidateTag('findAllAdvertisements')

    return { data: 'Status alterado com  sucesso', success: true }
  } catch (error) {
    const _error = error as Error

    return { data: null, error: _error.message, success: false }
  }
}
