'use server'

import { revalidateTag } from 'next/cache'

import { ActionResponse } from '@/@types/actions'
import { signIn } from '@/http/orval-generation/routes/user-controller/user-controller'

type SignInActionsProps = {
  email: string
  password: string
}

export const SignInActions = async ({ email, password }: SignInActionsProps): Promise<ActionResponse<string>> => {
  try {
    const { token } = await signIn({
      email,
      password,
    })
    revalidateTag('me')

    return { success: true, data: token }
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null }
  }
}
