'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { handleAdvertisementLike } from '@/http/orval-generation/routes/like-controller/like-controller'

type HandleLikeActionsProps = {
  advertisementId: string
}

export const handleLikeActions = async ({
  advertisementId,
}: HandleLikeActionsProps): Promise<ActionResponse<string>> => {
  try {
    const { message } = await handleAdvertisementLike(advertisementId)
    revalidateTag(`findAllLikes-${advertisementId}`)

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
