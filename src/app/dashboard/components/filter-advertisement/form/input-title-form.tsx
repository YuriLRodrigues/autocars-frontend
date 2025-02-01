'use client'

import { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

import { useFilterAdvertisementsForm } from './use-filter-advertisements'

type InputTitleFormProps = ComponentProps<'form'>

export const InputTitleForm = ({ className, ...props }: InputTitleFormProps) => {
  const { form, handleSubmit } = useFilterAdvertisementsForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn('flex items-center gap-2', className)} {...props}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Procurar por um anúncio..."
                  className="h-11 w-full min-w-[250px] max-w-full md:min-w-[300px] md:max-w-[400px]"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <Icon name="Search" className="size-5" />
        </Button>
      </form>
    </Form>
  )
}
