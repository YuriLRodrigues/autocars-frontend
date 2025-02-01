'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import { DialogUploaderImage } from '@/components/interface/upload/dialog-uploader-image'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

import { useUpdateBrandForm } from './use-update-brand'
import { useUploadBrand } from './use-upload-brand'

type UpdateBrandFormProps = {
  logoUrl: string
  name: string
  id: string
}

export const UpdateBrandForm = ({ logoUrl, name, id }: UpdateBrandFormProps) => {
  const { isUploading, onUpload, uploadedBrand } = useUploadBrand()

  const { form, isSubmitting, handleSubmit } = useUpdateBrandForm({
    uploadedImagesIds: uploadedBrand?.map((img) => img.id) ?? [],
    name,
    id,
  })

  useEffect(() => {
    if (uploadedBrand) {
      const imageIds = uploadedBrand.map((img) => img.id)
      form.setValue('logoId', imageIds[0])
    }

    return
  }, [uploadedBrand, form])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="min-w-full space-y-3 p-1">
        <DialogUploaderImage onUpload={onUpload}>
          <div className="flex items-center gap-3">
            <Image
              src={uploadedBrand?.[0]?.url || logoUrl || '/assets/empty-image.png'}
              alt="image-uploader"
              width={100}
              height={100}
              className="aspect-square h-10 w-10 rounded-full object-cover object-center"
            />
            <Button type="button" variant="outline" className="w-full">
              Enviar logo
            </Button>
          </div>
        </DialogUploaderImage>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input autoComplete="off" type="text" placeholder="Nome da marca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap items-center justify-end md:col-span-2">
          <Button
            icon={<Icon name="Check" />}
            iconPlacement="right"
            effect="shine"
            className="h-8"
            disabled={isSubmitting || isUploading}
            type="submit"
          >
            Atualizar marca
          </Button>
        </div>
      </form>
    </Form>
  )
}
