import * as React from 'react'

import { TokenPayload } from '@/auth'
import { useUserPayloadStore } from '@/hooks/use-user-details'
import { uploadAvatar } from '@/http/orval-generation/routes/image-controller/image-controller'
import { AUTH_SESSION_NAME, DEFAULT_TOKEN_PAYLOAD } from '@/utils/constants'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'

export function useUploadAvatar() {
  const [uploadedAvatar, setUploadedAvatar] = React.useState<Array<{ id: string; url: string }>>()
  const [isUploading, setIsUploading] = React.useState(false)
  const { updateUserAvatar } = useUserPayloadStore((state) => state.actions)
  const [, setTokenPayload] = useLocalStorage<Partial<TokenPayload>>(AUTH_SESSION_NAME, DEFAULT_TOKEN_PAYLOAD)

  async function onUpload(avatars: File[]) {
    setIsUploading(true)

    const formData = new FormData()
    avatars.forEach((avatar) => {
      formData.append('files', avatar, avatar.name)
    })

    try {
      const res = await uploadAvatar({
        body: formData,
      })

      setUploadedAvatar([res])
      updateUserAvatar(res.url)
      setTokenPayload({ avatar: res.url })
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
