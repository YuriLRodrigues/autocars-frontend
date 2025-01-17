'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

import { useForgotPassword } from './use-forgot-password'

export const ForgotPasswordForm = () => {
  const { form, onSubmit, isSubmitting } = useForgotPassword()

  return (
    <Form {...form}>
      <div className="relative overflow-hidden rounded-xl p-3">
        <form onSubmit={onSubmit} className="flex flex-col space-y-6 px-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">E-mail:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap items-center justify-end gap-4 p-4">
            <Button
              variant="outline"
              type="button"
              icon={<Icon name="ArrowLeft" />}
              effect="ringHover"
              className="h-8"
              iconPlacement="left"
              asChild
            >
              <Link href="/">Voltar para o site</Link>
            </Button>

            <Button
              type="submit"
              icon={<Icon name="Check" />}
              iconPlacement="right"
              effect="shine"
              className="h-8"
              disabled={isSubmitting}
            >
              Enviar e-mail de recuperação
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}
