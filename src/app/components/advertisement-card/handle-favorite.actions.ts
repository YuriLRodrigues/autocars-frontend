'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { handleFavorite } from '@/http/orval-generation/routes/favorite-controller/favorite-controller'

type HandleFavoriteActionsProps = {
  advertisementId: string
}

export const handleFavoriteActions = async ({
  advertisementId,
}: HandleFavoriteActionsProps): Promise<ActionResponse<string>> => {
  try {
    const message = await handleFavorite(advertisementId)
    revalidateTag('findAllFavoritesByUserId')

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
