'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { deleteUserActions } from './delete-user.actions'

type DeleteUserProps = {
  userId: string
}

export const DeleteUser = ({ userId }: DeleteUserProps) => {
  const handleDeleteUser = () => {
    deleteUserActions({ userId })
  }

  return (
    <Button
      onClick={handleDeleteUser}
      effect="ringHover"
      icon={<Icon name="Trash" />}
      iconPlacement="left"
      className="flex h-auto min-w-24 items-center gap-2 p-1"
    >
      Deletar
    </Button>
  )
}
