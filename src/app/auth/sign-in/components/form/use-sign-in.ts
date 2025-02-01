import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUserPayloadStore } from '@/hooks/use-user-details'
import { signIn } from '@/http/orval-generation/routes/user-controller/user-controller'
import { AUTH_COOKIE_NAME } from '@/utils/constants'
import { SIGNIN_COOKIE_MAX_AGE } from '@/utils/cookie-max-age'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next/client'
import { toast } from 'sonner'

import { signInSchema, SignInSchemaProps } from './schema'

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
    try {
      const { token } = await signIn({
        email: data.email,
        password: data.password,
      })

      await setCookie(AUTH_COOKIE_NAME, token, { maxAge: SIGNIN_COOKIE_MAX_AGE })

      addUserPayload()

      toast.success('Usuário conectado ao sistema, seja bem vindo!')

      router.replace('/')
    } catch (error) {
      const _error = error as Error

      switch (_error.message) {
        case 'Resource already exists':
          toast.error('E-mail ou nome de usuário já em uso.')
          break
        case 'Invalid credentials':
          toast.error('Credenciais inválidas.')
          break
        case 'Resource not found':
          toast.error('Usuário não encontrado.')
          break
        default:
          toast.error(`Falha ao cadastrar novo usuário: ${_error.message || _error.cause}`)
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
