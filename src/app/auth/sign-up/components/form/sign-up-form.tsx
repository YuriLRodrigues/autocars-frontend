'use client'

import Link from 'next/link'

import { Steps } from '@/components/interface/form/steps'
import { InputPassword, PasswordRulesTooltip } from '@/components/interface/input-password'
import { BorderBeam } from '@/components/ui/border-beam'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { VisibleChieldComponent } from '@/components/ui/visible-chield-component'

import { cn } from '@/lib/utils'

import { useSignUp } from './use-sign-up'

export const SignUpForm = () => {
  const {
    form,
    onSubmit,
    showPassword,
    togglePasswordVisibility,
    fetchUserCEP,
    hasCompletedFirstStep,
    isSignUpStep,
    hasInsertAllFields,
    progressByStep,
  } = useSignUp()

  return (
    <Form {...form}>
      <Steps
        currentStep={isSignUpStep ? 'SIGNUP' : 'ADDRESS'}
        steps={['SIGNUP', 'ADDRESS']}
        progress={progressByStep}
      />
      <div className="relative overflow-hidden rounded-xl p-3">
        <form onSubmit={onSubmit} className="space-y-6 px-2">
          {/* Step 1 */}
          <VisibleChieldComponent visible={isSignUpStep}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nome completo:</FormLabel>
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
                  <FormLabel className="font-semibold">Nome de usuário:</FormLabel>
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

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-semibold">Escolha o que quer fazer:</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                      <div className="grid grid-cols-2 gap-4">
                        <FormItem
                          className={cn(
                            'relative flex items-center gap-4 rounded-lg border p-2',
                            form.watch('role') === 'Seller' && 'border-2 border-primary',
                          )}
                        >
                          <Icon name="BadgePercent" className="size-10" />
                          <FormControl className="absolute right-2 top-2">
                            <RadioGroupItem value="Seller" />
                          </FormControl>

                          <div className="flex flex-col space-y-2">
                            <FormLabel className="text-start font-semibold">Vendedor</FormLabel>
                            <FormLabel className="text-start text-xs">Usuários que querem vender carros</FormLabel>
                          </div>
                        </FormItem>

                        <FormItem
                          className={cn(
                            'relative flex items-center gap-4 rounded-lg border p-2',
                            form.watch('role') === 'Customer' && 'border-2 border-primary',
                          )}
                        >
                          <Icon name="ShoppingCart" className="size-8" />
                          <FormControl className="absolute right-2 top-2">
                            <RadioGroupItem value="Customer" />
                          </FormControl>

                          <div className="flex flex-col space-y-2">
                            <FormLabel className="text-start font-semibold">Comprador</FormLabel>
                            <FormLabel className="text-start text-xs">Usuários que querem comprar carros</FormLabel>
                          </div>
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </VisibleChieldComponent>

          {/* Step 2*/}
          <VisibleChieldComponent visible={!isSignUpStep}>
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">CEP:</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel className="font-semibold">Cidade:</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!form.getValues('city')} />
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
                  <FormLabel className="font-semibold">Estado:</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!form.getValues('state')} />
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
                  <FormLabel className="font-semibold">Rua:</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!form.getValues('street')} />
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
                  <FormLabel className="font-semibold">Bairro:</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!!form.getValues('neighborhood')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </VisibleChieldComponent>

          <div className="flex flex-wrap items-center justify-end gap-4 p-4">
            {isSignUpStep && (
              <Button variant="outline" type="button" effect="ringHover" className="h-8" asChild>
                <Link href="/">Voltar para o site</Link>
              </Button>
            )}

            {!isSignUpStep && (
              <Button
                variant="outline"
                type="button"
                onClick={() => form.setValue('step', 'SIGNUP')}
                icon={<Icon name="ArrowLeft" />}
                effect="ringHover"
                className="h-8"
                iconPlacement="left"
              >
                Voltar para o passo anterior
              </Button>
            )}

            {isSignUpStep && (
              <Button
                type="button"
                onClick={() => form.setValue('step', 'ADDRESS')}
                icon={<Icon name="ArrowRight" />}
                iconPlacement="right"
                effect="expandIcon"
                disabled={!hasCompletedFirstStep}
                className="h-8"
              >
                Próximo passo
              </Button>
            )}
            {!isSignUpStep && (
              <Button
                type="submit"
                icon={<Icon name="Check" />}
                iconPlacement="right"
                effect="shine"
                className="h-8"
                disabled={!hasInsertAllFields}
              >
                Finalizar Cadastro
              </Button>
            )}
          </div>
        </form>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </Form>
  )
}
