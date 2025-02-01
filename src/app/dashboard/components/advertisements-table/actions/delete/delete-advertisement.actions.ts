import { deleteAdvertisement } from '@/http/orval-generation/routes/advertisement-controller/advertisement-controller'
import { wait } from '@/utils/wait'
import { toast } from 'sonner'

type DeleteAdvertisementActionsProps = {
  advertisementId: string
}

export const deleteAdvertisementActions = async ({ advertisementId }: DeleteAdvertisementActionsProps) => {
  try {
    await deleteAdvertisement(advertisementId)
    toast.success('Anúncio deletado')
    await wait()
    window.location.reload()
  } catch (error) {
    const _error = error as Error

    switch (_error.message) {
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
              await deleteAdvertisementActions({ advertisementId })
            },
          },
        })
    }
  }
}
