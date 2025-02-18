'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { ActionResponse } from '@/@types/actions'
import { updateOwnUser } from '@/http/orval-generation/routes/user-controller/user-controller'
import { AUTH_COOKIE_NAME, SIGNIN_COOKIE_MAX_AGE } from '@/utils/constants'

type UpdateProfileActionsProps = {
  avatar?: string
  name?: string
  email?: string
  username?: string
}

export const updateProfileActions = async ({
  email,
  avatar,
  name,
  username,
}: UpdateProfileActionsProps): Promise<ActionResponse<string>> => {
  try {
    const { token } = await updateOwnUser({
      email,
      avatar,
      name,
      username,
    })

    const cookiesStore = await cookies()
    cookiesStore.set(AUTH_COOKIE_NAME, token, {
      maxAge: SIGNIN_COOKIE_MAX_AGE,
      path: '/',
    })

    revalidateTag('me')
    return { success: true, data: 'Perfil atualizado com sucesso' }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
