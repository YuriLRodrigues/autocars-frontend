import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { newPassword } from '@/http/orval-generation/routes/user-controller/user-controller'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { newPasswordSchema, NewPasswordSchemaProps } from './schema'

type useNewPasswordProps = {
  defaultValues?: Partial<NewPasswordSchemaProps>
}

export const useNewPassword = ({ defaultValues }: useNewPasswordProps = {}) => {
  const router = useRouter()
  const recoveryPasswordToken = useSearchParams().get('recovery-password-token')

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  const form = useForm<NewPasswordSchemaProps>({
    resolver: zodResolver(newPasswordSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      confirmPassword: defaultValues?.confirmPassword ?? '',
      newPassword: defaultValues?.newPassword ?? '',
    },
  })

  const onSubmit = async (data: NewPasswordSchemaProps) => {
    try {
      const response = await newPassword(
        {
          newPassword: data.newPassword,
        },
        { token: recoveryPasswordToken! },
      )

      if (!response) {
        toast.error('Erro ao tentar alterar a senha.')
        return
      }

      toast.success('Sua senha foi alterada.')

      router.replace('/auth/sign-in')
    } catch (error) {
      const _error = error as Error

      switch (_error.message) {
        case `Password reset token '${recoveryPasswordToken}' is expired.`:
          toast.error('Token de recuperação expirado.')
          break
        case `Password reset token '${recoveryPasswordToken}' is invalid.`:
          toast.error('Token de recuperação inválido.')
          break
        default:
          toast.error(`Falha ao alterar a senha: ${_error.message}`)
      }
    }
  }

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    showPassword,
    togglePasswordVisibility,
  }
}
