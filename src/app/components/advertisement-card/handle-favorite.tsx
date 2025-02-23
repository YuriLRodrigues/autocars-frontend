'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { useFindAdIsFavorited } from '@/http/orval-generation/routes/favorite-controller/favorite-controller'
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
    query: { queryKey: ['isFavorited', advertisementId], staleTime: Infinity, enabled: isAuthenticated() },
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
    <Button
      onClick={handleFavorite}
      effect="ringHover"
      className="absolute left-3 top-3 z-50 flex h-auto items-center gap-2 p-1"
    >
      <Icon name={advertisementIsFavorite ? 'StarOff' : 'Star'} className="size-4 flex-none" />
    </Button>
  )
}
