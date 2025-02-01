import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { signUp } from '@/http/orval-generation/routes/user-controller/user-controller'
import { removeMask } from '@/utils/masks'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { signUpSchema, SignUpSchemaProps } from './schema'

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

type useSignUpProps = {
  defaultValues?: Partial<SignUpSchemaProps>
}

export const useSignUp = ({ defaultValues }: useSignUpProps = {}) => {
  const router = useRouter()
  const form = useForm<SignUpSchemaProps>({
    resolver: zodResolver(signUpSchema),
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
      toast.success(`CEP encontrado!`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Erro ao buscar pelo CEP`)
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
  const isSignUpStep = form.watch('step') === 'SIGNUP'

  const [progressByStep, setProgressByStep] = useState<Record<string, number>>({})

  const stepFields: Record<string, (keyof SignUpSchemaProps)[]> = {
    SIGNUP: ['name', 'username', 'email', 'password', 'role'],
    ADDRESS: ['city', 'street', 'state', 'neighborhood', 'zipCode'],
  }

  const calculateProgress = (fields: (keyof SignUpSchemaProps)[]) => {
    const total = fields.length
    const filled = fields.filter((field) => {
      const value = form.getValues(field)
      return value && value.trim().length > 0
    }).length
    return (filled / total) * 100
  }

  useEffect(() => {
    const subscription = form.watch(() => {
      const newProgressByStep: Record<string, number> = {}
      Object.keys(stepFields).forEach((step) => {
        newProgressByStep[step] = calculateProgress(stepFields[step])
      })
      setProgressByStep(newProgressByStep)
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, stepFields])

  const onSubmit = async (data: SignUpSchemaProps) => {
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
      const _error = error as Error

      switch (_error.message) {
        case 'Resource already exists':
          toast.error('E-mail ou nome de usuário já em uso.')
          break
        default:
          toast.error(`Falha ao cadastrar novo usuário: ${_error.message}`)
      }
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    progressByStep,
    showPassword,
    togglePasswordVisibility,
    fetchUserCEP,
    hasCompletedFirstStep,
    isSignUpStep,
    hasInsertAllFields,
  }
}
