'use client'

import Link from 'next/link'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'

import { useNewPassword } from './use-new-password'

export const NewPasswordForm = () => {
  const { form, onSubmit, isSubmitting, showPassword, togglePasswordVisibility } = useNewPassword()

  return (
    <Form {...form}>
      <div className="relative overflow-hidden rounded-xl p-3">
        <form onSubmit={onSubmit} className="flex flex-col space-y-6 px-2">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Senha:</FormLabel>
                  <PasswordRulesTooltip password={form.watch('newPassword')} />
                </span>
                <FormControl>
                  <InputPassword
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Confirme a sua senha:</FormLabel>
                </span>
                <FormControl>
                  <InputPassword
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    field={field}
                  />
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
              Confirmar alteração
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}
