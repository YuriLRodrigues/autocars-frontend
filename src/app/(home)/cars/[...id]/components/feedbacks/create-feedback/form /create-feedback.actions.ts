'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { createFeedbackByAdId } from '@/http/orval-generation/routes/feedback-controller/feedback-controller'

type CreateFeedbackActionsProps = {
  stars: number
  comment: string
  title: string
  advertisementId: string
}

export const createFeedbackActions = async ({
  comment,
  stars,
  title,
  advertisementId,
}: CreateFeedbackActionsProps): Promise<ActionResponse<string>> => {
  try {
    const { message } = await createFeedbackByAdId(advertisementId, {
      comment,
      stars,
      title,
    })
    revalidateTag(`${advertisementId}-feedbacks`)

    return { success: true, data: message }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
