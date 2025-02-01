import { deleteUser } from '@/http/orval-generation/routes/user-controller/user-controller'
import { wait } from '@/utils/wait'
import { toast } from 'sonner'

type DeleteUserActionsProps = {
  userId: string
}

export const deleteUserActions = async ({ userId }: DeleteUserActionsProps) => {
  try {
    await deleteUser(userId)
    toast.success('Usuário deletado')
    await wait()
    window.location.reload()
  } catch (error) {
    const _error = error as Error

    switch (_error.message) {
      case 'Resource not found':
        toast.error('Usuário não encontrado')
        break
      case 'Not allowed':
        toast.error('Você não tem permissão para realizar esta ação')
        break
      default:
        toast.error('Erro ao deletar o usuário', {
          action: {
            label: 'Tentar novamente',
            onClick: async () => {
              await deleteUserActions({ userId })
            },
          },
        })
    }
  }
}
