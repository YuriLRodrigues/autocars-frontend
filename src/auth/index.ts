'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { UserRoles } from '@/@types/user'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { decode } from 'jsonwebtoken'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get(AUTH_COOKIE_NAME)?.value
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

export type TokenPayload = {
  sub: string
  roles: UserRoles[]
  avatar?: string
  name: string
  username: string
  email: string
  exp: number
}

export const authToken = async (): Promise<TokenPayload | null> => {
  const store = await cookies()
  const accessToken = store.get(AUTH_COOKIE_NAME)?.value

  if (!accessToken) return null
  const payloadDecored = decode(accessToken) as TokenPayload

  if (!payloadDecored) return redirect('/')

  return {
    sub: payloadDecored?.sub,
    roles: payloadDecored?.roles || [],
    avatar: payloadDecored?.avatar,
    name: payloadDecored?.name,
    username: payloadDecored?.username,
    email: payloadDecored?.email,
    exp: payloadDecored?.exp,
  }
}
