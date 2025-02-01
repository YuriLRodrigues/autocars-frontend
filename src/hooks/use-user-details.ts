'use client'

import { TokenPayload } from '@/auth'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { deleteCookie, getCookie } from 'cookies-next/client'
import { decode } from 'jsonwebtoken'
import { create } from 'zustand'

type ActionsProps = {
  addUserPayload: VoidFunction
  updateUserAvatar: (avatarUrl: string) => void
  deleteUserPayload: VoidFunction
  getUserPayload: () => TokenPayload
}

type UserPayloadProps = {
  user: TokenPayload
  actions: ActionsProps
}

export const useUserPayloadStore = create<UserPayloadProps>((set, get) => ({
  user: {
    email: '',
    name: '',
    sub: '',
    avatar: '',
    roles: [],
    username: '',
  },

  actions: {
    addUserPayload: () => {
      const token = getCookie(AUTH_COOKIE_NAME)

      if (!token) return null

      const payloadDecored = decode(token) as TokenPayload

      set(() => ({
        user: {
          email: payloadDecored?.email ?? '',
          name: payloadDecored?.name ?? '',
          sub: payloadDecored?.sub ?? '',
          avatar: payloadDecored?.avatar ?? '',
          roles: payloadDecored?.roles ?? [],
          username: payloadDecored?.username ?? '',
        },
      }))
    },

    getUserPayload: () => get().user,

    updateUserAvatar: (avatarUrl: string) => {
      set((state) => ({
        user: { ...state.user, avatar: avatarUrl },
      }))
    },

    deleteUserPayload: () => {
      deleteCookie(AUTH_COOKIE_NAME)
      set({ user: undefined })
    },
  },
}))
