'use client'

import { useEffect } from 'react'

import { DialogUploaderAvatar } from '@/components/interface/upload/dialog-uploader-avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

import { useUpdateProfileForm } from './use-update-profile'
import { useUploadAvatar } from './use-upload-avatar'

export const UpdateProfileForm = () => {
  const { isUploading, onUpload, uploadedAvatar } = useUploadAvatar()

  const { form, isSubmitting, handleSubmit, isAnyFieldFilled } = useUpdateProfileForm({
    uploadedAvatar: uploadedAvatar?.[0]?.url,
  })

  useEffect(() => {}, [uploadedAvatar, isUploading])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-3 p-1 md:w-auto md:min-w-[500px]">
        <div className="flex flex-col gap-6 md:col-span-2">
          <DialogUploaderAvatar files={uploadedAvatar} onUpload={onUpload} />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nome de usuário" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input autoComplete="off" type="email" placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="!mb-6 flex flex-wrap items-center justify-end gap-4 md:col-span-2">
          <Button
            type="submit"
            icon={<Icon name="Check" />}
            iconPlacement="right"
            effect="shine"
            className="h-8"
            disabled={!isAnyFieldFilled || isSubmitting || isUploading}
          >
            Atualizar perfil
          </Button>
        </div>
      </form>
    </Form>
  )
}
