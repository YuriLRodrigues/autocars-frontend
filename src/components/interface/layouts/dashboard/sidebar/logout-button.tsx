'use client'

import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { cn } from '@/lib/utils'

import { logoutActions } from './actions'

type LogoutButtonProps = ComponentProps<'button'>

export const LogoutButton = ({ className, ...props }: LogoutButtonProps) => {
  const router = useRouter()
  const { deleteUserPayload } = useUserPayloadStore((state) => state.actions)

  const handleLogout = () => {
    logoutActions()
    deleteUserPayload()
    router.push('/')
  }

  return (
    <Button onClick={handleLogout} className={cn('flex h-8 w-full items-center gap-2', className)} {...props}>
      <Icon name="LogOut" />
      Sair
    </Button>
  )
}
