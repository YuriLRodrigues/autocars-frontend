'use client'

import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { useFindFeedbackIsLiked } from '@/http/orval-generation/routes/like-controller/like-controller'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import { handleLikeActions } from './handle-like.actions'

type HandleLikeButtonProps = {
  feedbackId: string
}

export const HandleLikeButton = ({ feedbackId }: HandleLikeButtonProps) => {
  const queryClient = useQueryClient()

  const params = useParams()
  const router = useRouter()

  const { isAuthenticated } = useUserPayloadStore((state) => state.actions)

  const advertisementId = params.id as string

  const { data } = useFindFeedbackIsLiked(feedbackId, {
    query: {
      queryKey: ['isLiked', feedbackId],
      staleTime: Number.POSITIVE_INFINITY,
      enabled: isAuthenticated(),
    },
  })

  const feedbackIsLiked = String(data) === 'true'

  const handleLike = async () => {
    if (!isAuthenticated()) {
      toast.error('Você precisa estar logado para curtir um comentário', {
        action: {
          label: 'Fazer login',
          onClick: () => router.push('/auth/sign-in'),
        },
      })
      return
    }

    const result = await handleLikeActions({ feedbackId, advertisementId })

    if (!result.error) {
      await queryClient.invalidateQueries({ queryKey: ['isLiked', feedbackId] })
      toast.success(`Curtida ${feedbackIsLiked ? 'removida' : 'adicionada'} com sucesso!`)
    } else {
      switch (result.error) {
        case 'Resource not found':
          toast.error('Comentário não encontrado')
          break
        default:
          toast.error(`Erro ao ${feedbackIsLiked ? 'remover curtida do comentário' : 'curtir o comentário'}`, {
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
    <Button
      type="button"
      onClick={handleLike}
      variant="ghost"
      size="sm"
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ease-in-out',
        isAuthenticated()
          ? feedbackIsLiked
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
      )}
    >
      <motion.span
        animate={{ rotate: feedbackIsLiked && isAuthenticated() ? [0, -20, 20, -20, 20, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon
          name="ThumbsUp"
          className={cn(
            'h-5 w-5 transition-colors duration-200',
            isAuthenticated()
              ? feedbackIsLiked
                ? 'text-blue-500'
                : 'text-gray-500 group-hover:text-blue-500'
              : 'text-gray-400',
          )}
          fill={feedbackIsLiked && isAuthenticated() ? 'currentColor' : 'none'}
          strokeWidth={2}
        />
      </motion.span>
      <span
        className={cn(
          'transition-colors duration-200',
          isAuthenticated()
            ? feedbackIsLiked
              ? 'text-blue-700'
              : 'text-gray-700 group-hover:text-blue-700'
            : 'text-gray-500',
        )}
      >
        Útil
      </span>
    </Button>
  )
}
