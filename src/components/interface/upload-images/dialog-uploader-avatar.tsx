'use client'

import Image from 'next/image'
import * as React from 'react'

import { FileUploader } from '@/components/interface/file-uploader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { uploadAvatarActions } from './upload-avatar.actions'

export function DialogUploaderDemo() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [files, setFiles] = React.useState<{ id: string; url: string }[]>([])
  const [open, setOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsLoading(false)
  }, [files])

  if (isLoading) return null

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <div className="flex w-fit items-center gap-3">
          <Image
            src={files?.[0]?.url ?? '/assets/default-user-avatar.webp'}
            alt="user-avatar"
            className="size-10 rounded-full object-cover object-center"
            width={100}
            height={100}
          />
          <Button type="button" variant="outline" onClick={() => setOpen((s) => !s)}>
            Enviar foto de perfil
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl" state={() => setOpen((s) => !s)}>
        <DialogHeader>
          <DialogTitle>Envio de imagem</DialogTitle>
          <DialogDescription>Arraste e solte ou clique para escolher um arquivo.</DialogDescription>
        </DialogHeader>
        <FileUploader
          maxSize={5 * 1024 * 1024}
          setResponseValues={setFiles}
          onUpload={async (file) => {
            return file.arrayBuffer().then((buffer) =>
              uploadAvatarActions([
                {
                  fileName: file.name,
                  fileType: file.type,
                  fileSize: file.size,
                  body: Buffer.from(buffer),
                },
              ]),
            )
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
