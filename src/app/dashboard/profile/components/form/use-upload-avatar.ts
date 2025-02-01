import * as React from 'react'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { uploadImages } from '@/http/orval-generation/routes/image-controller/image-controller'
import { Upload } from '@/http/orval-generation/schemas'
import { toast } from 'sonner'

export function useUploadAvatar() {
  const [uploadedAvatar, setUploadedAvatar] = React.useState<Upload[]>()
  const [isUploading, setIsUploading] = React.useState(false)
  const { updateUserAvatar } = useUserPayloadStore((state) => state.actions)

  async function onUpload(avatars: File[]) {
    setIsUploading(true)

    const formData = new FormData()
    avatars.forEach((avatar) => {
      formData.append('files', avatar, avatar.name)
    })

    try {
      const res = await uploadImages({
        body: formData,
      })

      setUploadedAvatar([...res])
      updateUserAvatar(res[0].url)
      toast.success('Foto de perfil enviada com sucesso, para salvar, atualize seu perfil')
    } catch (err) {
      const _error = err as Error

      switch (_error.message) {
        case 'Invalid image type':
          toast.error('Tipo de imagem inválido')
          break
        case 'Not allowed':
          toast.error('Você não tem permissão para enviar imagens')
          break
        default:
          toast.error('Erro ao enviar imagens')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return {
    onUpload,
    uploadedAvatar,
    isUploading,
  }
}
