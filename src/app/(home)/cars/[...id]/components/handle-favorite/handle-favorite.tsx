'use client'
import { Icon } from '@/components/ui/icon'

import { useFindAdIsFavorited } from '@/http/orval-generation/routes/like-controller/like-controller'
import { cn } from '@/lib/utils'
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
    <button
      type="button"
      onClick={handleFavorite}
      className={cn(
        'inline-flex h-auto w-auto cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-red-200/80',
        advertisementIsFavorite ? 'bg-red-200/80' : 'bg-gray-200/80',
      )}
    >
      <Icon
        name="Heart"
        className={cn(
          'h-8 w-8 p-1.5 group-hover:text-red-500',
          advertisementIsFavorite ? 'text-red-500' : 'text-gray-500',
        )}
        fill={advertisementIsFavorite ? 'currentColor' : 'none'}
      />
    </button>
  )
}
