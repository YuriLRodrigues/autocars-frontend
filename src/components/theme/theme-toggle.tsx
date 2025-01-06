'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import { useConfig } from '@/components/theme/use-config'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'
import { mappingThemeMode } from '@/utils/mappings'
import { CheckIcon, Moon, Sun } from 'lucide-react'

import { Skeleton } from '../ui/skeleton'
import { themes } from './themes'

export const ThemeToggle = () => {
  return (
    <React.Fragment>
      <ToggleThemeDropdownMenu>
        <Button type="button" variant="default" size="icon" className="fixed bottom-3 left-3">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </ToggleThemeDropdownMenu>
      <ToggleThemeDrawer>
        <Button type="button" variant="default" size="icon" className="fixed bottom-3 right-3">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </ToggleThemeDrawer>
    </React.Fragment>
  )
}

type ToggleProps = {
  children: React.ReactNode
}

const ToggleThemeDropdownMenu = ({ children }: ToggleProps) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hidden md:flex">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Colors mounted={mounted} />
        <Mode mounted={mounted} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ToggleThemeDrawer = ({ children }: ToggleProps) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Drawer>
      <DrawerTrigger className="md:hidden" asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="py-2">
        <Colors mounted={mounted} />
        <Mode mounted={mounted} />
      </DrawerContent>
    </Drawer>
  )
}

type Props = {
  mounted: boolean
}

const Colors = ({ mounted }: Props) => {
  const { resolvedTheme: mode } = useTheme()
  const [config, setConfig] = useConfig()

  return (
    <React.Fragment>
      <DropdownMenuLabel>Temas</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="grid grid-cols-3 gap-2 p-2">
        {themes.map((theme) => {
          const isActive = config.theme === theme.name

          return mounted ? (
            <Button
              type="button"
              variant={'outline'}
              size="sm"
              key={theme.name}
              onClick={() => {
                setConfig({
                  ...config,
                  theme: theme.name,
                })
              }}
              className={cn('justify-start', isActive && 'border-2 border-primary')}
              style={
                {
                  '--theme-primary': `hsl(${theme?.activeColor[mode === 'dark' ? 'dark' : 'light']})`,
                } as React.CSSProperties
              }
            >
              <span
                className={cn(
                  'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]',
                )}
              >
                {isActive && <CheckIcon className="h-4 w-4 text-white" />}
              </span>
              {theme.label}
            </Button>
          ) : (
            <Skeleton className="h-8 w-full" key={theme.name} />
          )
        })}
      </div>
      <DropdownMenuSeparator />
    </React.Fragment>
  )
}

const Mode = ({ mounted }: Props) => {
  const { theme, setTheme } = useTheme()

  const modes = ['light', 'dark', 'system']

  return (
    <React.Fragment>
      <DropdownMenuLabel>Modo</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="grid grid-cols-3 gap-2 p-2">
        {modes.map((mode) => {
          const isActive = mode === theme
          return mounted ? (
            <Button
              type="button"
              variant={'outline'}
              size="sm"
              key={mode}
              onClick={() => setTheme(mode)}
              className={cn('justify-start first-letter:uppercase', isActive && 'border-2 border-primary')}
            >
              <CheckIcon className={cn('mr-2 h-4 w-4 opacity-0', isActive && 'opacity-100')} />
              {mappingThemeMode[mode]}
            </Button>
          ) : (
            <Skeleton className="h-8 w-full" key={mode} />
          )
        })}
      </div>
    </React.Fragment>
  )
}
