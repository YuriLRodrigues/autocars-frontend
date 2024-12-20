'use client'
import { InputPassword } from '@/components/interface/input-password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { BadgePercent } from 'lucide-react'

import { useSignIn } from './use-signin'

export const SignInForm = () => {
  const { form, onSubmit, showPassword, togglePasswordVisibility } = useSignIn()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo: </FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Nome de usuário: </FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>E-mail: </FormLabel>
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
              <FormLabel>Senha: </FormLabel>
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
              <FormLabel>Confirmar senha: </FormLabel>
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
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Escolha o que quer fazer: </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  <div>
                    <FormItem className="relative grid grid-cols-2">
                      <div>
                        <BadgePercent />
                        <FormControl className="absolute right-2 top-2">
                          <RadioGroupItem value="SELLER" />
                        </FormControl>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <FormLabel className="text-start font-semibold">Vendedor</FormLabel>
                        <FormLabel className="text-start text-sm font-normal">
                          Usuários que querem vender carros
                        </FormLabel>
                      </div>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit">Submit</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
