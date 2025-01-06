import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosErrorResponse } from '@/@types/axios-error'
import { signUp } from '@/http/orval-generation/routes/user-controller'
import { removeMask } from '@/utils/masks'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
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
  pais: string
}

export const useSignUp = ({ defaultValues }: useSignUpProps) => {
  const router = useRouter()
  const form = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      name: defaultValues?.name ?? '',
      username: defaultValues?.username ?? '',
      email: defaultValues?.email ?? '',
      password: defaultValues?.password ?? '',
      role: defaultValues?.role ?? 'Seller',
      step: defaultValues?.step ?? 'SIGNUP',
      city: defaultValues?.city ?? '',
      street: defaultValues?.street ?? '',
      neighborhood: defaultValues?.neighborhood ?? '',
      zipCode: defaultValues?.zipCode ?? '',
      state: defaultValues?.state ?? '',
    },
  })

  const [progress, setProgress] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  const fetchUserCEP = async (cep: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.target.value}/json/`)
      const cepData: CepProps = await response.json()

      form.setValue('neighborhood', cepData.bairro)
      form.setValue('city', cepData.localidade)
      form.setValue('street', cepData.logradouro)
      form.setValue('state', cepData.uf)
    } catch (error) {
      const _error = error as Error
      toast.error(`Erro ao buscar pelo CEP: ${_error.message}`)
    }
  }

  const watchFirstStepFields = form.watch(['name', 'username', 'email', 'password', 'role'])
  const watchSecondStepFields = form.watch(['city', 'neighborhood', 'state', 'zipCode', 'street'])

  const hasFirstStepError = Object.keys(form.formState.errors).some((field) =>
    ['name', 'username', 'email', 'password', 'role'].includes(field),
  )
  const hasInsertAllFirstStepFields = Object.values(watchFirstStepFields).every((value) => value && value.length > 0)

  const hasInsertAllFields =
    Object.values(watchSecondStepFields).every((value) => value && value.length > 0) && hasInsertAllFirstStepFields

  const hasCompletedFirstStep = hasInsertAllFirstStepFields && !hasFirstStepError

  useEffect(() => {
    const fields = form.watch([
      'name',
      'username',
      'email',
      'password',
      'role',
      'city',
      'neighborhood',
      'state',
      'zipCode',
      'street',
    ])
    const totalFields = Object.keys(fields).length
    const filledFields = Object.values(fields).filter((value) => value.length > 0 && value.trim()).length
    setProgress((filledFields / totalFields) * 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch()])

  const onSubmit = async (data: SignInSchemaProps) => {
    try {
      const response = await signUp({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        city: data.city,
        street: data.street,
        neighborhood: data.neighborhood,
        zipCode: Number(removeMask(data.zipCode)),
        state: data.state,
        country: 'Brasil',
      })

      if (!response) {
        toast.error('Falha ao cadastrar novo usuário.')
        return
      }
      toast.success('Usuário cadastrado com sucesso.')
      router.replace('/auth/sign-in')
    } catch (error) {
      const _error = error as AxiosError<AxiosErrorResponse>

      switch (_error.response?.data?.error) {
        case 'Resource already exists':
          toast.error('E-mail ou nome de usuário já em uso.')
          break
        default:
          toast.error(`Falha ao cadastrar novo usuário: ${_error.message}`)
      }
    }
  }

  const isSignUpStep = form.watch('step') === 'SIGNUP'

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    showPassword,
    togglePasswordVisibility,
    fetchUserCEP,
    hasCompletedFirstStep,
    progress,
    isSignUpStep,
    hasInsertAllFields,
  }
}
