// 'use server'

import { ActionResponse } from '@/@types/actions'
import { envT3Oss } from '@/env.mjs'

type UploadAvatarResponse = {
  url: string
  id: string
}[]

type LoadUploadAvatarProps = (
  data: Array<{
    fileName: string
    fileType: string
    fileSize: number
    body: Buffer
  }>,
) => Promise<ActionResponse<UploadAvatarResponse>>

export const uploadAvatarActions: LoadUploadAvatarProps = async (data) => {
  const formData = new FormData()

  data.forEach((d) => {
    formData.append('files', new File([d.body], d.fileName, { type: d.fileType }))
    formData.append('fileSize', d.fileSize.toString())
  })

  try {
    const res = await fetch(`${envT3Oss.NEXT_PUBLIC_API_URL}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`${res.statusText}`)
    }

    const image = await res.json()

    return {
      success: true,
      data: image,
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
