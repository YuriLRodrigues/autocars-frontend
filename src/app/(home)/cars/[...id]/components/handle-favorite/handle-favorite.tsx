'use client'
import { useRouter } from 'next/navigation'

import { Icon } from '@/components/ui/icon'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { useFindAdIsFavorited } from '@/http/orval-generation/routes/favorite-controller/favorite-controller'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { handleFavoriteActions } from './handle-favorite.actions'

type HandleFavoriteButtonProps = {
  advertisementId: string
}

export const HandleFavoriteButton = ({ advertisementId }: HandleFavoriteButtonProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { isAuthenticated } = useUserPayloadStore((state) => state.actions)

  const { data } = useFindAdIsFavorited(advertisementId, {
    query: {
      queryKey: ['isFavorited', advertisementId],
      staleTime: Number.POSITIVE_INFINITY,
      enabled: isAuthenticated(),
    },
  })

  const advertisementIsFavorite = String(data) === 'true'

  const handleFavorite = async () => {
    if (!isAuthenticated()) {
      toast.error('Você precisa estar logado para favoritar um anúncio', {
        action: {
          label: 'Fazer login',
          onClick: () => router.push('/auth/sign-in'),
        },
      })
      return
    }

    const result = await handleFavoriteActions({ advertisementId })

    if (!result.error) {
      await queryClient.invalidateQueries({ queryKey: ['isFavorited', advertisementId] })
      toast.success(`Favorito ${advertisementIsFavorite ? 'removido' : 'adicionado'} com sucesso!`)
    } else {
      switch (result.error) {
        case 'Resource not found':
          toast.error('Anúncio não encontrado')
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
