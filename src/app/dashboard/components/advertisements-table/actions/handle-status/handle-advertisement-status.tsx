'use client'

import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { SoldStatus } from '@/@types/advertisement'
import { toast } from 'sonner'

import { changeAdvertisementStatusActions } from './handle-advertisement-status.actions'

type HandleStatusProps = {
  advertisementId: string
}

export const HandleStatus = ({ advertisementId }: HandleStatusProps) => {
  const currentPathname = usePathname()

  const handleChangeStatus = async (soldStatus: SoldStatus) => {
    const response = await changeAdvertisementStatusActions({ advertisementId, soldStatus, currentPathname })

    if (!response.error) {
      toast.success('Status alterado')
    } else {
      switch (response.error) {
        case 'Resource not found':
          toast.error('Anúncio não encontrado')
          break
        case 'Not allowed':
          toast.error('Você não tem permissão para realizar esta ação')
          break
        default:
          toast.error('Erro ao alterar o staus do anúncio', {
            action: {
              label: 'Tentar novamente',
              onClick: async () => {
                await changeAdvertisementStatusActions({ advertisementId, soldStatus, currentPathname })
              },
            },
          })
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          effect="ringHover"
          icon={<Icon name="Pencil" />}
          iconPlacement="left"
          className="flex h-auto min-w-24 items-center gap-2 p-1"
          variant="secondary"
        >
          Status
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-fit space-y-3 p-3">
        <Button
          onClick={async () => await handleChangeStatus(SoldStatus.Active)}
          icon={<Icon name="CircleCheckBig" />}
          iconPlacement="left"
          className="flex h-auto w-full min-w-24 items-center justify-start gap-2 bg-green-500 p-1 duration-300 hover:bg-green-700"
        >
          Disponível
        </Button>
        <Button
          onClick={async () => await handleChangeStatus(SoldStatus.Sold)}
          icon={<Icon name="X" />}
          iconPlacement="left"
          className="flex h-auto w-full min-w-24 items-center justify-start gap-2 bg-red-500 p-1 text-white duration-300 hover:bg-red-700"
        >
          Vendido
        </Button>
        <Button
          onClick={async () => await handleChangeStatus(SoldStatus.Reserved)}
          icon={<Icon name="Loader" />}
          iconPlacement="left"
          className="flex h-auto w-full min-w-24 items-center justify-start gap-2 bg-yellow-500 p-1 duration-300 hover:bg-yellow-700"
        >
          Reservado
        </Button>
      </PopoverContent>
    </Popover>
  )
}
