'use server'

import { redirect } from 'next/navigation'

import { logout } from '@/auth'

export const logoutActions = async () => {
  await logout()
  redirect('/')
}
