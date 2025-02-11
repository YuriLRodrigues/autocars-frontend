'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { useFindAdIsFavorited } from '@/http/orval-generation/routes/like-controller/like-controller'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { handleFavoriteActions } from './handle-favorite.actions'

type HandleFavoriteButtonProps = {
  advertisementId: string
}

export const HandleFavoriteButton = ({ advertisementId }: HandleFavoriteButtonProps) => {
  const queryClient = useQueryClient()

  const { data } = useFindAdIsFavorited(advertisementId, {
    query: { queryKey: ['isFavorited', advertisementId], staleTime: Infinity },
  })

  const advertisementIsFavorite = String(data) === 'true'

  const handleFavorite = async () => {
    const result = await handleFavoriteActions({ advertisementId })

    if (!result.error) {
      await queryClient.invalidateQueries({ queryKey: ['isFavorited', advertisementId] })
      toast.success(`Favorito ${advertisementIsFavorite ? 'removido' : 'adicionado'} com sucesso!`)
    } else {
      switch (result.error) {
        case 'Resource not found':
          toast.error('Favorito não encontrado')
          break
        default:
          toast.error(`Erro ao ${advertisementIsFavorite ? 'desfavoritar' : 'favoritar'} o anúncio`, {
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
      className="absolute left-3 top-3 z-50 flex h-auto items-center gap-2 p-1"
    >
      <Icon name={advertisementIsFavorite ? 'StarOff' : 'Star'} className="size-4 flex-none" />
    </Button>
  )
}
