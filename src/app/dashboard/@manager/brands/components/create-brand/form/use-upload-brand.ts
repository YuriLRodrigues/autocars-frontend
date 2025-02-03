import * as React from 'react'

import { uploadImages } from '@/http/orval-generation/routes/image-controller/image-controller'
import { Upload } from '@/http/orval-generation/schemas'
import { toast } from 'sonner'

export function useUploadBrand() {
  const [uploadedBrand, setUploadedBrand] = React.useState<Upload[]>()
  const [isUploading, setIsUploading] = React.useState(false)

  async function onUpload(brands: File[]) {
    setIsUploading(true)

    const formData = new FormData()
    brands.forEach((brand) => {
      formData.append('files', brand, brand.name)
    })

    try {
      const res = await uploadImages({
        body: formData,
      })

      setUploadedBrand([...res])
      toast.success('Logo da marca enviada com sucesso')
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
    uploadedBrand,
    isUploading,
  }
}
