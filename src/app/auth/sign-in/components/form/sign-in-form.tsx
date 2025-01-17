'use client'

import Link from 'next/link'

import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'

import { useSignIn } from './use-sign-in'

export const SignInForm = () => {
  const { form, onSubmit, showPassword, togglePasswordVisibility, isSubmitting, hasInsertAllFieldsWithoutErrors } =
    useSignIn()

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-2">
                  <FormLabel className="font-semibold">Senha:</FormLabel>
                  <PasswordRulesTooltip password={form.watch('password')} />
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
          <Link href="/auth/forgot-password" className="!mt-1 ml-auto text-left">
            <Button variant="link" effect="hoverUnderline" className="p-0 text-foreground">
              Esqueci a minha senha
            </Button>
          </Link>

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
              disabled={isSubmitting || !hasInsertAllFieldsWithoutErrors}
            >
              Acessar
            </Button>
          </div>
        </form>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </Form>
  )
}
