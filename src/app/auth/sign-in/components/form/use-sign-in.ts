import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TokenPayload } from '@/auth'
import { useUserPayloadStore } from '@/hooks/use-user-details'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { signInSchema, SignInSchemaProps } from './schema'
import { signInActions } from './sign-in.actions'

type useSignInProps = {
  defaultValues?: Partial<SignInSchemaProps>
}

export const useSignIn = ({ defaultValues }: useSignInProps = {}) => {
  const { addUserPayload } = useUserPayloadStore((state) => state.actions)
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  const form = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      email: defaultValues?.email ?? '',
      password: defaultValues?.password ?? '',
    },
  })

  const hasInsertAllFieldsWithoutErrors =
    form.watch(['email', 'password']).every((field) => field.length > 0) &&
    !form.formState.errors.email &&
    !form.formState.errors.password

  const onSubmit = async (data: SignInSchemaProps) => {
    const response = await signInActions({ email: data.email, password: data.password })

    if (!response.error) {
      const { email, exp, name, roles, sub, username, avatar } = (response.data as TokenPayload) || null

      addUserPayload({ email, exp, name, roles, sub, username, avatar })

      toast.success('Usuário conectado ao sistema, seja bem vindo!')
      router.replace('/')
    } else {
      switch (response.error) {
        case 'Invalid credentials':
          toast.error('Credenciais inválidas.')
          break
        case 'Resource not found':
          toast.error('Usuário não encontrado.')
          break
        default:
          toast.error(`Falha ao accesar o usuário: ${response.error}`)
      }
    }
  }

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    showPassword,
    togglePasswordVisibility,
    hasInsertAllFieldsWithoutErrors,
  }
}
