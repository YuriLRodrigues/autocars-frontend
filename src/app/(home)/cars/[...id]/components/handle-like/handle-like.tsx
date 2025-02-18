'use client'
import { useRouter } from 'next/navigation'

import { Icon } from '@/components/ui/icon'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { useFindAdIsLiked } from '@/http/orval-generation/routes/like-controller/like-controller'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { handleLikeActions } from './handle-like.actions'

type HandleLikeButtonProps = {
  advertisementId: string
}

export const HandleLikeButton = ({ advertisementId }: HandleLikeButtonProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { isAuthenticated } = useUserPayloadStore((state) => state.actions)

  const { data } = useFindAdIsLiked(advertisementId, {
    query: {
      queryKey: ['isLiked', advertisementId],
      staleTime: Number.POSITIVE_INFINITY,
      enabled: isAuthenticated(),
    },
  })

  const advertisementIsLike = String(data) === 'true'

  const handleLike = async () => {
    if (!isAuthenticated()) {
      toast.error('Você precisa estar logado para curtir um anúncio', {
        action: {
          label: 'Fazer login',
          onClick: () => router.push('/auth/sign-in'),
        },
      })
      return
    }

    const result = await handleLikeActions({ advertisementId })

    if (!result.error) {
      await queryClient.invalidateQueries({ queryKey: ['isLiked', advertisementId] })
      toast.success(`Curtida ${advertisementIsLike ? 'removida' : 'adicionada'} com sucesso!`)
    } else {
      switch (result.error) {
        case 'Resource not found':
          toast.error('Anúncio não encontrado')
          break
        default:
          toast.error(`Erro ao ${advertisementIsLike ? 'remover curtida' : 'curtir'} o anúncio`, {
            action: {
              label: 'Tentar novamente',
              onClick: async () => {
                await handleLike()
              },
            },
          })
      }
    }
  }
  return (
    <button
      type="button"
      onClick={handleLike}
      className={cn(
        'inline-flex h-auto w-auto cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-blue-200/80',
        advertisementIsLike ? 'bg-blue-200/80' : 'bg-gray-200/80',
      )}
    >
      <Icon
        name="ThumbsUp"
        className={cn(
          'h-8 w-8 p-1.5 group-hover:text-blue-500',
          advertisementIsLike ? 'text-blue-500' : 'text-gray-500',
        )}
        fill={advertisementIsLike ? 'currentColor' : 'none'}
      />
    </button>
  )
}
