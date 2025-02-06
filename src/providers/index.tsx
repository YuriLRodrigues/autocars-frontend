'use client'
import { ReactNode, useEffect } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { TokenPayload } from '@/auth'
import { useUserPayloadStore } from '@/hooks/use-user-details'
import { AUTH_SESSION_NAME, DEFAULT_TOKEN_PAYLOAD } from '@/utils/constants'
import { useLocalStorage } from 'usehooks-ts'

import { TanStackProvider } from './query-client.provider'
import { ThemeProvider } from './theme.provider'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [tokenPayload] = useLocalStorage<TokenPayload>(AUTH_SESSION_NAME, DEFAULT_TOKEN_PAYLOAD)

  const { addUserPayload } = useUserPayloadStore((state) => state.actions)

  useEffect(() => {
    addUserPayload(tokenPayload)
  }, [addUserPayload, tokenPayload])

  return (
    <TanStackProvider>
      <ThemeProvider>
        {children}
        <Toaster richColors closeButton position="top-right" />
      </ThemeProvider>
    </TanStackProvider>
  )
}
