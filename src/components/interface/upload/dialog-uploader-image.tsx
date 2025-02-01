'use client'

import * as React from 'react'

import { FileUploader } from '@/components/interface/upload/file-uploader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type DialogUploaderImageProps = {
  onUpload: (files: File[]) => Promise<void>
  children: React.ReactNode
}

export function DialogUploaderImage({ children, onUpload }: DialogUploaderImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Envio de imagem</DialogTitle>
          <DialogDescription>Arraste e solte ou clique para escolher um arquivo.</DialogDescription>
        </DialogHeader>
        <FileUploader maxSize={5 * 1024 * 1024} maxFileCount={1} multiple={false} onUpload={onUpload} />
      </DialogContent>
    </Dialog>
  )
}
