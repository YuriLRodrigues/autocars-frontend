'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { deleteAdvertisementActions } from './delete-advertisement.actions'

type DeleteAdvertisementProps = {
  advertisementId: string
}

export const DeleteAdvertisement = ({ advertisementId }: DeleteAdvertisementProps) => {
  const handleDeleteAdvertisement = () => {
    deleteAdvertisementActions({ advertisementId })
  }

  return (
    <Button
      onClick={handleDeleteAdvertisement}
      effect="ringHover"
      icon={<Icon name="Trash" />}
      iconPlacement="left"
      className="flex h-auto min-w-24 items-center gap-2 p-1"
    >
      Deletar
    </Button>
  )
}
