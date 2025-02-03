'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { toast } from 'sonner'

import { handleActiveUserActions } from './handle-active-user.actions'

type HandleActiveUserProps = {
  userId: string
  isDisabled: boolean
}

export const HandleActiveUser = ({ userId, isDisabled }: HandleActiveUserProps) => {
  const handleHandleActiveUser = async () => {
    const response = await handleActiveUserActions({ userId })
    if (response.error) {
      switch (response.error) {
        case 'Resource not found':
          toast.error('Usuário não encontrado')
          break
        case 'Not allowed':
          toast.error('Você não tem permissão para realizar esta ação')
          break
        default:
          toast.error('Erro ao atualizar o status do usuário', {
            action: {
              label: 'Tentar novamente',
              onClick: async () => {
                await handleActiveUserActions({ userId })
              },
            },
          })
      }
    }
    return toast.success('Status do usuário alterado')
  }

  return (
    <Button
      onClick={handleHandleActiveUser}
      effect="gooeyRight"
      icon={<Icon name={isDisabled ? 'Shield' : 'ShieldX'} />}
      iconPlacement="left"
      variant="secondary"
      className="flex h-auto min-w-24 items-center gap-2 p-1"
    >
      {isDisabled ? 'Ativar' : 'Inativar'}
    </Button>
  )
}
