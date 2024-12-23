'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, useState, useEffect } from 'react'

import { ThemeToggle } from '@/components/theme'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'
import { ThemeWrapper } from '@/components/theme/theme-wrapper'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeWrapper defaultTheme="orange">{children}</ThemeWrapper>
      <ThemeSwitcher />
      <ThemeToggle />
    </NextThemesProvider>
  )
}
