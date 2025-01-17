'use client'

import { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { cn } from '@/lib/utils'

import { logoutActions } from './actions'

type LogoutButtonProps = ComponentProps<'button'>

export const LogoutButton = ({ className, ...props }: LogoutButtonProps) => {
  return (
    <Button onClick={logoutActions} className={cn('flex h-8 w-full items-center gap-2', className)} {...props}>
      <Icon name="LogOut" />
      Sair
    </Button>
  )
}
