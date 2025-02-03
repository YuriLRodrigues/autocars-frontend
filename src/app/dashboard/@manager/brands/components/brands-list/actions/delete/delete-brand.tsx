'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

import { toast } from 'sonner'

import { deleteBrandActions } from './delete-brand.actions'

type DeleteBrandProps = {
  brandId: string
}

export const DeleteBrand = ({ brandId }: DeleteBrandProps) => {
  const handleDeleteBrand = async () => {
    const result = await deleteBrandActions({ brandId })

    if (!result.error) {
      toast.success('Marca deletada com sucesso!')
    } else {
      switch (result.error) {
        case 'Resource not found':
          toast.error('Marca não encontrada')
          break
        default:
          toast.error('Erro ao deletar a marca', {
            action: {
              label: 'Tentar novamente',
              onClick: async () => {
                await handleDeleteBrand()
              },
            },
          })
      }
    }
  }

  return (
    <Button onClick={handleDeleteBrand} effect="ringHover" className="flex h-auto items-center gap-2 p-1">
      <Icon name="Trash" className="size-4 flex-none" />
    </Button>
  )
}
