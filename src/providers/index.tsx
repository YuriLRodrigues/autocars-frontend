'use client'

import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { TanStackProvider } from './query-client.provider'
import { ThemeProvider } from './theme.provider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanStackProvider>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster richColors closeButton position="top-right" />
    </TanStackProvider>
  )
}
