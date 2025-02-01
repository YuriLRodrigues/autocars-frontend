'use server'
import { revalidatePath } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { handleActiveUser } from '@/http/orval-generation/routes/user-controller/user-controller'

type HandleActiveUserActionsProps = {
  userId: string
}

export const handleActiveUserActions = async ({
  userId,
}: HandleActiveUserActionsProps): Promise<ActionResponse<string>> => {
  try {
    await handleActiveUser(userId)
    revalidatePath('findAllUsers')

    return { success: true, data: 'Status do usuário alterado' }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
