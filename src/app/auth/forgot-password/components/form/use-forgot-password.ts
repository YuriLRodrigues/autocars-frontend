import { useForm } from 'react-hook-form'

import { forgotPassword } from '@/http/orval-generation/routes/user-controller/user-controller'
import { wait } from '@/utils/wait'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { forgotPasswordSchema, ForgotPasswordSchemaProps } from './schema'

type useForgotPasswordProps = {
  defaultValues?: Partial<ForgotPasswordSchemaProps>
}

export const useForgotPassword = ({ defaultValues }: useForgotPasswordProps = {}) => {
  const form = useForm<ForgotPasswordSchemaProps>({
    resolver: zodResolver(forgotPasswordSchema),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      email: defaultValues?.email ?? '',
    },
  })

  const onSubmit = async (data: ForgotPasswordSchemaProps) => {
    try {
      const response = await forgotPassword({
        email: data.email,
      })

      if (!response) {
        toast.error('Erro ao tentar enviar a recuperação de senha.')
        return
      }

      toast.success('Recuperação de senha enviada ao seu e-mail!')

      await wait()
    } catch (error) {
      const _error = error as Error

      switch (_error.message) {
        case 'Resource not found':
          toast.error('E-mail não cadastrado em nossos sistemas.')
          break
        default:
          toast.error(`Falha ao enviar o e-mail de recuperação de senha: ${_error.message}`)
      }
    }
  }

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
