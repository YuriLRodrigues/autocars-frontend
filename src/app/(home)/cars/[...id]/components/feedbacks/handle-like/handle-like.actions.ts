'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { handleFeedbackLike } from '@/http/orval-generation/routes/like-controller/like-controller'

type HandleLikeActionsProps = {
  feedbackId: string
  advertisementId: string
}

export const handleLikeActions = async ({
  feedbackId,
  advertisementId,
}: HandleLikeActionsProps): Promise<ActionResponse<string>> => {
  try {
    const { message } = await handleFeedbackLike(feedbackId)
    revalidateTag(`${advertisementId}-feedbacks`)

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
