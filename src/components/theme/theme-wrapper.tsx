'use client'

import { cn } from '@/lib/utils'

import { useConfig } from './use-config'

interface ThemeWrapperProps extends React.ComponentProps<'div'> {
  defaultTheme?: string
}

export function ThemeWrapper({ defaultTheme = 'orange', children, className }: ThemeWrapperProps) {
  const [config] = useConfig()

  const theme = config || defaultTheme

  return <div className={cn(`theme-${theme.theme}`, 'w-full', className)}>{children}</div>
}
