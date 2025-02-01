'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

import { useUpdateAddressForm } from './use-update-address'

export const UpdateAddressForm = () => {
  const { form, isSubmitting, handleSubmit, isAnyFieldFilled, fetchUserCEP } = useUpdateAddressForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-3 p-1 md:w-auto md:min-w-[500px]">
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="CEP"
                  {...field}
                  onChange={(e) => {
                    fetchUserCEP(e)
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Cidade" {...field} disabled={!!form.getValues('city')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Estado" {...field} disabled={!!form.getValues('state')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Rua" {...field} disabled={!!form.getValues('street')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Bairro" {...field} disabled={!!form.getValues('neighborhood')} />
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
            disabled={!isAnyFieldFilled || isSubmitting}
          >
            Atualizar endereço
          </Button>
        </div>
      </form>
    </Form>
  )
}
