'use client'

import { UserRoles } from '@/@types/user'
import { TokenPayload } from '@/auth'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { deleteCookie, getCookie } from 'cookies-next/client'
import { decode } from 'jsonwebtoken'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const defaultUserPayload: TokenPayload = {
  email: '',
  name: '',
  sub: '',
  avatar: '',
  roles: [] as UserRoles[],
  username: '',
  exp: 0,
}

type UserPayload = typeof defaultUserPayload

type ActionsProps = {
  addUserPayload: (userPayload?: Partial<TokenPayload>) => void
  updateUserAvatar: (avatarUrl: string) => void
  deleteUserPayload: VoidFunction
  getUserPayload: () => TokenPayload
  isAuthenticated: () => boolean
}

const decodeToken = (): TokenPayload | null => {
  const token = getCookie(AUTH_COOKIE_NAME)
  if (!token) return null

  return decode(token) as TokenPayload
}

type UserPayloadStore = {
  user: UserPayload
  actions: ActionsProps
}

export const useUserPayloadStore = create<UserPayloadStore>()(
  persist(
    (set, get) => ({
      user: defaultUserPayload,

      actions: {
        addUserPayload: (userPayload?: Partial<TokenPayload>) => {
          if (userPayload) {
            set((state) => ({
              user: { ...state.user, ...userPayload },
            }))
            return
          }

          const payloadDecoded = decodeToken()
          if (!payloadDecoded) return

          set(() => ({
            user: {
              email: payloadDecoded.email ?? '',
              name: payloadDecoded.name ?? '',
              sub: payloadDecoded.sub ?? '',
              avatar: payloadDecoded.avatar ?? '',
              roles: payloadDecoded.roles ?? [],
              username: payloadDecoded.username ?? '',
              exp: payloadDecoded.exp ?? 0,
            },
          }))
        },

        isAuthenticated: () => {
          const { email, name, sub, roles, username } = get().user

          if (!(email && name && sub && roles.length > 0 && username)) {
            return false
          }

          const payloadDecoded = decodeToken()

          if (!payloadDecoded || payloadDecoded.exp * 1000 < Date.now()) {
            get().actions.deleteUserPayload()
            return false
          }

          return true
        },

        getUserPayload: () => get().user,

        updateUserAvatar: (avatarUrl: string) => {
          set((state) => ({
            user: { ...state.user, avatar: avatarUrl },
          }))
        },

        deleteUserPayload: () => {
          deleteCookie(AUTH_COOKIE_NAME)
          set({ user: defaultUserPayload })
        },
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }) as Partial<UserPayloadStore>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      merge: (persistedState: any, currentState) => ({
        ...currentState,
        user: persistedState?.user ?? defaultUserPayload,
      }),
    },
  ),
)
