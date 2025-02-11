'use client'

import Image from 'next/image'
import * as React from 'react'

import { FileUploader } from '@/components/interface/upload/file-uploader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { Upload } from '@/http/orval-generation/schemas'
import { MAX_FILE_SIZE } from '@/utils/constants'

type DialogUploaderAvatarProps = {
  files: Upload[] | undefined
  onUpload: (files: File[]) => Promise<void>
}

export function DialogUploaderAvatar({ files, onUpload }: DialogUploaderAvatarProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { avatar } = useUserPayloadStore((state) => state.user)

  React.useEffect(() => {
    setIsLoading(false)
  }, [files])

  if (isLoading) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-fit items-center gap-3">
          <Image
            src={files?.[0]?.url || avatar || '/assets/default-user-avatar.webp'}
            alt="user-avatar"
            className="size-10 rounded-full object-cover object-center"
            width={100}
            height={100}
          />
          <Button type="button" variant="outline">
            Enviar foto de perfil
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Envio de imagem</DialogTitle>
          <DialogDescription>Arraste e solte ou clique para escolher um arquivo.</DialogDescription>
        </DialogHeader>
        <FileUploader maxSize={MAX_FILE_SIZE} maxFileCount={1} multiple={false} onUpload={onUpload} />
      </DialogContent>
    </Dialog>
  )
}
