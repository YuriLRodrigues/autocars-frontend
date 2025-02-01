// 'use server'

import { ActionResponse } from '@/@types/actions'
import { uploadImages } from '@/http/orval-generation/routes/image-controller/image-controller'

type UploadImagesResponse = {
  url: string
  id: string
}[]

type LoadUploadImagesProps = (files: File[]) => Promise<ActionResponse<UploadImagesResponse>>

export const uploadImagesActions: LoadUploadImagesProps = async (data) => {
  const formData = new FormData()
  data.forEach((d) => {
    formData.append('images', d, d.name)
  })

  try {
    const images = await uploadImages({
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return {
      success: true,
      data: images,
    }
  } catch (error) {
    const _error = error as Error
    return {
      success: false,
      error: (_error.cause || _error.message) as string,
      data: [],
    }
  }
}
