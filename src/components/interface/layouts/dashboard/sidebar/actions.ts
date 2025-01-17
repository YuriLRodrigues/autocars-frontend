'use server'

import { logout } from '@/auth'

export const logoutActions = async () => {
  await logout()
}
