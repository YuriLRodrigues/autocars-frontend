import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { signInSchema, SignInSchemaProps } from './schema'

type useSignUpProps = {
  defaultValues?: Partial<SignInSchemaProps>
}

type CepProps = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
}

export const useSignUp = (props: useSignUpProps) => {
  const { defaultValues } = props

  const form = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      name: defaultValues?.name ?? '',
      username: defaultValues?.username ?? '',
      email: defaultValues?.email ?? '',
      password: defaultValues?.password ?? '',
      role: defaultValues?.role ?? 'SELLER',
      step: defaultValues?.step ?? 'SIGNUP',
      city: defaultValues?.city ?? '',
      street: defaultValues?.street ?? '',
      neighborhood: defaultValues?.neighborhood ?? '',
      zipCode: defaultValues?.zipCode ?? '',
      state: defaultValues?.state ?? '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const fetchUserCEP = async (cep: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.target.value}/json/`)

      const cepData: CepProps = await response.json()

      form.setValue('neighborhood', cepData.bairro)
      form.setValue('city', cepData.localidade)
      form.setValue('street', cepData.logradouro)
      form.setValue('state', cepData.estado)
      // form.setValue('zipCode', cep.target.value)
    } catch (error) {
      const _error = error as Error
      toast.error(`Erro ao buscar pelo CEP: ${_error.message}`)
    }
  }

  const watchFields = form.watch(['name', 'username', 'email', 'password', 'role'])

  const hasFirstStepError = Object.keys(form.formState.errors).some((field) =>
    ['name', 'username', 'email', 'password', 'confirmPassword', 'role'].includes(field),
  )

  const hasInsertAllFields = Object.values(watchFields).every((value) => value && value.length > 0)

  const hasCompletedFirstStep = hasInsertAllFields && !hasFirstStepError

  const onSubmit = (data: SignInSchemaProps) => {
    console.log(data)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    showPassword,
    togglePasswordVisibility,
    fetchUserCEP,
    hasCompletedFirstStep,
  }
}
