import * as React from 'react'

import { uploadImages } from '@/http/orval-generation/routes/image-controller/image-controller'
import { Upload } from '@/http/orval-generation/schemas'
import { toast } from 'sonner'

export function useUploadFile() {
  const [uploadedFiles, setUploadedFiles] = React.useState<Upload[]>()
  const [progresses, setProgresses] = React.useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = React.useState(false)

  async function onUpload(files: File[]) {
    setIsUploading(true)

    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file, file.name)
    })

    try {
      const res = await uploadImages({
        body: formData,
      })

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res))
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
      setProgresses({})
      setIsUploading(false)
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  }
}
