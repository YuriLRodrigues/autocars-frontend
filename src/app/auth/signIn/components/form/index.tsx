"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff } from "lucide-react";

import { useSignIn } from "./use-signin";
import { InputPassword } from "@/components/interface/input-password";
import { BadgePercent } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignInForm() {
  const { form, onSubmit, showPassword, togglePasswordVisibility } =
    useSignIn();

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
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div>
                    <FormItem className="grid grid-cols-2 relative">
                      <div>
                        <BadgePercent />
                        <FormControl className="absolute top-2 right-2">
                          <RadioGroupItem value="SELLER" />
                        </FormControl>
                      </div>
                      <div className="space-y-2 flex flex-col">
                        <FormLabel className="font-semibold text-start">
                          Vendedor
                        </FormLabel>
                        <FormLabel className="font-normal text-sm text-start">
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
  );
}
