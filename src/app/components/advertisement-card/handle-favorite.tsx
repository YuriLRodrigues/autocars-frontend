'use client'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { toast } from 'sonner'

import { handleFavoriteActions } from './handle-favorite.actions'

type HandleFavoriteButtonProps = {
  advertisementId: string
}

export const HandleFavoriteButton = ({ advertisementId }: HandleFavoriteButtonProps) => {
  const handleFavorite = async () => {
    const result = await handleFavoriteActions({ advertisementId })

    if (!result.error) {
      toast.success('Favorito atualizado com sucesso!')
    } else {
      switch (result.error) {
        case 'Resource not found':
          toast.error('Marca não encontrada')
          break
        default:
          toast.error('Erro ao favoritar/desfavoritar', {
            action: {
              label: 'Tentar novamente',
              onClick: async () => {
                await handleFavorite()
              },
            },
          })
      }
    }
  }

  return (
    <Button
      onClick={handleFavorite}
      effect="ringHover"
      className="absolute left-3 top-3 flex h-auto items-center gap-2 p-1"
    >
      <Icon name="StarOff" className="size-4 flex-none" />
    </Button>
  )
}
