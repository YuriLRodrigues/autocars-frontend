'use client'

import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { toast } from 'sonner'

import { deleteAdvertisementActions } from './delete-advertisement.actions'

type DeleteAdvertisementProps = {
  advertisementId: string
}

export const DeleteAdvertisement = ({ advertisementId }: DeleteAdvertisementProps) => {
  const currentPathname = usePathname()
  const handleDeleteAdvertisement = async () => {
    const response = await deleteAdvertisementActions({ advertisementId, currentPathname })

    if (response.success) {
      toast.success('Anúncio deletado com sucesso')
      return
    } else {
      switch (response.error) {
        case 'Resource not found':
          toast.error('Anúncio não encontrado')
          break
        case 'Not allowed':
          toast.error('Você não tem permissão para realizar esta ação')
          break
        default:
          toast.error('Erro ao deletar o anúncio', {
            action: {
              label: 'Tentar novamente',
              onClick: async () => {
                await deleteAdvertisementActions({ advertisementId, currentPathname })
              },
            },
          })
      }
    }
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
